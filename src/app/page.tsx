'use client'

import styles from './page.module.css'
import Header from './components/header/Header'
import Search from './components/search/Search'
import { useEffect, useState } from 'react';
import { UnsplashPhoto } from '@/types/unsplash';

export default function Home() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/unsplash');
        const data = await response.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error('Error fetching Unsplash data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Search photos={photos} />
    </main>
  )
}
