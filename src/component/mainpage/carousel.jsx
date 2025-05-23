import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import "./carousel.scss";

import banner1 from "../assets/images/banner3.webp";
import banner2 from "../assets/images/banner4.webp";
import banner3 from "../assets/images/banner5.webp";
import banner4 from "../assets/images/banner6.webp";

const Carousel = () => {
  return (
    <div className="carousel-container">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={banner1} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={banner2} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={banner3} alt="Third slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={banner4} alt="Third slide" />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Carousel;
