import {useEffect, useState} from "react";

interface UseLocalStorageProps {
    key: string;
    initialValue: number | string | boolean | null | undefined;
}


const useLocalStorage = ({key, initialValue}: UseLocalStorageProps) => {

    const [isMounted, setIsMounted] = useState(false);
    const [value, setValue] = useState<typeof initialValue>(initialValue);

    useEffect(() => {
        setIsMounted(true);
        setValue(() => {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue
        })
    }, [])

    useEffect(() => {
        if (isMounted) {
            window.localStorage.setItem(key, JSON.stringify(value))
        }

    }, [key, value])

    return {value, setValue};

}

export default useLocalStorage;