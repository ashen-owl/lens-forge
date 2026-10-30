import { resolveProductId } from "./config";

describe("resolveProductId", () => {
  const initialHtml = document.body.innerHTML;
  const initialUrl = window.location.href;

  afterEach(() => {
    document.body.innerHTML = initialHtml;
    window.history.replaceState({}, "", initialUrl);
  });

  it("prefers data-product-id on the widget container", () => {
    document.body.innerHTML =
      '<div id="lensforge" data-product-id="container-frame"></div>';
    window.history.replaceState({}, "", "/?productId=query-frame");

    expect(resolveProductId()).toBe("container-frame");
  });

  it("falls back to the productId query parameter", () => {
    document.body.innerHTML = '<div id="lensforge"></div>';
    window.history.replaceState({}, "", "/?productId=query-frame");

    expect(resolveProductId()).toBe("query-frame");
  });

  it("falls back to the default product id", () => {
    document.body.innerHTML = '<div id="lensforge"></div>';
    window.history.replaceState({}, "", "/");

    expect(resolveProductId()).toBe("demo-frame");
  });
});
