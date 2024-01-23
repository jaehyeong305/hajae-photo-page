import { SearchPhotos } from "@/types/search";
import { PhotoListResponse, PhotoResponse } from "@/types/unsplash";

export const fetchUnsplashPhotoListBy = async (page: number): Promise<PhotoListResponse> => {
    const response = await fetch(`/api/unsplash/${page}`);
    return await response.json();
};

export const fetchUnsplashPhotoBy = async (photoId: string): Promise<PhotoResponse> => {
    const response = await fetch(`/api/photos/${photoId}`);
    return await response.json();
};

export const searchUnsplashPhotoList = async (searchTerm: string): Promise<SearchPhotos> => {
    const response = await fetch(`/api/search/${searchTerm}`);
    return await response.json();
};

export const searchUnsplashPhotoListBy = async (searchTerm: string, page: number): Promise<SearchPhotos> => {
    const response = await fetch(`/api/search/${searchTerm}/${page}`);
    return await response.json();
};