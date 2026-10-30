import { API_MODE } from "./config";
import { httpApi } from "./http/httpApi";
import { mockApi } from "./mock/mockApi";

export const api = API_MODE === "http" ? httpApi : mockApi;

export * from "./types";
export * from "./config";
