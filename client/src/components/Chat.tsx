import { useState, useEffect } from "react";
import Message from "./Message";

class MessageClass {
  text: string;
  type: string;

  constructor(text: string, type: string) {
    this.text = text;
    this.type = type;
  }
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageClass[]>([]);
  const [webSocket, setWebSocket] = useState<any>(null);

  useEffect(() => {
    let ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = function (event: any) {
      const messageData = event.data;
      const message = new MessageClass(messageData, "receibed");
      setMessages((messages) => [...messages, message]);
    };

    setWebSocket(ws);
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  const addMessage = (message: string) => {
    if (webSocket) {
      webSocket.send(message);
      setMessages([...messages, new MessageClass(message, "sent")]);
    } else {
      console.error("WebSocket is not connected or ready to send messages.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      addMessage(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="m-auto my-10  flex flex-col w-4/5 max-w-[1920px] h-[600px] max-h- p-6 rounded-lg shadow-lg border-[1px] gap-2 justify-end overflow-auto">
      {messages.map((message, index) => {
        const orientation =
          message.type == "receibed" ? "justify-start" : "justify-end";
        return (
          <div className={"flex w-full gap-2 items-center " + orientation}>
            {message.type == "receibed" && (
              <img
                src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec"
                className="w-10 h-10 rounded-full"
              />
            )}
            <Message
              text={message.text}
              type={message.type ? "receibed" : "sent"}
            />
          </div>
        );
      })}
      <input
        className="border-2 rounded-lg px-4 py-2 mt-4"
        onKeyDownCapture={handleKeyPress}
      />
    </div>
  );
};

export default Chat;
