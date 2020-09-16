import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

fifaData.forEach(item => {
    if (item.Year === 2014 && item.Stage === "Final") {
        let winner = item["Home Team Goals"] > item["Away Team Goals"] ? item["Home Team Name"] : item["Away Team Name"];
        console.log(`${item["Home Team Name"]}, ${item["Away Team Name"]}, ${item["Home Team Goals"]}, ${item["Away Team Goals"]}, ${winner}`)
    }
})

// ******************************************************************************************************

let winData = fifaData.filter(item => {
    return (item.Year === 2014) && (item.Stage === "Final")
})
let winner = winData[0]["Home Team Goals"] > winData[0]["Away Team Goals"] ? winData[0]["Home Team Name"] : winData[0]["Away Team Name"];

console.log(winData[0]["Home Team Name"]);
console.log(winData[0]["Away Team Name"]);
console.log(winData[0]["Home Team Goals"]);
console.log(winData[0]["Away Team Goals"]);
console.log(winner);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(arr) {

    let filteredData = arr.filter(item => item.Stage === "Final");
    return filteredData;

};

console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(cb, data) {

    let filteredData = cb(data);
    return filteredData.map(item => item.Year);

};

console.log(getYears(getFinals, fifaData));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(cb, data) {

    let filteredData = cb(data);
    let winners = filteredData.map(item => {
        winner = item["Home Team Goals"] > item["Away Team Goals"] ? item["Home Team Name"] : item["Away Team Name"]
        return winner;
    })

    return winners;

};

console.log(getWinners(getFinals, fifaData));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(cb1, cb2, data) {
    let winners = cb1(getFinals, data);
    let finals = cb2(getFinals, data);
    let winByYear = [];
    
    for (let i = 0; i < winners.length; i++) {
        winByYear.push(`In ${finals[i]}, ${winners[i]} won the world cup!`)
    }
    return winByYear;
};

console.log(getWinnersByYear(getWinners, getYears, fifaData));

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {

    let home = data.map(item => item["Home Team Goals"]);
    let away = data.map(item => item["Away Team Goals"])

    function getTotals(variable) {
        return variable.reduce((total, item) => {
            return total += item;
        }, 0);
    }

    let homeTotal = getTotals(home);
    let awayTotal = getTotals(away);
    
    return (`Home Average: ${homeTotal / data.length} Away Average: ${awayTotal / data.length}`)

};

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
    let teamFinals = data.filter(item => {
        return (initials === item["Home Team Initials"] || initials === item["Away Team Initials"]) && item.Stage === "Final"; 
    })

    let wins = teamFinals.filter(item => {
        if ((item["Home Team Initials"] === initials && item["Home Team Goals"] > item["Away Team Goals"]) || 
         (item["Away Team Initials"] === initials && item["Home Team Goals"] < item["Away Team Goals"])) {
             return item;
        }
    })
    return wins.length;
};

console.log(getCountryWins(fifaData, "GER"));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    // filters data to get all the final games
    let filteredData = data.filter(item => item.Stage === "Final");

    // puts all team names into one array, including duplicates
    let teamNames = filteredData.map(item => item["Home Team Name"])
    filteredData.forEach(item => teamNames.push(item["Away Team Name"]));

    // start with empty object - is this key defined? - if not, make the key the current item and give it a value of one - if so, increment the value of the existing key by one
    // extract keys and values of resulting object back into a multidimensional array [[key1, value1][key2, value2]] and so on
    let appearances = Object.entries(teamNames.reduce((acc, item) => {
          acc[item] = acc[item] === undefined ? 1 : acc[item] += 1;
          return acc;
    }, {}))
    
    // push zero on the end of every mini-array to act as a counter for each team
    for (let i = 0; i < appearances.length; i++) {
        appearances[i].push(0);
    }

    //creates another multidimensional array - [[team name, team goals]] for every team and number of goals they scored in the each game
    let teamGoals = filteredData.map(item => [item["Home Team Name"], item["Home Team Goals"]])
    filteredData.forEach(item => teamGoals.push([item["Away Team Name"], item["Away Team Goals"]]))

    //compares appearances and team Goals - if teamGoals team name === appearances team name, increment the counter in appearances by the number of goals in teamGoals array
    for (let i = 0; i < teamGoals.length; i++) {
        for (let j = 0; j < appearances.length; j++) {
            if(teamGoals[i][0] === appearances[j][0]) {
                appearances[j][2] += teamGoals[i][1];
            }
        }
    }

    //divides total geam goals by number of appearances and shoves them into yet another array - [[Team Name, Average]]
    let avgs = appearances.map(item => {
        return [item[0], item[2]/item[1]]
    })

    // push the averages only into the maxArr array, then feed it into Math.max to find the maximum average
    // turns out two teams achieved the maximum average, so then push [Team Name, Average] into the most array
    let maxArr = [];
    let most = [];

    for (let i = 0; i < avgs.length; i++) {
        maxArr.push(avgs[i][1]);
        let max = Math.max(...maxArr);
        if (avgs[i][1] === max) {
            most.push(avgs[i])
        }
    }
    //return most array, which has uruguay and england both at an average of 4 goals per game
    return most;
};

console.log(getGoals(fifaData));


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

// **************************Some Pieces***************************************
    // let homeTeam = filteredData.map(item => {
    //     return item["Home Team Name"]
    // })

    // let awayTeam = filteredData.map(item => {
    //     return item["Away Team Name"]
    // })

    // let teamNames = [...homeTeam, ...awayTeam]

    // let appearances = teamNames.reduce((acc, item) => {
    //       acc[item] = acc[item] === undefined ? 1 : acc[item] += 1;
    //       return acc;

    // }, {})

    // console.log(Object.values(appearances));

    // let arr = [];
    // let final = {};


    // let homeReduce = filteredData.reduce((acc, current) => {
    //     acc[current["Home Team Name"]] = current["Home Team Goals"]
    //     return acc;
    // }, {})
    // let awayReduce = filteredData.reduce((acc, current) => {
    //     acc[current["Away Team Name"]] = current["Away Team Goals"]
    //     return acc;
    // }, {})

    // arr.push(homeReduce, awayReduce);
    
    // arr.forEach(item => {
    //     for (let [key, value] of Object.entries(item)) {
    //         if (final[key]) {
    //             final[key] += value;
    //         } else {
    //             final[key] = value;
    //         }
    //     }
    // })
    // console.log(Object.values(final));

    // let finalArr = []

    // function blahblah(arr1, arr2) {
    //     for (let i = 0; i < arr1.length; i++) {
    //         finalArr.push(arr2[i] / arr1[i])
    //     }
    // }
    // return finalArr;