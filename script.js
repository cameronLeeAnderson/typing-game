// Words for game
// NOTE: Using set to avoid duplicates
const wordsSet = new Set(["cat", "kitten", "dog", "puppy", "frog", "tadpole", "zoo", "fox", "bird", "quail", "box", "lemon", "grapes", "juice", "mom", "dad", "love", "hugging", "kissing", "hands", "feet", "thinking", "eat", "hungry", "drink", "birthday", "cake", "happy", "toad", "study", "school", "friends", "chicken", "water", "flower", "leaf", "sad", "leprechaun", "chocolate", "candy", "rice", "spoon", "fork"])

const encouragingMessagesSet = new Set(["Ready for more?", "Let's go!", "You can do it!", "Keep going!", "Don't give up!", "Stay classy!", "Right on!", "Cool!"])

const words = Array.from(wordsSet)
const encouragingMessages = Array.from(encouragingMessagesSet)

// Get DOM elements
const wordEl = document.getElementById("word")
const textEl = document.getElementById("text-input")
const scoreEl = document.getElementById("score")
const timeEl = document.getElementById("time")
const endGameEl = document.getElementById("end-game")
const levelsButton = document.getElementById("levels-btn")
const levelsEl = document.getElementById("levels")
const levelsForm = document.getElementById("levels-form")
const levelSelect = document.getElementById("level")

// Focus on text input
textEl.focus()

// Set initial values
let generatedWord
let score = 0
let time = 10 // time in seconds

// Persist difficulty selected
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "easy"
levelSelect.value = difficulty

// Create timer
const timer = setInterval(updateTime, 1000)

// Functions
function getWord(wordsArray) {
	const index = Math.floor(Math.random() * wordsArray.length)
	return wordsArray[index]
}

function addWordToGame(wordElement) {
	generatedWord = getWord(words)
	wordElement.innerHTML = generatedWord
}

function getPlaceholder(messagesArray) {
	const index = Math.floor(Math.random() * messagesArray.length)
	return messagesArray[index]
}

function updateScore() {
	score++
	scoreEl.innerHTML = score
}

function updateTime() {
	// Decrement time
	time--
	timeEl.innerHTML = time + " seconds"

	// Game over when time is 0
	if (time === 0) {
		clearInterval(timer)
		gameOver()
	}
}

function gameOver() {
	document.getElementById("final-score").innerHTML = score
	endGameEl.classList.add("show")
}

// START GAME!
addWordToGame(wordEl)

// LISTEN FOR LITTLE HANDS TYPING
textEl.addEventListener("input", event => {
	const typedText = event.target.value

	if (typedText === generatedWord) {
		// Add another word to the game
		addWordToGame(wordEl)

		// Clear previous word
		event.target.value = ""

		// Update placeholder
		textEl.placeholder = getPlaceholder(encouragingMessages)

		// Update score
		updateScore()

		// Time boost!
		if (difficulty === "hard") {
			time += 1
		} else if (difficulty === "medium") {
			time += 2
		} else {
			time += 5
		}

		updateTime()
	}
})

// LISTEN FOR CLICK ON GEAR ICON
levelsButton.addEventListener("click", () => levels.classList.toggle("hide"))

// DIFFICULTY LEVEL
levelSelect.addEventListener("change", e => {
	difficulty = e.target.value
	localStorage.setItem("difficulty", difficulty)
})

// TODO:
// Add 3...2...1... overlay
// Sounds
// Start button
// Settings for uppercase, lowercase
// Database for historical scores
// Registratin/login functionality
