document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.querySelector(".checkbox input");
  const payBtn = document.querySelector(".pay-btn");
  const icons = document.querySelectorAll(".icons img");
  const userBtn = document.getElementById("userBtn");

  let selectedMethod = null;
  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");

  // Ubah tampilan header sesuai login
  if (isLoggedIn) {
    userBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
    userBtn.href = "#";
    userBtn.style.color = "red";
    userBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      alert("🚪 You have been logged out.");
      window.location.href = "login.html";
    });
  } else {
    userBtn.innerHTML = '<i class="fa-solid fa-user"></i> Login';
    userBtn.href = "login.html";
    userBtn.style.color = "#0026ff";
  }

  function disablePay() {
    payBtn.disabled = true;
    payBtn.style.opacity = "0.6";
    payBtn.style.cursor = "not-allowed";
  }
  function enablePay() {
    payBtn.disabled = false;
    payBtn.style.opacity = "1";
    payBtn.style.cursor = "pointer";
  }
  disablePay();

  // pilih metode pembayaran
  icons.forEach(icon => {
    icon.addEventListener("click", () => {
      icons.forEach(i => i.style.border = "none");
      icon.style.border = "3px solid #0044ff";
      icon.style.borderRadius = "6px";
      selectedMethod = icon.dataset.method;
      if (checkbox.checked) enablePay();
    });
  });

  // centang persetujuan
  checkbox.addEventListener("change", () => {
    if (checkbox.checked && selectedMethod) {
      enablePay();
    } else {
      disablePay();
    }
  });

  // klik bayar
  payBtn.addEventListener("click", () => {
    if (!isLoggedIn) {
      alert("⚠️ Anda harus login terlebih dahulu.");
      window.location.href = "login.html";
      return;
    }

    if (selectedMethod) {
      const user = username || "Guest";
      alert(`✅ Payment successful!\n\nUser: ${user}\nMethod: ${selectedMethod}\nThank you for your booking at Luxury Hotel.`);
    } else {
      alert("⚠️ Please select a payment method first.");
    }
  });
});
