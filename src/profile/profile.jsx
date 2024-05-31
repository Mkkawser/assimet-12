import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase/firebase";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // No user is signed in
        setUser(null);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  // console.log(auth?.currentUser?.uid);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user?.displayName}!</p>
          <p>Email: {user?.email}</p>
          <img src={user?.photoURL} alt="photoUER" />
          <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
};

export default UserProfile;
