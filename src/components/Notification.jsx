import { useState, useEffect } from "react";
export default function Notification(message, duration) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
