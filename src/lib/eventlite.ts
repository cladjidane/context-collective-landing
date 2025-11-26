export interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  coverImage?: string;
  mode: "ONLINE" | "IN_PERSON";
  location?: string;
  startAt: string;
  endAt?: string;
  timezone: string;
  capacity?: number;
  registrationsCount?: number;
  organizerName?: string;
}

export interface PublicEventsResponse {
  events: Event[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

const EVENTLITE_API_URL =
  process.env.EVENTLITE_API_URL || "https://eventlite.context-collective.org";

/**
 * Récupère les prochains événements publiés via l'API publique
 * @param limit - Nombre max d'événements à récupérer
 * @param city - Filtre optionnel par ville
 */
export async function getLatestEvents(limit = 3, city?: string): Promise<Event[]> {
  try {
    const url = new URL(`${EVENTLITE_API_URL}/api/public/events`);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("upcoming", "true");
    if (city) {
      url.searchParams.set("city", city);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Revalidate every minute
    });

    if (!res.ok) {
      console.error("Failed to fetch events:", res.status);
      return [];
    }

    const data: PublicEventsResponse = await res.json();
    return data.events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

/**
 * Récupère les événements passés publiés via l'API publique
 * @param limit - Nombre max d'événements à récupérer
 * @param city - Filtre optionnel par ville
 */
export async function getPastEvents(limit = 3, city?: string): Promise<Event[]> {
  try {
    const url = new URL(`${EVENTLITE_API_URL}/api/public/events`);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("upcoming", "false");
    if (city) {
      url.searchParams.set("city", city);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch past events:", res.status);
      return [];
    }

    const data: PublicEventsResponse = await res.json();
    return data.events;
  } catch (error) {
    console.error("Error fetching past events:", error);
    return [];
  }
}

/**
 * Récupère les événements par organisateur
 * @param organizer - ID ou email de l'organisateur
 * @param upcoming - true pour les futurs, false pour les passés, undefined pour tous
 * @param limit - Nombre max d'événements
 */
export async function getEventsByOrganizer(
  organizer: string,
  upcoming?: boolean,
  limit = 10
): Promise<Event[]> {
  try {
    const url = new URL(`${EVENTLITE_API_URL}/api/public/events`);
    url.searchParams.set("organizer", organizer);
    url.searchParams.set("limit", String(limit));
    if (upcoming !== undefined) {
      url.searchParams.set("upcoming", String(upcoming));
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch events by organizer:", res.status);
      return [];
    }

    const data: PublicEventsResponse = await res.json();
    return data.events;
  } catch (error) {
    console.error("Error fetching events by organizer:", error);
    return [];
  }
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isUpcoming(dateString: string): boolean {
  return new Date(dateString) > new Date();
}
