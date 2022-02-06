import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const MyCarousel = styled(Carousel)`
  .carousel carousel-slider {
    z-index: 0;
  }
`;

const SliderForm = props => {
  return (
    <>
      <div className="slider-form">
        <MyCarousel showThumbs={false}>
          <div>
            <img className="slider-img" src="https://fakeimg.pl/400/" alt="" />
          </div>
          <div>
            <img className="slider-img" src="https://fakeimg.pl/400/" alt="" />
          </div>
          <div>
            <img className="slider-img" src="https://fakeimg.pl/400/" alt="" />
          </div>
        </MyCarousel>
      </div>
      <style jsx>{`
        /* SLIDER */
        .slider-form {
          width: 100%;
          height: 600px;
        }

        .slider-img {
          object-fit: cover;
          height: 600px;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .slider-form {
            /* margin-top: 74px; */
            width: 100%;
            border: none;
            height: 450px;
          }

          .slider-img {
            height: 400px;
          }
        }
      `}</style>
    </>
  );
};

SliderForm.propTypes = {};

export default SliderForm;
