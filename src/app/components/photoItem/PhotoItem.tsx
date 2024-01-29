import { useState } from "react";
import Image from "next/image";
import styles from "./photoItem.module.css";
import { Photo, PhotoForList, PhotoResponse } from "@/types/unsplash";
import bookmarkWhite from "/public/images/bookmark_white.svg";
import bookmarkFill from "/public/images/bookmark_fill.svg";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { fetchUnsplashPhotoBy } from "@/app/services/photo.service";
import Modal from "../modal/Modal";

type PhotoItemProps = {
    photo: PhotoForList;
    onBookmarkChange?: () => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, onBookmarkChange }) => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // NOTE(hajae): 로그인 기능이 따로 구현이 되어있지 않기 때문에 로컬스토리지에 북마크를 저장/관리
    const [bookmarks, setBookmarks] = useLocalStorage<PhotoForList[]>('bookmarks', []);

    const fetchPhotoById = (photoId: string) => {
        fetchUnsplashPhotoBy(photoId)
            .then((res: PhotoResponse) => { setSelectedPhoto(res.photos); });
    }

    const isBookmarked = (photoId: string): boolean => {
        return bookmarks.some((bookmark) => bookmark.id === photoId)
    }

    const handleBookmarkClick = (photo: PhotoForList) => {
        const existingBookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.id === photo.id);

        // NOTE(hajae): 이미 북마크에 있는 경우 제거, 아닌 경우 추가
        if (existingBookmarkIndex !== -1) {
            const updatedBookmarks = [...bookmarks];
            updatedBookmarks.splice(existingBookmarkIndex, 1);
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setBookmarks(updatedBookmarks);
            if (onBookmarkChange) onBookmarkChange();
        } else {
            const updatedBookmarks = [...bookmarks, photo];
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setBookmarks(updatedBookmarks);
        }
    };

    const handleImageClick = (photo: PhotoForList) => {
        setIsModalOpen(true);
        fetchPhotoById(photo.id);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPhoto(null);
    };

    return (
        <div>
            <div>
                <Image
                    className={styles.PhotoImage}
                    src={photo.urls.small}
                    alt={photo.alt_description}
                    width={300}
                    height={300}
                    onClick={() => handleImageClick(photo)}
                />
                <Image
                    className={styles.Bookmark}
                    src={isBookmarked(photo.id) ? bookmarkFill.src : bookmarkWhite.src}
                    alt="bookmark"
                    width={30}
                    height={30}
                    onClick={() => handleBookmarkClick(photo)} />

            </div>
            {isModalOpen && selectedPhoto && (
                <Modal onClose={closeModal} photoInfo={selectedPhoto} onBookmarkClick={handleBookmarkClick} />
            )}
        </div>

    )
}

export default PhotoItem;