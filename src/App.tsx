import "./App.css";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Roadsteps } from "./components/Roadsteps/Roadsteps";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";
import { Screen } from "./components/Screen/Screen";
import { useBackendResponseAnalyzer } from "./helpers/useBackendResponseAnalyzer";
import { useDispatch, useSelector } from "./store";
import { fetchProduct } from "./store/product";
import {
  productDataSelector,
  productErrorSelector,
  productStatusSelector,
} from "./store/product/selectors";
import { assetUrl, resolveProductId } from "./api/config";
import { dispatchLensForgeEvent } from "./helpers/hostEvents";

const App = () => {
  const dispatch = useDispatch();
  const {
    getBackendData,
    data: valuesData,
    error: valuesError,
  } = useBackendResponseAnalyzer();
  const product = useSelector(productDataSelector);
  const productStatus = useSelector(productStatusSelector);
  const productError = useSelector(productErrorSelector);

  useEffect(() => {
    dispatch(fetchProduct(resolveProductId()));
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      getBackendData();
    }
  }, [getBackendData, product]);

  const retryValues = () => {
    getBackendData();
  };

  const isLoading =
    productStatus !== "failed" &&
    (!product || (!valuesData && !valuesError));

  if (isLoading) {
    return (
      <div className="App">
        <div className="lensforge_loading">
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 48, color: "#0f766e" }}
                spin
              />
            }
          />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (productStatus === "failed") {
      return (
        <Flex gap="middle">
          <div className="lensforge_image" />
          <div className="lensforge_status">
            <h2 className="title">Product not found</h2>
            <p className="screen_description">
              {productError ?? "We could not find the requested frame."}
            </p>
            <button
              className="button"
              onClick={() => dispatch(fetchProduct(resolveProductId()))}
            >
              Try again
            </button>
          </div>
        </Flex>
      );
    }

    if (valuesError) {
      return (
        <Flex gap="middle">
          <div className="lensforge_image" />
          <div className="lensforge_status">
            <h2 className="title">Could not load lens prices</h2>
            <p className="screen_description">{valuesError}</p>
            <button className="button" onClick={retryValues}>
              Try again
            </button>
          </div>
        </Flex>
      );
    }

    return (
      <Flex gap="middle">
        <ProductDescription />
        <Screen />
      </Flex>
    );
  };

  return (
    <div className="App">
      <header className="lensforge_header">
        <div className="container-default">
          <div className="header-wrapper">
            <img
              className="logo"
              src={assetUrl("images/logo/logo.svg")}
              alt="LensForge"
            />
            <Roadsteps />
            <button
              id="start_live_chat"
              onClick={() => dispatchLensForgeEvent("help")}
            >
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.68381 0.040181C8.7262 0.149574 9.9246 0.568705 10.7814 1.1235C11.9441 1.87641 12.8392 2.99873 13.239 4.20483C13.3717 4.60525 13.4786 5.09415 13.4786 5.30045C13.4786 5.47021 13.5297 5.49488 13.9533 5.52949C15.3129 5.64057 16.8721 6.30401 17.9984 7.25061C20.347 9.22443 20.6668 12.3978 18.7562 14.7718C18.5067 15.0819 18.4719 15.1459 18.4371 15.3591C18.3397 15.9565 18.5642 16.7078 18.9836 17.1874C19.2386 17.4791 19.2748 17.6004 19.1681 17.8069C19.0807 17.9761 18.9243 18.0213 18.5287 17.9914C17.6321 17.9236 16.7102 17.5447 16.0337 16.9658C15.8324 16.7936 15.8316 16.7933 15.6814 16.8462C15.1808 17.0224 14.2363 17.1773 13.4591 17.2105C10.4351 17.3396 7.70234 15.6528 6.78277 13.0894C6.68125 12.8063 6.53072 12.1452 6.5116 11.8984C6.4994 11.7409 6.503 11.7421 5.77779 11.6641C5.35186 11.6183 4.60128 11.4652 4.32574 11.3678L4.16718 11.3118L3.9654 11.4844C3.28897 12.0633 2.36706 12.4422 1.47044 12.51C1.07488 12.5399 0.918407 12.4947 0.830999 12.3255C0.724361 12.119 0.760519 11.9977 1.01558 11.706C1.43491 11.2264 1.65944 10.4751 1.56203 9.87765C1.52728 9.66446 1.49249 9.60049 1.24294 9.29036C-0.64377 6.946 -0.356493 3.81291 1.92737 1.82586C3.45921 0.493062 5.61811 -0.176608 7.68381 0.040181ZM6.14915 0.818931C5.03398 0.943555 3.97978 1.32165 3.08055 1.91944C2.58671 2.24774 1.83285 2.99513 1.54546 3.44135C1.27354 3.8635 1.16393 4.08307 1.01777 4.49848C0.473827 6.04451 0.860006 7.69934 2.088 9.08418C2.28755 9.30923 2.35815 9.61004 2.35334 10.2148C2.34982 10.6569 2.27563 11.0246 2.11704 11.3856C2.06591 11.502 2.03268 11.6058 2.0432 11.6163C2.06931 11.6425 2.50423 11.482 2.77255 11.3471C3.02523 11.2202 3.54545 10.8354 3.74297 10.6294C3.91263 10.4524 4.02231 10.4487 4.50508 10.6036C4.70179 10.6667 5.05544 10.7546 5.29096 10.7988C5.72463 10.8803 6.44221 10.963 6.48545 10.9365C6.49843 10.9285 6.52032 10.8025 6.53412 10.6565C6.58869 10.0778 6.89719 9.19498 7.24666 8.61748C7.51513 8.17372 7.87422 7.72918 8.25805 7.36525L8.59751 7.04341H6.01679C4.09917 7.04341 3.40969 7.03139 3.33354 6.99663C3.2215 6.94549 3.11963 6.78133 3.11963 6.65189C3.11963 6.52245 3.2215 6.35828 3.33354 6.30715C3.41031 6.2721 4.23321 6.26036 6.61335 6.26036H9.79063L10.1417 6.10782C10.8361 5.80618 11.6372 5.58904 12.2551 5.53489C12.7355 5.49284 12.7111 5.51082 12.6815 5.22171C12.6256 4.676 12.3274 3.9001 11.9596 3.34347C10.7916 1.57611 8.45554 0.561149 6.14915 0.818931ZM10.1907 3.96584C10.5296 4.15397 10.3878 4.69424 9.99957 4.69424C9.8015 4.69424 9.60867 4.50298 9.60867 4.30651C9.60867 4.01255 9.933 3.82274 10.1907 3.96584ZM8.6271 3.96584C8.88909 4.11126 8.88049 4.52538 8.61295 4.64745C8.46593 4.71456 3.48056 4.71456 3.33354 4.64745C3.2215 4.59632 3.11963 4.43215 3.11963 4.30271C3.11963 4.17327 3.2215 4.00911 3.33354 3.95797C3.49014 3.88648 8.4976 3.89392 8.6271 3.96584ZM11.8129 6.39512C10.5708 6.65361 9.53823 7.19454 8.707 8.02212C5.78686 10.9294 7.53316 15.4747 11.8955 16.3212C12.9649 16.5287 14.3701 16.4374 15.4733 16.0887C16.0127 15.9182 16.0549 15.924 16.3654 16.2098C16.6575 16.4787 16.9609 16.6949 17.2509 16.8408C17.4987 16.9654 17.9309 17.1229 17.9559 17.0977C17.9665 17.0872 17.9332 16.9834 17.8821 16.867C17.7262 16.5121 17.6512 16.1388 17.6466 15.6962C17.6405 15.0934 17.7112 14.7911 17.9112 14.5656C19.4532 12.8266 19.6474 10.7089 18.4322 8.8836C18.1571 8.4703 17.3753 7.70443 16.9186 7.40084C16.0453 6.82028 14.996 6.43701 13.9086 6.30143C13.3909 6.2369 12.3496 6.28346 11.8129 6.39512ZM16.6798 10.2303C17.0186 10.4184 16.8769 10.9587 16.4886 10.9587C16.2905 10.9587 16.0977 10.7674 16.0977 10.571C16.0977 10.277 16.422 10.0872 16.6798 10.2303ZM15.1161 10.2303C15.3781 10.3757 15.3695 10.7898 15.102 10.9119C14.955 10.979 9.96959 10.979 9.82257 10.9119C9.71054 10.8608 9.60867 10.6966 9.60867 10.5672C9.60867 10.4377 9.71054 10.2736 9.82257 10.2224C9.97917 10.1509 14.9866 10.1584 15.1161 10.2303ZM16.6798 12.5795C16.9417 12.7249 16.9331 13.139 16.6656 13.2611C16.518 13.3285 9.97018 13.3285 9.82257 13.2611C9.71054 13.21 9.60867 13.0458 9.60867 12.9163C9.60867 12.7869 9.71054 12.6227 9.82257 12.5716C9.97983 12.4998 16.5499 12.5074 16.6798 12.5795Z"
                  fill="#0f766e"
                />
              </svg>
              <span>Need help?</span>
            </button>
            <button
              id="lensforge__close"
              onClick={() => dispatchLensForgeEvent("close")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.8281 0C18.9583 0 19.0885 0 19.2188 0C19.6198 0.119792 19.875 0.385417 20 0.78125C20 0.911458 20 1.04167 20 1.17188C19.9062 1.46354 19.7031 1.68229 19.4896 1.89583C16.8438 4.53646 14.1979 7.1875 11.5521 9.83333C11.5 9.88542 11.4479 9.94271 11.375 10.0208C11.4479 10.0833 11.5104 10.1302 11.5677 10.1875C14.2031 12.8229 16.8438 15.4635 19.4792 18.099C19.6979 18.3177 19.901 18.5365 20 18.8333C20 18.9635 20 19.0938 20 19.224C19.875 19.6198 19.6146 19.8802 19.2188 20.0052C19.0885 20.0052 18.9583 20.0052 18.8281 20.0052C18.5365 19.9115 18.3177 19.7083 18.1042 19.4948C15.4635 16.8438 12.8125 14.1979 10.1667 11.5521C10.1146 11.5 10.0573 11.4479 9.97396 11.3698C9.91146 11.4479 9.86979 11.5156 9.81771 11.5677C7.17708 14.2083 4.53125 16.849 1.89583 19.4896C1.68229 19.7031 1.46875 19.9062 1.17188 20C1.04167 20 0.911458 20 0.78125 20C0.390625 19.8698 0.125 19.6146 0 19.2188C0 19.0885 0 18.9583 0 18.8281C0.09375 18.5365 0.296875 18.3177 0.510417 18.1042C3.15625 15.4635 5.80208 12.8125 8.44792 10.1667C8.5 10.1146 8.55208 10.0573 8.63542 9.97396C8.55208 9.91146 8.48438 9.86458 8.42188 9.80208C5.78125 7.16146 3.14062 4.52083 0.494792 1.88021C0.286458 1.67188 0.09375 1.45833 0 1.17188C0 1.04167 0 0.911458 0 0.78125C0.125 0.385417 0.385417 0.125 0.78125 0C0.911458 0 1.04167 0 1.17188 0C1.45833 0.0885417 1.67187 0.286458 1.88021 0.494792C4.53125 3.14583 7.18229 5.79688 9.82812 8.45313C9.88021 8.50521 9.90625 8.58854 9.94271 8.65625C9.97396 8.64583 10.0052 8.63542 10.0365 8.61979C10.0885 8.55208 10.1354 8.47917 10.1927 8.42188C12.8385 5.78125 15.4792 3.14062 18.1198 0.494792C18.3281 0.286458 18.5417 0.0885417 18.8281 0Z"
                  fill="#5E5E5E"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main className="lensforge_main">
        <div className="container-default">{renderContent()}</div>
      </main>
    </div>
  );
};
export default App;
