import { Route, Routes } from "react-router-dom";
import LoginPage from "./Authentication/Login";
import Register from "./Authentication/Register";
import Home from "./components/Home";

const App =() =>{
  return(
    <>
      <Routes>
       <Route path="/" element={<LoginPage/>}/>
       <Route path="/home" element={<Home/>}/>
       <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}
export default App;
