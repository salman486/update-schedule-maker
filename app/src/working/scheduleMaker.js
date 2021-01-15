// import { makeSchedule } from "./app.js";
let allTeams = [];
let allFixes = [];
let initMatch = 0;
export default function scheduleMaker() {
  let textToCopy = "";
  notWithArray();
  const matches = [];
  const arr = allTeams.map((team) => [
    team["teamName"],
    team["teamValue"],
    team["notwith"],
  ]);

  while (arr.length > 0) {
    app(arr, matches);
  }

  matches.forEach((match) => {
    const text = `${match[0].padEnd(10)}VS    ${match[1]}`;
    textToCopy += text + "\n";
  });
}

function app(arr, matches) {
  const playerMatch =
    arr.length - 1 === 1
      ? matchFixer(arr[0][1], arr.length - 1)
      : matchFixer(
          arr[0][1],
          arr.length - 1 - arr[0][2].length === 0
            ? arr.length - 1
            : arr.length - 1 - arr[0][2].length
        );

  if (!playerMatch["player0"]) {
    makeMatch(matches, arr);
  }

  const copiedArr =
    arr.length - 1 === 1
      ? arr
      : arr.filter(
          (el) =>
            !arr[0][2]
              .map((team) => team + " ")
              .join("")
              .includes(el[0] + " ")
        );

  matchOrganizer(playerMatch, copiedArr, matches, 1);
  removeFixes(arr);
  arr.shift();
  sortArray(arr);

  matchChecker(arr);
}

function matchOrganizer(orgMatches, totalMatches, saveMatches, currPlayer) {
  let player = currPlayer;
  let selfMatches = orgMatches["player0"];
  if (selfMatches) {
    for (let i = 1; i <= selfMatches; i++) {
      saveMatches.push([totalMatches[0][0], totalMatches[0][0]]);
    }
    totalMatches.shift();
    return;
  }

  for (let i of Object.values(orgMatches)) {
    for (let j = 0; j < i; j++) {
      saveMatches[initMatch].push(totalMatches[player][0]);
      totalMatches[player][1] -= 1;
      initMatch++;
    }
    player++;
  }
  // totalMatches.shift();
}

function makeMatch(saveMatches, totalMatches) {
  for (let i = 1; i <= totalMatches[0][1]; i++) {
    saveMatches.push([totalMatches[0][0]]);
  }
}

function matchFixer(totalMatches, totalPlayers) {
  let matches = {};
  let remainingMatches = totalMatches;

  if (totalPlayers === 0) {
    matches["player0"] = totalMatches / 2;
    return matches;
  }

  if (totalPlayers === 1) {
    matches["player1"] = 1;
    for (let i = 1; i < totalMatches; i++) {
      matches["player1"] += 1;
    }
    return matches;
  }

  if (totalPlayers === 2 && totalMatches > 1) {
    matches["player1"] = 1;
    matches["player2"] = 1;
    const matchForPlayOne = Math.ceil(totalMatches / 2);
    const matchForPlayTwo = Math.trunc(totalMatches / 2);

    for (let i = 1; i < matchForPlayOne; i++) {
      matches["player1"] += 1;
    }
    for (let i = 1; i < matchForPlayTwo; i++) {
      matches["player2"] += 1;
    }
    return matches;
  }

  if (remainingMatches > totalPlayers) {
    remainingMatches -= totalPlayers;

    for (let i = 1; i <= totalPlayers; i++) {
      matches[`player${i}`] = 1;
    }
  } else {
    for (let i = 1; i <= totalMatches; i++) {
      matches[`player${i}`] = 1;
    }
    return matches;
  }
  let i = 1;

  while (remainingMatches > 0) {
    if (Math.trunc(totalPlayers / 2 - i) === 0) {
      let match = Math.ceil(remainingMatches / Math.trunc(totalPlayers / 2));
      remainingMatches -= match;
      matches[`player${i}`] += match;
      i++;
    } else {
      let match = Math.ceil(
        remainingMatches / Math.trunc(totalPlayers / 2 - i)
      );
      remainingMatches -= match;
      matches[`player${i}`] += match;
      i++;
    }
  }
  return matches;
}

function matchChecker(arr) {
  arr.forEach((team, i) => {
    if (team[1] === 0) {
      arr.splice(i, 1);
    }
  });
}

function sortArray(arr) {
  arr.sort((a, b) => b[1] + b[2].length - (a[1] + a[2].length));
}

export function getTeams(teams) {
  allTeams = [...teams];
}

export function getFixes(fixes) {
  allFixes = [...fixes];
}

function removeFixes(arr) {
  arr.forEach((team, i) => {
    if (
      team[2]
        .map((team) => team + " ")
        .join("")
        .includes(arr[0][0])
    ) {
      arr[i][2].splice(
        arr[i][2].findIndex((ele) => ele === arr[0][0]),
        1
      );
    }
  });
}

function notWithArray() {
  allTeams.shift();
  allFixes.shift();
  allFixes.forEach((ele) => delete ele["key"]);
  allTeams.forEach((ele) => delete ele["teamId"]);

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
  allTeams.forEach((team, i) => {
    if (!team["notwith"]) {
      allTeams[i]["notwith"] = [];
    }
  });
  const allTeamsNames = [];
  allTeams.forEach((team) => {
    allTeamsNames.push(team["teamName"].toLowerCase());
  });

  let shouldBeInNotWith = [];
  allTeams.forEach((team) => {
    let counter = 0;
    for (const ele of team["notwith"]) {
      allTeamsNames.forEach((teamName) => {
        if (ele.toLowerCase() === teamName) {
          shouldBeInNotWith.push(ele);
        }
      });
      counter++;
    }
    counter = 0;
    team["notwith"] = [...shouldBeInNotWith];
    shouldBeInNotWith = [];
  });
}

// getTeams([
//   12,
//   { teamName: "salman", teamValue: 2 },
//   { teamName: "rizwan", teamValue: 3 },
//   { teamName: "irha", teamValue: 1 },
//   { teamName: "hamza", teamValue: 2 },
//   { teamName: "umair", teamValue: 4 },
// ]);

getTeams([
  12,
  { teamName: "salman", teamValue: 12 },
  { teamName: "rizwan", teamValue: 10 },
  { teamName: "irha", teamValue: 6 },
  { teamName: "hamza", teamValue: 8 },
  { teamName: "dawood", teamValue: 20 },
  { teamName: "ibrahim", teamValue: 24 },
  { teamName: "dev", teamValue: 10 },
  { teamName: "awais", teamValue: 6 },
  { teamName: "shahzaib", teamValue: 6 },
  { teamName: "ali", teamValue: 2 },
  { teamName: "ahmed", teamValue: 3 },
  { teamName: "haider", teamValue: 1 },
  { teamName: "junaid", teamValue: 5 },
  { teamName: "bilal", teamValue: 5 },
  { teamName: "umair", teamValue: 7 },
  { teamName: "zubair", teamValue: 3 },
]);

// getFixes([12, { salman: ["umair"] }]);

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
