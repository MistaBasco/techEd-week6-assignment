import Upgrade from "./Upgrade";
import "./UpgradeList.css";
import { useEffect, useState, useRef } from "react";

export default function UpgradeList() {
  const [upgrades, setUpgrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const listRef = useRef(null); // Reference to the scrollable UpgradeList
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  useEffect(() => {
    async function GetUpgrades() {
      try {
        const response = await fetch("src/assets/upgrades.json");
        const data = await response.json();
        setUpgrades(data);
      } catch (error) {
        console.error("Failed to fetch upgrades:", error);
      } finally {
        setLoading(false);
      }
    }
    GetUpgrades();
  }, []);

  // Check if we can scroll up or down
  function checkScroll() {
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(Math.ceil(scrollTop + clientHeight) < scrollHeight); //needed to round up because scrollTop + clientHeight was .xxx off scrollHeight
  }

  // Scroll up
  function scrollUp() {
    listRef.current.scrollBy({
      top: -50, // Scroll 50px up
      behavior: "smooth",
    });
  }

  // Scroll down
  function scrollDown() {
    listRef.current.scrollBy({
      top: 50, // Scroll 50px down
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // console.log("listRef.current: ", listRef.current);
      if (listRef.current) {
        checkScroll(); // Initial check on mount
        listRef.current.addEventListener("scroll", checkScroll);
      }
    }, 500); //added delay to ensure listref.current is not null.
    const referee = listRef.current;
    return () => {
      clearTimeout(timeoutId);
      if (referee) {
        referee.removeEventListener("scroll", checkScroll); // Cleanup
      }
    };
  }, [listRef.current]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(upgrades);
  // const upgradeList = upgrades.map((upgrade) => (
  //   <Upgrade key={upgrade.id} upgrade={upgrade} />
  // ));
  // console.log(upgradeList);

  // return <div className="UpgradeList">{upgradeList}</div>;

  return (
    <div className="UpgradeListContainer">
      {canScrollUp && (
        <button className="scrollButton up" onClick={scrollUp}>
          ↑
        </button>
      )}

      <div className="UpgradeList" ref={listRef}>
        {upgrades.map((upgrade) => (
          <Upgrade key={upgrade.id} upgrade={upgrade} />
        ))}
      </div>

      {canScrollDown && (
        <button className="scrollButton down" onClick={scrollDown}>
          ↓
        </button>
      )}
    </div>
  );
}
