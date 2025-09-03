import { BASE_URL } from "./config";

// Raw API data structure
export interface APINewsType {
  id: number;
  name: string;
}

// Transformed frontend format
export interface NewsType {
  id: number;
  name: string;
}

export async function getNewsTypes(locale="ar"): Promise<NewsType[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/news-types?limit=100`, {
      cache: "no-store", 
      headers: { "Accept-Language": locale }
    });
    if (!res.ok) throw new Error("Failed to fetch news types");

    const json = await res.json();

    return json.data.map((item: APINewsType): NewsType => ({
      id: item.id,
      name: item.name,
    }));
  } catch (error) {
    console.error("Error loading news types:", error);
    return [];
  }
}
