import { useEffect, useState } from "react";

export default function UseTimer() {
  console.log("useTimer hook called");
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useTimer hook useEffect callback");
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => {
      console.log("useTimer hook useEffect cleanup");
      clearInterval(interval);
    };
  }, []);
  return count;
}
