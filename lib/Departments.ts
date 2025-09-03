import { BASE_URL } from "./config";

// Raw API data structure
export interface APIDepartment {
  id: number;
  name: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
}

// Transformed frontend format
export interface Department {
  id: number;
  name: string;
  title?: string;
  description?: string;
  image?: string;
}

export async function getAllDepartments(locale="ar"): Promise<Department[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/company-departments`, {
      cache: "no-store",
      headers: { "Accept-Language": locale }
    });

    if (!res.ok) throw new Error("Failed to fetch company departments");

    const json = await res.json();

    return json.data.map((item: APIDepartment): Department => ({
      id: item.id,
      name: item.name,
      title: item.title ?? "",
      description: item.description ?? "",
      image: item.image_url ?? "/placeholder-department.png",
    }));
  } catch (error) {
    console.error("Error loading departments:", error);
    return [];
  }
}
