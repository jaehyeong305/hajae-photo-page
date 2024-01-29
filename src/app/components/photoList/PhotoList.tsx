import { PhotoForList } from '@/types/unsplash';
import styles from './photoList.module.css'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Pagination from '../pagination/Pagination';
import { useState } from 'react';
import PhotoItem from '../photoItem/PhotoItem';

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page, searchTerm);
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
                <PhotoItem
                    key={photo.id}
                    photo={photo}
                    onBookmarkChange={onBookmarkChange} />
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
        </div>
    )
}

export default PhotoList;