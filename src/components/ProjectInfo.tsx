"use client";

import React, { useState } from "react";
import DIscriptionOfProject from "./DIscriptionOfProject";
import { GoDownload } from "react-icons/go";
import ProjectPhases from "./ProjectPhases";
import UnitOfProject from "./UnitOfProject";
import ProjectFeatures from "./ProjectFeatures";
import { SingleProject } from "../../lib/SingleProjectAPI";
import { useTranslations } from "next-intl";

function ProjectInfo({
  project,
  projectUnits,
}: {
  project: SingleProject | undefined;
  projectUnits: any[];
}) {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] = useState(t("projectDescription"));
  return (
    <>
      <div className="flex flex-col  md:flex-row-reverse w-full justify-end gap-2 mb-4 items-center ">
        <div className="flex flex-col md:flex-row justify-end w-full mb-4 gap-2">
          <div
            onClick={() => setActiveFilter(t("projectDescription"))}
            className={`flex flex-row rounded-4xl py-2 px-3 transition-all duration-200 cursor-pointer border-2 ${
              activeFilter === t("projectDescription")
                ? "bg-white text-[#E37C35] border-[#E37C35]"
                : "bg-[#F3F3F3] text-[#333333] border-transparent"
            }`}
          >
            <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              {t("projectDescription")}
            </p>
          </div>

          <div
            onClick={() => setActiveFilter(t("projectFeaturesTab"))}
            className={`flex flex-row rounded-2xl py-2 px-3 transition-all duration-200 cursor-pointer border-2 ${
              activeFilter === t("projectFeaturesTab")
                ? "bg-white text-[#E37C35] border-[#E37C35]"
                : "bg-[#F3F3F3] text-[#333333] border-transparent"
            }`}
          >
            <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              {t("projectFeaturesTab")}
            </p>
          </div>

          <div
            onClick={() => setActiveFilter(t("projectPhases"))}
            className={`flex flex-row rounded-2xl py-2 px-3 transition-all duration-200 cursor-pointer border-2 ${
              activeFilter === t("projectPhases")
                ? "bg-white text-[#E37C35] border-[#E37C35]"
                : "bg-[#F3F3F3] text-[#333333] border-transparent"
            }`}
          >
            <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              {t("projectPhases")}
            </p>
          </div>

          <div
            onClick={() => setActiveFilter(t("projectUnits"))}
            className={`flex flex-row rounded-2xl py-2 px-3 transition-all duration-200 cursor-pointer border-2 ${
              activeFilter === t("projectUnits")
                ? "bg-white text-[#E37C35] border-[#E37C35]"
                : "bg-[#F3F3F3] text-[#333333] border-transparent"
            }`}
          >
            <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              {t("projectUnits")}
            </p>
          </div>
        </div>
        {project && project.brochure && (
          <a
            href={project.brochure} // or full URL if it's hosted externally
            download
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/3 rounded-3xl bg-[#383191] py-2 px-3 text-white border hover:bg-white hover:text-[#383191] hover:border-[#383191] duration-300 flex flex-row-reverse justify-center gap-2 items-center  "
          >
            <GoDownload className="text-[18px] sm:text-[20px] md:text-[22px] xl:text-[25px] 2xl:text-[30px] text-center" />
            <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[22px] text-center font-500">
              {t("common.brochure")}
            </p>
          </a>
        )}
      </div>
      {activeFilter === t("projectDescription") && (
        <DIscriptionOfProject project={project} />
      )}
      {activeFilter === t("projectUnits") && project && (
        <div className="w-full">
          <UnitOfProject project={project} />
        </div>
      )}
      {activeFilter === t("projectFeaturesTab") && (
        <ProjectFeatures project={project} />
      )}
      {activeFilter === t("projectPhases") && (
        <ProjectPhases project={project} />
      )}
    </>
  );
}

export default ProjectInfo;
