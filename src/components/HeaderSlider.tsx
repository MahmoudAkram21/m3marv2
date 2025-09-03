"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import Image from "next/image";

export default function HeaderSlider({
  slides,
  title,
}: {
  slides: any[];
  title: string;
}) {
  console.log("slides", slides);
  return (
    <>
      <div className="w-full h-[70vh] relative">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          loop={true}
          modules={[Pagination]}
          className="mySwiper "
        >
          {slides.map((slide) => (
            <>
              <SwiperSlide key={slide.id} className="relative">
                <Image
                  src={slide.image}
                  alt="header slider"
                  fill
                  className="object-cover"
                />
                <h1>{title}</h1>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </>
  );
}
