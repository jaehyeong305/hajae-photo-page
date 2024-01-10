import { UnsplashPhoto } from "./unsplash";

type SearchPhotos = {
    photos: {
        results: UnsplashPhoto[];
        total: number;
        totalPages: number;
    }
}

export type { SearchPhotos };