"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation"; // Next 13+ App Router

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
import { useEffect, useState } from "react";
import { getSlidesData, SlidesData } from "../../lib/SlidesDataAPI";
import { useLocale, useTranslations } from "next-intl";
import { getCities, City } from "../../lib/cities";
import { Link } from "@/i18n/navigation";

const ReelsSlider = () => {
  const locale = useLocale();
  const swiperRef = useRef<SwiperCore | null>(null);
  const router = useRouter();

  const [slidesData, setSlidesData] = useState<City[]>([]);
  useEffect(() => {
    getCities(locale).then(setSlidesData);
  }, [locale]);

  const t = useTranslations();

  return (
    <div>
      <div className="flex flex-row gap-3  p-4">
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-8 h-8 md:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12  flex items-center justify-center rounded-full bg-[#E37C35] text-white hover:bg-white hover:text-[#E37C35]"
        >
          <FiArrowRight className="text-[14px]  lg:text-[20px] 2xl:text-[28px]" />
        </button>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-8 h-8  xl:w-10 xl:h-10 2xl:w-12 2xl:h-12  flex items-center justify-center rounded-full bg-[#E37C35] text-white hover:bg-white hover:text-[#E37C35]"
        >
          <FiArrowLeft className="text-[14px]   lg:text-[20px] 2xl:text-[28px]" />
        </button>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 10 },
          550: { slidesPerView: 4, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1100: { slidesPerView: 5, spaceBetween: 10 },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mySwiper px-18"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full aspect-[2/3] rounded-lg md:rounded-xl lg:rounded-2xl 2xl:rounded-3xl overflow-hidden"
              onClick={() => {
                router.push(`/city/${slide.id}/`);
              }}
            >
              <div className="absolute rounded-4xl text-[9px] p-1 right-1 md:text-[14px] lg:[16px] 2xl:text-[20px] bg-white top-1 sm:right-3 sm:top-3 z-10">
                {slide.projects_count > 0
                  ? slide.projects_count + " " + t("common.project")
                  : ""}
              </div>
              <Image
                src={slide.image_url}
                alt={slide.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute z-10 bottom-0 text-white flex flex-row-reverse justify-between items-center w-full p-1 ">
              <div className="flex flex-col gap-0.5 items-end p-0 sm:p-1">
                <p className="text-[8px] sm:text-[10px] md:text-[10px] lg:text-[16px]  2xl:text-[18px]">
                  {slide.name}
                </p>
                <p className="text-[6px] sm:text-[8px] md:text-[8px] lg:text-[12px] 2xl:text-[16px]">
                  {slide.name}
                </p>
              </div>
              <Link
                className="w-6 h-6  lg:w-8 lg:h-8 xl:w-10 xl:h-10   2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full bg-[#E37C35] text-white hover:bg-white hover:text-[#E37C35] transition-all duration-300"
                href={`/city/${slide.id}/`}
              >
                <FiArrowRight className="text-[10px] sm:text-[10px] md:text-[12px] lg:text-[18px] 2xl:text-[28px] rotate-330" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReelsSlider;
