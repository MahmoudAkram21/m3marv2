import { BASE_URL } from "./config";

// Raw API data structure
export interface APIProjectType {
  id: number;
  name: string;
  projects_count: number;
}

// Transformed frontend format
export interface ProjectType {
  id: number;
  name: string;
  projects_count: number;
}

export async function getProjectTypes(locale="ar"): Promise<ProjectType[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/project-types?limit=100`, {
      cache: "no-store", 
      headers: { "Accept-Language": locale }
    });
    if (!res.ok) throw new Error("Failed to fetch project types");

    const json = await res.json();

    return json.data.map((item: APIProjectType): ProjectType => ({
      id: item.id,
      name: item.name,
      projects_count: item.projects_count
    }));
  } catch (error) {
    console.error("Error loading project types:", error);
    return [];
  }
}
