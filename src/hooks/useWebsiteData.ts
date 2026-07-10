import { useState, useEffect } from 'react';
import { WebsiteData } from '../types';

export function useWebsiteData() {
  const [data, setData] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/website.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load website data');
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}