import { useState, useEffect } from "react";
import { Range } from "react-range";
import moment from "moment";

export default function Home() {
  const [values, setValues] = useState([
    moment().hour() * 60 + moment().minutes()
  ]);
  const [countdown, setCountdown] = useState("");

  const formatTime = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      let selectedTime = moment(formatTime(values[0]), "HH:mm");

      // If the selected time is before the current time, add 1 day to the selected time
      if (selectedTime.isBefore(now)) {
        selectedTime = selectedTime.add(1, "days");
      }

      const duration = moment.duration(selectedTime.diff(now));
      setCountdown(
        `${duration.hours()} hours ${duration.minutes()} minutes ${duration.seconds()} seconds`
      );
    }, 100); // Here we update the countdown every 100 milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [values]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
      <h1 className="text-3xl mb-8 text-white">TIME UNTIL</h1>
      <div className="mx-4 md:w-1/2 py-4 bg-white rounded shadow">
        <Range
          step={1}
          min={0}
          max={1439}
          values={values}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div {...props} className="h-1 bg-black rounded cursor-pointer">
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="w-6 h-6 bg-red-600 rounded-full focus:outline-none"
            />
          )}
        />
        <div className="text-center mt-4 text-lg">
          SELECTED TIME: {formatTime(values[0])}
        </div>
        <div className="text-center mt-4 text-lg">COUNTDOWN: {countdown}</div>
      </div>
    </div>
  );
}
