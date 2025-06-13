import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useExchangeToken } from "./hooks/useExchangeToken";
import { useRecoilValue } from "recoil";
import { triggerAtom } from "./utils/atom";
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithPage = React.lazy(() => import("./pages/SearchPage/SearchWithPage"));
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistDetailPage"));
const PlaylistPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistPage"));

function App() {
  const trigger = useRecoilValue(triggerAtom);
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  const { mutate: exchageToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchageToken({ code, codeVerifier });
    }
    if (trigger) {
      window.location.reload();
    }
  }, [code, codeVerifier, trigger]);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
