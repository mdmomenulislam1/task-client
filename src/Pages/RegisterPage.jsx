import { BsEye, BsEyeSlash, BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { GoogleAuthProvider, getAuth, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Firebase/AuthProvider";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiousPublic";
import { toast } from "react-toastify";


const RegisterPage = () => {
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, user } = useContext(AuthContext);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.dark('Okay!', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
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
              // reset();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User created successfully.',
                showConfirmButton: false,
                timer: 1500
              });
              navigate(location?.state ? location.state : '/');
            }
          });
      })
      .catch(() => error)
  }

  const handleRegister = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const photo = form.get('photoURL');
    const email = form.get('email');
    const password = form.get('password');
    setShowPassword(password);
    console.log(name, photo, email, password);

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
      swal("Ohh Nooooo!", "Minimum 8 characters with minimum a CAPITAL letter, a small letter, a number and a special Character!", "error");
    }
    else {
      swal("Go ahead!", "You are in right track!", "success");
      createUser(email, password)
        .then((result) => {

          const userInfo = {
            name: result?.user?.displayName,
            email: result?.user?.email,
            profile: result?.user?.photoURL,
            role: '',
            profession: '',
            bod:'',
            bio:'',
            presentAddress:'',
            permanentAddress:''
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
                navigate(location?.state ? location.state : '/');
              }
            });



        });

    }


  }


  return (
    <div className="mx-5 md:mx-10 lg:md-15 my-5 md:my-10 lg:my-15">

      {
        user ? <div className="text-center">
          <Helmet>
            <title>{'Task Manager || My Profile'}</title>
          </Helmet>
          <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">My Information</h2>

          <img src={user?.photoURL} alt="" className="rounded-lg mx-auto my-3" />
          <p className="my-3 font-bold">Welcome</p>
          <p className="my-3 font-bold text-blue-800">Name: {user?.displayName}</p>
          <p className="my-3 font-bold">Email: {user?.email}</p>
        </div> :
          <div className="">
            <Helmet>
              <title>{'Task Manager || Registration'}</title>
            </Helmet>
            <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Registration Page</h2>
            <form onSubmit={handleRegister} className="border-x-4 rounded-t-lg border-blue-800 p-5">
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-black text-2xl font-bold">Name</span>
                </label>
                <input type="name" name="name" placeholder="Name" className="input input-bordered border-blue-800 text-black" required />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-black text-2xl font-bold">Photo URL</span>
                </label>
                <input type="text" name="photoURL" placeholder="Enter your photoURL" className="input input-bordered border-blue-800 text-black" required />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-black text-2xl font-bold">Email</span>
                </label>
                <input type="email" name="email" placeholder="Email" className="input input-bordered border-blue-800 text-black" required />
              </div>
              <div className="form-control relative mb-3">
                <label className="label">
                  <span className="label-text text-black text-2xl font-bold">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered border-blue-800 text-black" required />
                <span className="absolute text-4xl right-2 bottom-2" onClick={() => setShowPassword(!showPassword)}>
                  {
                    showPassword ? <BsEye></BsEye> : <BsEyeSlash></BsEyeSlash>
                  }
                </span>
              </div>
              <input type="checkbox" name="terms" id="terms" required /> Accept terms and conditions
              <div className="form-control mt-6">
                <button className="bg-blue-800 font-bold text-center hover:bg-blue-800 text-white p-3 rounded-lg">Registration</button>
              </div>
              <p className="flex p-2 font-bold"> Are you old user? Please <Link to="/login" className="px-2 text-blue-800 font-extrabold"><span> Log In</span></Link></p>

            </form>

            <div className="flex justify-center items-center pb-5 border-x-4 rounded-b-lg border-b-4 border-blue-800">

              <Link onClick={handleGoogleSignIn} className=" gap-2 flex justify-center items-center">
                <button className="text-2xl font-bold px-5 bg-blue-800 rounded-2xl py-3 text-white"><BsGoogle className="text-white inline mx-3"></BsGoogle> Google</button>
              </Link>
            </div>
          </div>
      }
    </div>
  );
};

export default RegisterPage;