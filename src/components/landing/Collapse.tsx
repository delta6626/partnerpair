export const Collapse = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div tabIndex={0} className="collapse collapse-arrow bg-base-200 border border-base-100 rounded-3xl">
      <div className="collapse-title text-lg text-accent">{question}</div>
      <div className="collapse-content">{answer}</div>
    </div>
  );
};
