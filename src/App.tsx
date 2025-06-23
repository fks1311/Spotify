import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useExchangeToken } from "./hooks/useExchangeToken";
import { useRecoilValue } from "recoil";
import { triggerAtom } from "./utils/atom";
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistDetailPage"));
const PlaylistPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistPage"));

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const codeVerifier = sessionStorage.getItem("code_verifier");
  const trigger = useRecoilValue(triggerAtom);

  const { mutate: exchageToken } = useExchangeToken();

  useEffect(() => {
    const fetchToken = async () => {
      if (code && codeVerifier) {
        exchageToken({ code, codeVerifier });
      }
    };
    fetchToken();
  }, [code, codeVerifier, trigger]);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
