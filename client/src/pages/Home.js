import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Home.css";

function Home(){
    return (
        <div className="container">
            <img
            src={require("../assets/logo.jpg")}
            className="logo"
          />
            <input type="text" placeholder="Search Recipe" className="search-bar" />
        </div>
    );
}

export default Home;