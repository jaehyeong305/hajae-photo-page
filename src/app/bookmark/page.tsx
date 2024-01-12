'use client'

import styles from "./page.module.css";
import useLocalStorage from "../hooks/useLocalStorage";
import { PhotoForList } from "@/types/unsplash";
import PhotoList from "../components/photoList/PhotoList";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";

const Bookmark: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookmarkedPhotos, setBookmarkedPhotos] = useLocalStorage<PhotoForList[]>('bookmarks', []);
    const [photoList, setPhotoList] = useState<PhotoForList[]>([]);
    
    useEffect(() => {
        sliceBookmarkedPhotos(currentPage);
        setIsLoading(false)
    }, []);

    const sliceBookmarkedPhotos = (page: number) => {
        const ITEMS_PER_PAGE = 20;
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const slicedPhotos = bookmarkedPhotos.slice(startIndex, endIndex);

        setPhotoList(slicedPhotos);
    }

    const pageChangeHandle = (page: number) => {
        setCurrentPage(page);
        sliceBookmarkedPhotos(page);
    }

    return (
        <div className={styles.BookmarkWrapper}>
            <Header />
            <div className={styles.BookmarkTitle}>
                북마크한 사진들 😀
            </div>
            <PhotoList 
                isLoading={isLoading}
                photos={photoList}
                photoListCurrentPage={currentPage}
                searchTotal={bookmarkedPhotos.length}
                searchTerm={''}
                onPageChange={pageChangeHandle}/>
        </div>
    )
}

export default Bookmark;