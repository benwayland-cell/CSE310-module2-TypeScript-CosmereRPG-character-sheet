"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getData(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(filePath);
        if (!response.ok)
            throw new Error(`Failed to load ${filePath}`);
        return response.json();
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const playerStats = yield getData("player-data.json");
        setupHeader(playerStats);
        setupStats(playerStats);
        setupPoints(playerStats);
        setupSkills(playerStats);
        setupOtherStats(playerStats);
        setupOtherSections(playerStats);
    });
}
function calculateDefenses(playerStats) {
    const mainStats = playerStats.mainStats;
    const defenseBonuses = playerStats.defenseBonuses;
    return {
        physicalDefense: 10 + mainStats.strength + mainStats.speed + defenseBonuses.physicalDefenseBonus,
        cognitiveDefense: 10 + mainStats.intellect + mainStats.willpower + defenseBonuses.cognitiveDefenseBonus,
        spiritualDefense: 10 + mainStats.awareness + mainStats.presence + defenseBonuses.spiritualDefenseBonus
    };
}
function calculateHealth(givenStrength, level) { return 5 + givenStrength + (level * 5); }
function calculateFocus(givenWillpower) { return 2 + givenWillpower; }
function calculateInvestiture(givenAwareness, givenPresence) { return 2 + Math.max(givenAwareness, givenPresence); }
function calculateScores(playerStats) {
    const mainStats = playerStats.mainStats;
    const scoreBonuses = playerStats.scoreBonuses;
    return {
        health: calculateHealth(mainStats.strength, playerStats.level) + scoreBonuses.healthBonus,
        focusPoints: calculateFocus(mainStats.willpower) + scoreBonuses.focusBonus,
        investiture: calculateInvestiture(mainStats.awareness, mainStats.presence) + scoreBonuses.investitureBonus
    };
}
function calculateLiftingCapacity(givenStrength) {
    switch (givenStrength) {
        case 0:
            return 100;
        case 1:
        case 2:
            return 200;
        case 3:
        case 4:
            return 500;
        case 5:
        case 6:
            return 1000;
        case 7:
        case 8:
            return 5000;
        default:
            return 10000;
    }
}
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
function calculateRecoveryDie(givenWillpower) {
    if (givenWillpower < 9) {
        return Math.ceil(givenWillpower / 2.0) * 2 + 4;
    }
    return 20;
}
function calculateSensesRange(givenAwareness) {
    switch (givenAwareness) {
        case 0:
            return 5;
        case 1:
        case 2:
            return 10;
        case 3:
        case 4:
            return 25;
        case 5:
        case 6:
            return 50;
        case 7:
        case 8:
            return 100;
        default:
            return 999;
    }
}
function calculateOtherStats(playerStats) {
    const mainStats = playerStats.mainStats;
    const otherBonuses = playerStats.otherBonuses;
    return {
        liftingCapacity: calculateLiftingCapacity(mainStats.strength) + otherBonuses.liftingBonus,
        movementRate: calculateMovementRate(mainStats.speed) + otherBonuses.movementBonus,
        recoveryDie: calculateRecoveryDie(mainStats.willpower) + otherBonuses.recoveryDieBonus,
        sensesRange: calculateSensesRange(mainStats.awareness) + otherBonuses.sensesRangeBonus
    };
}
function setupHeader(playerStats) {
    var _a, _b, _c, _d, _e;
    const playerNameElement = (_a = document.getElementById("playerName")) === null || _a === void 0 ? void 0 : _a.querySelector("p");
    if (playerNameElement) {
        playerNameElement.textContent = playerStats.playerName;
    }
    const characterNameElement = (_b = document.getElementById("characterName")) === null || _b === void 0 ? void 0 : _b.querySelector("p");
    if (characterNameElement) {
        characterNameElement.textContent = playerStats.characterName;
    }
    const pathsElement = (_c = document.getElementById("paths")) === null || _c === void 0 ? void 0 : _c.querySelector("p");
    if (pathsElement) {
        pathsElement.textContent = playerStats.paths;
    }
    const levelElement = (_d = document.getElementById("level")) === null || _d === void 0 ? void 0 : _d.querySelector("p");
    if (levelElement) {
        levelElement.textContent = playerStats.level.toString();
    }
    const ancestryElement = (_e = document.getElementById("ancestry")) === null || _e === void 0 ? void 0 : _e.querySelector("p");
    if (ancestryElement) {
        ancestryElement.textContent = playerStats.ancestry;
    }
}
function setupStats(playerStats) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const mainStats = playerStats.mainStats;
    const defenses = calculateDefenses(playerStats);
    const strengthElement = (_a = document.getElementById("strength")) === null || _a === void 0 ? void 0 : _a.querySelector("p");
    if (strengthElement) {
        strengthElement.textContent = mainStats.strength.toString();
    }
    const physicalDefenseElement = (_b = document.getElementById("physicalDefense")) === null || _b === void 0 ? void 0 : _b.querySelector("p");
    if (physicalDefenseElement) {
        physicalDefenseElement.textContent = defenses.physicalDefense.toString();
    }
    const speedElement = (_c = document.getElementById("speed")) === null || _c === void 0 ? void 0 : _c.querySelector("p");
    if (speedElement) {
        speedElement.textContent = mainStats.speed.toString();
    }
    const intellectElement = (_d = document.getElementById("intellect")) === null || _d === void 0 ? void 0 : _d.querySelector("p");
    if (intellectElement) {
        intellectElement.textContent = mainStats.intellect.toString();
    }
    const cognitiveDefenseElement = (_e = document.getElementById("cognitiveDefense")) === null || _e === void 0 ? void 0 : _e.querySelector("p");
    if (cognitiveDefenseElement) {
        cognitiveDefenseElement.textContent = defenses.cognitiveDefense.toString();
    }
    const willpowerElement = (_f = document.getElementById("willpower")) === null || _f === void 0 ? void 0 : _f.querySelector("p");
    if (willpowerElement) {
        willpowerElement.textContent = mainStats.willpower.toString();
    }
    const awarenessElement = (_g = document.getElementById("awareness")) === null || _g === void 0 ? void 0 : _g.querySelector("p");
    if (awarenessElement) {
        awarenessElement.textContent = mainStats.awareness.toString();
    }
    const spiritualDefenseElement = (_h = document.getElementById("spiritualDefense")) === null || _h === void 0 ? void 0 : _h.querySelector("p");
    if (spiritualDefenseElement) {
        spiritualDefenseElement.textContent = defenses.spiritualDefense.toString();
    }
    const presenceElement = (_j = document.getElementById("presence")) === null || _j === void 0 ? void 0 : _j.querySelector("p");
    if (presenceElement) {
        presenceElement.textContent = mainStats.presence.toString();
    }
}
function setupPoints(playerStats) {
    var _a, _b, _c;
    const hasInvestitureScore = playerStats.hasInvestitureScore;
    const scores = calculateScores(playerStats);
    let pointsToBeHandled = [scores.health, scores.focusPoints];
    if (hasInvestitureScore) {
        pointsToBeHandled = [scores.health, scores.focusPoints, scores.investiture];
    }
    const pointCounters = document.getElementsByClassName("pointCounter");
    // Loop through every point counter
    for (let index = 0; index < pointCounters.length && index < pointsToBeHandled.length; index++) {
        const currentPointCounterElement = pointCounters[index];
        const currentPointAmount = pointsToBeHandled[index];
        const maxPointElement = (_a = currentPointCounterElement.getElementsByClassName("maxPoint")[0]) === null || _a === void 0 ? void 0 : _a.querySelector("p");
        if (maxPointElement) {
            maxPointElement.textContent = currentPointAmount.toString();
        }
        const currentPointAmountElement = (_c = (_b = currentPointCounterElement.getElementsByClassName("currentPoint")[0]) === null || _b === void 0 ? void 0 : _b.querySelector("form")) === null || _c === void 0 ? void 0 : _c.querySelector("input");
        if (currentPointAmountElement) {
            currentPointAmountElement.value = currentPointAmount.toString();
        }
    }
}
function setupSkills(playerStats) {
    const mainStats = playerStats.mainStats;
    const skills = playerStats.skills;
    let skillsHTML = "";
    [skills.physical, skills.cognitive, skills.spiritual].forEach(skillList => {
        let skillSectionHTML = "";
        skillList.forEach(skill => {
            skillSectionHTML += getSkillHTML(mainStats, skill);
        });
        skillsHTML += `
            <section>
                ${skillSectionHTML}
            </section>
        `;
    });
    const skillsElement = document.getElementById("skills");
    if (skillsElement)
        skillsElement.innerHTML = skillsHTML;
}
function getSkillHTML(playerStats, skill) {
    let skillModifierNumber = skill.ranks;
    switch (skill.attribute) {
        case "STR":
            skillModifierNumber += playerStats.strength;
            break;
        case "SPD":
            skillModifierNumber += playerStats.speed;
            break;
        case "INT":
            skillModifierNumber += playerStats.intellect;
            break;
        case "WIL":
            skillModifierNumber += playerStats.willpower;
            break;
        case "AWA":
            skillModifierNumber += playerStats.awareness;
            break;
        case "PRE":
            skillModifierNumber += playerStats.presence;
            break;
    }
    const skillModifier = skillModifierNumber.toString();
    const skillName = `${skill.name} (${skill.attribute})`;
    let ranks = "";
    for (let index = 0; index < skill.ranks; index++) {
        ranks += "*";
    }
    return `
        <section class="skill">
            <p class="skillModifier">${skillModifier}</p>
            <p class="skillName">${skillName}</p>
            <p class="ranks">${ranks}</p>
        </section>
    `;
}
function setupOtherStats(playerStats) {
    var _a, _b, _c, _d;
    const otherStats = calculateOtherStats(playerStats);
    const liftingCapacityElement = (_a = document.getElementById("liftingCapacity")) === null || _a === void 0 ? void 0 : _a.querySelector("p");
    if (liftingCapacityElement) {
        liftingCapacityElement.textContent = otherStats.liftingCapacity + " lbs";
    }
    const movementElement = (_b = document.getElementById("movement")) === null || _b === void 0 ? void 0 : _b.querySelector("p");
    if (movementElement) {
        movementElement.textContent = otherStats.movementRate + " ft";
    }
    const recoveryDieElement = (_c = document.getElementById("recoveryDie")) === null || _c === void 0 ? void 0 : _c.querySelector("p");
    if (recoveryDieElement) {
        recoveryDieElement.textContent = "1d" + otherStats.recoveryDie;
    }
    const sensesRangeElement = (_d = document.getElementById("sensesRange")) === null || _d === void 0 ? void 0 : _d.querySelector("p");
    if (sensesRangeElement) {
        sensesRangeElement.textContent = otherStats.sensesRange + " ft";
    }
}
function setupOtherSections(playerStats) {
    const otherSections = playerStats.otherSections;
    const otherSectionsElement = document.getElementById("otherSections");
    if (!otherSectionsElement)
        return;
    otherSectionsElement.innerHTML = "";
    otherSections.forEach(section => {
        otherSectionsElement.innerHTML += `
            <section class="otherSection">
                <h2>${section.name}</h2>
                <p>${section.text}</p>
            </section>
        `;
    });
}
main();
