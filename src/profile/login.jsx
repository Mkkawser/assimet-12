import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase";

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  const notify = () => toast.error(`Invalid Username or Password`);
  const notifySucc = () => toast.success(`Successfully Login`);

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUsers(user);
        notifySucc();
        axios
          .post("https://b9a11-server-side-mkkawser.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((val) => console.log(val.data))
          .catch((err) => console.log(err));
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => console.log(err.message));
  };

  const onSubmit = (data) => {
    const { Email, password } = data;
    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        notifySucc();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
        notify();
      });
  };

  return (
    <>
      <div className="">
        <Helmet>
          <title>Login Page</title>
        </Helmet>

        <div className="hero bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
            </div>
            <div className="card shrink-0 shadow-2xl bg-base-100">
              <form
                className="flex flex-col p-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="input input-bordered"
                  type="email"
                  placeholder="Email"
                  {...register("Email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                <input
                  className="input input-bordered my-2"
                  type="text"
                  placeholder="password"
                  {...register("password", { required: true })}
                />

                <input
                  className="btn btn-[#fff] my-3"
                  type="submit"
                  placeholder="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 gap-4 text-white">
        <button
          className="p-4 bg-[#d45a5a] inline-flex rounded-lg"
          onClick={handleGoogle}
        >
          Google
        </button>
      </div>
      <NavLink
        className="btn btn-success flex items-center justify-center "
        to={"/reg"}
      >
        Register
      </NavLink>
      <Toaster />
    </>
  );
};

export default Login;
