export const StepCard = ({
  step,
  stepTitle,
  stepContent,
}: {
  step: string;
  stepTitle: string;
  stepContent: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-6xl font-semibold text-accent">{step}</h1>
      <h1 className="text-2xl">{stepTitle}</h1>
      <p className="text-accent max-w-xs">{stepContent}</p>
    </div>
  );
};
