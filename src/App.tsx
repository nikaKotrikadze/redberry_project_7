import React from "react";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import BerryBlog from "./components/Blog/BerryBlog";
import BerryAddBlog from "./components/AddBlog/BerryAddBlog";
import { useSuccessfulLoginRequestStore } from "./components/Login/login.store";

function App() {
  const { isSuccessful }: any = useSuccessfulLoginRequestStore();
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/blogs/:id" element={<BerryBlog />} />
      {isSuccessful && <Route path="/add-blog" element={<BerryAddBlog />} />}
    </Routes>
  );
}

export default App;
