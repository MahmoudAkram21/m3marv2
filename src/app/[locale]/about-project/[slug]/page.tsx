"use client";

import React, { useState, use, useEffect } from "react";

// Components
import DIscriptionOfProject from "@/components/DIscriptionOfProject";
import CustomerOpinions from "@/components/CustomerOpinions";
import DiscoverProjects from "@/components/DiscoverProjects";
import ProjectPhases from "@/components/ProjectPhases";
import ProjectFeatures from "@/components/ProjectFeatures";

import { GoDownload } from "react-icons/go";

import { getProject, SingleProject } from "../../../../../lib/SingleProjectAPI";

import UnitOfProject from "@/components/UnitOfProject";
import HeaderSlider from "@/components/HeaderSlider";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useSearchParams } from "next/navigation";
import ItemForm from "@/components/ItemForm";
import { useLocale, useTranslations } from "next-intl";
import DescriptionSecrion from "@/components/DescriptionSecrion";

export default function AboutProject({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id")) || 0;
  const t = useTranslations();
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState(
    t("projects.projectDescription")
  );
  const [project, setProject] = useState<SingleProject>();

  useEffect(() => {
    getProject(id, locale).then(setProject);
  }, [id]);
  return (
    <>
      <main className="w-full bg-white">
        {project && (
          <HeaderSlider
            slides={[
              { image: project?.img, id: Date.now() },
              ...project?.images,
            ]}
            title={project.title}
          />
        )}
        <BreadCrumbs
          title={project?.title || ""}
          link={t("projects.ourProjects")}
        />
        <section className=" flex flex-col items-center justify-center  gap-4 mx-4 md:mx-8 lg:mx-25 bg-white">
          <div className="flex flex-col justify-start items-start gap-3 w-full mb-4"></div>
          <DescriptionSecrion
            description={project?.description || ""}
            title={t("projects.projectDescription")}
          />

          <div className="w-full"></div>

          <div className="flex flex-col  md:flex-row w-full justify-center gap-2 mb-4 items-center ">
            <div className="flex flex-col md:flex-row justify-start w-full mb-4 gap-2">
              <div
                onClick={() =>
                  setActiveFilter(t("projects.projectDescription"))
                }
                className={`flex flex-row rounded-4xl py-2 px-3 transition-all duration-200 cursor-pointer border-2 ${
                  activeFilter === t("projects.projectDescription")
                    ? "bg-white text-[#E37C35] border-[#E37C35]"
                    : "bg-[#F3F3F3] text-[#333333] border-transparent"
                }`}
              >
                <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                  {t("projects.projectDescription")}
                </p>
              </div>

              <div
                onClick={() => setActiveFilter(t("projects.projectFeatures"))}
                className={`flex flex-row rounded-2xl py-2 px-3 transition-all duration-200 cursor-pointer border-2 ${
                  activeFilter === t("projects.projectFeatures")
                    ? "bg-white text-[#E37C35] border-[#E37C35]"
                    : "bg-[#F3F3F3] text-[#333333] border-transparent"
                }`}
              >
                <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                  {t("projects.projectFeatures")}
                </p>
              </div>

              <div
                onClick={() => setActiveFilter(t("projects.projectPhases"))}
                className={`flex flex-row rounded-2xl py-2 px-3 transition-all duration-200 cursor-pointer border-2 ${
                  activeFilter === t("projects.projectPhases")
                    ? "bg-white text-[#E37C35] border-[#E37C35]"
                    : "bg-[#F3F3F3] text-[#333333] border-transparent"
                }`}
              >
                <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                  {t("projects.projectPhases")}
                </p>
              </div>

              <div
                onClick={() => setActiveFilter(t("projects.projectUnits"))}
                className={`flex flex-row rounded-2xl py-2 px-3 transition-all duration-200 cursor-pointer border-2 ${
                  activeFilter === t("projects.projectUnits")
                    ? "bg-white text-[#E37C35] border-[#E37C35]"
                    : "bg-[#F3F3F3] text-[#333333] border-transparent"
                }`}
              >
                <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                  {t("projects.projectUnits")}
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
                  {t("projects.downloadBrochure")}
                </p>
              </a>
            )}
          </div>

          {activeFilter === t("projects.projectDescription") && (
            <DIscriptionOfProject project={project} />
          )}
          {activeFilter === t("projects.projectUnits") && project && (
            <div className="w-full">
              <UnitOfProject project={project} />
            </div>
          )}
          {activeFilter === t("projects.projectFeatures") && (
            <ProjectFeatures project={project} />
          )}
          {activeFilter === t("projects.projectPhases") && (
            <ProjectPhases project={project} />
          )}

          <div className="flex flex-col justify-center items-center gap-2 text-start w-[90%] mx-auto mb-4 shadow-[var(--shadow)] rounded-2xl px-4 sm:px-[35] md:px-[40px] py-4 mt-8 ">
            <ItemForm itemId={project?.id || 0} />
          </div>
        </section>
        <CustomerOpinions homePage={true} limit={12} />
        <section className="mx-4 md:mx-8 lg:mx-25">
          <DiscoverProjects />
        </section>
      </main>
    </>
  );
}
