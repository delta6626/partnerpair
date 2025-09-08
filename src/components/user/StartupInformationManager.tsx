export const StartupInformationManager = () => {
  return (
    <>
      <div className="mt-4 flex items-center">
        <p className="">Your Startup Background</p>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p>Do you have a startup?</p>
          <div className="flex gap-4">
            <div className="">
              <label htmlFor="radio1" className="mr-2">
                Yes
              </label>
              <input type="radio" name="radio1" className="radio radio-primary" />
            </div>
            <div className="">
              <label htmlFor="radio2" className="mr-2">
                No
              </label>
              <input type="radio" name="radio2" className="radio radio-primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
