import "./MatchFixer.css";
export default function getMatchFixes() {
  return (
    <div className="Match-fixer">
      <input type="text" className="MatchFixer-input MatchFixer-input--team1" />
      <span className="notwith">NOT WITH</span>
      <input type="text" className="MatchFixer-input MatchFixer-input--team2" />
      <button className="Match-fixer-newbtn">+</button>
    </div>
  );
}
