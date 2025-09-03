import { BASE_URL } from "lib/config";
import { SingleProject, SingleProjectImage } from "lib/SingleProjectAPI";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { getYouTubeVideoId } from "lib/getYouTubeVideoId";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useTranslations } from "next-intl";
import DescriptionSecrion from "./DescriptionSecrion";

export default function ProjectPhase({ project }: { project: SingleProject }) {
  const t = useTranslations("projects");
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTitle, setActiveTitle] = useState(
    project?.steps[0] != undefined && project.steps[0]?.title != undefined
      ? project.steps[0]?.title
      : t("firstPhase")
  );
  const [activeDesc, setActiveDesc] = useState(
    project?.steps[0] != undefined && project.steps[0]?.description != undefined
      ? project.steps[0]?.description
      : t("firstPhaseDescription")
  );
  const [activeVideo, setActiveVideo] = useState(
    project?.steps[0] != undefined && project.steps[0]?.video_url != undefined
      ? project.steps[0]?.video_url
      : ""
  );
  const [activeImages, setActiveImages] = useState(
    project?.steps[0] != undefined && project.steps[0]?.images != undefined
      ? project.steps[0]?.images
      : []
  );
  const handlePhaseClick = (
    index: number,
    title: string,
    desc: string,
    images: SingleProjectImage[],
    video: string
  ) => {
    setActiveIndex(index);
    setActiveTitle(title);
    setActiveDesc(desc);
    setActiveImages(images);
    setActiveVideo(video);
  };
  return (
    <>
      <div className="flex flex-row justify-center shadow-[var(--shadow)] rounded-2xl p-4">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          pagination={false}
          className="mySwiper"
        >
          {project?.steps &&
            project.steps.map((step, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col justify-center items-center gap-2 cursor-pointer w-full h-fit"
              >
                <div
                  onClick={() =>
                    handlePhaseClick(
                      index,
                      step.title,
                      step.description,
                      step.images,
                      step.video_url
                    )
                  }
                  className={`flex flex-col justify-center items-center gap-2 cursor-pointer w-full h-fit bg-[var(--main-color)] rounded-2xl p-2 border-3 border-[var(--main-color)] ${
                    activeIndex === index
                      ? "bg-[var(--secondary-color)]"
                      : "bg-transparent"
                  }`}
                >
                  <p
                    className={`text-[12px] sm:text-[16px] md:text-[18px] mx-2 transition-all duration-300 text-center ${
                      activeIndex === index
                        ? "text-white font-semibold"
                        : "text-black"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      {/* Active phase content */}
      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        <DescriptionSecrion
          description={activeDesc || ""}
          title={activeTitle || ""}
        />
      </div>
      <div className="grid grid-cols-1 justify-center">
        <div
          className={`flex ${
            activeVideo && activeImages.length > 0
              ? "flex-col md:flex md:flex-row justify-center items-center gap-1"
              : "flex-col md:flex md:flex-row justify-center items-center gap-1"
          }`}
        >
          {/* Video Section (if exists) */}
          {activeVideo && (
            <div className={" w-[45%]"}>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md">
                <iframe
                  src={
                    `https://www.youtube.com/embed/` +
                    getYouTubeVideoId(activeVideo)
                  }
                  title="Intro Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {/* Image Swiper Section */}
          {activeImages && activeImages.length > 0 && (
            <section className="bg-white relative  w-[45%]">
              <Swiper
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                slidesPerView={1}
                spaceBetween={10}
                pagination={{ clickable: true }}
                className="mySwiper"
                style={{
                  padding: "10px",
                }}
              >
                {activeImages.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="aspect-[0.5/0.3] shadow-[var(--shadow)] rounded-2xl overflow-auto ml-2"
                  >
                    <div className="flex justify-center aspect-[0.5/0.3] w-full rounded-xl  ">
                      <div className="relative w-full  overflow-hidden">
                        <Image
                          src={`${BASE_URL}/storage/${image.image}`}
                          alt="Alt for image gallery in about page"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Buttons centered below the slider */}
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="cursor-pointer rounded-full bg-[#E37C35] p-3 text-white text-[18px] flex justify-center items-center transition-all hover:bg-white hover:text-[#E37C35] border hover:border-[#E37C35] mx-1"
                >
                  <FiArrowLeft />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="cursor-pointer rounded-full bg-[#E37C35] p-3 text-white text-[18px] flex justify-center items-center transition-all hover:bg-white hover:text-[#E37C35] border hover:border-[#E37C35] mx-1"
                >
                  <FiArrowRight />
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
