let allTeams = [];
let allFixes = [];
export default function scheduleMaker() {
  allTeams.shift();
  allFixes.shift();
  allFixes.forEach((ele) => delete ele["key"]);
  allTeams.forEach((ele) => delete ele["teamId"]);

  nowWithArray(allTeams, allFixes);

  console.log(allTeams);
  console.log(allFixes);
}

export function getTeams(teams) {
  allTeams = [...teams];
}

export function getFixes(fixes) {
  allFixes = [...fixes];
}

function nowWithArray(allTeams, allFixes) {
  allTeams.forEach((team) => {
    allFixes.forEach((fix) => {
      for (const i of Object.entries(fix)) {
        if (i[0].toLowerCase() === team["teamName"].toLowerCase()) {
          team["notwith"]
            ? team["notwith"].push(...i[1])
            : (team["notwith"] = i[1]);
          allTeams.forEach((secondTeam) => {
            for (const oppo of i[1]) {
              if (secondTeam["teamName"] === oppo) {
                secondTeam["notwith"]
                  ? secondTeam["notwith"].push(team["teamName"])
                  : (secondTeam["notwith"] = [team["teamName"]]);
              }
            }
          });
        }
      }
    });
  });
}

getTeams([
  12,
  { teamName: "salman", teamValue: 12 },
  { teamName: "rizwan", teamValue: 10 },
  { teamName: "irha", teamValue: 16 },
  { teamName: "hamza", teamValue: 18 },
  { teamName: "dawood", teamValue: 28 },
  { teamName: "ibrahim", teamValue: 24 },
  { teamName: "dev", teamValue: 20 },
  { teamName: "awais", teamValue: 20 },
  { teamName: "shahzaib", teamValue: 20 },
  { teamName: "ali", teamValue: 20 },
  { teamName: "ahmed", teamValue: 20 },
  { teamName: "haider", teamValue: 20 },
  { teamName: "junaid", teamValue: 20 },
  { teamName: "bilal", teamValue: 20 },
  { teamName: "umair", teamValue: 20 },
  { teamName: "zubair", teamValue: 20 },
]);

getFixes([
  12,
  { salman: ["rizwan", "irha", "hamza", "awais", "ali", "dev"] },
  { irha: ["hamza", "dev"] },
  { ali: ["ahmed", "haider"] },
  { haider: ["ali"] },
  { junaid: ["bilal"] },
  { umair: ["zubair"] },
  { ibrahim: ["dawood"] },
  { shahzaid: ["hamza", "awais"] },
]);
scheduleMaker();
