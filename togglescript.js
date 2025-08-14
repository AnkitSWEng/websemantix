// --- Selectors ---
const titleEl = document.getElementById("mainTitle");
const taglineEl = document.getElementById("tagline");
const changeTitleBtn = document.getElementById("changeTitleBtn");

const listEl = document.getElementById("itemList");
const newItemInput = document.getElementById("newItem");
const addItemBtn = document.getElementById("addItemBtn");
const removeLastBtn = document.getElementById("removeLastBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");

const animateBtn = document.getElementById("animateBtn");
const animateBox = document.getElementById("animateBox");

// --- Helpers for localStorage ---
function saveList() {
  const items = Array.from(listEl.children).map(li => li.textContent);
  localStorage.setItem("dynamicList", JSON.stringify(items));
}

function loadList() {
  const saved = localStorage.getItem("dynamicList");
  if (saved) {
    const items = JSON.parse(saved);
    listEl.innerHTML = "";
    items.forEach(text => createListItem(text));
  }
}

function saveHighlightState() {
  localStorage.setItem("highlightActive", toggleText.classList.contains("highlight"));
}

function loadHighlightState() {
  const savedState = localStorage.getItem("highlightActive");
  if (savedState === "true") {
    toggleText.classList.add("highlight");
  } else {
    toggleText.classList.remove("highlight");
  }
}

// --- List Item Creation with Edit Support ---
function createListItem(text) {
  const li = document.createElement("li");
  li.textContent = text;

  // Make editable on double click
  li.addEventListener("dblclick", () => {
    li.setAttribute("contenteditable", "true");
    li.focus();
  });

  // Save changes on blur or Enter
  li.addEventListener("blur", () => {
    li.removeAttribute("contenteditable");
    saveList();
  });

  li.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent new line
      li.blur();
    }
  });

  listEl.appendChild(li);
}

// --- Event Listeners ---
changeTitleBtn.addEventListener("click", () => {
  titleEl.textContent = "🚀 DOM Manipulation in Action!";
  taglineEl.innerHTML = `We just updated this text using <strong>JavaScript</strong>.`;
});

addItemBtn.addEventListener("click", () => {
  const value = newItemInput.value.trim();
  if (value) {
    createListItem(value);
    saveList();
    newItemInput.value = "";
  }
});

removeLastBtn.addEventListener("click", () => {
  if (listEl.lastElementChild) {
    listEl.removeChild(listEl.lastElementChild);
    saveList();
  }
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all items?")) {
    listEl.innerHTML = "";
    saveList();
  }
});

toggleBtn.addEventListener("click", () => {
  toggleText.classList.toggle("highlight");
  saveHighlightState();
});

animateBtn.addEventListener("click", () => {
  animateBox.classList.toggle("animate-move");
});

// --- Initial Load ---
loadList();
loadHighlightState();

// --- Initial Styling ---
titleEl.style.color = "#FE8C00";
