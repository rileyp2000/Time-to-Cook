import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import Favorite from "./pages/Favorites";
import Home from "./pages/Home";
import MyRecipe from "./pages/Myrecipe";
import Addrecipe from "./pages/Addrecipe";
import { Route, Routes } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import AddForm from "./components/AddForm";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/myrecipe" element={<MyRecipe />} />
        <Route path="/add recipe" element={<Addrecipe />} />
        <Route path="/searchresults/:query" element={<SearchResults />} />
        <Route path="/addform" element={<AddForm />} />

      </Routes>
    </>
  );
}

export default App;
