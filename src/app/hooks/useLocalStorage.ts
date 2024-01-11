import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
    // NOTE(hajae): 서버 환경에서는 localStorage를 사용하지 않도록 체크
    const isBrowser = typeof window !== 'undefined';

    // NOTE(hajae): 브라우저에서만 localStorage 사용
    const storedValue = isBrowser ? localStorage.getItem(key) : null;
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;
    const [value, setValue] = useState<T>(initial);

    const setStoredValue = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setStoredValue] as const;
};

export default useLocalStorage;