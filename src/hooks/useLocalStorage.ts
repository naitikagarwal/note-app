import { useState, useEffect } from 'react';
import type { AppData } from '../types/types';

const DEFAULT_DATA: AppData = {
  pages: {},
  folders: {},
  settings: {
    sidebarCollapsed: false,
  },
};

export const useLocalStorage = () => {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);
  
  useEffect(() => {
    const savedData = localStorage.getItem('notey-data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const saveData = (newData: AppData) => {
    localStorage.setItem('notey-data', JSON.stringify(newData));
    setData(newData);
  };

  return { data, saveData };
};