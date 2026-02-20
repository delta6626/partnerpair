import type { ReactElement } from "react";

export const DemoUserCollection = ({
  title,
  sideElement,
  demoUsers,
}: {
  title: string;
  sideElement: ReactElement;
  demoUsers: ReactElement[];
}) => {
  return (
    <div className="flex flex-col gap-2 border border-base-100 p-8 rounded-3xl select-none">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-medium text-lg">{title}</h1>
        {sideElement}
      </div>

      {demoUsers}
    </div>
  );
};
