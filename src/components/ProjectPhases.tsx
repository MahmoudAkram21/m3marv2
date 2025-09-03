import { SingleProject } from "../../lib/SingleProjectAPI";
import { useTranslations } from "next-intl";
import ProjectPhase from "./ProjectPhase";

const ProjectPhases = ({ project }: { project: SingleProject | undefined }) => {
  const t = useTranslations("projects");
  const progress = project?.progress ?? 100;

  return (
    <div className="w-full ">
      <div className="flex flex-col justify-center gap-6">
        {/* ✅ Header */}

        <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 w-full  bg-[var(--main-color)] p-4 rounded-2xl">
          <p className="text-[14px] md:text-[18px] text-white px-4 py-2 rounded-full">
            {t("projectCompletionRate")}
          </p>
          {/*  progress bar*/}
          <div className="relative w-full sm:w-3/4 ">
            {/*  back ground */}
            <div className="w-auto h-5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--secondary-color)] rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/*  snoop */}
            <div
              className="absolute -top-3 w-11 h-11 flex items-center justify-center text-2xs font-bold text-white bg-[#383191] rounded-full shadow-md "
              style={{ right: `${progress}%`, transform: "translateX(50%)" }}
            >
              {progress}%
            </div>
          </div>
        </div>
        {/*  Phases */}
        <ProjectPhase project={project as SingleProject} />
      </div>
    </div>
  );
};

export default ProjectPhases;
