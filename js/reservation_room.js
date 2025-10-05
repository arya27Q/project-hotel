let total = 0;
let bookingList = [];

function addBooking(roomName, price) {
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;

  if (!checkin || !checkout) {
    alert("Pilih tanggal check-in dan check-out dulu!");
    return;
  }

  bookingList.push({ roomName, price, checkin, checkout });
  total += price;
  renderBooking();
}

function renderBooking() {
  const listElement = document.getElementById("my-booking-list");
  const totalElement = document.getElementById("total-price");
  
  listElement.innerHTML = "";
  bookingList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.roomName} (${item.checkin} → ${item.checkout}) - Rp.${item.price.toLocaleString()}`;
    listElement.appendChild(li);
  });

  totalElement.textContent = "Rp. " + total.toLocaleString();
}

document.querySelector(".btn-book").addEventListener("click", function(e) {
  e.preventDefault();

  if (bookingList.length === 0) {
    alert("Belum ada booking kamar!");
    return;
  }

  const bookingData = {
    list: bookingList,
    total: total
  };

  localStorage.setItem("bookingData", JSON.stringify(bookingData));
  window.location.href = "payment_reservation_room.html";
});
