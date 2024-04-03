/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IframePages } from "./Pages/IframesPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<IframePages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
