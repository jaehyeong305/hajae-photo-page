import Image from "next/image";
import styles from "./search.module.css";
import { UnsplashPhoto } from "@/types/unsplash";

type SearchProps = {
    photos: UnsplashPhoto[]
}

const Search: React.FC<SearchProps> = ({ photos }) => {
    if (!photos || photos.length === 0) {
        return (
            <div className={styles.Loading}>
                <div className={styles.LoadingSpinner}></div>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className={styles.SearchWrapper}>
            <div className={styles.PhotoBoxes}>
                {photos.map((photo: UnsplashPhoto) => (
                    <div className={styles.PhotoImageContainer} key={photo.id}>
                        <Image
                            className={styles.PhotoImage}
                            src={photo.urls.small}
                            alt={photo.alt_description}
                            width={300}
                            height={300} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search;