import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from '../src/pages/Home'
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Aboutus from "./pages/Aboutus";
import ForgotPassword from "./pages/ForgotPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ContactUs from "./pages/ContactUs";
import Error from "./components/common/Error";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";

function App() { 
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>} />
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>} />
        <Route path="/about" element={<Aboutus/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path="/forgot-password" element = {<OpenRoute><ForgotPassword/></OpenRoute>} />
        <Route path="/update-password/:token" element = {<OpenRoute><UpdatePassword/></OpenRoute>} />
        <Route path="/verify-email" element = {<OpenRoute><VerifyEmail/></OpenRoute>} />
        <Route element = {<PrivateRoute><Dashboard/></PrivateRoute>}>
            <Route path="dashboard/my-profile" element={<MyProfile/>} />
        </Route>
        <Route path="*" element = {<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
