import React, { useEffect, useState } from "react";
import "./SliderShow.css";

const SliderShow = () => {
  let slides1 = [
    {
      id: 1,
      img:
        "https://firebasestorage.googleapis.com/v0/b/imageuploadapp-a9f2e.appspot.com/o/DDDD.png?alt=media&token=3ccb92d8-5d0d-4b1b-aabc-28532311ceb2"
    },
    {
      id: 2,
      img:
        "https://firebasestorage.googleapis.com/v0/b/imageuploadapp-a9f2e.appspot.com/o/1547222145572%20(1).jpg?alt=media&token=4336f9b5-8a92-4982-9f96-5dbe059b6cc4"
    },
    {
      id: 3,
      img:
        "https://firebasestorage.googleapis.com/v0/b/imageuploadapp-a9f2e.appspot.com/o/What-is-a-Project-Report-and-How-to-Create-one.jpg.optimal.jpg?alt=media&token=724c6a44-7aaa-4ce2-a7ad-8381a7f0481b"
    },
    {
      id: 4,
      img:
        "https://firebasestorage.googleapis.com/v0/b/imageuploadapp-a9f2e.appspot.com/o/e_hisobot_main.png?alt=media&token=de1af6ca-fca4-45bc-9de7-d88050dadbfa"
    },

  ];
  const [slideIndex, setSlideIndex] = useState(1);

  // Next/previous controls

  const plusSlides = n => {
    if (slideIndex >= slides1.length) {
      setSlideIndex(1);
    } else {
      setSlideIndex(slideIndex + n);
    }
  };

  const minusSlides = n => {
    if (slideIndex == 1) {
      setSlideIndex(slides1.length);
    } else {
      setSlideIndex(slideIndex - n);
    }
  };

  // Thumbnail image controls
  const currentSlide = n => {
    setSlideIndex(n);
  };

  // Automatic slide change
  useEffect(
    () => {
      const timer = setInterval(() => {
        plusSlides(1);
      }, 3000);

      return () => {
        clearInterval(timer);
      };
    },
    [slideIndex]
  );

  return (
    <div className="container">
      {/* <!-- Full-width images with number text --> */}
      {slides1.map((item, index) =>
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
      )}

      {/* <!-- Next and previous buttons --> */}
      <div className="prev" onClick={() => minusSlides(1)}>
        &#10094;
      </div>
      <div className="next" onClick={() => plusSlides(1)}>
        &#10095;
      </div>

    
    </div>
  );
};

export default SliderShow;
