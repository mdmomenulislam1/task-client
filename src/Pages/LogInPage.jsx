import { useContext, useRef, useState } from "react";
import { BsEye, BsEyeSlash, BsGoogle } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { Helmet } from "react-helmet";

import { AuthContext } from "../Firebase/AuthProvider";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiousPublic";
import { toast } from "react-toastify";



const LogInPage = () => {
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null)

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast('🦄 Wow so easy!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate(location?.state ? location.state : '/');
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          profile: result?.user?.photoURL,
          role: ''
        }
        axiosPublic.post('/user', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              console.log('user added to the database')
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User created successfully.',
                showConfirmButton: false,
                timer: 1500
              });


            }
          });
      })
      .catch(() => {
        swal("Sorry!", "Try again!", "error");
      })
  }

  const { signIn, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log('location i n the login page', location)

  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setShowPassword(password);
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        swal("Welcome!", "Log In successfully!", "success");
        navigate(location?.state ? location.state : '/');


      })
      .catch(error => {
        console.log(error);
        swal("Sorry!", "Email or Password doesn't match. Try Again!", "error");
      })
  }

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    console.log(email);
    if (!email) {
      swal("Sorry!", "Right email please!", "error");
      return;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      swal("Sorry!", "Valid email please!", "error");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        swal("Okay!", "Check your email please!", "success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        swal("Sorry!", "Valid email please!", "error");
      });
  }

  return (
    <div className="mx-5 md:mx-10 lg:mx-15 my-5 md:my-10 lg:my-15">
      {
        user ?
          <div className="text-center">
            <Helmet>
              <title>{'Task Manager || My Profile'}</title>
            </Helmet>
            <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">My Information</h2>
            <img src={user?.photoURL} alt="" className="rounded-lg mx-auto my-3" />
            <p className="my-3 font-bold">Welcome</p>
            <p className="my-3 font-bold text-pink-800">Name: {user?.displayName}</p>
            <p className="my-3 font-bold">Email: {user?.email}</p>
          </div> :
          <div className="">
            <Helmet>
              <title>{'Task Manager || Login '}</title>
            </Helmet>
            <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">LogIn Page</h2>
            <div className="border-x-4 border-pink-800 p-5">
              <form onSubmit={handleLogin} className="w-full">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black text-2xl font-bold">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    placeholder="Email"
                    className="input input-bordered border-pink-800 text-black" required />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-black text-2xl font-bold">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered border-pink-800 text-black" required />
                  <span className="absolute text-4xl right-2 bottom-10" onClick={() => setShowPassword(!showPassword)}>
                    {
                      showPassword ? <BsEye></BsEye> : <BsEyeSlash></BsEyeSlash>
                    }
                  </span>
                  <label className="label">
                    <a onClick={handleResetPassword} href="#" className="label-text-alt text-black link link-hover font-semibold">Forgot password?</a>

                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="bg-pink-800 font-bold text-center hover:bg-yellow-800 text-white p-3 rounded-lg">Login</button>
                </div>
              </form>
              <p className="font-bold mt-4"> Are you New? Please <Link to="/registration" className="text-pink-800 font-extrabold"> <span> Register</span></Link></p>
            </div>

            <div className="flex justify-center items-center py-3 rounded-b-lg border-b-4 border-pink-800 border-x-4">

              <Link onClick={handleGoogleSignIn} className=" gap-2 flex justify-center items-center">

                <button className="text-2xl font-bold px-5 bg-pink-800 rounded-2xl py-3 text-white"><BsGoogle className="text-white mb-1 inline mx-3"></BsGoogle> Google</button>
              </Link>

            </div>
          </div>
      }
    </div>
  );
};

export default LogInPage;