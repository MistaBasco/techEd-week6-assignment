import "./NotifyUser.css";
import { useState, useEffect } from "react";

export default function NotifyUser({ message, duration }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={`NotifyUser box ${visible ? "show" : "hidden"}`}>
      <p>{message}</p>
    </div>
  );
}
