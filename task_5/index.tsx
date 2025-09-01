'use client';

import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import styles from './page.module.css';
import { fetchOnePost, Post } from '@/libs/fetchOnePost';

/**
 * ComponentOne - fetches data immediately
 */
const ComponentOne = () => {
  const { data } = useSWR<Post>('custom_key_1', fetchOnePost);

  // Prefetch data for ComponentTwo if needed
  useEffect(() => {
    if (data) {
      // Prefetch ComponentTwo data in SWR cache
      mutate('custom_key_2', fetchOnePost({ delayMS: 2000 }));
    }
  }, [data]);

  return data ? (
    <div className={styles.card}>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <span>ComponentOne</span>
    </div>
  ) : (
    <div>...Loading ComponentOne</div>
  );
};

/**
 * ComponentTwo - shows immediately if data is cached
 */
const ComponentTwo = () => {
  const { data } = useSWR<Post>('custom_key_2', () => fetchOnePost({ delayMS: 2000 }));

  return data ? (
    <div className={styles.card}>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <span>ComponentTwo</span>
    </div>
  ) : (
    <div>...Loading ComponentTwo</div>
  );
};

/**
 * Home page - toggles showing ComponentTwo
 */
export default function Home() {
  const [showComponentTwo, setShowComponentTwo] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <ComponentOne />
        {showComponentTwo ? (
          <ComponentTwo />
        ) : (
          <button className={styles.btn} onClick={() => setShowComponentTwo(true)}>
            Show ComponentTwo
          </button>
        )}
      </div>
    </main>
  );
}
