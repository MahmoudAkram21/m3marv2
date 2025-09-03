// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, use } from "react";
import SplashScreen from "@/components/SplashScreen";
import NewsEvents from "@/components/NewsEvents";
import { Swiper, SwiperSlide } from "swiper/react";
// import LiteYouTubeEmbed from "react-lite-youtube-embed";
import SwiperCore from "swiper";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import { news } from "@/data/news";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import ReelsSlider from "@/components/ReelsSlider";

// import required modules
import {
  getSingleDepartment,
  SingleDepartment,
} from "../../../../../lib/SingleDepartmentAPI";

import { getYouTubeVideoId } from "../../../../../lib/getYouTubeVideoId";
import { getSiteData, SiteData } from "../../../../../lib/SiteDataAPI";
import BreadCrumbs from "@/components/BreadCrumbs";
import DescriptionSecrion from "@/components/DescriptionSecrion";
import SectionHeader from "@/components/SectionHeader";
import HeaderSlider from "@/components/HeaderSlider";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useLocale, useTranslations } from "next-intl";

export default function DepartmentPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const [activeSiteData, setActiveSiteData] = useState<SiteData | null>(null);
  const locale = useLocale();
  const [departmentItem, setDepartmentItem] = useState<SingleDepartment | null>(
    null
  );

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperCore | null>(null);
  const t = useTranslations();

  useEffect(() => {
    getSingleDepartment(id, locale).then(setDepartmentItem);
    getSiteData(locale).then(setActiveSiteData);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <>
      <main>
        {/* Header*/}

        <HeaderSlider
          slides={departmentItem?.images || []}
          title={departmentItem?.name || ""}
        />

        {/* Projects Section */}
        <BreadCrumbs
          title={departmentItem?.name || ""}
          link={t("navBar.companyDepartments")}
        />

        {/* Projects Section */}
        <section className=" mx-4 md:mx-8 lg:mx-25 bg-white">
          <div className="flex flex-col sm:flex-row-reverse w-full justify-end items-center py-4 bg-white">
            <div className="flex flex-col items-center text-center gap-2 w-full ">
              <h2 className="mx-auto text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-[#333333] font-600">
                {activeSiteData?.cities_section_title}
              </h2>
              <p className="text-center text-sm md:text-lg font-light text-[#4C4C4C] mb-8 px-4">
                {activeSiteData?.cities_section_description}
              </p>
            </div>
          </div>

          {/* slider */}
          <ReelsSlider />
        </section>

        {/* about section */}
        <section className=" mx-4 md:mx-8 lg:mx-25 bg-white mt-8">
          <div className="flex flex-col gap-4 justify-center">
            <DescriptionSecrion
              description={departmentItem?.description || ""}
              title={`${t("common.about")} ${departmentItem?.name}`}
            />
            {departmentItem && departmentItem.project_type_counts && (
              <div className="flex flex-row-reverse gap-2 justify-center w-full">
                {departmentItem.project_type_counts.map((counter, i) => (
                  <div
                    key={i}
                    className={`flex flex-col justify-center items-center gap-1 p-2 md:gap-2  md:py-6 xl:py-8 2xl:py-12 w-full rounded-3xl border border-[#333333] text-center `}
                  >
                    <p className="text-[18px] xl:text-[32px] md:font-bold">
                      +{counter.count}
                    </p>
                    <p className="text-[12px] xl:text-lg font-400">
                      {" "}
                      {counter.type_name}{" "}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* m3mar investment vidioes */}
        {departmentItem &&
          departmentItem.videos &&
          departmentItem.videos.length > 0 && (
            <section className="mx-4 md:mx-8 lg:mx-25">
              <div className="flex flex-col items-center justify-center w-full h-full   py-8 ">
                <div className="flex flex-col justify-center sm:flex-row sm:justify-between items-center w-full mb-8">
                  <div className="flex-col gap-1">
                    <h2 className="text-md sm:text-xl md:text-[28px] xl:text-[32px] text-[#333333] font-600 text-right">
                      فيديوهات عن {departmentItem?.name}
                    </h2>
                  </div>
                  <div className="flex flex-row gap-3 mt-4 self-center md:self-end bg-white ">
                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      className="rounded-full bg-[#E37C35] p-1 text-[16px] sm:text-[20px] text-white transition-all hover:bg-white hover:text-[#E37c35] duration-300"
                    >
                      <FiArrowRight />
                    </button>
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="rounded-full bg-[#E37C35] p-1 text-[16px] sm:text-[20px] text-white transition-all hover:bg-white hover:text-[#E37c35] duration-300"
                    >
                      <FiArrowLeft />
                    </button>
                  </div>
                </div>

                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  breakpoints={{
                    320: { slidesPerView: 2 },
                    460: { slidesPerView: 3 },
                    1020: { slidesPerView: 4 },
                  }}
                  onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  className="mySwiper"
                >
                  {departmentItem &&
                    departmentItem.videos &&
                    departmentItem.videos.map((video) => (
                      <SwiperSlide key={video.id}>
                        <div
                          className="w-full h-64 md:h-96 rounded-lg overflow-hidden cursor-pointer relative"
                          onClick={() => setSelectedVideo(video.video)}
                        >
                          <Image
                            src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                              video.video
                            )}/hqdefault.jpg`}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                            fill
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-4xl">
                            ▶
                          </div>
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
              </div>
            </section>
          )}

        {/* gallery */}
        {departmentItem &&
          departmentItem.images &&
          departmentItem.images.length > 0 && (
            <section className="mx-4 md:mx-8 lg:mx-25 bg-white mt-8">
              <div className="flex flex-col gap-4">
                <h1 className="text-[18px] sm:text-[20px] md:text-[28px] xl:text-[32px] text-[#333333]  font-600 ">
                  {t("common.gallery")} {departmentItem?.name}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2  sm:h-[600px]">
                  {/* Column 1 - 3 Images */}
                  <div className="flex flex-row gap-1 sm:flex-col sm:gap-4 sm:h-full">
                    {departmentItem &&
                      departmentItem?.images &&
                      departmentItem?.images.slice(0, 3).map((img, index) => (
                        <div
                          key={index}
                          className="relative flex-1 h-48 sm:h-auto rounded-xl overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt={`Image Col3 - ${index}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                  </div>

                  {/* Column 2 - 2 Images */}
                  <div className="flex flex-row sm:flex-col gap-4 sm:h-full">
                    {departmentItem &&
                      departmentItem?.images &&
                      departmentItem?.images.slice(3, 5).map((img, index) => (
                        <div
                          key={index}
                          className="relative flex-1 h-64 sm:h-auto rounded-xl overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt={`Image Col2 - ${index}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                  </div>

                  {/* Column 3 - 2 Images */}
                  <div className="flex flex-row sm:flex-col gap-4 sm:h-full">
                    {departmentItem &&
                      departmentItem?.images &&
                      departmentItem?.images.slice(5, 7).map((img, index) => (
                        <div
                          key={index}
                          className="relative flex-1 h-64 sm:h-auto rounded-xl overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt={`Image Col3 - ${index}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          )}

        <section className="py-12 mx-4 md:mx-8 lg:mx-25 bg-white">
          <SectionHeader
            title={t("common.news")}
            description={t("common.newsDescription")}
            link="/news"
          >
            {t("common.news")}
          </SectionHeader>
          <NewsEvents news={news} />
        </section>
      </main>
    </>
  );
}
