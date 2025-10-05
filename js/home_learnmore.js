const learnMoreBtn = document.getElementById("learnMoreBtn");
const floatingText = document.getElementById("floatingText");
const closeInfo = document.getElementById("closeInfo");

learnMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  floatingText.classList.add("show");
});

closeInfo.addEventListener("click", () => {
  floatingText.classList.remove("show");
});
