import type { PropertyCard } from "@/types";

/**
 * Pure search helper for property cards. Keeps filtering logic out of pages/components.
 */
export function filterPropertyCards(
  properties: PropertyCard[],
  query: string
): PropertyCard[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return properties;

  return properties.filter((property) => {
    const haystack = `${property.title} ${property.location} ${property.price}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}
