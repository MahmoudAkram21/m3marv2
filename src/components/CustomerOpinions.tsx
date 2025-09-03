"use client";
import React, { useRef, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

import { FaPlay } from "react-icons/fa6";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SwiperCore from "swiper";
import { getTestimonials, TestimonialData } from "../../lib/TestimonialsAPI";
import { getSiteData, SiteData } from "../../lib/SiteDataAPI";
import { IoCloseCircleOutline } from "react-icons/io5";
import TestimonialCard from "./TestimonialCard";
import SectionHeader from "./SectionHeader";
type CustomerOpinionsProps = {
  limit: number;
  homePage: boolean;
};

const CustomerOpinions = ({ limit, homePage }: CustomerOpinionsProps) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const locale = useLocale();
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [activeSiteData, setActiveSiteData] = useState<SiteData | null>(null);
  const t = useTranslations();

  useEffect(() => {
    getTestimonials(limit, locale).then(setTestimonials);
    getSiteData(locale).then(setActiveSiteData);
  }, [limit, locale]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#EBEAF466] mt-10  px-4 py-8 sm:px-8 md:px-10 lg:px-25 ">
      <SectionHeader
        title={activeSiteData?.testimonials_section_title || ""}
        description={activeSiteData?.testimonials_section_description || ""}
        link="/testimonials"
      >
        {t("common.viewMore")}
      </SectionHeader>

      <Swiper
        slidesPerView={2}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          550: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
        }}
        loop={true}
        autoplay={{
          disableOnInteraction: true,
        }}
        spaceBetween={10}
        pagination={{ clickable: true }}
        className="mySwiper"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {testimonials &&
          testimonials.map((slide, index) => (
            <SwiperSlide
              key={index}
              onClick={() => setSelectedVideo(slide.video)}
              className="cursor-pointer"
            >
              {/* <TestimonialCard data={slide} /> */}
              <div className="relative w-full aspect-[405/420]  overflow-hidden rounded-2xl cursor-pointer">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute top-2 left-2 p-1 sm:p-3 bg-white/20 rounded-full z-11 cursor-pointer">
                <div className="rounded-full text-center p-0.5 text-[16px]  2xl:text-[20px] sm:p-1 2xl:p-4  bg-white/70">
                  <FaPlay className="text-[#E37C35]" />
                </div>
              </div>

              <div className="flex flex-col items-end justify-end gap-[4px] p-3 rounded-2xl absolute bg-black/40 inset-0 z-10 text-end">
                <p className="text-[8px] sm:text-[11px] md:text-[14px] xl:text-[22px]  text-white font-600">
                  {slide.title}
                </p>
                <p className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[16px] 2xl:text-[20px] text-white font-light">
                  {slide.date}
                </p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-80">
          <div
            className="bg-black/20 rounded-2xl p-4 absolute top-0 left-0 w-full h-full"
            onClick={() => setSelectedVideo("")}
          ></div>
          <div className="relative w-full max-w-4xl px-4">
            <div
              className="absolute z-40 -top-5 right-0 bg-[#E37C35] p-2 rounded-full text-white text-3xl cursor-pointer flex justify-center items-center"
              onClick={() => setSelectedVideo("")}
            >
              <IoCloseCircleOutline />
            </div>
            <div className="aspect-video w-full">
              <video className="w-full h-full rounded-2xl" controls>
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row gap-3 mt-4 self-center md:self-end ">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="rounded-full bg-[#E37C35] p-1 text-white text-[16px] flex justify-center items-center sm:text-[20px] lg:w-10 lg:h-10  2xl:text-[28px] 2xl:w-12 2xl:h-12 2xl:p-2  transition-all hover:bg-white hover:text-[#E37c35] duration-300"
        >
          {" "}
          <FiArrowRight />
        </button>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="rounded-full bg-[#E37C35] p-1 text-white text-[16px] flex justify-center items-center sm:text-[20px] lg:w-10 lg:h-10  2xl:text-[28px] 2xl:w-12 2xl:h-12 2xl:p-2  transition-all hover:bg-white hover:text-[#E37c35] duration-300"
        >
          <FiArrowLeft />
        </button>
      </div>
    </div>
  );
};

export default CustomerOpinions;
