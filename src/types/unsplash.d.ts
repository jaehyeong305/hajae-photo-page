type BasicPhotoInfo = {
    id: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    alt_description: string;
    description: string;
    urls: Urls,
    links: Links;
    user: User;
}

type PhotoForList = BasicPhotoInfo;

type Photo = BasicPhotoInfo & {
    created_at: string;
    updated_at: string;
    downloads: number;
    public_domain: boolean;
    exif: Exif;
    location: Location;
    tags: Tag[];
    current_user_collections: CurrentUserCollection[];
}

type Urls = {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

type Links = {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

type User = {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    portfolio_url: string;
    bio: string;
    location: string;
    total_likes: number;
    total_photos: number;
    total_collections: number;
    profile_image: {
        small: string;
        medium: string;
        large: string;
    };
    links: {
        self: string;
        html: string;
        photos: string;
        likes: string;
        portfolio: string;
    };
}

type Exif = {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
}

type Location = {
    city: string;
    country: string;
    position: Position;
}

type Position = {
    latitude: number;
    longitude: number;
}

type Tag = {
    title: string;
}

type CurrentUserCollection = {
    id: number;
    title: string;
    published_at: string;
    last_collected_at: string;
    updated_at: string;
}

type PhotoListResponse = {
    photos: PhotoList[];
}

type PhotoResponse = {
    photos: Photo;
};

export type { PhotoListResponse, PhotoResponse, PhotoForList, Photo };