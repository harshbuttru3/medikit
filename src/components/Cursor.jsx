import React, { useEffect, useRef } from 'react';
import './Cursor.css'; // Include your CSS styles for the cursor

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.left = `${e.clientX + 20}px`;
        cursor.style.top = `${e.clientY + 20}px`;
      }
    };

    const handleMouseEnter = (e) => {
      const cursor = cursorRef.current;
      const imgSrc = e.currentTarget.getAttribute('data-image');
      if (cursor) {
        cursor.style.width = '300px';
        cursor.style.height = '270px';
        cursor.style.borderRadius = '10px';
        cursor.style.backgroundSize = 'cover';
        cursor.style.backgroundImage = `url(${imgSrc})`;
      }
    };

    const handleMouseLeave = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderRadius = '50%';
        cursor.style.backgroundImage = 'none';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
      box.addEventListener('mouseenter', handleMouseEnter);
      box.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      boxes.forEach((box) => {
        box.removeEventListener('mouseenter', handleMouseEnter);
        box.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div className="cursor" ref={cursorRef}></div>;
};

export default Cursor;
