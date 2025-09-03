"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation"; // Next 13+ App Router
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import { SingleProject } from "../../lib/SingleProjectAPI";
import "swiper/css";
import { useTranslations } from "next-intl";
import "./style.css";
import { Link } from "@/i18n/navigation";
import NoItemsFound from "./NoItemsFound";

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

interface ReusableSectionProps {
  unitsPerSlide?: number;

  project: SingleProject;
}

const UnitOfProject = ({
  project,
  unitsPerSlide = 6,
}: ReusableSectionProps) => {
  const router = useRouter();
  const t = useTranslations("units");

  // ✅ تقسيم الوحدات حسب العدد المطلوب لكل شريحة
  const unitSlides = chunkArray(project.units, unitsPerSlide);
  const swiperRef = useRef<SwiperCore | null>(null);
  return (
    <section className=" bg-white">
      {unitSlides.length == 0 && (
        <NoItemsFound title={t("noUnits")} className="w-[50%]" />
      )}
      {unitSlides.length > 0 && (
        <Swiper
          autoplay={{
            reverseDirection: false,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="mySwiper"
        >
          {unitSlides.map((unitsChunk, index) => (
            <SwiperSlide key={index}>
              <div className="grid-slider flex flex-row gap-4">
                {unitsChunk.map((unit) => {
                  return (
                    <div
                      key={unit.id}
                      className="flex flex-col gap-1 w-[500px] cursor-pointer"
                      onClick={() => {
                        router.push(`/unit/${unit.id}`);
                      }}
                    >
                      <div className="relative w-full aspect-[385/391] rounded-xl overflow-hidden">
                        <Image
                          src={unit.image_url}
                          alt={unit.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute rounded-2xl bottom-0 right-0 left-0 bg-black/40  z-10 flex flex-col justify-start p-3 m-2 sm:m-2 text-white">
                          <div className="flex flex-row-reverse justify-between text-[12px]  xl:text-[20px] 2xl:text-[22px]">
                            <p>{unit.title}</p>
                            <div className="bg-[#E37C35] rounded-2xl px-2 py-1 text-[10px]  md:text-[12px] lg:text-[14px] 2xl:text-[16px] ">
                              {t("unitNumber")} {unit.id}
                            </div>
                          </div>

                          <div className="flex items-center rounded-2xl border-1 border-white w-fit px-2 py-1 gap-1 mt-1 self-end text-[9px] sm:text-xs lg:text-[14px] xl:text-[16px]">
                            <p>{project?.city}</p>
                            <FaLocationDot className="text-white text-sm" />
                          </div>
                        </div>
                      </div>

                      <Link
                        className={`w-full flex justify-center gap-1 items-center text-white rounded-4xl py-3 2xl:py-6 ${
                          unit.sold ? "bg-[#C3C3C3]" : "bg-[#383191]"
                        }`}
                        href={`https://wa.me/966555555555`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-[12px] sm:text-[14px] lg:text-[18px] 2xl:text-[20px]">
                          {t("whatsappContact")}
                        </p>
                        <IoLogoWhatsapp className="text-[18px]  lg:text-[22px] 2xl:text-[30px]" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </SwiperSlide>
          ))}
          <div className="flex items-center gap-2 justify-center md:justify-center  mt-4">
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="rounded-full bg-[#E37C35] p-1 text-white text-[16px] flex justify-center items-center sm:text-[20px] lg:w-10 lg:h-10  2xl:text-[28px] 2xl:w-12 2xl:h-12 2xl:p-2  transition-all hover:bg-white hover:text-[#E37c35] duration-300"
            >
              {" "}
              <FiArrowLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="rounded-full bg-[#E37C35] p-1 text-white text-[16px] flex justify-center items-center sm:text-[20px] lg:w-10 lg:h-10  2xl:text-[28px] 2xl:w-12 2xl:h-12 2xl:p-2  transition-all hover:bg-white hover:text-[#E37c35] duration-300"
            >
              <FiArrowRight />
            </button>
          </div>
        </Swiper>
      )}
    </section>
  );
};

export default UnitOfProject;
