import React from 'react';
import './App.css';
// import Mouse from './components/Mouse';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Integration from './components/Integration';
import Highlights from './components/Highlights';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    { 
      path: "/",
      element: <>
      <Navbar/>
      <Landing/>
      <Integration/>
      <Highlights/>
      <Footer/>
      </>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/homepage",
      element: <Homepage/>
    }
  ]);

  return (
    <>
    <RouterProvider router={router} />
  </>
  );
}

export default App;
