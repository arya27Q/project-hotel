const contactBtn = document.getElementById("contactBtn");
const contactOverlay = document.getElementById("contactOverlay");
const contactForm = document.getElementById("contactForm");
const closeContact = document.getElementById("closeContact");
const contactFormInner = document.getElementById("contactFormInner");

contactBtn.addEventListener("click", () => {
  contactOverlay.style.display = "block";
  contactForm.style.display = "block";
});

closeContact.addEventListener("click", () => {
  contactOverlay.style.display = "none";
  contactForm.style.display = "none";
});

contactOverlay.addEventListener("click", () => {
  contactOverlay.style.display = "none";
  contactForm.style.display = "none";
});

contactFormInner.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Pesan kamu sudah terkirim! Terima kasih telah menghubungi kami 😊");
  contactOverlay.style.display = "none";
  contactForm.style.display = "none";
  contactFormInner.reset();
});
