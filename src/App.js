import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Links from './components/sections/Links';
import Appearance from './components/sections/Appearance';
import Settings from './components/sections/Settings';
import { useState,useEffect, StrictMode } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Error404 from './components/Error404';
import Login from './components/Login';
import PrivateRoutes from './components/utils/PrivateRoutes';
import amplitude from 'amplitude-js'
import Sponser from './components/sections/Sponsers';
import Axios from 'axios'
import Cookies from 'js-cookie';
import {login} from './redux'



function App() {
  // axios.defaults.withCredentials = true
  const dispatch = useDispatch();
  function SetAuthToken() {
    
    const token = Cookies.get('token')
    console.log(token);
    if (token) {
      Axios.defaults.headers.common['token'] = token;
      dispatch(login(token));
    }
  }
  
  useEffect(() => {
    amplitude.getInstance().init("03d6a3ef367ebf936b2929cc26f7e9d3");
    amplitude.getInstance().logEvent('App_Start');
    SetAuthToken();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoutes/> } StrictMode={true}>
            <Route path="/" element={<Dashboard/>}StrictMode={true} >
              <Route path="" element={<Links />} StrictMode={true}/>
              <Route path='appearance' element={<Appearance StrictMode={true}/>} />
              <Route path='sponsers' element={<Sponser />} StrictMode={true}/>
              <Route path='settings' element={<Settings />} StrictMode={true}/>
            </Route>
          </Route>
          <Route path="/register" element={<Register/>} StrictMode={true}/>
          <Route path="/login" element={<Login/>} StrictMode={true}/>
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
