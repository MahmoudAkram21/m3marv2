import React from "react";
import Link from "next/link";
import { FaPhoneAlt, FaClock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

import { getSiteData } from "../../../../lib/SiteDataAPI";
import ItemForm from "@/components/ItemForm";
import { getLocale, getTranslations } from "next-intl/server";

export default async function OurProjects() {
  const locale = await getLocale();
  const t = await getTranslations();
  const activeSiteData = await getSiteData(locale);

  return (
    <main className="w-full">
      {/* Header*/}
      <section
        className="w-full flex flex-col justify-center min-h-[90vh] md:min-h-[85vh] overflow-hidden "
        style={{
          backgroundImage: `url(${activeSiteData?.contact_page_hero_image})`,
        }}
      >
        <div className="flex items-center justify-center w-full">
          <div className="text-center w-full sm:max-w-screen md:max-w-screen-xl px-4 py-4 mx-auto">
            <h1 className="text-xl md:text-2xl xl:text-[40px] font-bold mb-4 drop-shadow-lg text-white">
              {activeSiteData?.contact_page_hero_title}
            </h1>
            <div
              className="text-lg md:text-xl 2xl:text-[22px] text-white"
              dangerouslySetInnerHTML={{
                __html: activeSiteData?.contact_page_hero_description || "",
              }}
            />

            <div className="flex flex-col justify-center  gap-4 mt-6 mb-2 pt-6 pb-2 px-4 bg-white text-black md:max-w-[1236px] font-medium rounded-2xl w-full">
              <div className="flex flex-col sm:flex-row-reverse  items-stretch gap-0 sm:gap-4 justify-around w-full border-b-3 border-gray-200 ">
                <div className="flex flex-col justify-start gap-2 border-r-2 pr-4 border-gray-200 h-full min-h-[70px]">
                  <div className="flex flex-row-reverse items-center gap-2">
                    <FaPhoneAlt className="text-[20px] sm:text-[22px] md:text-[24px]" />
                    <h3 className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] text-black font-light">
                      {t("common.phone")}
                    </h3>
                  </div>
                  <p className="text-[12px] sm:text-[14px] md:text-[16px ] xl:text-[18px] text-black font-light">
                    {activeSiteData?.phone}
                  </p>
                </div>

                <div className="flex flex-col justify-start gap-2 border-r-2 border-gray-200 pr-4 h-full min-h-[70px]">
                  <div className="flex flex-row-reverse items-center gap-2">
                    <MdEmail className="text-[20px] sm:text-[22px] md:text-[24px]" />
                    <h3 className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] text-black font-light">
                      {t("common.email")}
                    </h3>
                  </div>
                  <a
                    href="mailto:contact@creativeideas.com"
                    className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] text-[#333333] font-light hover:underline"
                  >
                    {activeSiteData?.email}
                  </a>
                </div>

                <div className="flex flex-col justify-start gap-2 border-r-2 border-gray-200 pr-4 h-full min-h-[70px]">
                  <div className="flex flex-row-reverse items-center gap-2">
                    <FaClock className="text-[20px] sm:text-[22px] md:text-[24px]" />
                    <h3 className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] text-black font-light">
                      {t("common.workDays")}
                    </h3>
                  </div>
                  <div className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] text-[#333333] font-light">
                    {activeSiteData &&
                      activeSiteData.contact_page_work_days && (
                        <div
                          style={{ textAlign: "right" }}
                          dangerouslySetInnerHTML={{
                            __html:
                              activeSiteData?.contact_page_work_days.replaceAll(
                                "\n",
                                "<br/>"
                              ),
                          }}
                        />
                      )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col  items-end gap-0 py-2 sm:gap-2  ">
                <div className="flex flex-row-reverse justify-start  gap-2">
                  <FaLocationDot className="text-[20px] sm:text-[22px] md:text-[24px]" />
                  <h3 className="text-[12px] sm:text-[14px] md:text-[16px] text-black font-light">
                    {t("common.address")}
                  </h3>
                </div>
                <div className="text-[12px] sm:text-[14px] md:text-[16px] text-[#333333] font-light">
                  {activeSiteData && activeSiteData.address_link ? (
                    <Link href={activeSiteData.address_link}>
                      {activeSiteData && activeSiteData.address && (
                        <div
                          style={{ textAlign: "right" }}
                          dangerouslySetInnerHTML={{
                            __html: activeSiteData?.address.replaceAll(
                              "\n",
                              "<br/>"
                            ),
                          }}
                        />
                      )}
                    </Link>
                  ) : (
                    <div>
                      {activeSiteData && activeSiteData.address && (
                        <div
                          style={{ textAlign: "right" }}
                          dangerouslySetInnerHTML={{
                            __html: activeSiteData?.address.replaceAll(
                              "\n",
                              "<br/>"
                            ),
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* form */}
      <section className=" flex flex-col items-center justify-center  gap-4 mx-4 md:mx-8 lg:mx-25 bg-white mt-4">
        <div className="flex flex-col justify-center items-center gap-2 text-end w-full mb-4 border-2 border-[#626262] rounded-2xl px-4 sm:px-[30px] md:px-[40px] py-4">
          <ItemForm itemId={null} />
        </div>
      </section>
    </main>
  );
}
