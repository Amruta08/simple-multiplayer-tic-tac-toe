import React, { useState } from "react";
import Game from "./Game";
// hook that helps us to access the client
import { useChatContext, Channel } from "stream-chat-react";
import { channelReducer } from "stream-chat-react/dist/components/Channel/channelState";
import CustomInput from "./CustomInput";

export default function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("user not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
    console.log(newChannel);
  };

  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h3>Join Game</h3>
          <input
            placeholder="Username of rival..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}>Join/Start game</button>
        </div>
      )}
    </>
  );
}
