// lib/api.ts
import { BASE_URL } from "./config";

// Type for a single API project
export interface APIProject {
  id: number;
  name: string;
  date: string;
  city: string;
  image_url?: string;
}

// Type for your frontend usage
export interface ProjectUnit {
  id: number;
  title: string;
  date: string;
  sold: boolean;
  img: string;
  link: string;
  city: string;
}

export async function getProjects(filtercity="", activeFilter=0, activeSearch = "", prevProjects = false, limit = 12, locale="ar"): Promise<ProjectUnit[]> {
  try {
    const activeFilterType = activeFilter == null ? "" : "&project_type_id="+activeFilter;
    const activeFilterCity = filtercity == "" || filtercity == null ? "" : "&city_id="+filtercity;
    const activeFilterSeatch = activeSearch == "" || activeSearch == null ? "" : "&name="+activeSearch;

    const query = prevProjects ? "prev-projects?limit=1000" 
                : filtercity != "" || activeFilter != 0 ? 
                  `projects-filter?limit=${limit}`+activeFilterCity+activeFilterType+activeFilterSeatch : `projects?limit=${limit}`;

    const res = await fetch(`${BASE_URL}/api/${query}`, { cache: "no-store", headers: { "Accept-Language": locale } });
    if (!res.ok) throw new Error("Failed to fetch projects");
    const json = await res.json();

    return json.data.map((item: APIProject): ProjectUnit => ({
      id: item.id,
      title: item.name,
      date: new Date(item.date).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      city: item.city ?? "غير معروف",
      sold: false, // Optional: change if you have sold data
      img: item.image_url ?? "/placeholder.png",
      link: "about-project"
    }));
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
}
