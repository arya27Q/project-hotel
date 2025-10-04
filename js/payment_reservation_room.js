// ---------------- Booking list & total ----------------
document.addEventListener("DOMContentLoaded", function() {
  // Dummy data booking
  const dummyBooking = {
    list:[
      {roomName:"Deluxe Room", checkin:"2025-10-05", checkout:"2025-10-06", price:500000},
      {roomName:"Suite", checkin:"2025-10-05", checkout:"2025-10-07", price:1000000}
    ],
    total:1500000
  };
  localStorage.setItem("bookingData", JSON.stringify(dummyBooking));

  const data = localStorage.getItem("bookingData");
  if (!data) return;
  const booking = JSON.parse(data);

  const listContainer = document.getElementById("booking-list");
  if(listContainer){
    listContainer.innerHTML = booking.list.map(item => `
      <li>${item.roomName} (${item.checkin} → ${item.checkout}) - Rp.${item.price.toLocaleString()}</li>
    `).join("");
  }

  const totalPrice = document.getElementById("total-price");
  if(totalPrice) totalPrice.textContent = `Rp.${booking.total.toLocaleString()}`;
});

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
