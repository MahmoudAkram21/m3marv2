import Image from "next/image";

import CustomerOpinions from "@/components/CustomerOpinions";

import { GoDownload } from "react-icons/go";

import { getUnit } from "../../../../../lib/UniteAPI";

import { getYouTubeVideoId } from "../../../../../lib/getYouTubeVideoId";
import BreadCrumbs from "@/components/BreadCrumbs";
import DescriptionSecrion from "@/components/DescriptionSecrion";
import ItemForm from "@/components/ItemForm";
import { getLocale, getTranslations } from "next-intl/server";

export default async function UnitePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const t = await getTranslations("unit");
  const locale = await getLocale();
  let unite = await getUnit(id, locale);

  return (
    <>
      <main className="w-full bg-white">
        <div
          className="w-full flex flex-col justify-center min-h-[90vh] md:min-h-[85vh] overflow-hidden "
          style={{
            backgroundImage: `url(${unite?.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <BreadCrumbs link="/projects" title={t("ourProjects")} />

        <section className=" flex flex-col items-center justify-center  gap-4 mx-4 md:mx-8 lg:mx-25 bg-white">
          <div className="flex flex-col justify-end items-end gap-3 w-full mb-4"></div>
          <DescriptionSecrion
            title={unite?.title || ""}
            description={unite?.description || ""}
          />

          <div className="bg-white" style={{ width: "100%" }}>
            <div className="flex flex-col gap-4 justify-end items-end mb-4">
              <div className="flex flex-col sm:flex-row justify-between w-full mb-2 items-center">
                <h1 className="text-[16px] sm:text-[24px] md:text-[28px] xl:text-[32px]  font-600 text-[#333333]">
                  {t("unitDetailsAndMap")}{" "}
                </h1>
                {/* <div className='w-full sm:w-1/4 rounded-4xl bg-[#383191] py-5 px-3 text-white border hover:bg-white hover:text-[#383191] hover:border-[#383191] duration-300 flex flex-row-reverse justify-center gap-2 items-center  '> */}
                {unite && unite.project && unite.project.brochure_url && (
                  <a
                    href={unite.project.brochure_url} // or full URL if it's hosted externally
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/4 rounded-4xl bg-[#383191] py-5 px-3 text-white border hover:bg-white hover:text-[#383191] hover:border-[#383191] duration-300 flex flex-row-reverse justify-center gap-2 items-center"
                    // className='w-full sm:w-1/3 rounded-3xl bg-[#383191] py-2 px-3 text-white hover:bg-white hover:text-[#383191] hover:border-[#383191] duration-300 flex flex-row-reverse justify-center gap-2 items-center  '
                  >
                    <GoDownload className="text-[18px] sm:text-[20px] md:text-[22px] xl:text-[26px] text-center" />
                    <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] text-center">
                      {t("common.brochure")}
                    </p>
                  </a>
                )}
              </div>

              <p
                className="text-[10px] sm:text-[12px] md:text-[14px] xl:text-[18px] 2xl:text-[20px] font-semibold text-end text-[#626262] leading-10 text-"
                dangerouslySetInnerHTML={{ __html: unite?.details || "" }}
              ></p>
            </div>
            <div className="flex flex-col sm:flex-row-reverse justify-center gap-2 w-full mb-4 relative">
              {/* الفيديو */}

              <div className="w-full md:w-3/5 aspect-video relative">
                {unite &&
                  unite.project &&
                  unite.project &&
                  unite.project.video_url && (
                    <iframe
                      className="w-full h-full absolute top-0 left-0"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                        unite.project.video_url
                      )}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
              </div>

              {/* الخريطة */}
              {unite &&
                unite.project &&
                unite.project &&
                unite.project.map_image_url && (
                  <div className="w-full md:w-2/5 relative aspect-video">
                    <Image
                      src={unite.project.map_image_url}
                      fill
                      alt="map"
                      className="object-cover"
                    />

                    <div className="absolute bottom-1 right-1 rounded-3xl bg-[#E37C35] flex flex-row-reverse justify-start items-start gap-2 p-2">
                      <Image
                        src="/maximize-2.svg"
                        alt="location"
                        width={20}
                        height={20}
                        className="self-center"
                      />
                      <p className="text-[12px] sm:text-[14px] md:text-[16px] text-white font-semibold">
                        عرض خريطه المشروع
                      </p>
                    </div>
                  </div>
                )}
            </div>
            <DescriptionSecrion
              title={unite?.title || ""}
              description={unite?.description || ""}
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 text-start w-[90%] mx-auto mb-4 shadow-[var(--shadow)] rounded-2xl px-4 sm:px-[35] md:px-[40px] py-4 mt-8 ">
            <ItemForm itemId={unite?.id || 0} />
          </div>
        </section>
        <CustomerOpinions limit={1000} homePage={false} />
      </main>
    </>
  );
}
