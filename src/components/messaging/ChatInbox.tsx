export const ChatInbox = () => {
  return (
    <div className="flex min-w-100 flex-col gap-4">
      <input className="input w-full bg-base-200 border-none" type="text" placeholder={"Search chats"} />
      <div className="flex flex-1 bg-base-200 rounded-3xl"></div>
    </div>
  );
};
