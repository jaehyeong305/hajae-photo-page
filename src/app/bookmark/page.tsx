'use client'

import styles from "./page.module.css";
import Image from "next/image";
import Header from "../components/header/Header";
import useLocalStorage from "../hooks/useLocalStorage";
import { BookmarkedPhoto } from "@/types/unsplash";

const Bookmark: React.FC = () => {
    const [bookmarkedPhotos, setBookmarkedPhotos] = useLocalStorage<BookmarkedPhoto[]>('bookmarks', []);

    return (
        <div className={styles.BookmarkWrapper}>
            <Header />
            {bookmarkedPhotos.map((photo, index) => (
                <Image
                    className={styles.PhotoImage}
                    src={photo.url}
                    alt='kari'
                    width={300}
                    height={300}
                />
            ))}
        </div>
    )
}

export default Bookmark;