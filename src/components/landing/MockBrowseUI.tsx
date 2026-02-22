import { ChevronDown, Search } from "lucide-react";

export const MockBrowseUI = () => {
  return (
    <div className="p-8 border rounded-3xl border-base-100 w-lg flex flex-col gap-2 select-none">
      <div className="border border-base-100 w-full flex gap-2 bg-base-200 px-4 py-2 rounded-box text-accent">
        <Search size={20} />
        <h1>Search by name</h1>
      </div>

      <div className="flex gap-2 flex-row">
        <div className="cursor-default px-4 py-2 text-sm border border-base-100 bg-base-200 rounded-box font-medium flex justify-between flex-1">
          Startup Stage
          <ChevronDown size={20} />
        </div>

        <div className="cursor-default px-4 py-2 text-sm border border-base-100 bg-base-200 rounded-box font-medium flex justify-between flex-1">
          Availability they seek
          <ChevronDown size={20} />
        </div>
      </div>

      <div className="max-w-sm border border-base-100 bg-base-200 p-4 rounded-box">
        <div className="mb-2 flex items-center justify-between">
          <h1>Show users with startups</h1>
          <input type="radio" className="radio cursor-default radio-primary" checked={true} />
        </div>
        <div className="flex items-center justify-between">
          <h1>Show users who want to join a startup</h1>
          <input type="radio" className="radio cursor-default" checked={false} />
        </div>

        <div className="mt-4">
          <p className="text-accent">Selected stages</p>
          <div className="mt-2 flex gap-2">
            <div className="px-4 py-3 rounded-full border border-base-100 select-none font-medium text-sm">
              Building MVP
            </div>
            <div className="px-4 py-3 rounded-full border border-base-100 select-none font-medium text-sm">
              Just Launched
            </div>
          </div>
          <p className="mt-4 text-accent">Startup stage options</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <div className="px-4 py-3 rounded-full border border-base-100 select-none font-medium text-sm">Idea</div>
            <div className="px-4 py-3 rounded-full border border-base-100 select-none font-medium text-sm">
              Building MVP
            </div>
            <div className="px-4 py-3 rounded-full border border-base-100 select-none font-medium text-sm">
              Just Launched
            </div>
            <div className="px-4 py-3 rounded-full border border-base-100 select-none font-medium text-sm">Growing</div>
            <div className="px-4 py-3 rounded-full border border-base-100 select-none font-medium text-sm">
              Established
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
