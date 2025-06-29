import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useExchangeToken } from "./hooks/useExchangeToken";
import { useRecoilValue } from "recoil";
import { triggerAtom } from "./utils/atom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistDetailPage"));
const PlaylistPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistPage"));
const TrackPage = React.lazy(() => import("./pages/ExplorePage/track/Track"));
const ArtistPage = React.lazy(() => import("./pages/ExplorePage/artist/Artist"));
const AlbumPage = React.lazy(() => import("./pages/ExplorePage/album/Album"));

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
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="playlist/:id" element={<PlaylistDetailPage />} />
            <Route path="/explore/track/:id" element={<TrackPage />} />
            <Route path="/explore/artist/:id" element={<ArtistPage />} />
            <Route path="/explore/album/:id" element={<AlbumPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
