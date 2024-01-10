'use client'

import { useState } from "react";
import Image from "next/image";
import styles from "./search.module.css";
import { Photo, PhotoForList, PhotoResponse } from "@/types/unsplash";
import searchBoxBackground from "/public/images/search_box_background.jpg";
import searchIcon from "/public/images/search_icon.svg";
import bookmarkWhite from "/public/images/bookmark_white.svg";
import bookmarkFill from "/public/images/bookmark_fill.svg";
import Pagination from "../pagination/Pagination";
import Modal from "../modal/Modal";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

type SearchProps = {
    isLoading: boolean;
    photos: PhotoForList[];
    searchTotal: number;
    onSearch: (query: string) => void;
    onPageChange: (page: number, searchTerm?: string) => void;
}

const Search: React.FC<SearchProps> = ({ isLoading, photos, searchTotal, onSearch, onPageChange }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);

    // NOTE(hajae): 로그인 기능이 따로 구현이 되어있지 않기 때문에 로컬스토리지에 북마크를 저장/관리
    const [bookmarks, setBookmarks] = useState<string[]>(() => {
        const storedBookmarks = localStorage.getItem("bookmarks");
        return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    });

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

    // NOTE(hajae): return키/Enter키로 검색하기 위해
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch(searchTerm);
            setCurrentPage(1);
        }
    };

    const handleSearch = () => {
        onSearch(searchTerm);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page, searchTerm);
    };

    const handleBookmarkClick = (photoId: string) => {
        // NOTE(hajae): 이미 북마크에 있는 경우 제거, 아닌 경우 추가
        if (bookmarks.includes(photoId)) {
            const updatedBookmarks = bookmarks.filter(id => id !== photoId);
            localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
            setBookmarks(updatedBookmarks);
        } else {
            const updatedBookmarks = [...bookmarks, photoId];
            localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
            setBookmarks(updatedBookmarks);
        }
    };

    const handleImageClick = (photo: PhotoForList) => {
        fetchPhotoById(photo.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPhoto(null);
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
                        src={bookmarks.includes(photo.id) ? bookmarkFill.src : bookmarkWhite.src}
                        alt="bookmark"
                        width={30}
                        height={30}
                        onClick={() => handleBookmarkClick(photo.id)} />
                </div>
            ));
        }
    };

    return (
        <div className={styles.SearchWrapper}>
            <div className={styles.SearchBarWrapper}>
                <div className={styles.SearchBoxBackground} style={{ backgroundImage: `url(${searchBoxBackground.src})` }}></div>
                <div className={styles.SearchBar}>
                    <span className={styles.SearchBarTitle}>Will Photo</span>
                    <span className={styles.SearchBarDescription}>인터넷의 시각 자료 출처입니다.</span>
                    <span className={styles.SearchBarDescription}>모든 지역에 있는 크리에이터들의 지원을 받습니다.</span>
                    <div className={styles.SearchInputBox}>
                        <input
                            className={styles.SearchInput}
                            type="text"
                            placeholder="고해상도 이미지 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Image
                            className={styles.SearchIcon}
                            src={searchIcon.src}
                            width={30}
                            height={30}
                            alt="searchIcon"
                            onClick={handleSearch} />
                    </div>
                </div>
            </div>
            <div className={styles.PhotoBoxes}>
                {renderPhotos()}
            </div>
            {!isLoading && photos.length !== 0 && <div>
                <Pagination currentPage={currentPage} totalItems={searchTotal} onPageChange={handlePageChange} />
            </div>}
            {isModalOpen && selectedPhoto && (
                <Modal onClose={closeModal} photoInfo={selectedPhoto} />
            )}
        </div>
    )
}

export default Search;