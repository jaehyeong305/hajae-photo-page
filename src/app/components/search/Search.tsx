'use client'

import { useState } from "react";
import Image from "next/image";
import styles from "./search.module.css";
import { PhotoForList } from "@/types/unsplash";
import searchBoxBackground from "/public/images/search_box_background.jpg";
import searchIcon from "/public/images/search_icon.svg";
import PhotoList from "../photoList/PhotoList";

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

    // NOTE(hajae): return키/Enter키로 검색하기 위해
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            searchTerm ? onSearch(searchTerm) : onSearch('');
            setCurrentPage(1);
        }
    };

    const handleSearch = () => {
        onSearch(searchTerm);
        setCurrentPage(1);
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
            <PhotoList 
                isLoading={isLoading}
                photos={photos}
                photoListCurrentPage={currentPage}
                searchTotal={searchTotal}
                searchTerm={searchTerm}
                onPageChange={onPageChange}/>
        </div>
    )
}

export default Search;