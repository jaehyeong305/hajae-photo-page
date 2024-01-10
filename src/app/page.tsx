'use client'

import styles from './page.module.css'
import Header from './components/header/Header'
import Search from './components/search/Search'
import { useEffect, useState } from 'react';
import { UnsplashPhoto } from '@/types/unsplash';
import { SearchPhotos } from '@/types/search';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearched, setIsSearched] = useState(false);
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [searchTotal, setSearchTotal] = useState<number>(20000);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/unsplash/1');
      const data = await response.json();
      setPhotos(data.photos);
    } catch (error) {
      console.error('Error fetching Unsplash data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handlePageChange = async (page: number, searchTerm?: string) => {
    try {
      if (isSearched && searchTerm) {
        setIsLoading(true);
        const response = await fetch(`/api/search/${searchTerm}/${page}`);
        const data: SearchPhotos = await response.json();
        setPhotos(data.photos.results);
      } else {
        setIsLoading(true);
        const response = await fetch(`/api/unsplash/${page}`);
        const data: { photos: UnsplashPhoto[] } = await response.json();
        setPhotos(data.photos);
      }
    } catch (error) {
      console.error('Error fetching Unsplash data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      setIsSearched(true);
      const response = await fetch(`/api/search/${searchTerm}`);
      const data: SearchPhotos = await response.json();
      setPhotos(data.photos.results);
      setSearchTotal(data.photos.total);
    } catch (error) {
      console.error('Error fetching Unsplash data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      <Search isLoading={isLoading} photos={photos} searchTotal={searchTotal} onSearch={handleSearch} onPageChange={handlePageChange} />
    </main>
  )
}
