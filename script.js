// Updated Roulette Game Logic

let balance = 100;
document.getElementById("balance").textContent = balance;

// Display and hide bet options based on bet type selection
document.getElementById("bet-type").addEventListener("change", function() {
    const betType = this.value;
    document.querySelector(".color-options").style.display = betType === 'color' ? 'block' : 'none';
    document.querySelector(".number-options").style.display = betType === 'number' ? 'block' : 'none';
});

// Event listener for "Spin the Wheel" button
document.getElementById("spin-btn").addEventListener("click", function() {
    const betType = document.getElementById("bet-type").value;
    let betValue = betType === 'color' ? document.getElementById("bet-color").value : parseInt(document.getElementById("bet-number").value);
    const betAmount = parseInt(document.getElementById("bet-amount").value);

    // Check if the bet amount is valid
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert("Please enter a valid bet amount within your balance.");
        return;
    }

    // Spin the wheel and display the result
    const spinResult = spinWheel();
    displayResult(spinResult, betType, betValue, betAmount);
});

// Function to spin the wheel and get a random outcome
function spinWheel() {
    const rouletteNumbers = Array.from({ length: 37 }, (_, i) => i);
    const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
    const blackNumbers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

    const resultNumber = rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];
    const color = redNumbers.includes(resultNumber) ? 'red' : blackNumbers.includes(resultNumber) ? 'black' : 'green';
    console.log(`Spin result: ${color} ${resultNumber}`); // Log spin result for debugging
    return { number: resultNumber, color };
}

// Function to calculate winnings and update balance
function displayResult(spinResult, betType, betValue, betAmount) {
    let winnings = 0;

    if (betType === 'number' && betValue === spinResult.number) {
        winnings = betAmount * 35;
    } else if (betType === 'color' && betValue === spinResult.color) {
        winnings = betAmount * 2;
    } else {
        winnings = -betAmount;
    }

    // Update the balance
    balance += winnings;
    document.getElementById("balance").textContent = balance;

    // Display the result in the result-text paragraph
    const resultText = winnings >= 0 ? `You win $${winnings}!` : `You lose $${betAmount}.`;
    document.getElementById("result-text").textContent = `The wheel landed on ${spinResult.color} ${spinResult.number}. ${resultText}`;
    console.log(`New balance: $${balance}`); // Log new balance for debugging

    // Check if the balance is zero
    if (balance <= 0) {
        alert("You're out of money! Game over.");
        document.getElementById("spin-btn").disabled = true;
    }
}
