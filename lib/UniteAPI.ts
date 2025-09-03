import { BASE_URL } from "./config";

// Raw API types
export interface APIProject {
  id: number;
  name: string;
  description: string;
  details: string;
  featuers: string;
  date: string;
  progress: string;
  city_id: string;
  project_type_id: string;
  video_url: string | null;
  image_url: string;
  map_image_url: string;
  brochure_url: string;
  city: string;
}

export interface APIUnit {
  id: number;
  code: string;
  title: string;
  description: string;
  details: string;
  image_url: string;
  sold: string;
  project: APIProject;
  city: string;
}

// Transformed frontend type
export interface Unit {
  id: number;
  code: string;
  title: string;
  description: string;
  details: string;
  image: string;
  sold: string;
  project: APIProject;
  city: string;
}

// Fetch function
export async function getUnit(id: number, locale="ar"): Promise<Unit | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/units/${id}`, {
      cache: "no-store",
      headers: { "Accept-Language": locale }
    });

    if (!res.ok) throw new Error("Failed to fetch unit");

    const json = await res.json();
    console.log("data", json);
    const data: APIUnit = json.data;
    return {
      id: data.id,
      code: data.code,
      title: data.title,
      description: data.description,
      details: data.details,
      image: data.image_url ?? "/placeholder-unit.png",
      sold: data.sold,
      project: data.project,
      city: data.city ?? ""
    };
  } catch (error) {
    console.error("Error fetching unit:", error);
    return null;
  }
}
