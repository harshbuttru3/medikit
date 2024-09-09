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
import PhoneSignIn from './components/Phone';
import Profilesetup from './components/Profilesetup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookOPD from './components/BookOPD';
import Homenav from "./components/Homenav";

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
      element: 
      <>
      <Homenav/>
      <Homepage/>
      </>
      
    },
    {
      path: "/phoneSignin",
      element: <PhoneSignIn/>
    },
    {
      path: "/onboarding",
      element: <Profilesetup/>
    },
    {
      path: "/opdbooking",
      element: <BookOPD/>
    }
  ]);

  return (
    <>
    <RouterProvider router={router} />
  </>
  );
}

export default App;
