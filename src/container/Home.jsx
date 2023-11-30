import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { FaSearchengin } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import Project from "./Projects";
import Sign from "./Sign";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileDetails } from "../conponents";
import { SET_SEARCH_TERM } from "../context/actions/searchActions";


const Home = () => {
  const user = useSelector(state => state.user?.user);
  const searchTerm = useSelector((state) =>
  state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
);
const dispatch = useDispatch();

  const [isSideMenu, setisSideMenu] = useState(false);
  return (
    <>
      <div
        className={`w-2 ${
          isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2] "
        } min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out `}
      >
        {/* {anchor} */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setisSideMenu(!isSideMenu)}
          className=" w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
        >
          <HiChevronDoubleLeft className="text-white text-xls" />
        </motion.div>

        <div className="overflow-hidden w-full flex flex-col gap-4">
          {/* icon */}
          <Link to={"/home"}>
            <img
              src={Logo}
              alt="Logo"
              className=" object-contain w-40 h-auto flex items-center justify-center m-auto"
            ></img>
          </Link>
          {/* start coding */}
          <Link to={"/newProject"}>
            <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
              <p className="text-gray-400 group-hover:text-gray-200 capitalize">
                Start Coding
              </p>
            </div>
          </Link>

          {/* home nav  */}
          {user && (
            <Link
              to={"/home/projects"}
              className="flex items-center justify-center gap-1"
            >
              <MdHome className="text-primaryText  text-xl" />
              <p className="text-lg text-primaryText">Home</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12 scrollbar-hide">
        {/* top section */}
        <div className=" w-full  flex items-center justify-center gap-3">
          {/* search section */}
          <div className=" bg-secondary w-full flex px-4 py-3 rounded-md items-center justify-between gap-3">
            <FaSearchengin className="text-2xl text-primaryText" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
              className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
              placeholder="Search here..."
            />
          </div>
          {/* profile section */}
          {!user && (
            <motion.div whileTap={{scale: 0.9}} className="flex items-center justify-center ">
              <Link
                to={"/home/auth"}
                className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700"
              >
                SignUp
              </Link>
            </motion.div>
          )}
          {user && <UserProfileDetails/>}
        </div>

        {/* bottom section */}
        <div className="w-full">
        <Routes>
            <Route path="/*" element = {<Project/>} />
            <Route path="/auth" element = {<Sign/>} />
        </Routes>    
        </div>
      </div>
    </>
  );
};

export default Home;
