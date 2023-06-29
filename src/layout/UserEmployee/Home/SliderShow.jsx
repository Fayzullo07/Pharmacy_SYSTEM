import React, { useEffect, useState } from "react";
import "./SliderShow.css";
import { slide1, slider, slider1 } from "../../../assets";

const SliderShow = () => {
  let slides1 = [
    {
      id: 1,
      img: slider,
    },
    {
      id: 2,
      img: slider1,
    },
    {
      id: 3,
      img: slider,
    },
    {
      id: 4,
      img: slider1,
    },
    {
      id: 5,
      img: slider,
    },
    {
      id: 6,
      img: slider1,
    },
  ];
  const [slideIndex, setSlideIndex] = useState(1);

  // Next/previous controls

  const plusSlides = (n) => {
    if (slideIndex >= slides1.length) {
      setSlideIndex(1);
    } else {
      setSlideIndex(slideIndex + n);
    }
  };

  const minusSlides = (n) => {
    if (slideIndex == 1) {
      setSlideIndex(slides1.length);
    } else {
      setSlideIndex(slideIndex - n);
    }
  };

  // Thumbnail image controls
  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  // Automatic slide change
  useEffect(() => {
    const timer = setInterval(() => {
      plusSlides(1);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [slideIndex]);

  return (
    <div className="container">
      {/* <!-- Full-width images with number text --> */}
      {slides1.map((item, index) => (
        <div
          key={item.id}
          className={`mySlides ${slideIndex == index + 1 ? "active" : ""}`}
          style={
            index + 1 == slideIndex ? { display: "block" } : { display: "none" }
          }
        >
          <div className="numbertext">
            {index + 1} / {slides1.length}
          </div>
          <img src={item.img} style={{ width: "100%" }} />
        </div>
      ))}

      {/* <!-- Next and previous buttons --> */}
      <a className="prev" onClick={() => minusSlides(1)}>
        &#10094;
      </a>
      <a className="next" onClick={() => plusSlides(1)}>
        &#10095;
      </a>

      {/* <!-- Thumbnail images --> */}
      <div className="row">
        {slides1.map((item, index) => (
          <div key={item.id + index} className="column">
            <img
              className={`demo cursor ${
                index == slideIndex - 1 ? "active" : ""
              }`}
              src={item.img}
              style={{ width: "100%" }}
              onClick={() => currentSlide(index + 1)}
              alt={`The Woods ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderShow;
