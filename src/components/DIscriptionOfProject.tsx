"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "../app/globals.css";
import { SingleProject } from "../../lib/SingleProjectAPI";
import { getYouTubeVideoId } from "../../lib/getYouTubeVideoId";
import DescriptionSecrion from "./DescriptionSecrion";
import NoItemsFound from "./NoItemsFound";
const DIscriptionOfProject = ({
  project,
}: {
  project: SingleProject | undefined;
}) => {
  const [viewImageMap, setViewImageMap] = useState(false);
  const t = useTranslations();
  return (
    <div className="bg-white" style={{ width: "100%" }}>
      <div className="flex flex-col gap-4 justify-start items-start mb-4">
        <h1 className="text-[16px] sm:text-[18px] md:text-[20px] 2xl:text-[30px] font-bold mb-2 bg-[var(--main-color)] text-white p-2 rounded-2xl">
          {t("projects.projectDetails")}
        </h1>

        {/* <p className="text-[10px] sm:text-[12px] md:text-[14px] 2xl:text-[20px] font-semibold text-start text-[#333333] mb-2">
          {project?.details}
        </p> */}
      </div>

      <div className="flex flex-col sm:flex-row-reverse justify-start gap-2 w-full mb-4 relative">
        {/* الفيديو */}
        {project && project.video_url && (
          <div className="w-full md:w-3/5 aspect-video relative rounded-2xl">
            <iframe
              className="w-full h-full absolute top-0 left-0 rounded-4xl"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                project.video_url
              )}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* الخريطة */}
        {project && project.mapImg && (
          <div className="w-full md:w-2/5 relative aspect-video ">
            <Image
              src={project.mapImg}
              fill
              alt="map"
              className="object-cover rounded-2xl border-[1px] border-[#DDCACA] "
            />

            <div
              onClick={() => setViewImageMap(true)}
              className="absolute bottom-1 right-1 rounded-3xl bg-[#E37C35] flex flex-row-reverse justify-start items-start gap-2 p-2"
            >
              <Image
                src="/maximize-2.svg"
                alt="location"
                width={20}
                height={20}
                className="self-center"
              />
              <p className="text-[12px] sm:text-[14px] md:text-[16px] text-white font-semibold">
                {t("common.viewProjectMap")}
              </p>
            </div>
          </div>
        )}

        {viewImageMap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-80">
            <div className="relative w-full max-w-4xl px-4">
              <button
                className="z-50 absolute top-0 right-0 bg-black p-2 rounded-full text-white text-2xl"
                onClick={() => setViewImageMap(false)}
              >
                ✕
              </button>
              <div className="aspect-video w-full">
                {project && project.mapImg && (
                  <Image
                    src={project.mapImg}
                    fill
                    alt="map"
                    className="rounded-2xl border-[1px] border-[#DDCACA] "
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {project && project.images && project.images.length === 0 && (
        <NoItemsFound title={t("projects.noImages")} className="w-[50%]" />
      )}
    </div>
  );
};

export default DIscriptionOfProject;
