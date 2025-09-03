"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation"; // Next 13+ App Router
import Image from "next/image";
import { CiCalendarDate } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { getProjects, ProjectUnit } from "../../lib/ProjectAPI";
import { useEffect, useState } from "react";

import { getSiteData, SiteData } from "../../lib/SiteDataAPI";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

import "swiper/css";
import "./style.css";
import slugify from "slugify";

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

interface ReusableSectionProps {
  activeFilter?: number;
  filtercity?: string;
  unitsPerSlide?: number;
  units: {
    id: number;
    title: string;
    date: string;
    location: string;
    sold: boolean;
    img: string;
    link: string;
  }[];
  activeSearch?: string;
  prevProjects?: boolean;
  limit?: number;
}

const NewProject = ({
  activeFilter,
  filtercity,
  activeSearch,
  unitsPerSlide = 6,
  prevProjects = false,
  limit = 12,
}: ReusableSectionProps) => {
  const [units, setUnits] = useState<ProjectUnit[]>([]);
  const [activeSiteData, setActiveSiteData] = useState<SiteData | null>(null);
  const t = useTranslations();
  const locale = useLocale();
  useEffect(() => {
    getProjects(
      filtercity,
      activeFilter,
      activeSearch,
      prevProjects,
      limit,
      locale
    ).then(setUnits);
    getSiteData(locale).then(setActiveSiteData);
  }, [activeFilter, filtercity, activeSearch, prevProjects, limit, locale]);

  const unitSlides = chunkArray(units, unitsPerSlide);
  const swiperRef = useRef<SwiperCore | null>(null);
  return (
    <section className=" bg-white">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mySwiper"
      >
        {unitSlides.map((unitsChunk, index) => (
          <SwiperSlide key={index}>
            <div className="grid-slider grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {unitsChunk.map((unit, index) => {
                const isSold = unit.sold;

                return (
                  <div
                    key={unit.id}
                    className="flex flex-col gap-1 cursor-pointer"
                  >
                    <Link
                      href={`/${unit.link}/${slugify(unit.title, {
                        lower: true,
                        strict: true,
                      })}?id=${unit.id}`}
                    >
                      <div className="relative w-full aspect-[385/391] rounded-xl overflow-hidden">
                        <Image
                          src={unit.img}
                          alt={unit.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute rounded-2xl bottom-0 right-0 left-0 bg-black/40 backdrop-blur-sm  z-10 flex flex-col gap-4 justify-start p-3 m-2 sm:m-2 text-white">
                          <div className="flex flex-row justify-between text-[12px]  xl:text-[20px] 2xl:text-[22px]">
                            <p>{unit.title}</p>
                            <div className="bg-[#E37C35] rounded-2xl px-2 py-1 text-[10px]  md:text-[12px] lg:text-[14px] 2xl:text-[16px] ">
                              {index + 1}
                            </div>
                          </div>
                          {/* <div className="flex items-center rounded-2xl border-1 border-white w-fit px-2 py-1 gap-1 mt-1 self-end text-[9px] sm:text-xs lg:text-[14px] xl:text-[16px]">
                            <p>{unit.date}</p>
                            <CiCalendarDate className="text-white text-sm" />
                          </div> */}
                          <div className="flex items-center rounded-2xl border-1 border-white w-fit px-2 py-1 gap-1 mt-1 self-end text-[9px] sm:text-xs lg:text-[14px] xl:text-[16px]">
                            <p>{unit.city}</p>
                            <FaLocationDot className="text-white text-sm" />
                          </div>
                        </div>
                      </div>
                    </Link>
                    {activeSiteData &&
                      activeSiteData.whatsapp_number &&
                      activeSiteData.whatsapp_number.length > 0 && (
                        <Link
                          href={
                            `https://wa.me/` +
                            activeSiteData.whatsapp_number +
                            "?text= " +
                            t("common.realEstateDevelopment") +
                            " - " +
                            unit.title +
                            " | " +
                            ` #${unit.id} - ` +
                            window.location.origin
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer"
                        >
                          <button
                            className={`cursor-pointer w-full flex justify-center gap-1 items-center text-white rounded-4xl py-3 2xl:py-6 ${
                              isSold ? "bg-[#C3C3C3]" : "bg-[#383191]"
                            }`}
                            disabled={isSold}
                          >
                            <p className="text-[12px] sm:text-[14px] lg:text-[18px] 2xl:text-[20px]">
                              {t("common.whatsappContact")}
                            </p>
                            <IoLogoWhatsapp className="text-[18px]  lg:text-[22px] 2xl:text-[30px]" />
                          </button>
                        </Link>
                      )}
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        ))}
        <div className="flex items-center gap-2 justify-center md:justify-end  mt-4">
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
    </section>
  );
};

export default NewProject;
