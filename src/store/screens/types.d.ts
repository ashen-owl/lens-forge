import { DTOType } from "../../api/types";

export type screenState = {
  activeScreen: string;
  valuesData: DTOType | null;
  valuesDataLoader: boolean;
  valuesError: string | null;
  latestRequestId: number;
};
