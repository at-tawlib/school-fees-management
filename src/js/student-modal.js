const modal = document.getElementById("addStudentModal");
const closeModalBtn = document.getElementById("cancelStudentModalBtn");

function openAddStudentModal() {
  modal.style.display = "block";
}

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("closeX").addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) modal.style.display = "none";
});
