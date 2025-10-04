let total = 0;
let bookingList = [];

function addBooking(meetingName, price) {
  const date = document.getElementById("meetingDate").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  if (!date || !startTime || !endTime) {
    alert("Pilih tanggal dan jam meeting dulu!");
    return;
  }

  bookingList.push({ meetingName, price, date, startTime, endTime });
  total += price;
  renderBooking();
}

function renderBooking() {
  const listElement = document.getElementById("booking-list");
  const totalElement = document.getElementById("total-price");

  listElement.innerHTML = "";
  bookingList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.meetingName} (${item.date} ${item.startTime}-${item.endTime}) - Rp.${item.price.toLocaleString()}`;
    listElement.appendChild(li);
  });

  totalElement.textContent = "Rp. " + total.toLocaleString();
}

document.querySelector(".btn-book").addEventListener("click", function(e) {
  e.preventDefault();

  if (bookingList.length === 0) {
    alert("Belum ada booking ruang meeting!");
    return;
  }

  const bookingData = { list: bookingList, total: total };
  localStorage.setItem("bookingData", JSON.stringify(bookingData));
  window.location.href = "payment_reservation_meeting.html";
});
