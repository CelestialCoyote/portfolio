import React, { useEffect, useRef, useState, useCallback } from "react";


interface DraggablePopupProps {
    children: React.ReactNode;
}

const DraggablePopup: React.FC<DraggablePopupProps> = ({ children }) => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Default initial position
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });


    useEffect(() => {
        const setInitialPosition = () => {
            setPosition({ x: 25, y: window.innerHeight - 500 }); // Popup appears in lower left corner.
        };

        if (typeof window !== "undefined") {
            setInitialPosition();
            window.addEventListener("resize", setInitialPosition); // Update position on window resize
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", setInitialPosition);
            }
        };
    }, []);

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStart({ x: event.clientX - position.x, y: event.clientY - position.y });
    },
        [position]
    );

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (isDragging) {
            setPosition({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y });
        }
    },
        [isDragging, dragStart]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={popupRef}
            style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: "translate(-50%, -50%)",
                cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    );
}

export default DraggablePopup;