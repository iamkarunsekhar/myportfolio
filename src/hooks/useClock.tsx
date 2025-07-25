import { useEffect, useState } from "react";

const useClock = (initialTime = new Date()) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(() => new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default useClock;
