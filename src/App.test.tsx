import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import App from "./App";
import { store } from "./store";

const renderWidget = (productId = "demo-frame") => {
  document.body.innerHTML = `
    <div id="lensforge" data-testid="widget" data-product-id="${productId}"></div>
  `;

  const root = screen.getByTestId("widget");

  return render(
    <Provider store={store}>
      <ConfigProvider theme={{ token: { colorPrimary: "#0f766e" } }}>
        <App />
      </ConfigProvider>
    </Provider>,
    { container: root }
  );
};

const clickNext = async () => {
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
};

describe("non-prescription flow on the mock API", () => {
  it("reaches the finish screen and emits lensforge:add-to-cart with $300", async () => {
    renderWidget();

    expect(
      await screen.findByText("What do you use your glasses for?", {}, {
        timeout: 4000,
      })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Non-prescription"));
    expect(
      await screen.findByText("Lens Type", {}, { timeout: 4000 })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Clear"));
    await clickNext();
    expect(
      await screen.findByText("Lens Options", {}, { timeout: 4000 })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("CR39 Lens"));
    await clickNext();
    expect(
      await screen.findByText("Available coatings", {}, { timeout: 4000 })
    ).toBeInTheDocument();

    await clickNext();
    expect(
      await screen.findByText("Review your selection", {}, {
        timeout: 4000,
      })
    ).toBeInTheDocument();

    await waitFor(
      () => {
        const totals = screen.getAllByText("$300");
        expect(totals.length).toBeGreaterThan(0);
      },
      { timeout: 4000 }
    );

    const widget = screen.getByTestId("widget");
    const handler = jest.fn();
    widget.addEventListener("lensforge:add-to-cart", handler);

    const addToCart = await screen.findByRole(
      "button",
      { name: "Add To Cart" },
      { timeout: 4000 }
    );
    fireEvent.click(addToCart);

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));

    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail.productId).toBe("demo-frame");
    expect(event.detail.totalPrice).toBe(300);
    expect(event.detail.values.prescriptionType).toBe("nonPrescription");

    widget.removeEventListener("lensforge:add-to-cart", handler);
  });

  it("shows a product-not-found state for an unknown id", async () => {
    renderWidget("unknown-frame");

    expect(
      await screen.findByText("Product not found", {}, { timeout: 4000 })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });

  it("emits lensforge:close from Back to frame", async () => {
    renderWidget();

    const backToFrame = await screen.findByRole(
      "button",
      { name: "Back to frame" },
      { timeout: 4000 }
    );

    const widget = screen.getByTestId("widget");
    const handler = jest.fn();
    widget.addEventListener("lensforge:close", handler);

    fireEvent.click(backToFrame);

    expect(handler).toHaveBeenCalledTimes(1);

    widget.removeEventListener("lensforge:close", handler);
  });
});
