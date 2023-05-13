import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RecoilRoot } from "recoil";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <RecoilRoot>
          <CssBaseline />
          <App />
          <ToastContainer />
        </RecoilRoot>
      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>
);
