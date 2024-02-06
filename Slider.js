import React, { useState } from 'react';

const Slider = () => {
    const [slides, setSlides] = useState([
        { order: -1, text: "6" },
        { order: 0, text: "1" },
        { order: 1, text: "2" },
        { order: 2, text: "3" },
        { order: 3, text: "4" },
        { order: 4, text: "5" }
      ]);
      const [slideCount] = useState(2);
      const [sliding, setSliding] = useState(false);
      const [direction, setDirection] = useState(0);
      const delay = 500;

      const handleNext = () => {
        setSliding(true);
        setDirection(1);
        setTimeout(() => {
            setSlides((prevState) => {
                let oldSlides = [...prevState];
                let hiddenSlide = oldSlides.shift();
                let newHiddenSlide = { 
                  ...hiddenSlide, 
                  order: oldSlides[oldSlides.length - 1].order + 1 
                };
                oldSlides.push(newHiddenSlide);
                const slides = oldSlides.map(s => {
                  return { ...s, order: s.order - 1 };
                });
                setSliding(false);
                return slides;
              });
        }, delay);
    };

    const handlePrev = () => {
        setSliding(true);
        setDirection(-1);
        setTimeout(() => {
            setSlides((prevState) => {
                let slides = [...prevState];
                let lastSlide = slides.pop();
                lastSlide = { ...lastSlide, order: -1 };
                slides = slides.map(s => {
                  return { ...s, order: s.order + 1 };
                });
                slides.unshift(lastSlide);
                setSliding(false);
                return slides;
              });
        }, delay);
    };

    const slideActionStyle = sliding 
    ? direction > 0 
      ? {
          transform: "translateX(-400px)",
          transition: "transform 500ms ease-in"
        }
      : {
          transform: "translateX(0px)",
          transition: "transform 500ms ease-in"
        }
    : {};

    return (
        <div className='slider-container'>
          <div className="left-btn" onClick={()=>{!sliding && handlePrev()}}>
          &#10094;
          </div>
          <div 
            className="item-carousel"
            style={slideActionStyle}
          >
            {slides.map(({order, text}, idx) => {
              return <div key={order} className="item">{text}</div>;
            })}
          </div>
          <div className="right-btn" onClick={()=>{!sliding && handleNext()}}>
            &#10095;
          </div>
        </div>
      );

}
export default Slider;
