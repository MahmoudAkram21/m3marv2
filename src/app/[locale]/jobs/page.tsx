import Image from "next/image";
import React from "react";

import { getSiteData } from "../../../../lib/SiteDataAPI";

import { JobsForm } from "../../../../actions/posts";
import { IoIosArrowDown } from "react-icons/io";
import { CiMail, CiUser } from "react-icons/ci";

import Form from "@/components/Form";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  const activeSiteData = await getSiteData(locale);
  return {
    title: activeSiteData?.career_page_hero_title,
    description: activeSiteData?.career_page_hero_description,
  };
}

export default async function JobsPage() {
  const t = await getTranslations("jobs");

  const locale = await getLocale();
  const activeSiteData = await getSiteData(locale);
  return (
    <main className="w-full">
      {/* Header*/}
      <section
        className="w-full flex flex-col justify-start min-h-[90vh] md:min-h-[85vh] overflow-hidden "
        style={{
          backgroundImage: `url('${activeSiteData?.career_page_hero_image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-start justify-center w-full">
          <div className="text-center items-start w-full sm:max-w-screen md:max-w-screen-xl px-2 py-4 mt-18 mx-auto">
            <h1 className="text-lg md:text-4xl xl:text-[40px] font-bold mb-4 drop-shadow-lg text-white">
              {activeSiteData?.career_page_hero_title}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl 2xl:text-[22px]  text-white">
              {activeSiteData?.career_page_hero_description}
            </p>
          </div>
        </div>
      </section>

      {/* form */}
      <section className=" flex flex-col items-center justify-center gap-4 mx-4 md:mx-8 lg:mx-25 bg-white mt-4">
        <div className="flex flex-col justify-center items-center gap-2 text-end w-full mb-4 border-2 border-[#626262] rounded-2xl px-4 sm:px-[30px] md:px-[40px] py-4">
          <Form serverAction={JobsForm}>
            <div className="flex flex-col justify-start  gap-2 mb-4">
              <h2 className="text-[18px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-600 text-[#333333]">
                {activeSiteData?.career_page_form_title}
              </h2>
              <p className="text-[12px] sm:text-[14px] md:text-[18px] text-[#4C4C4C] font-semibold">
                {activeSiteData?.career_page_form_description}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-2 px-2 w-full">
              <div className="flex flex-col bg-[#EBEAF4] border-dashed border-2 border-[#383191] w-full items-center justify-center gap-2 py-6 rounded-xl">
                <label
                  htmlFor="cv-upload"
                  className="cursor-pointer text-[#383191] text-sm font-medium hover:underline flex flex-col items-center justify-center gap-2"
                >
                  <Image
                    src="/document-upload.svg"
                    alt="upload"
                    width={24}
                    height={24}
                  />
                  {t("uploadCV")}
                </label>
                <input
                  type="file"
                  id="cv-upload"
                  className="hidden"
                  name="cv"
                />
                <p className="text-[#383191] text-center font-light text-[12px] md:text-[14px]">
                  {t("cvUploadDescription")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row-reverse gap-2 justify-center w-full mb-4">
                <div className="flex justify-end  gap-2 rounded-2xl w-full p-2  ">
                  <select
                    id="departmentJob"
                    name="department"
                    className="appearance-none text-end w-full border border-gray-300 rounded-md py-2 px-3 pr-10"
                  >
                    <option value=""> {t("selectDepartment")} </option>
                    <option value={t("engineering")}>{t("engineering")}</option>
                    <option value={t("accounting")}>{t("accounting")}</option>
                    <option value={t("customerService")}>
                      {t("customerService")}
                    </option>
                  </select>

                  {/* السهم المخصص */}
                  <div className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <IoIosArrowDown size={20} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row-reverse gap-2 justify-center w-full mb-4">
                <div className="flex justify-end  gap-2 border-2 border-[#C3C3C3] rounded-2xl w-full p-2  ">
                  <input
                    className="text-end w-full"
                    id="username"
                    style={{ outline: 0 }}
                    type="text"
                    placeholder={t("fullName")}
                    name="name"
                  />
                  <CiUser className="text-[#333333] text-[20px] sm:text-[22px] md:text-[24px] self-center" />
                </div>
              </div>

              <div className="flex flex-row-reverse gap-2 justify-start  w-full  border-2 border-[#C3C3C3] rounded-2xl p-2">
                <CiMail className="text-[#333333] text-[20px] sm:text-[22px] md:text-[24px] self-center" />
                <input
                  type="email"
                  id="useremail"
                  placeholder={t("email")}
                  className="text-end w-full"
                  style={{ outline: 0 }}
                  name="email"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 px-2 w-full"></div>
            <button
              type="submit"
              className="cursor-pointer w-full rounded-4xl text-[14px] md:text-[18px] bg-[#E37C35] border text-white py-3 px-4 hover:bg-white  hover:border-[#E37c35] hover:text-[#E37C35] transition-all duration-300 self-end"
            >
              {t("sendMessage")}
            </button>
          </Form>
        </div>
      </section>
    </main>
  );
}
