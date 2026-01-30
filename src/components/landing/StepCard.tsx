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
      <h1 className="text-6xl font-semibold text-primary">{step}</h1>
      <h1 className="text-2xl">{stepTitle}</h1>
      <h1 className="text-accent max-w-xs">{stepContent}</h1>
    </div>
  );
};
