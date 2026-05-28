
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
type OtherBonuses = {
    movementBonus: number,
    recoveryDieBonus: number,
}
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
    otherBonuses: OtherBonuses,
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
        movementBonus: 0,
        recoveryDieBonus: 0,
    },
};


// Calculated stats
const tier: number = Math.max((Math.floor((playerStats.level - 1) / 5.0) + 1), 5);

const mainStats = playerStats.mainStats;
const defenseBonuses = playerStats.defenseBonuses;

const physicalDefense: number = 10 + mainStats.strength + mainStats.speed + defenseBonuses.physicalDefenseBonus;
const cognitiveDefense: number = 10 + mainStats.intellect + mainStats.willpower + defenseBonuses.cognitiveDefenseBonus;
const spiritualDefense: number = 10 + mainStats.awareness + mainStats.presence + defenseBonuses.spiritualDefenseBonus;

const scoreBonuses = playerStats.scoreBonuses;

const health: number = calculateHealth(mainStats.strength) + scoreBonuses.healthBonus;
const focusPoints: number = calculateFocus(mainStats.willpower) + scoreBonuses.focusBonus;
const investiture: number = calculateInvestiture(mainStats.awareness, mainStats.presence) + scoreBonuses.investitureBonus;

const otherBonuses = playerStats.otherBonuses;

const movementRate: number = calculateMovementRate(mainStats.speed) + otherBonuses.movementBonus;
const recoveryDie: number = caclulateRecoveryDie(mainStats.willpower) + otherBonuses.recoveryDieBonus;


// for (let test = 0; test <= 10; test++ ) {
//     console.log(test + ": " + caclulateRecoveryDie(test));
// }


function main() {
    setupHeader(playerStats);
    setupStats(playerStats.mainStats);
    setupPoints(playerStats.hasInvestitureScore);
}

function calculateHealth(givenStrength: number): number {return 5 + givenStrength + (playerStats.level * 5)}
function calculateFocus(givenWillpower: number): number {return 2 + givenWillpower}
function calculateInvestiture(givenAwareness: number, givenPresence: number): number {return 2 + Math.max(givenAwareness, givenPresence)}


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

function caclulateRecoveryDie(givenWillpower: number): number {
    if (givenWillpower < 9) {
        return Math.ceil(givenWillpower / 2.0) * 2 + 4;
    }
    return 20;
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


function setupStats(mainStats: MainStatsConfig) {
    const strengthElement = document.getElementById("strength")?.querySelector("p");
    if (strengthElement) {strengthElement.textContent = mainStats.strength.toString()}

    const physicalDefenseElement = document.getElementById("physicalDefense")?.querySelector("p");
    if (physicalDefenseElement) {physicalDefenseElement.textContent = physicalDefense.toString()}

    const speedElement = document.getElementById("speed")?.querySelector("p");
    if (speedElement) {speedElement.textContent = mainStats.speed.toString()}

    
    const intellectElement = document.getElementById("intellect")?.querySelector("p");
    if (intellectElement) {intellectElement.textContent = mainStats.intellect.toString()}

    const cognitiveDefenseElement = document.getElementById("cognitiveDefense")?.querySelector("p");
    if (cognitiveDefenseElement) {cognitiveDefenseElement.textContent = cognitiveDefense.toString()}

    const willpowerElement = document.getElementById("willpower")?.querySelector("p");
    if (willpowerElement) {willpowerElement.textContent = mainStats.willpower.toString()}

    
    const awarenessElement = document.getElementById("awareness")?.querySelector("p");
    if (awarenessElement) {awarenessElement.textContent = mainStats.awareness.toString()}

    const spiritualDefenseElement = document.getElementById("spiritualDefense")?.querySelector("p");
    if (spiritualDefenseElement) {spiritualDefenseElement.textContent = spiritualDefense.toString()}

    const presenceElement = document.getElementById("presence")?.querySelector("p");
    if (presenceElement) {presenceElement.textContent = mainStats.presence.toString()}
}

function setupPoints(hasInvestitureScore: boolean) {
    let pointsToBeHandled = [health, focusPoints];
    if (hasInvestitureScore) {
        pointsToBeHandled = [health, focusPoints, investiture];
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

main()