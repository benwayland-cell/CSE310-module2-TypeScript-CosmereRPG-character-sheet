"use strict";
const playerStats = {
    playerName: "Test Player Name",
    characterName: "Test Character Name",
    paths: "Test Path",
    level: 1,
    ancestry: "Human",
    deflect: 1,
    hasInvestitureScore: true,
    mainStats: {
        strength: 1,
        speed: 1,
        intellect: 1,
        willpower: 1,
        awareness: 1,
        presence: 1,
    },
    scoreBonuses: {
        healthBonus: 1,
        focusBonus: 1,
        investitureBonus: 1,
    },
    defenseBonuses: {
        physicalDefenseBonus: 0,
        cognitiveDefenseBonus: 0,
        spiritualDefenseBonus: 0,
    },
    otherBonuses: {
        liftingBonus: 0,
        movementBonus: 0,
        recoveryDieBonus: 0,
        sensesRangeBonus: 0,
    },
    skills: {
        physical: [
            {
                name: "Agility",
                attribute: "SPD",
                ranks: 1
            },
            {
                name: "Athletics",
                attribute: "STR",
                ranks: 1
            },
            {
                name: "Heavy Weaponry",
                attribute: "STR",
                ranks: 1
            },
            {
                name: "Light Weaponry",
                attribute: "SPD",
                ranks: 1
            },
            {
                name: "Stealth",
                attribute: "SPD",
                ranks: 1
            },
            {
                name: "Thievery",
                attribute: "SPD",
                ranks: 1
            }
        ],
        cognitive: [
            {
                name: "Crafting",
                attribute: "INT",
                ranks: 1
            },
            {
                name: "Deduction",
                attribute: "INT",
                ranks: 1
            },
            {
                name: "Discipline",
                attribute: "WIL",
                ranks: 1
            },
            {
                name: "Intimidation",
                attribute: "WIL",
                ranks: 1
            },
            {
                name: "Lore",
                attribute: "INT",
                ranks: 1
            },
            {
                name: "Medicine",
                attribute: "INT",
                ranks: 1
            }
        ],
        spiritual: [
            {
                name: "Deception",
                attribute: "PRE",
                ranks: 1
            },
            {
                name: "Insight",
                attribute: "AWA",
                ranks: 1
            },
            {
                name: "Leadership",
                attribute: "PRE",
                ranks: 1
            },
            {
                name: "Perception",
                attribute: "AWA",
                ranks: 1
            },
            {
                name: "Persuasion",
                attribute: "PRE",
                ranks: 1
            },
            {
                name: "Survival",
                attribute: "AWA",
                ranks: 1
            }
        ]
    },
    otherSections: [
        {
            name: "Conditions & Injuries",
            text: "Empty Injuries"
        },
        {
            name: "Expertieses",
            text: "Alethi, Shortsword"
        },
        {
            name: "Weapons",
            text: "Shortsword 1d6, Light"
        },
        {
            name: "Talents",
            text: "Talent 1 <br> Talent 2"
        },
    ]
};
// Calculated stats
const tier = Math.max((Math.floor((playerStats.level - 1) / 5.0) + 1), 5);
const mainStats = playerStats.mainStats;
const defenseBonuses = playerStats.defenseBonuses;
const defenses = {
    physicalDefense: 10 + mainStats.strength + mainStats.speed + defenseBonuses.physicalDefenseBonus,
    cognitiveDefense: 10 + mainStats.intellect + mainStats.willpower + defenseBonuses.cognitiveDefenseBonus,
    spiritualDefense: 10 + mainStats.awareness + mainStats.presence + defenseBonuses.spiritualDefenseBonus
};
const scoreBonuses = playerStats.scoreBonuses;
const scores = {
    health: calculateHealth(mainStats.strength) + scoreBonuses.healthBonus,
    focusPoints: calculateFocus(mainStats.willpower) + scoreBonuses.focusBonus,
    investiture: calculateInvestiture(mainStats.awareness, mainStats.presence) + scoreBonuses.investitureBonus
};
const otherBonuses = playerStats.otherBonuses;
const otherStats = {
    liftingCapacity: calculateLiftingCapacity(mainStats.strength) + otherBonuses.liftingBonus,
    movementRate: calculateMovementRate(mainStats.speed) + otherBonuses.movementBonus,
    recoveryDie: calculateRecoveryDie(mainStats.willpower) + otherBonuses.recoveryDieBonus,
    sensesRange: calculateSensesRange(mainStats.awareness) + otherBonuses.sensesRangeBonus
};
function main() {
    setupHeader(playerStats);
    setupStats(playerStats.mainStats, defenses);
    setupPoints(playerStats.hasInvestitureScore, scores);
    setupSkills(playerStats.mainStats, playerStats.skills);
    setupOtherStats(otherStats);
    setupOtherSections(playerStats.otherSections);
}
function calculateHealth(givenStrength) { return 5 + givenStrength + (playerStats.level * 5); }
function calculateFocus(givenWillpower) { return 2 + givenWillpower; }
function calculateInvestiture(givenAwareness, givenPresence) { return 2 + Math.max(givenAwareness, givenPresence); }
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
function setupStats(mainStats, defenses) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
function setupPoints(hasInvestitureScore, scores) {
    var _a, _b, _c;
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
function setupSkills(playerStats, skills) {
    let skillsHTML = "";
    [skills.physical, skills.cognitive, skills.spiritual].forEach(skillList => {
        let skillSectionHTML = "";
        skillList.forEach(skill => {
            skillSectionHTML += getSkillHTML(playerStats, skill);
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
function setupOtherStats(otherStats) {
    var _a, _b, _c, _d;
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
function setupOtherSections(otherSections) {
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
