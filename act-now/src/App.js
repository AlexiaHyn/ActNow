import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route element={<HomePage/>} path='/'></Route>
      <Route element={<LoginPage/>} path='/login'></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
