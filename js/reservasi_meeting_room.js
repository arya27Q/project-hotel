let total = 0;
let bookingList = [];

// Tambah booking meeting
function addBooking(meetingName, price) {
  const date = document.getElementById("meetingDate").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  if (!date || !startTime || !endTime) {
    alert("Harap pilih tanggal dan jam meeting terlebih dahulu!");
    return;
  }

  bookingList.push({ meetingName, price, date, startTime, endTime });
  total += price;
  renderBooking();
}

// Tampilkan daftar booking
function renderBooking() {
  const listElement = document.getElementById("booking-list");
  const totalElement = document.getElementById("total-price");

  listElement.innerHTML = "";
  bookingList.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.meetingName} (${item.date} ${item.startTime}-${item.endTime}) - Rp.${item.price.toLocaleString()}`;
    listElement.appendChild(li);
  });

  totalElement.textContent = "Rp. " + total.toLocaleString();
}

// Simpan ke localStorage & pindah ke payment
document.querySelector(".btn-book").addEventListener("click", function (e) {
  e.preventDefault();

  if (bookingList.length === 0) {
    alert("Belum ada ruangan yang kamu pilih!");
    return;
  }

  const bookingData = { list: bookingList, total: total };
  localStorage.setItem("bookingMeeting", JSON.stringify(bookingData));

  // pindah ke halaman pembayaran meeting
  window.location.href = "payment_meeting.html";
});
