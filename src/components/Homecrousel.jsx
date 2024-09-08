import React, { useState, useEffect, useRef } from 'react';
import './Homecrousel.css';

function Homecrousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 3;
  const intervalRef = useRef(null);

  const updateSlider = (index) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    updateSlider(currentIndex + 1);
  };

  const prevSlide = () => {
    updateSlider(currentIndex - 1);
  };

  // Auto-slide functionality
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(intervalRef.current); // Clean up on unmount
  }, [currentIndex]);

  // Mobile touch support
  const startXRef = useRef(0);

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startXRef.current - endX > 50) {
      nextSlide(); // Swipe left
    } else if (endX - startXRef.current > 50) {
      prevSlide(); // Swipe right
    }
  };

  return (
    <div id='Homecrousel'>
      <div
        className="banner"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          <div className="slider-slide">
            <img src="/image/ambu.jpg" alt="Banner 1" />
          </div>
          <div className="slider-slide">
            <img src="/image/bed.png" alt="Banner 2" />
          </div>
          <div className="slider-slide">
            <img src="/image/blood2.jpg" alt="Banner 3" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button className="slider-btn bannerprev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="slider-btn bannernext" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default Homecrousel;
