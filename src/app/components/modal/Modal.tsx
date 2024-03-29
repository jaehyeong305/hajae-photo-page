'use client'

import { useEffect, useState } from 'react';
import { Photo, PhotoForList } from '@/types/unsplash';
import styles from './modal.module.css';
import Image from 'next/image';
import close from '/public/images/modal_close.svg';
import bookmark from "/public/images/bookmark.svg";
import bookmarkFill from "/public/images/bookmark_fill.svg";
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Tag from '../tag/Tag';
import CustomButton from '../customButton/CustomButton';
import formatDateDifference from '@/app/utils/DateUtil';
import addCommasToNumber from '@/app/utils/CountUtil';

type ModalProps = {
    photoInfo: Photo;
    onClose: () => void;
    onBookmarkClick: (photo: PhotoForList) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, photoInfo, onBookmarkClick }) => {
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    useEffect(() => {
        const storedBookmarks = localStorage.getItem("bookmarks");
        if (storedBookmarks) {
            const bookmarks = JSON.parse(storedBookmarks) as PhotoForList[];
            setIsBookmarked(bookmarks.some(item => item.id === photoInfo.id));
        }
    }, []);

    useEffect(() => {
        // NOTE(hajae): Modal Open시 외부 스크롤 방지
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // NOTE(hajae): photo response의 download_location를 이용해 download url을 request
    const handleDownloadButton = async () => {
        const response = await fetch(photoInfo.links.download_location, {
            headers: {
                'Authorization': `Client-ID 35uTnjYzFrY-HrbqXeIQC8n2byaF0PtHxxGFj0e956w`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Download failed: ${errorData.message}`);
        }

        const res = await response.json();
        handleDownload(res.url);
    }

    // NOTE(hajae): download url을 이용해, 다운로드 링크를 생성하고 클릭하여 다운로드
    const handleDownload = async (downloadUrl: string) => {
        const response = await fetch(downloadUrl);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Download failed: ${errorData.message}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.setAttribute('href', url);
        link.setAttribute('download', photoInfo.id + '.jpg');

        document.body.appendChild(link);

        link.click();

        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url)
    }

    // NOTE(hajae): Modal 내부 클릭시 onClose 이벤트 발생 방지
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    const convertToPhotoForList = (photo: Photo): PhotoForList => {
        return {
            id: photo.id,
            width: photo.width,
            height: photo.height,
            color: photo.color,
            blur_hash: photo.blur_hash,
            likes: photo.likes,
            liked_by_user: photo.liked_by_user,
            alt_description: photo.alt_description,
            description: photo.description,
            urls: photo.urls,
            links: photo.links,
            user: photo.user,
        }
    } 

    return (
        <div className={styles.ModalBackground} onClick={onClose}>
            <div className={styles.ModalContent} onClick={handleModalClick}>
                <div className={styles.ModalHeader}>
                    <div className={styles.ModalHeaderItems}>
                        <span className={`${styles.ModalClose} ${styles.ModalHeaderItem}`} onClick={onClose}>
                            <Image src={close.src} width={20} height={20} alt='close' />
                        </span>
                        <span className={styles.ModalHeaderItem}>{photoInfo.user.username}</span>
                    </div>
                    <div className={styles.ModalHeaderItems}>
                        <span className={styles.ModalHeaderItem}>
                            <Image
                                className="Bookmark"
                                src={isBookmarked ? bookmarkFill.src : bookmark.src}
                                alt="bookmark"
                                width={30}
                                height={30}
                                onClick={() => {
                                    setIsBookmarked(!isBookmarked);
                                    onBookmarkClick(convertToPhotoForList(photoInfo));
                                }} />
                        </span>
                        <CustomButton value="다운로드" onClick={handleDownloadButton} />
                    </div>
                </div>
                <div className={styles.ModalImageBox}>
                    {loading && (
                        <LoadingSpinner />
                    )}
                    <Image
                        src={photoInfo.urls.full}
                        layout='fill'
                        objectFit='contain'
                        alt={photoInfo.alt_description}
                        onLoad={() => setLoading(false)} />
                </div>
                <div className={styles.ModalImageInfoWrapper}>
                    <div className={styles.ModalImageInfo}>
                        <span className={styles.ModalImageInfoTitle}>이미지 크기</span>
                        <span className={styles.ModalImageInfoBody}>{photoInfo.width} x {photoInfo.height}</span>
                    </div>
                    <div className={styles.ModalImageInfo}>
                        <span className={styles.ModalImageInfoTitle}>업로드</span>
                        <span className={styles.ModalImageInfoBody}>{formatDateDifference(photoInfo.created_at)}</span>
                    </div>
                    <div className={styles.ModalImageInfo}>
                        <span className={styles.ModalImageInfoTitle}>다운로드</span>
                        <span className={styles.ModalImageInfoBody}>{addCommasToNumber(photoInfo.downloads)}</span>
                    </div>
                </div>
                <div className={styles.ModalImageTags}>
                    {photoInfo.tags.map((tag, index) => (
                        <Tag key={index} title={tag.title} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Modal;