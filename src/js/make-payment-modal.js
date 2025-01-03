import { showToast } from "./utils/toast.js";

const modal = document.getElementById("makePaymentModal");

// TODO: remove this
document.getElementById("makePaymentButton").addEventListener("click", () => {
  modal.style.display = "block";
});

document
  .getElementById("cancelPaymentModalBtn")
  .addEventListener("click", () => {
    modal.style.display = "none";
  });

document.getElementById("paymentCloseXBtn").addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("submitPayment").addEventListener("click", async () => {
  const studentId = document.getElementById("modalStudentId").textContent;
  const academicYear = document.getElementById("academicYear").value;
  const studentClass = document.getElementById("classSelect").value;
  const term = document.getElementById("term").value;
  const paymentAmount = document.getElementById("paymentAmount").value;
  const paymentMode = document.getElementById("paymentMode").value;
  const paymentDetails = document.getElementById("paymentDetails").value;

  if (
    !studentId ||
    !academicYear ||
    !term ||
    !paymentAmount ||
    !paymentMode
  ) {
    showToast("Please fill all the fields", "error");
    return;
  }

  if (paymentMode !== "cash" && !paymentDetails) {
    showToast("Please provide payment details", "error");
    return;
  }

  const response = await window.api.makePayment({
    studentId,
    class: studentClass,
    academicYear,
    term,
    amount: paymentAmount,
    paymentMode,
    paymentDetails,
  });
  if (!response.success) {
    showToast("Payment failed", "error");
    return;
  }
  showToast(response.message, "success");

  document.getElementById("paymentAmount").value = "";
  document.getElementById("paymentDetails").value = "";
  modal.style.display = "none";
});
