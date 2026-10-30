import { AssociationsBetweenBEandFEType } from "./types";

export function findItemById(
  id: string,
  associationsList: AssociationsBetweenBEandFEType
) {
  const found = associationsList.find((item) => item.FEField === id);
  return found?.BEField || id;
}

export function useFindBackEndIdByFrontendId() {
  return { findItemById };
}
