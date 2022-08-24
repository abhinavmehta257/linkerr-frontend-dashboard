import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Links from './components/sections/Links';
import Appearance from './components/sections/Appearance';
import Settings from './components/sections/Settings';
import { useState,useEffect } from 'react';
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
          <Route path="/" element={<PrivateRoutes/>} >
            <Route path="/" element={<Dashboard/>} >
              <Route path="" element={<Links />} />
              <Route path='appearance' element={<Appearance />} />
              <Route path='sponsers' element={<Sponser />} />
              <Route path='settings' element={<Settings />} />
            </Route>
          </Route>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
