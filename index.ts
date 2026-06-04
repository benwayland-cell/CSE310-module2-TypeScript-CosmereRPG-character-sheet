
const FILE_TO_READ = "player-data.json";

// Given Data types
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
    text: string
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

// Calculated stats types
type DefenseConfig = {
    physicalDefense: number,
    cognitiveDefense: number,
    spiritualDefense: number
};
type ScoresConfig = {
    health: number,
    focusPoints: number,
    investiture: number
}
type OtherStatsConfig = {
    liftingCapacity: number,
    movementRate: number,
    recoveryDie: number,
    sensesRange: number
}


async function init() {
    const playerStats: PlayerStatsConfig = await getData<PlayerStatsConfig>(FILE_TO_READ);
    setupHeader(playerStats);
    setupStats(playerStats);
    setupPoints(playerStats);
    setupSkills(playerStats);
    setupOtherStats(playerStats);
    setupOtherSections(playerStats);
}

async function getData<T>(filePath: string): Promise<T> {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    return response.json() as Promise<T>;
}

function calculateDefenses(playerStats: PlayerStatsConfig): DefenseConfig {
    const mainStats: MainStatsConfig = playerStats.mainStats;
    const defenseBonuses: DefenseBonusesConfig = playerStats.defenseBonuses;
    return {
        physicalDefense: 10 + mainStats.strength + mainStats.speed + defenseBonuses.physicalDefenseBonus,
        cognitiveDefense: 10 + mainStats.intellect + mainStats.willpower + defenseBonuses.cognitiveDefenseBonus,
        spiritualDefense: 10 + mainStats.awareness + mainStats.presence + defenseBonuses.spiritualDefenseBonus
    };
}

function calculateHealth(givenStrength: number, level: number): number {return 5 + givenStrength + (level * 5)}
function calculateFocus(givenWillpower: number): number {return 2 + givenWillpower}
function calculateInvestiture(givenAwareness: number, givenPresence: number): number {return 2 + Math.max(givenAwareness, givenPresence)}

function calculateScores(playerStats: PlayerStatsConfig): ScoresConfig {
    const mainStats: MainStatsConfig = playerStats.mainStats;
    const scoreBonuses: ScoreBonusesConfig = playerStats.scoreBonuses;
    return {
        health: calculateHealth(mainStats.strength, playerStats.level) + scoreBonuses.healthBonus,
        focusPoints: calculateFocus(mainStats.willpower) + scoreBonuses.focusBonus,
        investiture: calculateInvestiture(mainStats.awareness, mainStats.presence) + scoreBonuses.investitureBonus
    };
}

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

function calculateOtherStats(playerStats: PlayerStatsConfig): OtherStatsConfig {
    const mainStats: MainStatsConfig = playerStats.mainStats;
    const otherBonuses: OtherBonusesConfig = playerStats.otherBonuses;
    return {
        liftingCapacity: calculateLiftingCapacity(mainStats.strength) + otherBonuses.liftingBonus,
        movementRate: calculateMovementRate(mainStats.speed) + otherBonuses.movementBonus,
        recoveryDie: calculateRecoveryDie(mainStats.willpower) + otherBonuses.recoveryDieBonus,
        sensesRange: calculateSensesRange(mainStats.awareness) + otherBonuses.sensesRangeBonus
    };
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


function setupStats(playerStats: PlayerStatsConfig) {
    const mainStats: MainStatsConfig = playerStats.mainStats;
    const defenses: DefenseConfig = calculateDefenses(playerStats);

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

function setupPoints(playerStats: PlayerStatsConfig) {
    const hasInvestitureScore: boolean = playerStats.hasInvestitureScore;
    const scores: ScoresConfig = calculateScores(playerStats);

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

function setupSkills(playerStats: PlayerStatsConfig) {
    const mainStats: MainStatsConfig = playerStats.mainStats;
    const skills: SkillsConfig = playerStats.skills;

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

function setupOtherStats(playerStats: PlayerStatsConfig) {
    const otherStats: OtherStatsConfig = calculateOtherStats(playerStats);

    const liftingCapacityElement = document.getElementById("liftingCapacity")?.querySelector("p");
    if (liftingCapacityElement) {liftingCapacityElement.textContent = otherStats.liftingCapacity + " lbs"}

    const movementElement = document.getElementById("movement")?.querySelector("p");
    if (movementElement) {movementElement.textContent = otherStats.movementRate + " ft"}

    const recoveryDieElement = document.getElementById("recoveryDie")?.querySelector("p");
    if (recoveryDieElement) {recoveryDieElement.textContent = "1d" + otherStats.recoveryDie}

    const sensesRangeElement = document.getElementById("sensesRange")?.querySelector("p");
    if (sensesRangeElement) {sensesRangeElement.textContent = otherStats.sensesRange + " ft"}
}

function setupOtherSections(playerStats: PlayerStatsConfig) {
    const otherSections: OtherSectionConfig[] = playerStats.otherSections;
    const otherSectionsElement = document.getElementById("otherSections");
    if (!otherSectionsElement) return;
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

// Prevent the page from reloading when hitting enter while in a current point
const forms = document.querySelectorAll("form");
forms.forEach(form => {
    form.addEventListener("submit", function (event){
        event.preventDefault();
    });
});

init()