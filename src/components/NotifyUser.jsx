import { useState, useEffect } from "react";
export default function NotifyUser(message, duration) {
  //make visible
  setTimeout(() => {
    //make invisible
  }, duration);

  return (
    <div className="NotifyUser">
      <p>{message}</p>
    </div>
  );
}
