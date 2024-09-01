import React from 'react';
import './App.css';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Integration from './components/Integration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    { 
      path: "/",
      element: <>
      <Navbar/>
      <Landing/>
      <Integration/>
      </>
    },
    {
      path: "/login",
      element: <Login/>
    }
  ]);

  return (
    <>
    <RouterProvider router={router} />
  </>
  );
}

export default App;
