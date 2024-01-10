import { PhotoForList } from "./unsplash";

type SearchPhotos = {
    photos: {
        results: PhotoForList[];
        total: number;
        totalPages: number;
    }
}

export type { SearchPhotos };