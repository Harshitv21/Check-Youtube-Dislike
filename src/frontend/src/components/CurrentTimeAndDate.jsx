import { useEffect, useState } from "react";

export const CurrentTimeAndDate = ({ setCurrentTime, currentTime }) => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-IN", { hour12: true }));
      setCurrentDate(new Date().toLocaleDateString("en-IN"));
    }, 1000);
  }, [setCurrentTime]);

  return (
    <div className="dateTimeContainer">
      <p className="clockAndDate">
        Current Time and Date: {currentTime} {currentDate}
      </p>
    </div>
  );
};
