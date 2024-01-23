'use client'

import styles from './page.module.css'
import Header from './components/header/Header'
import Search from './components/search/Search'
import { useEffect, useState } from 'react';
import { PhotoForList, PhotoListResponse } from '@/types/unsplash';
import { SearchPhotos } from '@/types/search';
import { fetchUnsplashPhotoListBy, searchUnsplashPhotoList, searchUnsplashPhotoListBy } from './services/photo.service';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearched, setIsSearched] = useState(false);
  const [photos, setPhotos] = useState<PhotoForList[]>([]);
  const [searchTotal, setSearchTotal] = useState<number>(20000);

  const fetchPhotoList = (page: number) => {
    setIsLoading(true);
    fetchUnsplashPhotoListBy(page)
      .then((res: PhotoListResponse) => { setPhotos(res.photos); })
      .finally(() => { setIsLoading(false); });
  }

  const searchPhotoList = (searchTerm: string, page?: number) => {
    setIsLoading(true);
    if (page) {
      searchUnsplashPhotoListBy(searchTerm, page)
        .then((res: SearchPhotos) => { setPhotos(res.photos.results); })
        .finally(() => { setIsLoading(false); });
    } else {
      setIsSearched(true);
      searchUnsplashPhotoList(searchTerm)
        .then((res: SearchPhotos) => {
          setPhotos(res.photos.results);
          setSearchTotal(res.photos.total);
        })
        .finally(() => { setIsLoading(false); });
    }
  }

  useEffect(() => {
    fetchPhotoList(1);
  }, []);

  const handlePageChange = (page: number, searchTerm?: string) => {
    if (isSearched && searchTerm) {
      searchPhotoList(searchTerm, page);
    } else {
      fetchPhotoList(page);
    }
  }

  const handleSearch = (searchTerm?: string) => {
    // NOTE(hajae): 빈값으로 검색 -> 기본 fetch api를 request
    if (!searchTerm) {
      fetchPhotoList(1);
      setSearchTotal(20000);
      return;
    }

    searchPhotoList(searchTerm);
  };

  return (
    <main className={styles.main}>
      <Header />
      <Search isLoading={isLoading} photos={photos} searchTotal={searchTotal} onSearch={handleSearch} onPageChange={handlePageChange} />
    </main>
  )
}

export default Home;