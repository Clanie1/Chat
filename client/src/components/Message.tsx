type messageType = "receibed" | "sent";

const Message = ({ text, type }: { text: string; type?: messageType }) => {
  if (type == null) {
    type = "receibed";
  }

  return (
    <div
      className={
        "h-fit w-fit px-6 py-2 text-white rounded-xl shadow-md " +
        (type == "receibed" ? " bg-blue-500 text-white" : "bg-slate-300")
      }
    >
      {text}
    </div>
  );
};

export default Message;
