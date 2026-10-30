export type ApiMode = "mock" | "http";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const withTrailingSlash = (value: string) =>
  value.endsWith("/") ? value : `${value}/`;

const readEnv = (name: string): string | undefined => {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
};

export const API_MODE: ApiMode = readEnv("REACT_APP_API_MODE") === "http"
  ? "http"
  : "mock";

export const API_URL = withTrailingSlash(
  readEnv("REACT_APP_API_URL") ??
    (process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/")
);

export const BASE_URL = withTrailingSlash(readEnv("REACT_APP_BASE_URL") ?? "/");

export const DEFAULT_PRODUCT_ID =
  readEnv("REACT_APP_DEFAULT_PRODUCT_ID") ?? "demo-frame";

export const WIDGET_CONTAINER_ID = "lensforge";

export const getWidgetContainer = (): HTMLElement | null =>
  typeof document === "undefined"
    ? null
    : document.getElementById(WIDGET_CONTAINER_ID);

export const assetUrl = (path: string): string => {
  if (/^(?:https?:|data:|blob:)/i.test(path)) {
    return path;
  }

  return `${BASE_URL}${path.replace(/^\/+/, "")}`;
};

export const getUploadToken = (): string =>
  getWidgetContainer()?.dataset.uploadToken ?? "";

export const resolveProductId = (): string => {
  const containerProductId = getWidgetContainer()?.dataset.productId?.trim();

  if (containerProductId) {
    return containerProductId;
  }

  if (typeof window !== "undefined") {
    const queryProductId = new URLSearchParams(window.location.search)
      .get("productId")
      ?.trim();

    if (queryProductId) {
      return queryProductId;
    }
  }

  return DEFAULT_PRODUCT_ID;
};

export const apiBaseUrl = trimTrailingSlash(API_URL);
