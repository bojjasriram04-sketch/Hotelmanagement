let rooms = JSON.parse(localStorage.getItem("rooms")) || [];

/* Save data */
function save() { localStorage.setItem("rooms", JSON.stringify(rooms)); }

/* Toast notification */
function showToast(msg) {
  let t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 2000);
}

/* Play sound */
function playSound() { document.getElementById("sound").play(); }

/* Theme toggle */
function toggleTheme() { document.body.classList.toggle("dark"); }

/* Invoice modal */
function showInvoice(room) {
  document.getElementById("invoice").style.display = "block";
  document.getElementById("invoiceText").innerText =
    Room: ${room.room}\nGuest: ${room.name}\nType: ${room.type};
}
function closeInvoice() { document.getElementById("invoice").style.display = "none"; }

/* Booking */
function bookRoom() {
  let name = document.getElementById("name").value;
  let room = document.getElementById("room").value;
  let type = document.getElementById("type").value;

  if (!name || !room) { showToast("Fill all fields!"); return; }
  if (rooms.find(r => r.room == room)) { showToast("Room already booked!"); return; }

  rooms.push({ name, room, type });
  save();
  display();
  showInvoice({ name, room, type });
  playSound();
  showToast("Booked 🎉");
}

/* Checkout */
function removeRoom(i) {
  rooms.splice(i, 1);
  save();
  display();
  showToast("Checked out ✅");
}

/* Display rooms */
function display() {
  let list = document.getElementById("roomList");
  list.innerHTML = "";
  rooms.forEach((r, i) => {
    list.innerHTML += `
      <div class="card">
        <h3>Room ${r.room}</h3>
        <p>${r.name}</p>
        <p>${r.type}</p>
        <button onclick="removeRoom(${i})">Checkout</button>
      </div>
    `;
  });
  updateDashboard();
}

/* Dashboard */
function updateDashboard() {
  document.getElementById("totalRooms").innerText = rooms.length;
  document.getElementById("revenue").innerText = rooms.length * 2000;
}

/* Initial display */
display();
