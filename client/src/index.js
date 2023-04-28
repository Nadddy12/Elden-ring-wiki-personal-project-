import ReactDOM from 'react-dom/client';
import "./index.scss";
import App from './App';
import {Provider} from "react-redux";
import configureAppStore from "./store/store";
import {BrowserRouter} from "react-router-dom";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary.js";
import ErrorFallback from "./components/errorboundary/ErrorFallback.js";

const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary fallback={< ErrorFallback />}>
          <App/>
        </ErrorBoundary>
      </BrowserRouter>
  </Provider>
);