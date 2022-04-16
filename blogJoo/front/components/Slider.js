import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";

import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const MyCarousel = styled(Carousel)`
  .carousel carousel-slider {
    z-index: 0;
  }
`;

const myLink = styled(Link)`
  height: 100%;
`;

const Slider = props => {
  // const { mainPosts } = useSelector(state => state.post);
  const { images } = props;
  //console.log("images ", images);

  return (
    <>
      <div className="slider-form">
        <MyCarousel showThumbs={false} emulateTouch>
          {images.map((data, index) => (
            <Link key={data.id} href={`/post/${data.id}`}>
              <a>
                <div>
                  <img className="slider-img" src={data.src} alt="" />
                </div>
              </a>
            </Link>
          ))}
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

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
};

export default Slider;
