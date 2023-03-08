import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import Favorite from "./pages/Favorites";
import Home from "./pages/Home";
import MyRecipe from "./pages/Myrecipe";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path ="/" element={<Home/>} />
        <Route path ="/favorites" element={<Favorite/>} />
        <Route path ="/myrecipe" element={<MyRecipe/>} />
      </Routes>
    </>
  );
}

export default App;
