// Existing selectors
const titleEl = document.getElementById("mainTitle");
const taglineEl = document.getElementById("tagline");
const changeTitleBtn = document.getElementById("changeTitleBtn");
const listEl = document.getElementById("itemList");
const newItemInput = document.getElementById("newItem");
const addItemBtn = document.getElementById("addItemBtn");

// New selectors
const removeLastBtn = document.getElementById("removeLastBtn");
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");
const animateBtn = document.getElementById("animateBtn");
const animateBox = document.getElementById("animateBox");

// Change title text
changeTitleBtn.addEventListener("click", () => {
  titleEl.textContent = "🚀 DOM Manipulation in Action!";
  taglineEl.innerHTML = `We just updated this text using <strong>JavaScript</strong>.`;
});

// Add list items
addItemBtn.addEventListener("click", () => {
  const value = newItemInput.value.trim();
  if (value) {
    const li = document.createElement("li");
    li.textContent = value;
    listEl.appendChild(li);
    newItemInput.value = "";
  }
});

// Remove last item
removeLastBtn.addEventListener("click", () => {
  if (listEl.lastElementChild) {
    listEl.removeChild(listEl.lastElementChild);
  }
});

// Toggle highlight
toggleBtn.addEventListener("click", () => {
  toggleText.classList.toggle("highlight");
});

// Animate box
animateBtn.addEventListener("click", () => {
  animateBox.classList.toggle("animate-move");
});

// Initial style change
titleEl.style.color = "#FE8C00";
