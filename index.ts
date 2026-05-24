
const playerName: string = "Test Player Name";
const characterName: string = "Test Character Name";
const paths: string = "Test Path";
const level: number = 1;
const ancestry: string = "Human";

const strength: number = 1;
const speed: number = 1;
const intellect: number = 1;
const willpower: number = 1;
const awareness: number = 1;
const presence: number = 1;

const healthBonus: number = 1;
const focusBonus: number = 1;
const investitureBonus: number = 1;

const physicalDefenseBonus: number = 0;
const cognitiveDefenseBonus: number = 0;
const spiritualDefenseBonus: number = 0;

const movementBonus: number = 0;
const recoveryDieBonus: number = 0;

const deflect: number = 1;

const hasInvestitureScore: boolean = true;

// Calculated stats
const tier: number = Math.max((Math.floor((level - 1) / 5.0) + 1), 5);

const physicalDefense: number = 10 + strength + speed + physicalDefenseBonus;
const cognitiveDefense: number = 10 + intellect + willpower + cognitiveDefenseBonus;
const spiritualDefense: number = 10 + awareness + presence + spiritualDefenseBonus;

const health: number = calculateHealth(strength) + healthBonus;
const focusPoints: number = calculateFocus(willpower) + focusBonus;
const investiture: number = calculateInvestiture(awareness, presence);

const movementRate: number = calculateMovementRate(speed) + movementBonus;
const recoveryDie: number = caclulateRecoveryDie(willpower) + recoveryDieBonus;


// for (let test = 0; test <= 10; test++ ) {
//     console.log(test + ": " + caclulateRecoveryDie(test));
// }


function main() {
    setupHeader();
    setupStats();
}

function calculateHealth(givenStrength: number): number {return 10 + givenStrength + (level * 5)}
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


function setupHeader(): void {
    const playerNameElement = document.getElementById("playerName")?.querySelector("p");
    if (playerNameElement) {playerNameElement.textContent = playerName}

    const characterNameElement = document.getElementById("characterName")?.querySelector("p");
    if (characterNameElement) {characterNameElement.textContent = characterName}

    const pathsElement = document.getElementById("paths")?.querySelector("p");
    if (pathsElement) {pathsElement.textContent = paths}

    const levelElement = document.getElementById("level")?.querySelector("p");
    if (levelElement) {levelElement.textContent = level.toString()}

    const ancestryElement = document.getElementById("ancestry")?.querySelector("p");
    if (ancestryElement) {ancestryElement.textContent = ancestry}
}


function setupStats() {
    const strengthElement = document.getElementById("strength")?.querySelector("p");
    if (strengthElement) {strengthElement.textContent = strength.toString()}

    const physicalDefenseElement = document.getElementById("physicalDefense")?.querySelector("p");
    if (physicalDefenseElement) {physicalDefenseElement.textContent = physicalDefense.toString()}

    const speedElement = document.getElementById("speed")?.querySelector("p");
    if (speedElement) {speedElement.textContent = speed.toString()}

    
    const intellectElement = document.getElementById("intellect")?.querySelector("p");
    if (intellectElement) {intellectElement.textContent = intellect.toString()}

    const cognitiveDefenseElement = document.getElementById("cognitiveDefense")?.querySelector("p");
    if (cognitiveDefenseElement) {cognitiveDefenseElement.textContent = cognitiveDefense.toString()}

    const willpowerElement = document.getElementById("willpower")?.querySelector("p");
    if (willpowerElement) {willpowerElement.textContent = willpower.toString()}

    
    const awarenessElement = document.getElementById("awareness")?.querySelector("p");
    if (awarenessElement) {awarenessElement.textContent = awareness.toString()}

    const spiritualDefenseElement = document.getElementById("spiritualDefense")?.querySelector("p");
    if (spiritualDefenseElement) {spiritualDefenseElement.textContent = spiritualDefense.toString()}

    const presenceElement = document.getElementById("presence")?.querySelector("p");
    if (presenceElement) {presenceElement.textContent = presence.toString()}
}

main()