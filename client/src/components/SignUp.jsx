import React, { useState } from "react";
import Axios from 'axios'
import Cookies from 'universal-cookie'

export default function SignUp() {
  const cookies = new Cookies()
  const [user, setUser] = useState(null);

  // Make a post request to the signup page
  const signUp = ({setIsAuth}) => {
    Axios.post("http://localhost:3001/signup",user).then(res =>{
      // after making response get back the necessary data
      const { token, firstName, lastName, username, hashedPassword, userId } = res.data;

      // set cookies for data
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true)

    })
  };

  return (
    <div className="signUp">
      <label>Sign Up</label>
      <input
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}
