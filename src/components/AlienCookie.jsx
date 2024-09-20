import "./AlienCookie.css";
import UseTimer from "./UseTimer";

function HandleCookieClick() {
  const timer = UseTimer();
  console.log("Handling Click...");
}

export default function AlienCookie() {
  return (
    <div className="CookieBox">
      <div className="AlienCookie" onClick={HandleCookieClick}></div>
    </div>
  );
}
