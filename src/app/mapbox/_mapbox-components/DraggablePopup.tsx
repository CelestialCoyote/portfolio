import React, { useEffect, useRef, useState, useCallback } from "react";


interface DraggablePopupProps {
    children: React.ReactNode;
    xPos: number,
    yPos: number,
}

const DraggablePopup: React.FC<DraggablePopupProps> = ({ children, xPos, yPos }) => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: xPos, y: yPos });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });


    // Only access `window` on the client side
    useEffect(() => {
        const setInitialPosition = () => {
            setPosition({ x: xPos, y: window.innerHeight - yPos });
        };

        if (typeof window !== "undefined") {
            setInitialPosition();
            window.addEventListener('resize', setInitialPosition); // Update position on window resize
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener('resize', setInitialPosition);
            }
        };
    }, [xPos, yPos]);

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStart({ x: event.clientX - position.x, y: event.clientY - position.y });
    }, [position]);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (isDragging) {
            setPosition({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y });
        }
    }, [isDragging, dragStart]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={popupRef}
            className={`bg-black rounded-lg pt-[15px] z-10 pointer-events-auto`}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)',
                boxShadow: '6px 6px 6px rgba(0, 0, 0, 0.5)',
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    );
}

export default DraggablePopup;
