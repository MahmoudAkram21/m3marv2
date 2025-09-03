import { BASE_URL } from "./config";

// Raw structure from your API
export interface APIAgent {
  id: number;
  name: string;
  position: string;
  phone: string;
  image_url: string;
  successful_sales: string;  // it's a string in API
  covered_areas: string;     // it's a string in API
}

// Internal/frontend structure
export interface Agent {
  id: number;
  name: string;
  jobTitle: string;
  phone: string;
  secondPhone: string;
  sales: number;
  aria: number;
  img: string;
}

export async function getAgents( limit = 6, locale="ar" ): Promise<Agent[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/agents?limit=`+limit, { cache: "no-store", headers: { "Accept-Language": locale } });
    if (!res.ok) throw new Error("Failed to fetch agents");
    const json = await res.json();

    return json.data.map((agent: APIAgent): Agent => ({
      id: agent.id,
      name: agent.name,
      jobTitle: agent.position,
      phone: agent.phone,
      secondPhone: "", // Add second phone if available
      sales: parseInt(agent.successful_sales, 10) || 0,
      aria: parseInt(agent.covered_areas, 10) || 0,
      img: agent.image_url || "/avatar.svg",
    }));
  } catch (error) {
    console.error("Error loading agents:", error);
    return [];
  }
}
