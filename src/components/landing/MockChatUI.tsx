import { formatDate } from "../../../shared/utils/formatDate";

export const MockChatUI = () => {
  const date = new Date();
  const dummyName = "Brendan Eich";
  const messages = [
    "Hey Brendan, I’ve always been fascinated - how did you actually manage to create JavaScript in just 7 days?",
    "It wasn’t magic. I focused on the smallest possible core that would be useful in the browser, iterated fast, and ignored anything non-essential.",
    "Wow. So rapid prototyping and ruthless scope control — got it. Trying to apply that mindset to my own micro-SaaS now.",
    "You got it. Good luck!",
  ];

  return (
    <div className="p-8">
      <h1 className="px-4 py-2 text-sm border border-base-100 bg-base-200 rounded-3xl">
        {formatDate(date, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h1>

      <img src="" />
    </div>
  );
};
