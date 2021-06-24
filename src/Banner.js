import logo from './ball.png';
import React, { useState } from "react";
import './Banner.css';

function Banner(){
  return (
    <div className = "Banner">
      <h4>
      <img className="flipped" src ={logo} height="60" width="60"/>
      Owen's PokeAPI App
      <img className ="img" src ={logo} height="60" width="60" />
      </h4>
    </div>
  );
};


export default Banner;
