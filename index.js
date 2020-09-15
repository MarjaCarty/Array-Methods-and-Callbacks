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

function getAverageGoals(/* code here */) {

    /* code here */

};

getAverageGoals();

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

};

getCountryWins();


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
