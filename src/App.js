import logo from './nuwo.png';
import React, { useState } from "react";
import './App.css';
import axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon/";

function getRandomID() {
  return Math.floor(Math.random() * (898 - 1) + 1);
}

function App(){
  const [pokemonA, setPokemonA] = useState("pikachu");
  const [pokemonDataA, setPokemonDataA] = useState([]);

  const [pokemonB, setPokemonB] = useState("pikachu");
  const [pokemonDataB, setPokemonDataB] = useState([]);

  const handleChangeA = (e) => {
    setPokemonA(e.target.value.toLowerCase());
  };
  
  const handleSubmitA = (e) => {
    e.preventDefault();
    getPokemonA();
  };

  const handleChangeB = (e) => {
    setPokemonB(e.target.value.toLowerCase());
  };
  
  const handleSubmitB = (e) => {
    e.preventDefault();
    getPokemonB();
  };

  const getPokemonA = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonA}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonDataA(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  const getPokemonB = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonB}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonDataB(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(pokemonDataA);
  console.log(pokemonDataB);

  return (
    <div className = "App">

      <div className="MonA">
        <form onSubmit={handleSubmitA}>
          <label>
            <input
              type="text"
              onChange={handleChangeA}
              placeholder="Enter Pokemon Name"
            />
          </label>
        </form>
        {pokemonDataA.map((data) => {
          return (
            <div className="container">
             <img src={data.sprites.other["official-artwork"]["front_default"]} height="120" width="120"/>
            </div>
          );
        })}
      </div>

      <div className="MonB">
        <form onSubmit={handleSubmitB}>
          <label>
            <input
              type="text"
              onChange={handleChangeB}
              placeholder="Enter Pokemon Name"
            />
          </label>
        </form>
        {pokemonDataB.map((data) => {
          return (
            <div className="container">
             <img src={data.sprites.other["official-artwork"]["front_default"]} height="120" width="120"/>
            </div>
          );
        })}
      </div>

    </div>
    
  );
};


export default App;
