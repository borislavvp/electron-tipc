import { useState } from "react";

const App: React.FC = () => {
  const [renderCountValue, setRenderCountValue] = useState(0);

  const setCount = () => window.electronAPI.setCountValue(renderCountValue + 1);

  window.electronAPI.onCountValueChanged(({ value }) =>
    setRenderCountValue(value)
  );

  return (
    <div>
      <div className="flex flex-col items-center rounded p-4 m-6">
        <span className="text-gray-700 text-lg font-semibold">
          Electron Typesafe IPC
        </span>
      </div>
      <div className="flex flex-col items-center rounded p-4 m-6 shadow-inner">
        <button
          className=" w-full bg-indigo-600 hover:bg-indigo-500 cursor-pointer font-semibold text-gray-100 p-4 rounded-md shadow-md"
          onClick={setCount}
        >
          Increase Count
        </button>
        <span className="w-full text-center text-gray-700 font-semibold p-4 rounded-md shadow-inner bg-gray-100 mt-4">
          Count value: {renderCountValue}
        </span>
      </div>
    </div>
  );
};

export default App;
