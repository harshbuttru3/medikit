import { useState } from 'react'
import './App.css'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import PageA from './components/PageA'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Navbar/>
      <PageA/>
      <Landing/>
    </>
  )
}

export default App;
