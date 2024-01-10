'use client'

import { Photo } from '@/types/unsplash';
import styles from './modal.module.css';
import Image from 'next/image';
import close from '/public/images/modal_close.svg';
import { useState } from 'react';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Tag from '../tag/Tag';

type ModalProps = {
    photoInfo: Photo;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, photoInfo }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className={styles.ModalBackground}>
            <div className={styles.ModalContent}>
                <div className={styles.ModalHeader}>
                    <div className={styles.ModalHeaderItems}>
                        <span className={`${styles.ModalClose} ${styles.ModalHeaderItem}`} onClick={onClose}>
                            <Image src={close.src} width={20} height={20} alt='close' />
                        </span>
                        <span className={styles.ModalHeaderItem}>{photoInfo.user.username}</span>
                    </div>
                    <div className={styles.ModalHeaderItems}>
                        <span className={styles.ModalHeaderItem}>하트</span>
                        <span className={styles.ModalHeaderItem}>다운로드</span>
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
                        <span>이미지 크기</span>
                        <span>{photoInfo.width} x {photoInfo.height}</span>
                    </div>
                    <div className={styles.ModalImageInfo}>
                        <span>업로드</span>
                        <span>{photoInfo.updated_at}</span>
                    </div>
                    <div className={styles.ModalImageInfo}>
                        <span>다운로드</span>
                        <span>{photoInfo.downloads}</span>
                    </div>
                </div>
                <div className={styles.ModalImageTags}>
                    {photoInfo.tags.map((tag, index) => (
                        <Tag key={index} title={tag.title}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Modal;