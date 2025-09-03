"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NewsEvents from "@/components/NewsEvents";
import { news } from "@/data/news";

import { getNewsTypes, NewsType } from "../../../../lib/NewsTypes";
import { getSiteData, SiteData } from "../../../../lib/SiteDataAPI";
import { useLocale } from "next-intl";

// export async function generateMetadata() {
//   const siteData = await getSiteData();
//   const pageTitle = siteData?.news_section_title;
//   const pageDescription = siteData?.news_section_description;

//   return {
//     title: pageTitle,
//     description: pageDescription,
//   };
// }

export default function OurProjects() {
  const [activeSiteData, setActiveSiteData] = useState<SiteData | null>(null);
  const [activeFilter, setActiveFilter] = useState<number | undefined>(
    undefined
  );
  const locale = useLocale() as string;
  const [types, setTypes] = useState<NewsType[]>([]);
  useEffect(() => {
    getNewsTypes(locale).then(setTypes);
    getSiteData(locale).then(setActiveSiteData);
  }, [locale]);

  return (
    <main className="w-full">
      {/* Header*/}
      <section className="relative w-full flex flex-col justify-center min-h-[90vh] md:min-h-[85vh] overflow-hidden ">
        <Image
          src="/newsbg.png"
          alt="Hero Image"
          fill
          className=" object-cover"
        />
        <div className="flex items-center justify-center w-full">
          <div className="text-center w-full sm:max-w-screen md:max-w-screen-xl px-4 mx-auto">
            <h1 className="text-xl md:text-4xl xl:text-[40px] font-bold mb-4 drop-shadow-lg text-white">
              {activeSiteData?.news_section_title}
            </h1>
            <p className="text-lg md:text-xl 2xl:text-[22px] drop-shadow-sm text-white">
              {activeSiteData?.news_section_description}
            </p>
          </div>
        </div>
      </section>
      <section className="py-2 mx-4 md:mx-8 lg:mx-25 bg-white">
        <div className="flex flex-row gap-2 flex-wrap justify-start items-end mt-4 mb-6 bg-[var(--main-color)] p-4 rounded-2xl">
          {types &&
            types.map((type) => (
              <div
                key={type.id}
                onClick={() => setActiveFilter(type.id)}
                className={`flex flex-row rounded-4xl py-2 px-3 transition-all duration-200 cursor-pointer border-2 ${
                  activeFilter === type.id
                    ? "bg-white text-[#E37C35] border-[#E37C35]"
                    : "bg-[#F3F3F3] text-[#333333] border-transparent"
                }`}
              >
                <p className="text-[10px] sm:text-[12px] md:text-[14px]">
                  {type.name}
                </p>
              </div>
            ))}
        </div>
        <NewsEvents
          activeFilter={activeFilter}
          news={news}
          unitsPerSlide={9}
          limit={1000}
        />
      </section>
    </main>
  );
}
