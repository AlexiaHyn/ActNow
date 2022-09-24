import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import "./stylings/styleAH.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import SignupPage from './pages/SignupPage';

function App() {
  return (
   <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route element={<HomePage/>} path='/home'></Route>
      <Route element={<LoginPage/>} path='/login'></Route>
      <Route element={<SignupPage/>} path='/signup'></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
