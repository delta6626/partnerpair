import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { formatDate } from "../../../shared/utils/formatDate";

export const MockChatUI = () => {
  const date = new Date();
  const dummyName = "Brendan Eich";
  const messages = [
    {
      sender: "user",
      text: "Hey Brendan, how did you actually manage to create JavaScript in just 7 days?",
    },
    {
      sender: "brendan",
      text: "I focused on the smallest possible core that would be useful in the browser, iterated fast, and ignored anything non-essential.",
    },
    {
      sender: "user",
      text: "Wow. So rapid prototyping and ruthless scope control - got it. Trying to apply that mindset to my own micro-SaaS now.",
    },
    { sender: "brendan", text: "You got it. Good luck!" },
  ];

  return (
    <div className="p-8 w-full xl:w-xl border border-base-100 rounded-3xl">
      <div className="w-full flex flex-col items-center mb-8">
        <h1 className="text-center text-accent px-4 py-2 text-sm border border-base-100 bg-base-200 rounded-3xl mb-4 w-fit">
          {formatDate(date, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h1>

        <img className="w-15 h-15 rounded-full" src={`${SETTINGS.DICEBEAR_API_URL}${dummyName}`}></img>
        <h1 className="text-lg">{dummyName}</h1>
      </div>

      <div className="flex flex-col gap-4">
        {messages.map((message, index) => {
          const isUser = message.sender === "user";
          return (
            <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[260px] sm:max-w-[300px] xl:max-w-[400px] px-4 py-2 rounded-2xl break-words ${
                  isUser
                    ? "bg-primary rounded-t-3xl rounded-bl-3xl rounded-br-md"
                    : "bg-base-200 rounded-t-3xl rounded-bl-md rounded-br-3xl"
                }`}
              >
                {message.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
