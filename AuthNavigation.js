import React, { useEffect, useState } from "react";
import { SignedInOutStack, SignedInStack } from "./navigation";
import { auth } from "./firebase/config";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const userHandler = async (authUser) => {
    setCurrentUser(authUser);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        userHandler(authUser);
      }else{
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return <>{currentUser ? <SignedInStack /> : <SignedInOutStack />}</>;
};

export default AuthNavigation;
