// lib/api.ts
import { BASE_URL } from "./config";

// Type for a single API SlideData
export interface APISlidesData {
  id: number;
  name: string;
  image_url?: string;
  projects_count: number;
}

// Type for your frontend usage
export interface SlidesData {
  id: number;
  name: string;
  img: string;
  projects_count: number;
}



export async function getSlidesData(locale="ar"): Promise<SlidesData[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/cities`, { cache: "no-store", headers: { "Accept-Language": locale } });
    if (!res.ok) throw new Error("Failed to fetch cities");
    const json = await res.json();

    return json.data.map((item: APISlidesData): SlidesData => ({
      id: item.id,
      name: item.name,
      projects_count: item.projects_count ?? 0,
      img: item.image_url ?? "/placeholder.png"
    }));
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
}
