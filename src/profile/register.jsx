import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BiSolidHide, BiShow } from "react-icons/bi";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const notifySucc = () => toast.success(`Successfully Register`);
  const notifyEmlEx = () => toast.error(`email already exist`);

  const navigate = useNavigate();
  const onSubmit = (data) => {
    const { name, email, password, photoURL } = data;

    // Check if password meets criteria
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      notify();
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then((val) => {
            console.log(val, "Update");
            notifySucc();
            setTimeout(() => {
              navigate("/");
            }, 3000);
          })
          .catch((error) => {
            console.log("error");
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        notifyEmlEx();
      });
  };

  const notify = () =>
    toast.error(
      `Password must have at least\n one uppercase letter,\n one lowercase letter,\n and be at least 6 characters long`
    );

  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              className="flex flex-col p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="input input-bordered"
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
              />
              <input
                className="input input-bordered my-2"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                })}
              />
              <input
                className="input input-bordered"
                type="text"
                placeholder="photoURL"
                {...register("photoURL", {
                  required: true,
                })}
              />
              <div className="relative">
                <input
                  className="input input-bordered my-2"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...register("password", {
                    required: true,
                  })}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BiShow /> : <BiSolidHide />}
                </button>
              </div>

              <input
                className="btn btn-primary"
                type="submit"
                placeholder="Submit"
              />
            </form>
          </div>
        </div>
      </div>

      <NavLink
        className="btn btn-success flex items-center justify-center"
        to={"/login"}
      >
        Login
      </NavLink>
      <Helmet>
        <title>Registration Page</title>
      </Helmet>
      <Toaster />
    </>
  );
};

export default Register;
