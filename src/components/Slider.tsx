"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../app/globals.css";

// import required modules
import { Pagination } from "swiper/modules";
import React from "react";
import Image from "next/image";
import { City } from "lib/cities";
import { getYouTubeVideoId } from "lib/getYouTubeVideoId";
import { SingleProject } from "lib/SingleProjectAPI";

export function ImageSlider({
  slidesPerView,
  spaceBetween,
  pagination,
  className,
  data,
}: {
  slidesPerView: number;
  spaceBetween: number;
  pagination: boolean;
  className?: string;
  data: any[];
}) {
  return (
    <>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={pagination}
        modules={[Pagination]}
        className={`${className}`}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        speed={1000}
        navigation={true}
        style={{
          padding: "10px",
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="relative w-full  aspect-[2/3]">
            <Image
              src={item.image}
              alt={item.image}
              fill
              className="object-cover rounded-lg md:rounded-xl lg:rounded-2xl 2xl:rounded-3xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export function VideoSlider({
  slidesPerView,
  spaceBetween,
  pagination,
  className,
  data,
}: {
  slidesPerView: number;
  spaceBetween: number;
  pagination: boolean;
  className?: string;
  data: City["videos"];
}) {
  return (
    <>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={pagination}
        modules={[Pagination]}
        className={`${className}`}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1000}
        navigation={true}
        style={{
          padding: "10px",
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="relative w-full aspect-[2/3]">
            <iframe
              className="w-full h-full rounded-lg md:rounded-xl lg:rounded-2xl 2xl:rounded-3xl"
              src={
                `https://www.youtube.com/embed/` +
                getYouTubeVideoId(item.video_url)
              }
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
