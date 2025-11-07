//import logoIteci from '..//assets/iteci-logo.jpeg';
//import logoIteci from '../../iteci-logo.jpeg';
import logoIteci from '../../assets/iteci-logo.jpeg';
/*
import logoIteci from '../../assets/iteci-logo.png';
import logoIteci from '../../assets/iteci-logo.svg';
import logoIteci from '../../assets/iteci-logo.jpg';
*/
import './MainPage.css';
//import './pages/MainPage/components/Chat'

import MenuRoot from "./components/menu1/MenuRoot";


import Header from "./components/header/Header";
import React, { useState } from 'react';





function MainPage() {
  
    console.log("Current Environment iTECi:", process.env.NODE_ENV);
    return (

      <div className="chat-wrapper">
        
        <Header></Header>


          <MenuRoot />
         
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
export default MainPage;
