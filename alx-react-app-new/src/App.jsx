import { useState } from 'react'

import './App.css'
import WelcomeMessage from './components/WelcomeMessage.jsx'
import Header from './components/Header.jsx';


import MainContent from './components/MainContent.jsx';

import UserProfile from './components/UserProfile.jsx'; 
import Footer from './components/Footer.jsx';
import Counter from './components/Counter.jsx';
function App() {
  

  return (
    <>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <Footer />
      <Counter />


    </>
  )
}

export default App
