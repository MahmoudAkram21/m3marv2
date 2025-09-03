import Image from "next/image";
import Agents from "@/components/Agents";
import { agents } from "../../../../data/agents";

import SectionHeader from "@/components/SectionHeader";
import { getLocale, getTranslations } from "next-intl/server";
import { City, getCity } from "lib/cities";
import { ImageSlider, VideoSlider } from "@/components/Slider";

export default async function CityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();

  const t = await getTranslations("cityPage");
  // const [activeFilter, setActiveFilter] = useState<number | undefined>(
  //   undefined
  // );
  // const [types, setTypes] = useState<ProjectType[]>([]);
  // useEffect(() => {
  //   getProjectTypes(locale).then(setTypes);
  // }, []);

  const city = (await getCity(+id, locale)) as City;

  return (
    <main className="w-full">
      <section className="relative w-full min-h-[90vh] md:min-h-[85vh] overflow-hidden">
        {city && city.name && (
          <Image
            src="https://backend.meamargroup.com/storage/images/DFHzEqwwkzT7Qdk5OvppfCXl40WJZbNwTuq6EiDz.jpg"
            alt="Hero Image"
            fill
            priority
            className="object-cover w-full h-full bg-[#383191] brightness-[0.9] transition-all duration-500 ease-in-out"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-center text-white px-4">
            <h1 className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold mb-4 drop-shadow-lg">
              {city?.name}
            </h1>
          </div>
          <div className="flex flex-col text-center text-3xl rounded-full bg-[var(--secondary-color)]/50 backdrop-blur-sm border-2 border-[var(--secondary-color)] p-4 justify-center items-center">
            {city.projects_count} {t("projects")}
          </div>
        </div>
      </section>

      <section className="py-2 mx-4 md:mx-8 lg:mx-25 bg-white">
        <div className="flex flex-col text-center text-3xl rounded-full bg-[var(--secondary-color)]/50 backdrop-blur-sm border-2 border-[var(--secondary-color)] p-4 justify-center items-center">
          {t("cityGallery")}
        </div>
        <section>
          <ImageSlider
            pagination
            spaceBetween={20}
            className=""
            slidesPerView={4}
            data={city.images}
          />
        </section>
        <section>
          <div className="flex flex-col text-center text-3xl rounded-full bg-[var(--secondary-color)]/50 backdrop-blur-sm border-2 border-[var(--secondary-color)] p-4 justify-center items-center">
            {t("cityVideos")}
          </div>
          <VideoSlider
            pagination
            spaceBetween={20}
            className=""
            slidesPerView={3}
            data={city.videos}
          />
        </section>
        {/* <NewProject
          activeFilter={activeFilter}
          filtercity={id}
          units={projectUnits}
          unitsPerSlide={9}
        /> */}
      </section>
      <section className="py-2 mx-4 md:mx-8 lg:mx-25 bg-white">
        <SectionHeader
          title={t("ourAgentsTitle")}
          description={t("ourAgentsDescription")}
          link="/our-agents"
        >
          {t("ourAgentsLink")}
        </SectionHeader>
        <Agents agents={agents} unitsPerSlide={3} />
      </section>
    </main>
  );
}
