const counterNameInput = document.getElementById("counterName");
const createBtn = document.getElementById("createBtn");
const readBtn = document.getElementById("readBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const viewAllBtn = document.getElementById("viewAllBtn");
const counterResponse = document.getElementById("counters");

const URL = "http://localhost:3260"; // URL of our server

// Function to handle create counter action
async function createCounter() {
  const name = counterNameInput.value;
  if (!name) {
    alert("Counter name is required!");
    return;
  }

  const response = await fetch(`${URL}/create?name=${name}`, {
    method: "POST",
  });
  const data = await response.text();

  counterResponse.innerHTML = data;
}

// Function to handle read counter action
async function readCounter() {
  const name = counterNameInput.value;
  if (!name) {
    alert("Counter name is required!");
    return;
  }

  const response = await fetch(`${URL}/read?name=${name}`, { method: "GET" });
  const data = await response.text();

  counterResponse.innerHTML = data;
}

// Function to handle update counter action
async function updateCounter() {
  const name = counterNameInput.value;
  if (!name) {
    alert("Counter name is required!");
    return;
  }

  const response = await fetch(`${URL}/update?name=${name}`, {
    method: "PUT",
  });
  const data = await response.text();

  counterResponse.innerHTML = data;
}

// Function to handle delete counter action
async function deleteCounter() {
  const name = counterNameInput.value;
  if (!name) {
    alert("Counter name is required!");
    return;
  }

  const response = await fetch(`${URL}/delete?name=${name}`, {
    method: "DELETE",
  });
  const data = await response.text();

  counterResponse.innerHTML = data;
}

// Function to handle view all counters action
async function viewAll() {
  const response = await fetch(`${URL}/all`, { method: "GET" });
  const data = await response.text();

  counterResponse.innerHTML = data;
}

// Add event listeners
createBtn.addEventListener("click", createCounter);
readBtn.addEventListener("click", readCounter);
updateBtn.addEventListener("click", updateCounter);
deleteBtn.addEventListener("click", deleteCounter);
viewAllBtn.addEventListener("click", viewAll);

// Load all counters in DB when page loads
viewAll();
