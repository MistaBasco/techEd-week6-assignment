/* eslint-disable react/prop-types */

import "./AlienCookie.css";

export default function AlienCookie({
  setCurrentCookieCount,
  setTotalCookieCount,
}) {
  function HandleCookieClick() {
    setCurrentCookieCount((prevCount) => prevCount + 1);
    setTotalCookieCount((prevTotal) => prevTotal + 1);
    console.log("Handling Click...");
  }
  return (
    <div className="CookieBox">
      <div
        className="AlienCookie"
        onClick={() => {
          HandleCookieClick();
        }}
      ></div>
      <div className="cookieShadow"></div>
    </div>
  );
}
