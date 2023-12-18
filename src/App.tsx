import React from "react";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import BerryBlog from "./components/Blog/BerryBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/blogs/:id" element={<BerryBlog />} />
    </Routes>
  );
}

export default App;
