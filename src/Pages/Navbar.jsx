import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then()
      .catch()
  }

  const links = <div className="flex flex-row justify-center items-center md:flex-row gap-2">
    <li><NavLink to="/" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Home </NavLink></li>

    <li><NavLink to="/dashboard" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Dashboard </NavLink></li>
    
    
    {
      user ?
        <div className="flex flex-row justify-center items-center ">

          <img src={user.photoURL} alt="" className="w-[50px] h-[50px] rounded-full m-5" />
          <button onClick={handleSignOut} className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Log Out</button>
        </div>
        :
        <div className="flex gap-2">
          <Link to={"/login"} className="flex ">
            <button className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Log In</button>
          </Link>
          <li><NavLink to="/register" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Register</NavLink></li>
        </div>
    }
  </div>

  return (
    <div className="flex justify-between h-[80px] items-center bg-gray-300 shadow-lg lg:px-16 lg:py-5">
      <div className="flex justify-between items-center gap-5">
        
        <div>

          <img className="h-[100px]" src="https://i.ibb.co/yY0RBtT/image-removebg-preview-1.png" alt="" />
        </div>
      </div>
      <div className="lg:flex mx-10">
        <ul className="menu menu-horizontal px-1 gap-5">
          {links}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;