import Image from "next/image";
import { SingleProject, SingleProjectImage } from "../../lib/SingleProjectAPI";
import { useTranslations } from "next-intl";
import DescriptionSecrion from "./DescriptionSecrion";
import NoItemsFound from "./NoItemsFound";
const ProjectFeatures = ({
  project,
}: {
  project: SingleProject | undefined;
}) => {
  const t = useTranslations("projects");
  return (
    <div className="w-full bg-white ">
      <div className="text-center mb-6">
        <div className="flex flex-col justify-start items-start gap-2 text-start w-full mb-4">
          <DescriptionSecrion
            description={project?.features || ""}
            title={t("projectFeatures")}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2  sm:h-[600px]">
        <div className="flex flex-row gap-1 sm:flex-col sm:gap-4 sm:h-full">
          {project &&
            project.images &&
            project.images.length > 0 &&
            project.images.slice(0, 3).map((img: SingleProjectImage, index) => (
              <div
                key={index}
                className="relative flex-1 h-48 sm:h-auto rounded-xl overflow-hidden"
              >
                <Image
                  src={img.image}
                  alt={`Image Col1 - ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
        </div>

        <div className="flex flex-row sm:flex-col gap-4 sm:h-full">
          {project &&
            project.images &&
            project.images.length > 0 &&
            project.images.slice(3, 5).map((img: SingleProjectImage, index) => (
              <>
                {img.image && (
                  <div
                    key={index}
                    className="relative flex-1 h-64 sm:h-auto rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img.image}
                      alt={`${project.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </>
            ))}
          {/* {project && project.images && project.images.length === 0 && (
            <div className="relative flex-1 h-64 sm:h-auto rounded-xl overflow-hidden">
              <Image
                src={project.img}
                alt={`Image Col2 - ${0}`}
                fill
                className="object-cover"
              />
            </div>
          )} */}
        </div>
        <div className="flex flex-row sm:flex-col gap-4 sm:h-full">
          {project &&
            project.images &&
            project.images.length > 0 &&
            project.images.slice(5, 7).map((img: SingleProjectImage, index) => (
              <div
                key={index}
                className="relative flex-1 h-64 sm:h-auto rounded-xl overflow-hidden"
              >
                <Image
                  src={img.image}
                  alt={`Image Col3 - ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
        </div>
        {project && project.images && project.images.length === 0 && (
          <NoItemsFound title={t("noImages")} />
        )}
      </div>
    </div>
  );
};

export default ProjectFeatures;
