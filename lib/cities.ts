import { BASE_URL } from "./config";

// Raw API data structure
export interface APICity {
  id: number;
  name: string;
  projects_count: number;
  image_url: string;
  images: {
    id: number;
    image_url: string;
  };
  videos: {
    id: number;
    video_url: string;
    city_id: number;
  };
}

// Transformed frontend format
export interface City {
  id: number;
  name: string;
  projects_count: number;
  image_url: string;
  images: [
    {
      id: number;
      image_url: string;
    }
  ];
  videos: [
    {
      id: number;
      video_url: string;
      city_id: number;
    }
  ];
}

export async function getCities(locale = "ar"): Promise<City[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/cities?limit=100`, {
      cache: "no-store",
      headers: { "Accept-Language": locale },
    });
    if (!res.ok) throw new Error("Failed to fetch cities");

    const json = await res.json();

    return json.data.map((item: APICity) => ({
      id: item.id,
      name: item.name,
      projects_count: item.projects_count,
      image_url: item.image_url,
      images: item.images,
      videos: item.videos,
    }));
  } catch (error) {
    console.error("Error loading cities:", error);
    return [];
  }
}

export async function getCity(
  id: number,
  locale = "ar"
): Promise<City | { message: string }> {
  try {
    const cities = await getCities(locale);
    const city = cities.find((city) => city.id === id);
    if (!city) {
      return {
        message: "no city Found",
      };
    }

    return city;
  } catch (error) {
    console.error("Error loading cities:", error);
    return {
      message: "there is An Error Ocured",
    };
  }
}
