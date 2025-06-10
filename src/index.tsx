import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 원래는 root로 되어있음. public의 index.html의 root로 되어 있는데
// 웹팩 설정에서 src의 index.html부터 번들링을 시작한다했으니 해당 html의 id를 가져와야함.
const root = ReactDOM.createRoot(document.getElementById("content") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
