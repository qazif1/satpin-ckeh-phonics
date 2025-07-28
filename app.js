const words = [
  "sat", "sit", "sip", "pin", "pan", "pat",
  "tip", "tin", "tap", "nap", "nip", "net",
  "pet", "pen", "pit", "pin", "tan", "tap",
  
  "cat", "cap", "can", "kit", "kin", "kip",
  "kick", "tick", "pick", "pack", "neck", "kick",
  
  "hen", "hut", "hit", "hat", "at", "is"
];

const wordSentences = {
  sat: "I sat on the mat.",
  sit: "Please sit here.",
  sip: "I sip some tea.",
  pin: "The pin is sharp.",
  pan: "The pan is hot.",
  pat: "Pat the dog gently.",
  tip: "She gave a tip.",
  tin: "This is a tin can.",
  tap: "Turn off the tap.",
  nap: "I will take a nap.",
  nip: "The puppy will nip.",
  net: "The fish is in the net.",
  pet: "I have a pet cat.",
  pen: "This is my pen.",
  pit: "A cherry has a pit.",
  tan: "He got a tan.",
  cat: "The cat is black.",
  cap: "Ben has a cap.",
  can: "I can do it.",
  kit: "This is a kit.",
  kin: "He is my kin.",
  kip: "I had a short kip.",
  kick: "Kick the ball.",
  tick: "Tick the box.",
  pick: "Pick a card.",
  pack: "Pack your bag.",
  neck: "Touch your neck.",
  hen: "The hen lays eggs.",
  hut: "This is a hut.",
  hit: "Hit the ball.",
  hat: "Wear a hat.",
  at: "Look at me.",
  is: "This is fun."
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

function playAudio(fileName) {
  return new Promise((resolve) => {
    const audio = new Audio(fileName);
    audio.onerror = () => {
      console.error(`Error: Could not load ${fileName}`);
      resolve();
    };
    audio.onended = () => setTimeout(resolve, 250);
    audio.play().catch((err) => {
      console.error(`Playback error:`, err);
      resolve();
    });
  });
}

async function playSounds() {
  const letters = currentWord.split("");
  for (let letter of letters) {
    const fileName = `sound_${letter}.mp3`;
    console.log(`Playing: ${fileName}`);
    await playAudio(fileName);
  }
}

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
