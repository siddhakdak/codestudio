import React, { useState } from "react";
import { Logo } from "../assets";
import { Userinput } from "../conponents";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";
import { signInWithGithub, signInWithGoogle } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidation, setGetEmailValidation] = useState(false);
  const [islogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");

  const createNewUser = async () => {
    if (getEmailValidation) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailAndPassword = async () => {
    if (getEmailValidation) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => {console.log(err.message);
        if(err.message.includes("invalid-login-credentials")){
          setAlert(true)
          setAlertMessage("Invalid Email or Password")
        }
        else{
          setAlert(true)
          setAlertMessage("Temporarily disabled due to many failed attempts ☹")
        }
        setInterval(() => {
          setAlert(false)
          
        }, 4000);
  });
}
};

  return (
    <div className="w-full py-6">
      <img
        src={Logo}
        alt="Logo"
        className=" object-contain w-32 h-auto opacity-50"
      ></img>

      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText">Join with us! 🤩</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          {/* email */}
          <Userinput
            label="Email"
            placeholder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidation={setGetEmailValidation}
          />

          {/* password */}
          <Userinput
            label="password"
            placeholder="password"
            isPass={true}
            key="password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          {/* error msg */}
          {/* here AnimatePresence is used because if we do not use exit animation will not occour by using this the child node will wait until exit animattion will done  */}
          <AnimatePresence>
            {alert && (
              <motion.p
                key="AlertMessage"
                {...fadeInOut}
                className="text-red-500"
              >
                {AlertMessage}
              </motion.p>
            )}
          </AnimatePresence>

          {/* login button */}
          {!islogin ? (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center bg-emerald-500 px-6 py-2 rounded-md  w-full text-white text-lg cursor-pointer hover:bg-emerald-700"
            >
              <p className="text-xl text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailAndPassword}
              whileTap={{ scale: 0.9 }}
              className=" flex items-center justify-center bg-emerald-500 px-6 py-2 rounded-md w-full text-white text-lg cursor-pointer hover:bg-emerald-700"
            >
              <p className="text-xl text-white">Login</p>
            </motion.div>
          )}

          {!islogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already have an account!{" "}
              <span
                onClick={() => setIsLogin(!islogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>{" "}
            </p>
          ) : (
            <p
              onClick={() => setIsLogin(!islogin)}
              className="text-sm text-primaryText flex items-center justify-center gap-3"
            >
              Doesn't have an account!{" "}
              <span className="text-emerald-500 cursor-pointer">
                Create Here
              </span>{" "}
            </p>
          )}
          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className=" h-[1px] rounded-md w-24 bg-[rgba(256,256,256,0.2)]"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] rounded-md w-24 bg-[rgba(256,256,256,0.2)]"></div>
          </div>

          {/* sign in with google */}
          <motion.div
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.9 }}
            className=" flex items-center justify-center gap-3 bg-[rgba(265,265,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(265,265,265,0.4)] cursor-pointer"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in with Google</p>
          </motion.div>
          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className=" h-[1px] rounded-md w-24 bg-[rgba(256,256,256,0.2)]"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] rounded-md w-24 bg-[rgba(256,256,256,0.2)]"></div>
          </div>

          {/* sign in with github */}
          <motion.div
            onClick={signInWithGithub}
            whileTap={{ scale: 0.9 }}
            className=" flex items-center justify-center gap-3 bg-[rgba(265,265,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(265,265,265,0.4)] cursor-pointer"
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign in with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
