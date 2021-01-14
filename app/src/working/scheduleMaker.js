let allTeams = [];
let allFixes = [];
export default function scheduleMaker() {
  allTeams.shift();
  allFixes.shift();
  allFixes.forEach((ele) => delete ele["key"]);
  console.log(allTeams);
  console.log(allFixes);
}

export function getTeams(teams) {
  allTeams = [...teams];
}

export function getFixes(fixes) {
  allFixes = [...fixes];
}
