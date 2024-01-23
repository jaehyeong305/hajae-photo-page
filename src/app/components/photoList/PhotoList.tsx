import { Photo, PhotoForList, PhotoResponse } from '@/types/unsplash';
import styles from './photoList.module.css'
import Image from "next/image";
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Pagination from '../pagination/Pagination';
import Modal from '../modal/Modal';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import { useState } from 'react';
import bookmarkWhite from "/public/images/bookmark_white.svg";
import bookmarkFill from "/public/images/bookmark_fill.svg";

type PhotoListProps = {
    isLoading: boolean;
    photos: PhotoForList[];
    photoListCurrentPage: number;
    searchTotal: number;
    searchTerm?: string;
    onPageChange: (page: number, searchTerm?: string) => void;
    onBookmarkChange?: () => void;
}

const PhotoList: React.FC<PhotoListProps> = ({ isLoading, photos, photoListCurrentPage, searchTotal, searchTerm, onPageChange, onBookmarkChange }) => {
    const [currentPage, setCurrentPage] = useState(photoListCurrentPage);

    // NOTE(hajae): 로그인 기능이 따로 구현이 되어있지 않기 때문에 로컬스토리지에 북마크를 저장/관리
    const [bookmarks, setBookmarks] = useLocalStorage<PhotoForList[]>('bookmarks', []);

    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchPhotoById = async (photoId: string) => {
        try {
            const response = await fetch(`/api/photos/${photoId}`);
            const data: PhotoResponse = await response.json();
            setSelectedPhoto(data.photos);
        } catch (error) {
            console.error('Error fetching Unsplash data:', error);
        }
    };
    const handleImageClick = (photo: PhotoForList) => {
        setIsModalOpen(true);
        fetchPhotoById(photo.id);
    };

    const isBookmarked = (photoId: string): boolean => {
        return bookmarks.some((bookmark) => bookmark.id === photoId)
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPhoto(null);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page, searchTerm);
    };

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

    // NOTE(hajae): 사진이 로딩, 유무에 따른 표시
    const renderPhotos = () => {
        if (isLoading) {
            return (
                <LoadingSpinner />
            );
        } else if (photos.length === 0) {
            return (
                <div className={styles.PhotoNotFound}>
                    Photos Not Found! 😇
                </div>
            )
        } else {
            return photos.map((photo: PhotoForList) => (
                <div className={styles.PhotoImageContainer} key={photo.id}>
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
            ));
        }
    };

    return (
        <div>
            <div className={styles.PhotoBoxes}>
                {renderPhotos()}
            </div>
            {!isLoading && photos.length !== 0 && <div>
                <Pagination currentPage={currentPage} totalItems={searchTotal} onPageChange={handlePageChange} />
            </div>}
            {isModalOpen && selectedPhoto && (
                <Modal onClose={closeModal} photoInfo={selectedPhoto} onBookmarkClick={handleBookmarkClick} />
            )}
        </div>
    )
}

export default PhotoList;