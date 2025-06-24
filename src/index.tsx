import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ContextProvider } from "./common/ContextProvider";
import { handleApiError } from "./utils/handleApiError";

// 원래는 root로 되어있음. public의 index.html의 root로 되어 있는데
// 웹팩 설정에서 src의 index.html부터 번들링을 시작한다했으니 해당 html의 id를 가져와야함.
const root = ReactDOM.createRoot(document.getElementById("content") as HTMLElement);
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => handleApiError(error),
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => handleApiError(error),
  }),
});
root.render(
  // <React.StrictMode>
  <ContextProvider>
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  </ContextProvider>
  // </React.StrictMode>
);
