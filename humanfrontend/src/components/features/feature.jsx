import React, { useEffect, useState } from "react";
import style from "./feature.module.css";

export default function Features({ features }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = features?.length;

  // Automatic slide scroll
  useEffect(() => {
    const autoScroll = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [totalSlides]);

  // Debugging current slide change
  useEffect(() => {
    console.log("Current Slide:", currentSlide);
  }, [currentSlide]);

  // Function to manually change slide
  const goToSlide = (index) => {
    console.log("Going to slide:", index);
    setCurrentSlide(index);
  };

  return (
    <div className={style.container}>
      {/* Carousel Wrapper */}
      <div className={style.fullScreenCarousel}>
        {features?.map((product, index) => (
          <div
            key={index}
            className={`${style.carouselSlide} ${
              index === currentSlide ? `${style.active}` : `${style.inactive}`
            }`}
          >
            <img
              src={product.image}
              alt='features'
              className={style.carouselImage}
            />
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className={style.carouselDots}>
        {features.map((_, index) => (
          <span
            key={index}
            className={`${style.dot} ${
              index === currentSlide ? `${style.activeDot}` : ""
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
