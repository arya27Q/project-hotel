// Ambil elemen booking list & total
const bookingList = document.getElementById("booking-list");
const totalPriceEl = document.getElementById("total-price");

// Load data dari localStorage saat halaman dibuka
let bookingData = JSON.parse(localStorage.getItem("bookingData")) || { list: [], total: 0 };
updateBookingList();

// Fungsi update tampilan booking
function updateBookingList() {
  bookingList.innerHTML = bookingData.list.map(item => `
    <li>${item.roomName} (${item.checkin} → ${item.checkout}) - Rp.${item.price.toLocaleString()}</li>
  `).join("");
  totalPriceEl.textContent = `Rp.${bookingData.total.toLocaleString()}`;
}

// Fungsi tambah booking saat klik select
function addBooking(roomName, price) {
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  
  if(!checkin || !checkout) {
    alert("Silakan pilih tanggal check-in dan check-out terlebih dahulu!");
    return;
  }

  // Tambahkan ke bookingData
  bookingData.list.push({ roomName, checkin, checkout, price });
  bookingData.total += price;

  // Simpan ke localStorage
  localStorage.setItem("bookingData", JSON.stringify(bookingData));

  // Update tampilan
  updateBookingList();
}


// ---------------- Show Payment Floating Form ----------------
window.showPayment = function(icon){
  const overlay = document.getElementById("overlay");
  const floatingForm = document.getElementById("floatingForm");
  const title = document.getElementById("floatingTitle");
  const formContent = document.getElementById("formContent");
  const confirmBtn = document.getElementById("confirmBtn");

  overlay.style.display = "block";
  floatingForm.style.display = "block";

  confirmBtn.disabled = true; // tombol nonaktif awalnya

  // Isi form sesuai metode
  switch(icon.dataset.method){
    case "E-Wallet":
      title.textContent="E-Wallet Payment";
      formContent.innerHTML = `<label>Nomor E-Wallet:</label><input type="text" id="inputField" placeholder="Masukkan nomor e-wallet">`;
      break;
    case "Visa":
      title.textContent="Visa Payment";
      formContent.innerHTML = `
        <label>Nomor Kartu:</label><input type="text" id="inputField" placeholder="Masukkan nomor kartu">
        <label>CVV:</label><input type="text" id="cvvField" placeholder="CVV">
      `;
      break;
    case "MasterCard":
      title.textContent="MasterCard Payment";
      formContent.innerHTML = `
        <label>Nomor Kartu:</label><input type="text" id="inputField" placeholder="Masukkan nomor kartu">
        <label>CVV:</label><input type="text" id="cvvField" placeholder="CVV">
      `;
      break;
    case "QRIS":
      title.textContent="QRIS Payment";
      formContent.innerHTML = `<p>Scan QR ini untuk bayar:</p><img src="/img/qris.webp" alt="QRIS" width="200">`;
      confirmBtn.disabled = false; // QRIS tidak perlu input, bisa langsung bayar
      break;
  }

  // Cek input jika ada
  const inputField = document.getElementById("inputField");
  const cvvField = document.getElementById("cvvField");

  if(inputField){
    inputField.addEventListener("input", checkInput);
  }
  if(cvvField){
    cvvField.addEventListener("input", checkInput);
  }

  function checkInput(){
    if(inputField && cvvField){
      confirmBtn.disabled = !(inputField.value.trim() && cvvField.value.trim());
    } else if(inputField){
      confirmBtn.disabled = !inputField.value.trim();
    }
  }

  // Tombol konfirmasi
  confirmBtn.onclick = function(){
    alert(`${icon.dataset.method} berhasil dibayar!`);
    floatingForm.style.display="none";
    overlay.style.display="none";
  };

  // Tombol tutup
  document.getElementById("closeForm").onclick = function(){
    floatingForm.style.display="none";
    overlay.style.display="none";
  };
};



// ---------------- Pay Now Button (cek login) ----------------
const payBtn = document.querySelector(".pay-btn");
let isLoggedIn = localStorage.getItem("isLoggedIn")==="true";

payBtn.addEventListener("click", function(){
  if(!isLoggedIn){
    window.location.href="login.html";
  } else {
    alert("Memproses pembayaran...");
  }
});
