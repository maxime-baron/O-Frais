"use client"
import { useRef, useState} from 'react';

const HorizontalScroll = ({ children }) => {
    const ourRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const mouseCoords = useRef({
        startX: 0,
        scrollLeft: 0,
    });

    const handleDragStart = (e) => {
        if (!ourRef.current) return
      const slider = ourRef.current.children[0];
        const startX = e.pageX - slider.offsetLeft;
        const scrollLeft = slider.scrollLeft;
        mouseCoords.current = { startX, scrollLeft }
        setIsMouseDown(true)
        document.body.style.cursor = "grabbing"
    }

    const handleDragEnd = () => {
        setIsMouseDown(false)
        if (!ourRef.current) return
        document.body.style.cursor = "default"
    }

    const handleDrag = (e) => {
        if (!isMouseDown || ! ourRef.current) return;
        e.preventDefault();
        const slider = ourRef.current.children[0];
        const x = e.pageX - slider.offsetLeft;
        const walkX = (x - mouseCoords.current.startX) * 1.5;
        slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    }

    return (
        <div 
            ref={ourRef} 
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseMove={handleDrag}
        >
            <div className=" py-3 flex gap-1.5 scrollbar-hide overflow-scroll lg:overflow-hidden ">
                {children}
            </div>
        </div>
    );
};

export default HorizontalScroll;
