import "./ResetStats.css";

export default function ResetStats({ resetStats }) {
  return (
    <button className="ResetStats box" onClick={resetStats}>
      Reset Stats!
    </button>
  );
}
