type UnsplashPhoto = {
    id: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    description: string;
    alt_description: string;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
    };
}

type UnsplashApiResponse = {
    photos: UnsplashPhoto[];
}

export type { UnsplashApiResponse, UnsplashPhoto };