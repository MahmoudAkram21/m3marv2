"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NewProject from "../../../components/NewProject";
import Agents from "@/components/Agents";
import { projectUnits } from "../../../data/newProjects";
import { agents } from "../../../data/agents";
import { useRouter } from "next/navigation";
import { getProjectTypes, ProjectType } from "../../../../lib/ProjectTypes";
import { getSiteData, SiteData } from "../../../../lib/SiteDataAPI";
import { getSlidesData, SlidesData } from "../../../../lib/SlidesDataAPI";
import { useLocale, useTranslations } from "next-intl";

export default function OurProjects() {
  const router = useRouter();
  const t = useTranslations("ourProjects");
  const [types, setTypes] = useState<ProjectType[]>([]);
  const [activeSiteData, setActiveSiteData] = useState<SiteData | null>(null);
  const [slidesData, setslidesData] = useState<SlidesData[]>([]);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSearch, setActiveSearch] = useState<string | null>(null);

  const locale = useLocale() as string;
  useEffect(() => {
    getProjectTypes(locale).then(setTypes);
    getSiteData(locale).then(setActiveSiteData);
    getSlidesData(locale).then(setslidesData);
  }, [locale]);

  return (
    <main className="w-full">
      {/* Hero*/}
      <section
        className="w-full flex flex-col justify-center min-h-[90vh] md:min-h-[85vh] overflow-hidden "
        style={{
          backgroundImage: `url('${activeSiteData?.projects_page_hero_image}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center    ",
        }}
      >
        <div className="flex items-center justify-center w-full">
          <div className="text-center w-full sm:max-w-screen md:max-w-[1240px] 2xl:max-w-screen-2xl px-4 mx-auto">
            <h1 className="text-2xl sm:text-4xl 2xl:text-[45px] font-bold mb-4 drop-shadow-lg">
              {activeSiteData?.projects_page_hero_title}
            </h1>
            <p className="text-lg md:text-xl 2xl:text-[25px] drop-shadow-sm">
              {activeSiteData?.projects_page_hero_description}
            </p>

            <div className="flex flex-col justify-center items-center gap-4 mt-6 py-4 px-4 bg-white text-black font-medium rounded-2xl w-full">
              <div className="flex flex-row-reverse gap-2 self-end">
                <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                  <Image src="/filter.svg" alt="filter" fill />
                </div>
                <div className="flex flex-col gap-2 justify-start items-end">
                  <p className="font-bold text-[12px] sm:text-[14px] md:text-[16px] xl:text-[20px] 2xl:text-[25px]">
                    {t("filterBy")}
                  </p>
                  <p className="text-[10px] sm:text-[12px] md:text-[14px] xl:text-[18px] 2xl:text-[22px]  text-[#333333]">
                    {t("filterDescription")}
                  </p>
                </div>
              </div>

              <div className="flex flex-row-reverse flex-wrap  gap-4 justify-around w-full ">
                <div className="flex flex-col justify-end gap-2">
                  <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[22px] text-black font-light">
                    {t("unitName")}
                  </p>
                  <input
                    className="text-center p-1 w-[8rem] xl:text-[18px] 2xl:text-[20px] sm:w-[10rem] md:w-[12rem] rounded-2xl "
                    type="text"
                    placeholder={t("writeUnitName")}
                    onChange={(e) => setActiveSearch(e.target.value)}
                  />
                </div>

                <div className="flex flex-col justify-end gap-2">
                  <label
                    htmlFor="unit"
                    className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[22px] text-black font-light"
                  >
                    {t("projectType")}
                  </label>
                  <select
                    name="unit"
                    onChange={(e) => setActiveFilter(e.target.value)}
                    value={activeFilter ?? ""}
                    id="unit"
                    dir="rtl"
                    className="text-center w-[6rem] sm:w-[10rem] md:w-[12rem] xl:text-[18px] 2xl:text-[20px] p-1 rounded-2xl"
                  >
                    <option
                      value=""
                      className="text-[14px] md:text-[16px] 2xl:text-[20px]"
                    >
                      {t("all")}
                    </option>
                    {types &&
                      types.map((type, index) => (
                        <option
                          key={index}
                          value={type.id}
                          className="text-[14px] md:text-[16px] 2xl:text-[20px]"
                        >
                          {type.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex flex-col justify-end gap-2">
                  <label
                    htmlFor="city"
                    className="text-[12px] sm:text-[14px]  md:text-[16px] xl:text-[18px] 2xl:text-[22px] text-black font-light"
                  >
                    {t("city")}
                  </label>
                  <select
                    name="city"
                    onChange={(e) => setActiveCity(e.target.value)}
                    id="city"
                    value={activeCity ?? ""}
                    dir="rtl"
                    className="text-center w-[6rem] sm:w-[10rem] md:w-[12rem] p-1 rounded-2xl"
                  >
                    <option
                      value=""
                      className="text-[14px] md:text-[16px] 2xl:text-[20px]"
                    >
                      {t("all")}
                    </option>
                    {slidesData &&
                      slidesData.map((slide, index) => (
                        <option
                          key={index}
                          value={slide.id}
                          className="text-[14px] md:text-[16px] 2xl:text-[20px]"
                        >
                          {slide.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-2 mx-4 md:mx-8 lg:mx-25 bg-white">
        <div className={`flex flex-col items-end justify-between`}>
          <div className="flex flex-col items-end text-start bg-white rounded-lg">
            <h2 className="text-lg sm:text-2xl md:text-3xl xl:text-[32px] mt-4 font-600 mb-4">
              {activeSiteData?.projects_page_projects_title}
            </h2>
            <p className="text-gray-600 mb-6 text-end text-[12px] sm:text-md md:text-lg  2xl:text-2xl">
              {activeSiteData?.projects_page_projects_description}
            </p>
          </div>
          <div className="flex flex-row-reverse gap-2 justify-end items-end mb-6">
            {types.map((type) => (
              <div
                key={type.id}
                onClick={() => setActiveFilter(type.id.toString())}
                className={`flex flex-row items-center rounded-4xl gap-2 py-1 px-3 transition-all duration-200 cursor-pointer border-2 ${
                  activeFilter === type.id.toString()
                    ? "bg-white text-[#E37C35] border-[#E37C35]"
                    : "bg-[#F3F3F3] text-[#333333] border-transparent"
                }`}
              >
                <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[22px]">
                  {type.name}
                </p>
                <div className="relative w-6 h-6  ">
                  <Image src="/buildings-2.svg" alt="filter" fill />
                </div>
              </div>
            ))}
          </div>
        </div>
        <NewProject
          activeFilter={activeFilter ? Number(activeFilter) : undefined}
          filtercity={activeCity !== null ? activeCity : undefined}
          activeSearch={activeSearch !== null ? activeSearch : undefined}
          units={projectUnits}
          unitsPerSlide={9}
          limit={1000}
        />
      </section>
      <section className="py-2 mx-4 md:mx-8 lg:mx-25 bg-white">
        <div className="flex flex-col gap-6 md:flex-row-reverse justify-between items-center md:items-baseline w-full my-4  ">
          <div className="flex-col gap-1">
            <h2 className="text-md sm:text-xl xl:text-[25px] 2xl:text-[30px] font-bold text-center md:text-right">
              {t("meetOurAgents")}
            </h2>
            <p className="text-xs sm:text-md xl:text-[20px] 2xl:text-[25px] text-center md:text-right">
              {t("meetOurAgentsDescription")}
            </p>
          </div>
          <button
            onClick={() => router.push("/meetOurAgents")}
            className="rounded-4xl px-7 py-3 text-[12px] w-40   xl:py-4    md:text-[12px] xl:text-[16px] xl:w-50 2xl:text-[20px] border-[#E37C35] border-2 text-[#E37C35] transition-all hover:text-white hover:bg-[#E37C35] duration-300"
          >
            {t("meetOurAgents")}
          </button>
        </div>
        <Agents agents={agents} unitsPerSlide={3} />
      </section>
    </main>
  );
}
