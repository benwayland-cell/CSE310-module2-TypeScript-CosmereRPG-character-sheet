
type MainStatsConfig = {
    strength: number,
    speed: number,
    intellect: number,
    willpower: number,
    awareness: number,
    presence: number,
};
type ScoreBonusesConfig = {
    healthBonus: number,
    focusBonus: number,
    investitureBonus: number,
};
type DefenseBonusesConfig = {
    physicalDefenseBonus: number,
    cognitiveDefenseBonus: number,
    spiritualDefenseBonus: number,
};
type OtherBonusesConfig = {
    liftingBonus: number,
    movementBonus: number,
    recoveryDieBonus: number,
    sensesRangeBonus: number,
};
type SkillConfig = {
    name: string,
    attribute: string,
    ranks: number
};
type SkillsConfig = {
    physical: SkillConfig[],
    cognitive: SkillConfig[],
    spiritual: SkillConfig[]
};
type OtherSectionConfig = {
    name: string,
    text: string,
    formattingWidth: number
};
type PlayerStatsConfig = {
    playerName: string,
    characterName: string,
    paths: string,
    level: number,
    ancestry: string,
    deflect: number,
    hasInvestitureScore: boolean,
    mainStats: MainStatsConfig,
    scoreBonuses: ScoreBonusesConfig,
    defenseBonuses: DefenseBonusesConfig,
    otherBonuses: OtherBonusesConfig,
    skills: SkillsConfig,
    otherSections: OtherSectionConfig[],
};

const playerStats: PlayerStatsConfig = {
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
            text: "Empty Injuries",
            formattingWidth: 1
        },  
        {
            name: "Expertieses",
            text: "Alethi, Shortsword",
            formattingWidth: 2
        },  
        {
            name: "Weapons",
            text: "Shortsword 1d6, Light",
            formattingWidth: 1
        },  
        {
            name: "Talents",
            text: "Talent 1 <br> Talent 2",
            formattingWidth: 1
        },  
    ]
};


// Calculated stats
const tier: number = Math.max((Math.floor((playerStats.level - 1) / 5.0) + 1), 5);

const mainStats = playerStats.mainStats;
const defenseBonuses = playerStats.defenseBonuses;

type DefenseConfig = {
    physicalDefense: number,
    cognitiveDefense: number,
    spiritualDefense: number
};
const defenses: DefenseConfig = {
    physicalDefense: 10 + mainStats.strength + mainStats.speed + defenseBonuses.physicalDefenseBonus,
    cognitiveDefense: 10 + mainStats.intellect + mainStats.willpower + defenseBonuses.cognitiveDefenseBonus,
    spiritualDefense: 10 + mainStats.awareness + mainStats.presence + defenseBonuses.spiritualDefenseBonus
};


const scoreBonuses = playerStats.scoreBonuses;

type ScoresConfig = {
    health: number,
    focusPoints: number,
    investiture: number
}
const scores = {
    health: calculateHealth(mainStats.strength) + scoreBonuses.healthBonus,
    focusPoints: calculateFocus(mainStats.willpower) + scoreBonuses.focusBonus,
    investiture: calculateInvestiture(mainStats.awareness, mainStats.presence) + scoreBonuses.investitureBonus
};

const otherBonuses = playerStats.otherBonuses;

type OtherStatsConfig = {
    liftingCapacity: number,
    movementRate: number,
    recoveryDie: number,
    sensesRange: number
}
const otherStats = {
    liftingCapacity: calculateLiftingCapacity(mainStats.strength) + otherBonuses.liftingBonus,
    movementRate: calculateMovementRate(mainStats.speed) + otherBonuses.movementBonus,
    recoveryDie: calculateRecoveryDie(mainStats.willpower) + otherBonuses.recoveryDieBonus,
    sensesRange: calculateSensesRange(mainStats.awareness) + otherBonuses.sensesRangeBonus
}


function main() {
    setupHeader(playerStats);
    setupStats(playerStats.mainStats, defenses);
    setupPoints(playerStats.hasInvestitureScore, scores);
    setupSkills(playerStats.mainStats, playerStats.skills);
    setupOtherStats(otherStats);
}

function calculateHealth(givenStrength: number): number {return 5 + givenStrength + (playerStats.level * 5)}
function calculateFocus(givenWillpower: number): number {return 2 + givenWillpower}
function calculateInvestiture(givenAwareness: number, givenPresence: number): number {return 2 + Math.max(givenAwareness, givenPresence)}

function calculateLiftingCapacity(givenStrength: number): number {
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

function calculateMovementRate(givenSpeed: number): number {
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

function calculateRecoveryDie(givenWillpower: number): number {
    if (givenWillpower < 9) {
        return Math.ceil(givenWillpower / 2.0) * 2 + 4;
    }
    return 20;
} 

function calculateSensesRange(givenAwareness: number): number {
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


function setupHeader(playerStats: PlayerStatsConfig): void {
    const playerNameElement = document.getElementById("playerName")?.querySelector("p");
    if (playerNameElement) {playerNameElement.textContent = playerStats.playerName}

    const characterNameElement = document.getElementById("characterName")?.querySelector("p");
    if (characterNameElement) {characterNameElement.textContent = playerStats.characterName}

    const pathsElement = document.getElementById("paths")?.querySelector("p");
    if (pathsElement) {pathsElement.textContent = playerStats.paths}

    const levelElement = document.getElementById("level")?.querySelector("p");
    if (levelElement) {levelElement.textContent = playerStats.level.toString()}

    const ancestryElement = document.getElementById("ancestry")?.querySelector("p");
    if (ancestryElement) {ancestryElement.textContent = playerStats.ancestry}
}


function setupStats(mainStats: MainStatsConfig, defenses: DefenseConfig) {
    const strengthElement = document.getElementById("strength")?.querySelector("p");
    if (strengthElement) {strengthElement.textContent = mainStats.strength.toString()}

    const physicalDefenseElement = document.getElementById("physicalDefense")?.querySelector("p");
    if (physicalDefenseElement) {physicalDefenseElement.textContent = defenses.physicalDefense.toString()}

    const speedElement = document.getElementById("speed")?.querySelector("p");
    if (speedElement) {speedElement.textContent = mainStats.speed.toString()}

    
    const intellectElement = document.getElementById("intellect")?.querySelector("p");
    if (intellectElement) {intellectElement.textContent = mainStats.intellect.toString()}

    const cognitiveDefenseElement = document.getElementById("cognitiveDefense")?.querySelector("p");
    if (cognitiveDefenseElement) {cognitiveDefenseElement.textContent = defenses.cognitiveDefense.toString()}

    const willpowerElement = document.getElementById("willpower")?.querySelector("p");
    if (willpowerElement) {willpowerElement.textContent = mainStats.willpower.toString()}

    
    const awarenessElement = document.getElementById("awareness")?.querySelector("p");
    if (awarenessElement) {awarenessElement.textContent = mainStats.awareness.toString()}

    const spiritualDefenseElement = document.getElementById("spiritualDefense")?.querySelector("p");
    if (spiritualDefenseElement) {spiritualDefenseElement.textContent = defenses.spiritualDefense.toString()}

    const presenceElement = document.getElementById("presence")?.querySelector("p");
    if (presenceElement) {presenceElement.textContent = mainStats.presence.toString()}
}

function setupPoints(hasInvestitureScore: boolean, scores: ScoresConfig) {
    let pointsToBeHandled = [scores.health, scores.focusPoints];
    if (hasInvestitureScore) {
        pointsToBeHandled = [scores.health, scores.focusPoints, scores.investiture];
    }
    const pointCounters = document.getElementsByClassName("pointCounter");

    // Loop through every point counter
    for (let index = 0;
            index < pointCounters.length && index < pointsToBeHandled.length;
            index++) {
        const currentPointCounterElement = pointCounters[index];
        const currentPointAmount = pointsToBeHandled[index];

        const maxPointElement = currentPointCounterElement.getElementsByClassName("maxPoint")[0]?.querySelector("p");
        if (maxPointElement) {maxPointElement.textContent = currentPointAmount.toString()}

        const currentPointAmountElement = currentPointCounterElement.getElementsByClassName("currentPoint")[0]?.querySelector("form")?.querySelector("input");
        if (currentPointAmountElement) {currentPointAmountElement.value = currentPointAmount.toString()}
    }
}

function setupSkills(playerStats: MainStatsConfig, skills: SkillsConfig) {
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
    if (skillsElement) skillsElement.innerHTML = skillsHTML;
}

function getSkillHTML(playerStats: MainStatsConfig, skill: SkillConfig) {
    let skillModifierNumber: number = skill.ranks;
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

    const skillName: string = `${skill.name} (${skill.attribute})`;

    let ranks: string = "";
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

function setupOtherStats(otherStats: OtherStatsConfig) {
    const liftingCapacityElement = document.getElementById("liftingCapacity")?.querySelector("p");
    if (liftingCapacityElement) {liftingCapacityElement.textContent = otherStats.liftingCapacity + " lbs"}

    const movementElement = document.getElementById("movement")?.querySelector("p");
    if (movementElement) {movementElement.textContent = otherStats.movementRate + " ft"}

    const recoveryDieElement = document.getElementById("recoveryDie")?.querySelector("p");
    if (recoveryDieElement) {recoveryDieElement.textContent = "1d" + otherStats.recoveryDie}

    const sensesRangeElement = document.getElementById("sensesRange")?.querySelector("p");
    if (sensesRangeElement) {sensesRangeElement.textContent = otherStats.sensesRange + " ft"}

    
}

main()