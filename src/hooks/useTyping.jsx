import { useState, useEffect } from "react";

export function useTyping(text, speed = 100, totalTimeout = 0) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        let interval;

        const timer = setTimeout(() => {
            interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
            }
            }, speed);
        }, totalTimeout);

        return () => {
            clearTimeout(timer);
            if (interval) clearInterval(interval);
        };
    }, [text, speed, totalTimeout]);

    return displayedText;
}