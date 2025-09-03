import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NewProject from "@/components/NewProject";
import CustomerOpinions from "@/components/CustomerOpinions";
import Agents from "@/components/Agents";
import NewsEvents from "@/components/NewsEvents";
import { agents } from "@/data/agents";
import { projectUnits } from "@/data/newProjects";
import { news } from "@/data/news";

import { CiSearch } from "react-icons/ci";
import { getSiteData, SiteData } from "../../../lib/SiteDataAPI";

import ReelsSlider from "@/components/ReelsSlider";
import { getYouTubeVideoId } from "../../../lib/getYouTubeVideoId";
import { getProjectTypes, ProjectType } from "../../../lib/ProjectTypes";
import SectionHeader from "@/components/SectionHeader";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const siteData = await getSiteData();
  const pageTitle = siteData?.home_page_hero_title;
  const pageDescription = siteData?.home_page_hero_description;

  return {
    title: pageTitle,
    description: pageDescription,
  };
}

// import required modules
export default async function HomePage() {
  const locale = await getLocale();
  let projectTypes: ProjectType[] = await getProjectTypes(locale);
  let activeSiteData: SiteData | null = await getSiteData(locale);
  const t = await getTranslations();

  return (
    <>
      <main>
        {/* Hero*/}
        <section className="relative w-full min-h-[90vh] md:min-h-[85vh] overflow-hidden">
          {activeSiteData && activeSiteData.home_page_hero_image && (
            <Image
              src={activeSiteData.home_page_hero_image}
              alt="Hero Image"
              fill
              priority
              className="object-cover w-full h-full bg-[#383191] brightness-[0.9] transition-all duration-500 ease-in-out"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white px-4">
              <h1 className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold mb-4 drop-shadow-lg">
                {activeSiteData?.home_page_hero_title}
              </h1>
              <p className="text-lg md:text-xl drop-shadow-sm">
                {activeSiteData?.home_page_hero_description}
              </p>
              <div className="flex justify-center items-center gap-2 mx-auto mt-6 w-1/2 h-[50px] lg:h-[60px]    bg-[#E37C35] text-white font-medium rounded-full hover:bg-gray-100 hover:text-[#E37C35] transition">
                {activeSiteData && activeSiteData.home_page_hero_btn_link && (
                  <Link href={activeSiteData?.home_page_hero_btn_link}>
                    <button>{activeSiteData?.home_page_hero_btn_text}</button>
                  </Link>
                )}
                <CiSearch size={20} />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="my-12 mx-4 md:mx-10 lg:mx-25 bg-white">
          <div className="mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-2xl xl:text-[32px] 2xl:text-[36px] md:font-[600] text-[#333333] mb-4">
              {activeSiteData?.home_page_about_title}
            </h2>
            <p className="text-center text-sm  md:text-[18px]  2xl:text-[22px] font-[400] text-[#626262] mb-8 px-4">
              {activeSiteData?.home_page_about_description}
            </p>
            <div className="flex justify-center">
              {activeSiteData && activeSiteData.home_page_about_btn_link && (
                <Link href={activeSiteData?.home_page_about_btn_link} passHref>
                  <button className=" rounded-4xl px-4 py-2 md:px-10 md:py-3 2xl:text-[20px] border-[#E37C35] border-2 text-[#E37C35] transition-all hover:text-white hover:bg-[#E37C35] duration-300">
                    {activeSiteData?.home_page_about_btn_text}
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row px-0 gap-5 mt-6 ">
            {activeSiteData && activeSiteData.home_page_about_video_url && (
              <div className="w-full aspect-[800/450] sm:aspect-[1050/450] rounded-3xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={
                    `https://www.youtube.com/embed/` +
                    getYouTubeVideoId(activeSiteData.home_page_about_video_url)
                  }
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
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
                      {type.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* استكشف مناطقنا */}
        <section className=" mx-4 sm:mx-8 md:mx-10 lg:mx-25 bg-white">
          <div className="flex flex-col sm:flex-row-reverse w-full justify-end items-center py-4 bg-white">
            <div className="flex flex-col items-center text-center w-full ">
              <h2 className="mx-auto text-xl sm:text-2xl md:text-2xl xl:text-[30px]  2xl:text-[36px] md:font-[600] text-[#333333]">
                {activeSiteData?.cities_section_title}
              </h2>
              <p className="text-center text-sm  md:text-[16px]  2xl:text-[22px] font-[400] text-gray-700 mb-8 px-4">
                {activeSiteData?.cities_section_description}
              </p>
            </div>
          </div>
          {/* slider */}
          <ReelsSlider />
        </section>

        {/* New Projects Section */}
        <section className="my-12 mx-4 sm:mx-8 md:mx-10 lg:mx-25 bg-white">
          <SectionHeader
            title={activeSiteData?.projects_section_title || ""}
            description={activeSiteData?.projects_section_description || ""}
            link="/our-projects"
          >
            {t("common.viewMore")}
          </SectionHeader>

          <NewProject unitsPerSlide={6} units={projectUnits} />
        </section>
        <CustomerOpinions homePage={true} limit={1000} />
        {/* Customer Opinions Section */}

        {/* job Section */}
        <section className="w-full my-8  ">
          <div
            className="flex flex-row w-full justify-between  items-end mt-2 bg-cover bg-center h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[50vh] relative"
            style={{ backgroundImage: "url('/jobSectionBg.svg')" }}
          >
            <div className="box-job flex flex-col w-[100%] md:w-[50%] h-[100%] text-start justify-start md:justify-center  gap-4 px-4 py-2 2xl:px-15 2xl:gap-6  ">
              <h2 className="text-[12px] sm:text-[18px] md:text-2xl text-white font-bold ">
                {activeSiteData?.join_us_section_title}
              </h2>
              {activeSiteData && activeSiteData.join_us_section_btn_link && (
                <Link
                  href={activeSiteData.join_us_section_btn_link}
                  className="block cursor-pointer rounded-full bg-white px-5 py-4 w-[40%] sm:w-1/3 md:w-1/2 text-[#383191] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[25px] hover:text-white hover:bg-[#383191] transition-all duration-300"
                >
                  {activeSiteData?.join_us_section_btn_text}
                </Link>
              )}
            </div>
            {activeSiteData && activeSiteData.join_us_section_image && (
              <Image
                src={activeSiteData.join_us_section_image}
                alt="employees"
                width={0}
                height={0}
                sizes="80vw"
                className={`absolute bottom-0  min-w-[58vw] sm:min-w-[50vw] max-h-[100%] object-cover ${
                  locale === "ar" ? "left-0" : "right-0"
                }`}
              />
            )}
          </div>
        </section>

        {/* قابل وكلائنا */}
        <section className="my-12 mx-4 md:mx-10 lg:mx-25 md:my-25">
          <div className="flex flex-col justify-center gap-2">
            <SectionHeader
              title={activeSiteData?.agents_section_title || ""}
              description={activeSiteData?.agents_section_description || ""}
              link="/our-agents"
            >
              {t("common.meetOurAgents")}
            </SectionHeader>
            <Agents agents={agents} unitsPerSlide={3} />
          </div>
        </section>
        <section className="my-12 mx-4 sm:mx-8 md:mx-10 lg:mx-25 md:my-25 bg-[#F9F9F9] m-4 rounded-2xl items-center">
          <SectionHeader
            title={t("common.Events & news")}
            description={t("company.description")}
            link="/news"
          >
            {t("common.viewMore")}
          </SectionHeader>
          <NewsEvents news={news} unitsPerSlide={9} />
        </section>
      </main>
    </>
  );
}
