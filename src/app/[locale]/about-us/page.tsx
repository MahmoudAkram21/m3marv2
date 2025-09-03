// app/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import SplashScreen from "@/components/SplashScreen";

import { getSiteData, SiteData } from "../../../../lib/SiteDataAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoDownload } from "react-icons/go";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { getYouTubeVideoId } from "../../../../lib/getYouTubeVideoId";
import { getProjectTypes, ProjectType } from "../../../../lib/ProjectTypes";
// import required modules
import "@/components/style.css";
import DescriptionSecrion from "@/components/DescriptionSecrion";
import { useLocale, useTranslations } from "next-intl";

export default function AboutUs() {
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeSiteData, setActiveSiteData] = useState<SiteData | null>(null);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const t = useTranslations("about");
  const locale = useLocale();
  // splash screen effect
  useEffect(() => {
    getProjectTypes().then(setProjectTypes);
    getSiteData(locale).then(setActiveSiteData);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <main>
        {/* {JSON.stringify(siteData)} */}

        {/* Hero*/}
        <section className="relative w-full min-h-[90vh] md:min-h-[85vh] overflow-hidden">
          {activeSiteData && activeSiteData.about_page_hero_image && (
            <Image
              src={activeSiteData.about_page_hero_image}
              alt="Hero Image"
              fill
              priority
              className="object-cover w-full h-full bg-[#383191] brightness-[0.9] transition-all duration-500 ease-in-out"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white px-4">
              <h1 className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold mb-4 drop-shadow-lg">
                {activeSiteData?.about_page_hero_title}
              </h1>
              <p
                className="section-header text-sm md:text-xl drop-shadow-sm leading-6 text-justify  p-2 rounded-2xl backdrop-blur-sm "
                dangerouslySetInnerHTML={{
                  __html: activeSiteData?.about_page_hero_description || "",
                }}
              ></p>
            </div>
          </div>
        </section>

        <section className="my-12 mx-4 md:mx-10 lg:mx-25 bg-white">
          <div className="bg-white" style={{ width: "100%" }}>
            <div className="flex flex-col-2 gap-4 justify-center items-center mb-4">
              <div className="sm:flex-row-reverse mb-2">
                {/* <div className='w-full sm:w-1/4 rounded-4xl bg-[#383191] py-5 px-3 text-white border hover:bg-white hover:text-[#383191] hover:border-[#383191] duration-300 flex flex-row-reverse justify-center gap-2 items-center  '> */}
                {activeSiteData && activeSiteData.about_page_pdf_url && (
                  <a
                    href={activeSiteData.about_page_pdf_url} // or full URL if it's hosted externally
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-4xl bg-[#383191] py-5 px-12 text-white border hover:bg-white hover:text-[#383191] hover:border-[#383191] duration-300 flex flex-row-reverse justify-center gap-2 items-center"
                    // className='w-full sm:w-1/3 rounded-3xl bg-[#383191] py-2 px-3 text-white hover:bg-white hover:text-[#383191] hover:border-[#383191] duration-300 flex flex-row-reverse justify-center gap-2 items-center  '
                  >
                    <GoDownload className="text-[18px] sm:text-[20px] md:text-[22px] xl:text-[26px] text-center" />
                    <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] text-center">
                      {t("downloadBrochure")}
                    </p>
                  </a>
                )}
                {/* </div> */}
              </div>

              <p className="text-[10px] sm:text-[12px] md:text-[14px] xl:text-[18px] 2xl:text-[20px] font-semibold text-end text-[#626262] leading-10 text-">
                {t("companyProfile")}
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="lg:my-12 my-2 mx-4 md:mx-10 lg:mx-25 bg-white">
          <div className="mx-auto text-center">
            <DescriptionSecrion
              className="h-full"
              title={activeSiteData?.home_page_about_title || ""}
              description={activeSiteData?.home_page_about_description || ""}
            />
          </div>
          <div className="flex flex-col md:flex-row px-0 gap-5 mt-6 ">
            {activeSiteData && activeSiteData.about_page_video_url ? (
              <div className="w-full aspect-[800/450] sm:aspect-[1050/450] rounded-3xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={
                    `https://www.youtube.com/embed/` +
                    getYouTubeVideoId(activeSiteData.about_page_video_url)
                  }
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              activeSiteData &&
              activeSiteData.home_page_about_video_url && (
                <div className="w-full aspect-[800/450] sm:aspect-[1050/450] rounded-3xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={
                      `https://www.youtube.com/embed/` +
                      getYouTubeVideoId(
                        activeSiteData.home_page_about_video_url
                      )
                    }
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )
            )}

            <div className="flex flex-row md:flex-col gap-2 justify-center">
              {projectTypes &&
                projectTypes.map((type, index) => (
                  <div
                    key={index}
                    className={`flex flex-col justify-center items-center gap-1 p-2 md:gap-2 w-[100px] md:w-[120px]  lg:w-[140px] 2xl:w-[230px] aspect-square rounded-full border border-[#333333] text-center `}
                  >
                    <p className="font-semibold md:font-black md:text-[25px] 2xl:text-[30px]">
                      +{type.projects_count}
                    </p>
                    <p className="font-light xl:text-[20px]  2xl:text-[30px]">
                      {type.name}{" "}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="w-full lg:py-16 py-6 text-right font-sans space-y-3 lg:px-34 md:px-12 px-6">
          {/* Vision Section */}
          <div className="grid md:grid-cols-2 items-center gap-2 md:gap-3 lg:gap-8 p-2 md:p-3 lg:p-6 rounded-2xl bg-[#F2F2F2] shadow-sm">
            {/* Image on the right */}
            {activeSiteData && activeSiteData.about_page_image_1 && (
              <div className="md:order-last relative w-full aspect-[16/9]">
                <Image
                  src={activeSiteData.about_page_image_1}
                  alt="رؤيتنا"
                  className="rounded-xl w-full object-cover shadow-md border-2 border-[var(--secondary-color)]"
                  fill
                />
              </div>
            )}

            {/* Text */}
            <DescriptionSecrion
              className="h-full"
              headerClassName="bg-[var(--foreground)]"
              title={activeSiteData?.about_page_title_1 || ""}
              description={activeSiteData?.about_page_description_1 || ""}
            />
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 items-center gap-2 md:gap-3 lg:gap-8 p-2 md:p-3 lg:p-6 rounded-2xl bg-[#FCE8DB] shadow-sm">
            {/* Image on the left */}
            {activeSiteData && activeSiteData.about_page_image_2 && (
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={activeSiteData.about_page_image_2}
                  alt="رؤيتنا"
                  className="rounded-xl w-full object-cover shadow-md border-2 border-[var(--secondary-color)]"
                  fill
                />
              </div>
            )}
            {/* Text */}
            <DescriptionSecrion
              className="h-full"
              headerClassName="bg-[var(--secondary-color)]"
              title={activeSiteData?.about_page_title_2 || ""}
              description={activeSiteData?.about_page_description_2 || ""}
            />
          </div>

          {/* Goals Section */}
          <div className="grid md:grid-cols-2 items-center gap-2 md:gap-3 lg:gap-8 p-2 md:p-3 lg:p-6 rounded-2xl bg-[#E6E7F6] shadow-sm">
            {/* Image on the right */}
            {activeSiteData && activeSiteData.about_page_image_3 && (
              <div className="md:order-last relative w-full aspect-[16/9]">
                <Image
                  src={activeSiteData.about_page_image_3}
                  alt="رؤيتنا"
                  className="rounded-xl w-full object-cover shadow-md border-2 border-[var(--secondary-color)]"
                  fill
                />
              </div>
            )}
            {/* Text */}
            <DescriptionSecrion
              className="h-full"
              headerClassName="bg-[#383191]"
              title={activeSiteData?.about_page_title_3 || ""}
              description={activeSiteData?.about_page_description_3 || ""}
            />
          </div>
        </section>

        {activeSiteData && activeSiteData.about_page_images?.length > 0 && (
          <section className="bg-white py-8">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={15}
              slidesPerView={3}
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              {activeSiteData.about_page_images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <div className="relative w-[300px] sm:w-[400px] md:w-[500px] aspect-[385/391] rounded-xl overflow-hidden border-2 border-[var(--secondary-color)]">
                      <Image
                        src={image}
                        alt="Alt for image gallery in about page"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Buttons centered below the slider */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="rounded-full bg-[#E37C35] p-3 text-white text-[18px] flex justify-center items-center transition-all hover:bg-white hover:text-[#E37C35] border hover:border-[#E37C35]"
              >
                <FiArrowLeft />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="rounded-full bg-[#E37C35] p-3 text-white text-[18px] flex justify-center items-center transition-all hover:bg-white hover:text-[#E37C35] border hover:border-[#E37C35]"
              >
                <FiArrowRight />
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
