import { useState } from "react";
import { Range } from "react-range";
import moment from "moment";

export default function Home() {
  const [values, setValues] = useState([
    moment().hour() * 60 + moment().minutes()
  ]);

  const formatTime = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="w-1/2 py-4 bg-white rounded shadow">
        <Range
          step={1}
          min={0}
          max={1439}
          values={values}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div {...props} className="h-1 bg-blue-300 rounded cursor-pointer">
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="w-6 h-6 bg-blue-600 rounded-full focus:outline-none"
            />
          )}
        />
        <div className="text-center mt-4 text-lg">
          Selected time: {formatTime(values[0])}
        </div>
      </div>
    </div>
  );
}
