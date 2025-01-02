const modal = document.getElementById("makePaymentModal");
const closeModalBtn = document.getElementById("cancelPaymentModalBtn");

document.getElementById("makePaymentButton").addEventListener("click", () => {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("paymentCloseXBtn").addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) modal.style.display = "none";
});
