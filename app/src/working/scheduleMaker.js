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
  sortArray(arr);
  while (arr.length > 0) {
    app(arr, matches);
  }

  matches.forEach((match, index) => {
    const text = `${(index + 1 + ".").padStart(4).padEnd(5)}${
      match[0][0].toUpperCase() + match[0].slice(1)
    } VS ${match[1][0].toUpperCase() + match[1].slice(1)}`;
    textToCopy += text + "\n";
  });
  let el = document.createElement("textarea");
  el.value = textToCopy;
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

function app(arr, matches) {
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
  const playerMatch =
    arr.length - 1 === 1
      ? matchFixer(arr[0][1], arr.length - 1)
      : matchFixer(
          arr[0][1],
          arr.length - 1 - arr[0][2].length === 0
            ? arr.length - 1
            : arr.length - 1 - arr[0][2].length,
          copiedArr
        );

  if (!playerMatch["player0"]) {
    makeMatch(matches, arr);
  }
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
}

function makeMatch(saveMatches, totalMatches) {
  let remainingMatches = 0;
  totalMatches.forEach((match, i) => {
    if (i > 0) {
      remainingMatches += match[1];
    }
  });
  if (totalMatches[0][1] > remainingMatches) {
    let self = (totalMatches[0][1] - remainingMatches) / 2;
    remainingMatches = totalMatches[0][1] - self * 2;
    totalMatches[0][1] -= self * 2;

    while (self !== 0) {
      saveMatches.push([totalMatches[0][0], totalMatches[0][0]]);
      self--;
      initMatch--;
    }
  } else {
    remainingMatches = totalMatches[0][1];
  }

  for (let i = 1; i <= remainingMatches; i++) {
    saveMatches.push([totalMatches[0][0]]);
  }
}

function matchFixer(totalMatches, totalPlayers, arr) {
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
    let matchWithEveryOne = Math.trunc(remainingMatches / totalPlayers);

    let counter = 1;

    while (matchWithEveryOne !== 0) {
      if (counter === 1) {
        remainingMatches -= totalPlayers;
      }
      for (let i = 1; i <= totalPlayers; i++) {
        if (counter === 1) {
          matches[`player${i}`] = 1;
        } else {
          if (arr[i][1] >= 9) {
            matches[`player${i}`] += 1;
            remainingMatches--;
          } else {
            break;
          }
        }
      }
      counter++;
      matchWithEveryOne--;
    }
  } else {
    for (let i = 1; i <= totalMatches; i++) {
      matches[`player${i}`] = 1;
    }
    return matches;
  }
  let i = 1;
  while (remainingMatches > 0) {
    if (arr[i]) {
      if (Math.trunc(totalPlayers / 2 - i) <= 1) {
        let match = Math.ceil(remainingMatches / Math.trunc(totalPlayers / 2));
        if (arr[i][1] >= match) {
          remainingMatches -= match;
          matches[`player${i}`] += match;
        } else {
          remainingMatches -= arr[i][1];
          matches[`player${i}`] += arr[i][1];
        }
        i++;
      } else {
        let match = Math.ceil(
          remainingMatches / Math.trunc(totalPlayers / 2 - i)
        );
        if (arr[i][1] - matches[`player${i}`] >= match) {
          remainingMatches -= match;
          matches[`player${i}`] += match;
        } else {
          remainingMatches -= arr[i][1] - matches[`player${i}`];
          matches[`player${i}`] += arr[i][1] - matches[`player${i}`];
        }
        i++;
      }
    } else {
      i--;
      if (remainingMatches === arr[i][1] - matches[`player${i}`]) {
        remainingMatches -= arr[i][1] - matches[`player${i}`];
        matches[`player${i}`] += arr[i][1] - matches[`player${i}`];
      } else if (remainingMatches < arr[i][1] - matches[`player${i}`]) {
        remainingMatches = 0;
        matches[`player${i}`] += remainingMatches;
      } else {
        remainingMatches -= arr[i][1] - matches[`player${i}`];
        matches[`player${i}`] += arr[i][1] - matches[`player${i}`];
        i--;
      }
    }
  }
  return matches;
}

function matchChecker(arr) {
  const indexes = [];
  arr.forEach((team, i) => {
    if (team[1] <= 0) {
      indexes.push(i);
    }
  });
  indexes.forEach((index, i) => {
    arr.splice(index - i, 1);
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
    for (const ele of team["notwith"]) {
      allTeamsNames.forEach((teamName) => {
        if (ele.toLowerCase() === teamName) {
          shouldBeInNotWith.push(ele);
        }
      });
    }
    team["notwith"] = [...shouldBeInNotWith];
    shouldBeInNotWith = [];
  });
}
