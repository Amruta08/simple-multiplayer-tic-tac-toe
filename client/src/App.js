import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";

function App() {
  const cookies = new Cookies();
  const api_key = "sc26jgps3vky";

  // acces token
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);

  // State to keep track wheter user is loged in or not
  const [isAuth, setIsAuth] = useState(false);

  // connect user to thier specific account
  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  // Upon logging out remove all the cookies
  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  //  in chat component the client object can be passed
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}>Log Out</button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
