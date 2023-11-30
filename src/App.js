import React, { useEffect, useState } from "react";
import Home from "./container/Home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { auth, db } from "./config/firebase.config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { Spinner } from "./conponents";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import {SET_PROJECTS} from"./context/actions/projectActions";
import { NewProject } from "./container";

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            // dispatch data to redux store
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", { replace: true });
          }
        );
      } else {
        navigate("./home", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });

    // clean up listner event
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    );

    const unsubscribe = onSnapshot(projectQuery, (querySnaps) => {
      const projectList = querySnaps.docs.map((doc) => doc.data());
      dispatch(SET_PROJECTS(projectList));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/NewProject" element={<NewProject />} />
            {/* {* if the route is not matching} */}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
};
export default App;
