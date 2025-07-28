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

// Display a new word
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

// Play letter sounds with error handling
function playSounds() {
  const letters = currentWord.split("");
  let i = 0;

  function playNext() {
    if (i < letters.length) {
      const fileName = `sound_${letters[i]}.mp3`;
      console.log(`Trying to play: ${fileName}`);

      const audio = new Audio(fileName);
      audio.onerror = function () {
        console.error(`Error: Could not load sound file ${fileName}`);
        alert(`Missing or unreadable file: ${fileName}`);
      };

      audio.oncanplaythrough = function () {
        console.log(`Playing: ${fileName}`);
        audio.play().catch(err => console.error(`Playback error for ${fileName}:`, err));
      };

      i++;
      setTimeout(playNext, 1200); // Delay before playing the next letter
    }
  }

  setTimeout(playNext, 500); // Initial delay before first letter
}

// Show letters and play letter sounds
function breakdownLetters() {
  const container = document.getElementById("wordContainer");
  container.innerHTML = "";

  for (let letter of currentWord) {
    const div = document.createElement("div");
    div.className = "letter spaced";
    div.innerHTML = letter.toUpperCase() + '<div class="dot"></div>';
    container.appendChild(div);
  }

  const letters = document.querySelectorAll(".letter");
  let i = 0;

  function highlightLetter() {
    if (i < letters.length) {
      const letter = letters[i].textContent.trim().toLowerCase();
      const dot = letters[i].querySelector(".dot");
      dot.style.display = "block";

      const fileName = `sound_${letter}.mp3`;
      console.log(`Trying to play: ${fileName}`);
      const audio = new Audio(fileName);
      audio.onerror = function () {
        console.error(`Error: Could not load sound file ${fileName}`);
      };

      audio.oncanplaythrough = function () {
        console.log(`Playing: ${fileName}`);
        audio.play().catch(err => console.error(`Playback error for ${fileName}:`, err));
      };

      setTimeout(() => {
        dot.style.display = "none";
        i++;
        highlightLetter();
      }, 1200);
    }
  }

  setTimeout(highlightLetter, 500); // Initial delay
}

// Show image, full word, and sentence
function showImageAndSentence() {
  document.getElementById("answer").textContent = currentWord.toUpperCase();
  document.getElementById("answer").style.visibility = "visible";
  document.getElementById("sentence").textContent = wordSentences[currentWord] || "";
  document.getElementById("sentence").style.display = "block";

  const image = document.getElementById("wordImage");
  image.src = `${currentWord}-min.png`; // Ensure this image exists
  image.style.display = "block";
  image.style.opacity = "0";
  setTimeout(() => {
    image.style.opacity = "1";
  }, 50);
}

// Move to next word
function nextWord() {
  currentIndex++;
  displayWord();
}

// Progress bar update
function updateProgressBar() {
  const progress = ((currentIndex + 1) / words.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressText").textContent = `Word ${currentIndex + 1} of ${words.length}`;
}

// Initialize game
displayWord();