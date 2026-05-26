"use strict";
const playerName = "Test Player Name";
const characterName = "Test Character Name";
const paths = "Test Path";
const level = 1;
const ancestry = "Human";
const strength = 1;
const speed = 1;
const intellect = 1;
const willpower = 1;
const awareness = 1;
const presence = 1;
const healthBonus = 1;
const focusBonus = 1;
const investitureBonus = 1;
const physicalDefenseBonus = 0;
const cognitiveDefenseBonus = 0;
const spiritualDefenseBonus = 0;
const movementBonus = 0;
const recoveryDieBonus = 0;
const deflect = 1;
const hasInvestitureScore = true;
// Calculated stats
const tier = Math.max((Math.floor((level - 1) / 5.0) + 1), 5);
const physicalDefense = 10 + strength + speed + physicalDefenseBonus;
const cognitiveDefense = 10 + intellect + willpower + cognitiveDefenseBonus;
const spiritualDefense = 10 + awareness + presence + spiritualDefenseBonus;
const health = calculateHealth(strength) + healthBonus;
const focusPoints = calculateFocus(willpower) + focusBonus;
const investiture = calculateInvestiture(awareness, presence) + investitureBonus;
const movementRate = calculateMovementRate(speed) + movementBonus;
const recoveryDie = caclulateRecoveryDie(willpower) + recoveryDieBonus;
// for (let test = 0; test <= 10; test++ ) {
//     console.log(test + ": " + caclulateRecoveryDie(test));
// }
function main() {
    setupHeader();
    setupStats();
    setupPoints();
}
function calculateHealth(givenStrength) { return 5 + givenStrength + (level * 5); }
function calculateFocus(givenWillpower) { return 2 + givenWillpower; }
function calculateInvestiture(givenAwareness, givenPresence) { return 2 + Math.max(givenAwareness, givenPresence); }
function calculateMovementRate(givenSpeed) {
    switch (givenSpeed) {
        case 0:
            return 20;
        case 1:
        case 2:
            return 25;
        case 3:
        case 4:
            return 30;
        case 5:
        case 6:
            return 40;
        case 7:
        case 8:
            return 60;
        default:
            return 80;
    }
}
function caclulateRecoveryDie(givenWillpower) {
    if (givenWillpower < 9) {
        return Math.ceil(givenWillpower / 2.0) * 2 + 4;
    }
    return 20;
}
function setupHeader() {
    var _a, _b, _c, _d, _e;
    const playerNameElement = (_a = document.getElementById("playerName")) === null || _a === void 0 ? void 0 : _a.querySelector("p");
    if (playerNameElement) {
        playerNameElement.textContent = playerName;
    }
    const characterNameElement = (_b = document.getElementById("characterName")) === null || _b === void 0 ? void 0 : _b.querySelector("p");
    if (characterNameElement) {
        characterNameElement.textContent = characterName;
    }
    const pathsElement = (_c = document.getElementById("paths")) === null || _c === void 0 ? void 0 : _c.querySelector("p");
    if (pathsElement) {
        pathsElement.textContent = paths;
    }
    const levelElement = (_d = document.getElementById("level")) === null || _d === void 0 ? void 0 : _d.querySelector("p");
    if (levelElement) {
        levelElement.textContent = level.toString();
    }
    const ancestryElement = (_e = document.getElementById("ancestry")) === null || _e === void 0 ? void 0 : _e.querySelector("p");
    if (ancestryElement) {
        ancestryElement.textContent = ancestry;
    }
}
function setupStats() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const strengthElement = (_a = document.getElementById("strength")) === null || _a === void 0 ? void 0 : _a.querySelector("p");
    if (strengthElement) {
        strengthElement.textContent = strength.toString();
    }
    const physicalDefenseElement = (_b = document.getElementById("physicalDefense")) === null || _b === void 0 ? void 0 : _b.querySelector("p");
    if (physicalDefenseElement) {
        physicalDefenseElement.textContent = physicalDefense.toString();
    }
    const speedElement = (_c = document.getElementById("speed")) === null || _c === void 0 ? void 0 : _c.querySelector("p");
    if (speedElement) {
        speedElement.textContent = speed.toString();
    }
    const intellectElement = (_d = document.getElementById("intellect")) === null || _d === void 0 ? void 0 : _d.querySelector("p");
    if (intellectElement) {
        intellectElement.textContent = intellect.toString();
    }
    const cognitiveDefenseElement = (_e = document.getElementById("cognitiveDefense")) === null || _e === void 0 ? void 0 : _e.querySelector("p");
    if (cognitiveDefenseElement) {
        cognitiveDefenseElement.textContent = cognitiveDefense.toString();
    }
    const willpowerElement = (_f = document.getElementById("willpower")) === null || _f === void 0 ? void 0 : _f.querySelector("p");
    if (willpowerElement) {
        willpowerElement.textContent = willpower.toString();
    }
    const awarenessElement = (_g = document.getElementById("awareness")) === null || _g === void 0 ? void 0 : _g.querySelector("p");
    if (awarenessElement) {
        awarenessElement.textContent = awareness.toString();
    }
    const spiritualDefenseElement = (_h = document.getElementById("spiritualDefense")) === null || _h === void 0 ? void 0 : _h.querySelector("p");
    if (spiritualDefenseElement) {
        spiritualDefenseElement.textContent = spiritualDefense.toString();
    }
    const presenceElement = (_j = document.getElementById("presence")) === null || _j === void 0 ? void 0 : _j.querySelector("p");
    if (presenceElement) {
        presenceElement.textContent = presence.toString();
    }
}
function setupPoints() {
    var _a, _b, _c, _d, _e;
    let test = (_b = (_a = document.getElementsByClassName("pointCounter")[0].getElementsByClassName("currentPoint")[0]) === null || _a === void 0 ? void 0 : _a.querySelector("form")) === null || _b === void 0 ? void 0 : _b.querySelector("input");
    console.log(test, test === null || test === void 0 ? void 0 : test.value);
    let pointsToBeHandled = [health, focusPoints];
    if (hasInvestitureScore) {
        pointsToBeHandled = [health, focusPoints, investiture];
    }
    const pointCounters = document.getElementsByClassName("pointCounter");
    // Loop through every point counter
    for (let index = 0; index < pointCounters.length && index < pointsToBeHandled.length; index++) {
        const currentPointCounterElement = pointCounters[index];
        const currentPointAmount = pointsToBeHandled[index];
        const maxPointElement = (_c = currentPointCounterElement.getElementsByClassName("maxPoint")[0]) === null || _c === void 0 ? void 0 : _c.querySelector("p");
        if (maxPointElement) {
            maxPointElement.textContent = currentPointAmount.toString();
        }
        const currentPointAmountElement = (_e = (_d = currentPointCounterElement.getElementsByClassName("currentPoint")[0]) === null || _d === void 0 ? void 0 : _d.querySelector("form")) === null || _e === void 0 ? void 0 : _e.querySelector("input");
        if (currentPointAmountElement) {
            currentPointAmountElement.value = currentPointAmount.toString();
        }
    }
}
main();
