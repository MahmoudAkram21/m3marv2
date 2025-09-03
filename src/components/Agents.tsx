"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

import { FiPhone } from "react-icons/fi";
import { PiHandbag } from "react-icons/pi";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SwiperCore from "swiper";

import { getAgents, Agent } from "../../lib/AgentsAPI";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

interface ReusableSectionProps {
  unitsPerSlide?: number;
  agents?: {
    id: number;
    name: string;
    jobTitle: string;
    sales: number;
    aria: number;
    img: string;
    phone: string;
    secondPhone: string;
  }[];
  limit?: number;
}
const Agents = ({ unitsPerSlide = 6, limit }: ReusableSectionProps) => {
  const [agents, setAgents] = useState<Agent[]>([]);

  const t = useTranslations();

  useEffect(() => {
    getAgents(limit).then(setAgents);
  }, [limit]);

  const agentsSlides = chunkArray(agents, unitsPerSlide);
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-8  mb-4">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
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
        }}
        allowTouchMove={true}
        // modules={[Navigation]}
        navigation={true}
        scrollbar={false}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {agentsSlides.map((agentsChunk, index) => (
          <>
            {/* <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-1"> */}
            {agentsChunk.map((agent) => (
              <SwiperSlide key={agent.id}>
                <div
                  key={agent.id}
                  className="flex flex-col items-stretch justify-between shadow-[var(--shadow-sm)]  h-fit rounded-xl border-2 border-[#D9D9D9]  bg-[var(--main-color)]"
                >
                  <div className="relative flex flex-col justify-center items-center gap-1 ">
                    <div className="w-full relative aspect-square">
                      <Image
                        alt="avatar"
                        src={agent.img}
                        className="rounded-b-full object-cover object-top border-4 border-solid border-[var(--secondary-color)]"
                        fill
                      />
                      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-[var(--secondary-color)] rounded-2xl text-[12px] md:text-[10px] 2xl:text-[18px] text-white py-1 px-2">
                        {agent.jobTitle}
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-3 rounded-t-xl w-full p-2">
                      <p className="text-white text-[14px] 2xl:text-[24px]">
                        {agent.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-around py-2 gap-2  px-2 w-full rounded-b-xl ">
                    {agent && agent.sales && agent.sales > 0 && (
                      <div className="flex flex-row justify-center w-full gap-2 text-[var(--secondary-color)] text-[12px]">
                        <p className="text-[9px] md:text-[12px] 2xl:text-[20px] self-center">
                          {t("successfulSales")}
                        </p>
                        <div className="flex flex-row gap-1 bg-[var(--secondary-color)] text-white rounded-full px-3 py-1">
                          <p className="text-[12px] md:text-[16px] 2xl:text-[20px] font-400 ">
                            {agent.sales}+
                          </p>
                          <p className="text-[12px] md:text-[16px] 2xl:text-[20px] font-400">
                            {t("common.properties")}
                          </p>
                        </div>
                      </div>
                    )}

                    {agent && agent.sales && agent.aria > 0 && (
                      <div className="flex flex-row justify-center w-full gap-2 text-[var(--secondary-color)] text-[12px]">
                        <p className="text-[9px] md:text-[12px] 2xl:text-[20px] self-center text-[var(--secondary-color)]">
                          {t("coverageAreas")}
                        </p>
                        <div className="flex flex-row gap-1 bg-[var(--secondary-color)] text-white rounded-full px-3 py-1">
                          <p className="text-[12px] md:text-[16px] 2xl:text-[20px] font-400">
                            {agent.aria}
                          </p>
                          <p className="text-[12px] md:text-[16px] 2xl:text-[20px] font-400">
                            {t("common.areas")}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col  gap-2 text-[var(--secondary-color)] text-[12px]">
                      {agent && (agent.phone || agent.secondPhone) && (
                        <p className="text-[12px] 2xl:text-[20px] text-[var(--secondary-color)]">
                          {t("contactMethods")}
                        </p>
                      )}

                      {agent && agent.phone && agent.phone.length > 0 && (
                        <div className="flex flex-row justify-center gap-1">
                          <FiPhone className="text-[14px] 2xl:text-[20px] self-center" />
                          <p className="text-[12px] md:text-[14px] 2xl:text-[20px] text-[var(--secondary-color)]">
                            {agent.phone}
                          </p>
                        </div>
                      )}

                      {agent &&
                        agent.secondPhone &&
                        agent.secondPhone.length > 0 && (
                          <div className="flex flex-row justify-center gap-1">
                            <PiHandbag className="text-[14px] 2xl:text-[20px] self-center" />
                            <p className="text-[12px] md:text-[14px] 2xl:text-[20px] text-[var(--secondary-color)]">
                              {agent.secondPhone}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {/* </div> */}
          </>
        ))}
      </Swiper>
      <div className="flex flex-row-reverse gap-3 mt-4 self-center md:self-end ">
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

export default Agents;
