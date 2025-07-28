const words = [
  "cat", "kit", "cap", "cot", "kick", "can", "cup",
  "set", "pen", "pet", "net", "ten", "hen", "men", "red",
  "hat", "hop", "hit", "hut", "hot", "him",
  "sat", "pin", "tap", "sip", "tan", "nap", "sit", "pat",
  "pit", "tip", "pan", "tin", "sap", "nip", "ant"
];

const wordSentences = {
  cat: "The cat is black.",
  kit: "This is a first-aid kit.",
  cap: "Ben has a cap.",
  cot: "The baby sleeps on the cot.",
  kick: "Kick the ball hard.",
  can: "I have a can of juice.",
  cup: "The cup is blue.",
  set: "Set the table for dinner.",
  pen: "This is my pen.",
  pet: "I have a pet dog.",
  net: "The fish is in the net.",
  ten: "I can count to ten.",
  hen: "The hen lays eggs.",
  men: "Three men are here.",
  red: "The ball is red.",
  hat: "Put on the hat.",
  hop: "The frog can hop.",
  hit: "Hit the ball with the bat.",
  hut: "They live in a hut.",
  hot: "The tea is hot.",
  him: "I see him over there.",
  sat: "I sat on the mat.",
  pin: "The pin is sharp.",
  tap: "Turn off the tap.",
  sip: "I sip some water.",
  tan: "He got a tan on holiday.",
  nap: "I will take a nap.",
  sit: "Please sit here.",
  pat: "Pat the dog gently.",
  pit: "A cherry has a pit.",
  tip: "She gave a tip.",
  pan: "The pan is hot.",
  tin: "This is a tin can.",
  sap: "The sap is sticky.",
  nip: "The puppy will nip.",
  ant: "An ant is small."
};

let currentWord = "";
let currentIndex = 0;

function displayWord() {
  if (currentIndex >= words.length) {
    alert("You have completed all words!");
    return;
  }

  currentWord = words[currentIndex];
  document.getElementById("wordContainer").innerHTML = "";
  document.getElementById("answer").style.visibility = "hidden";
  document.getElementById("sentence").style.display = "none";
  document.getElementById("wordImage").style.display = "none";

  updateProgressBar();
}

// Utility to play audio and wait until it finishes
function playAudio(fileName) {
  return new Promise((resolve) => {
    const audio = new Audio(fileName);
    audio.onerror = () => {
      console.error(`Error: Could not load ${fileName}`);
      resolve();
    };
    audio.onended = () => setTimeout(resolve, 250); // Add 250ms gap
    audio.play().catch((err) => {
      console.error(`Playback error:`, err);
      resolve();
    });
  });
}

// Play each letter sound sequentially
async function playSounds() {
  const letters = currentWord.split("");
  for (let letter of letters) {
    const fileName = `sound_${letter}.mp3`;
    console.log(`Playing: ${fileName}`);
    await playAudio(fileName);
  }
}

// Show letters with replay buttons and sequential highlighting
function breakdownLetters() {
  const container = document.getElementById("wordContainer");
  container.innerHTML = "";

  for (let letter of currentWord) {
    const letterContainer = document.createElement("div");
    letterContainer.className = "letterContainer";

    const letterDiv = document.createElement("div");
    letterDiv.className = "letter";
    letterDiv.innerHTML = letter.toUpperCase() + '<div class="dot"></div>';

    const button = document.createElement("button");
    button.className = "letterSoundBtn";
    button.textContent = "🔊";
    button.onclick = () => playAudio(`sound_${letter}.mp3`);

    letterContainer.appendChild(letterDiv);
    letterContainer.appendChild(button);
    container.appendChild(letterContainer);
  }

  // Highlight letters sequentially
  const letters = document.querySelectorAll(".letter");
  (async function highlight() {
    for (let letterDiv of letters) {
      const letter = letterDiv.textContent.trim().toLowerCase();
      const dot = letterDiv.querySelector(".dot");
      dot.style.display = "block";
      await playAudio(`sound_${letter}.mp3`);
      dot.style.display = "none";
    }
  })();
}

function showImageAndSentence() {
  document.getElementById("answer").textContent = currentWord.toUpperCase();
  document.getElementById("answer").style.visibility = "visible";
  document.getElementById("sentence").textContent = wordSentences[currentWord] || "";
  document.getElementById("sentence").style.display = "block";

  const image = document.getElementById("wordImage");
  image.src = `${currentWord}-min.png`;
  image.style.display = "block";
  image.style.opacity = "0";
  setTimeout(() => { image.style.opacity = "1"; }, 50);
}

function nextWord() {
  currentIndex++;
  displayWord();
}

function updateProgressBar() {
  const progress = ((currentIndex + 1) / words.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressText").textContent = `Word ${currentIndex + 1} of ${words.length}`;
}

displayWord();
