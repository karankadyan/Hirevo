import {useEffect, useState} from 'react';

export const useIsDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === 'undefined') {
            return false
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches
    })

    useEffect(() => {
        const controller = new AbortController()
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
                setIsDarkMode(e.matches)
            },
            {signal: controller.signal}
        )
        return () => {
            controller.abort()
        }
    }, [])
    return isDarkMode;
}