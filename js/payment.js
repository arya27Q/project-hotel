 const payBtn = document.querySelector(".pay-btn");

  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  payBtn.addEventListener("click", function() {
    if(!isLoggedIn){
      window.location.href = "login.html";
    } else {
      alert("Memproses pembayaran...");

    }
  });