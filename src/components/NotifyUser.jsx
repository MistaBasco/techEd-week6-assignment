import "./NotifyUser.css";
import { useState, useEffect } from "react";

export default function NotifyUser({ message, duration, triggerKey }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(false);
      console.log(
        "NotifyUser Function Called. Message: ",
        message,
        "Visible",
        visible,
        "triggerKey",
        triggerKey
      );

      const showTimer = setTimeout(() => {
        setVisible(true); // Show the notification after reset
      }, 10);

      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [duration, message, triggerKey]);

  return (
    <div className={`NotifyUser box ${visible ? "show" : "hidden"}`}>
      <p>{message}</p>
    </div>
  );
}
