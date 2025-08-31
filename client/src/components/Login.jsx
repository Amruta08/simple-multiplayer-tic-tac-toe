import React, {useState} from "react";
import Axios from 'axios'
import Cookies from 'universal-cookie'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies()

    const Login = ({setIsAuth}) => {
      Axios.post("http://localhost:3001/login",{
        username,
        password,
      }).then(res =>{
      // after making response get back the necessary data
      const { token, firstName, lastName, username, userId } = res.data;

      // set cookies for data
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true)
    })
    };
  
    return (
      <div className="Login">
        <label>Login</label>
        <input
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={Login}>Login</button>
      </div>
    );
}
