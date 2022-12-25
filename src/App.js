import React from "react"
import './App.css';
import { BrowserRouter, Navigate, Outlet, Route,Routes } from 'react-router-dom'

import {Home,Login,Register,BookingCar,Startup} from './pages' 

function App() {
  return (
    <div className="App">
    <BrowserRouter>  
      <Routes>
        <Route path='/' element={<Startup />}/>
        <Route  path = '/home' element={<Home />}/>
        <Route  path = '/login' element={<Login />}/>
        <Route  path = '/Register' element={<Register />}/>
       
        <Route  path = '/booking/:id' element={  <ProtectedOutlet /> }>
          <Route path="" element={<BookingCar/>} />
        </Route>
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;

export function ProtectedOutlet(props){

  const user = localStorage.getItem('user');
  return user ? <Outlet/> :  <Navigate to = '/login'/> 

} 