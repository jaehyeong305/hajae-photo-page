'use client'

import styles from './page.module.css'
import Header from './components/header/Header'
import Search from './components/search/Search'
import { useEffect, useState } from 'react';
import { UnsplashPhoto } from '@/types/unsplash';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/unsplash');
        const data = await response.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error('Error fetching Unsplash data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/search/${query}`);
      const data = await response.json();
      setPhotos(data.photos.results);
    } catch (error) {
      console.error('Error fetching Unsplash data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      <Search isLoading={isLoading} photos={photos} onSearch={handleSearch} />
    </main>
  )
}
