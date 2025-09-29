import { useEffect } from 'react';
import { useFontSize } from './FontSizeContext';

const FontSizeHandler = () => {
    const context = useFontSize();
    const fontSize = context?.fontSize || 16;

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    return (
        <></>
    ); // This component doesn't render anything visually
};

export default FontSizeHandler;
