import logoIteci from './assets/iteci-logo.jpeg';
import './App.css';
import './components/Chat'
import MenuRoot from "./components/menu1/MenuRoot";
import Header from "./components/header/Header";
import React, { useState } from 'react';


function App() {

    console.log("Current Environment iTECi:", process.env.NODE_ENV);
    return (

      <div className="chat-wrapper">
        <h2>BIENVENIDO A GRUPO ITECI</h2>
        <Header></Header>


          <MenuRoot />
          {/* ApiComponent for making API calls */}
          {/*
          <ChatResponse text={textData} onApiResponse={setApiResponse} />
          */}
      </div>
  );
}
function Header2() {
  return (
      <header className="App-header">
         <img src={logoIteci} className="App-logo" alt="logo" />
      </header>
  )
}
export default App;
