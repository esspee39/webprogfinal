import logo from './nuwo.png';
import React, { useState } from "react";
import './Banner.css';

function Banner(){
  return (
    <div className = "Banner">
      <img src ={logo} height="60" width="60"/>
      Owen's Pokemon App
      <img className="flipped" src ={logo} height="60" width="60" />
    </div>
  );
};


export default Banner;
