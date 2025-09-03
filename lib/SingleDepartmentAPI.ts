import { BASE_URL } from "./config";

// Raw API types
export interface APIDepartmentProject {
  id: number;
  name: string;
  description: string;
  details: string;
  featuers: string;
  date: string;
  city_id: string;
  project_type_id: string;
  image_url: string | null;
  map_image_url: string | null;
  brochure_url: string | null;
}

export interface APIDepartmentImage {
  id: number;
  image: string;
}

export interface APIDepartmentVideo {
  id: number;
  video: string;
}

export interface APIDepartmentCounter {
  count: number;
  type_name: string;
}

export interface APISingleDepartment {
  id: number;
  name: string;
  title: string;
  description: string;
  image_url: string;
  projects: APIDepartmentProject[];
  images: APIDepartmentImage[];
  videos: APIDepartmentVideo[];
  project_type_counts: APIDepartmentCounter[];
}

// Transformed frontend type
export interface SingleDepartment {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  projects: APIDepartmentProject[];
  images: string[]; // URLs
  videos: APIDepartmentVideo[]; // URLs
  project_type_counts: APIDepartmentCounter[];
}

// Fetch function
export async function getSingleDepartment(
  id: number,
  locale = "ar"
): Promise<SingleDepartment | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/company-departments/${id}`, {
      cache: "no-store",
      headers: { "Accept-Language": locale },
    });

    if (!res.ok) throw new Error("Failed to fetch department");

    const json = await res.json();
    const data: APISingleDepartment = json.data;

    return {
      id: data.id,
      name: data.name,
      title: data.title,
      description: data.description,
      image: data.image_url ?? "/placeholder-department.png",
      projects: data.projects ?? [],
      project_type_counts: data.project_type_counts ?? [],
      images: (data.images ?? []).map((img) => `${img.image}`),
      videos: data.videos ?? [],
    };
  } catch (error) {
    console.error("Error fetching single department:", error);
    return null;
  }
}
