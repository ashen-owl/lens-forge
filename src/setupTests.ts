import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver =
  window.ResizeObserver ||
  (ResizeObserverMock as unknown as typeof ResizeObserver);

if (!window.URL.createObjectURL) {
  window.URL.createObjectURL = jest.fn(() => "blob:prescription");
}

if (!window.URL.revokeObjectURL) {
  window.URL.revokeObjectURL = jest.fn();
}
