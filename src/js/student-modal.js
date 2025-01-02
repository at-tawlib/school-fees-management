import { showToast } from "./utils/toast.js";

const modal = document.getElementById("addStudentModal");
const closeModalBtn = document.getElementById("cancelStudentModalBtn");
const firstNameInput = document.getElementById("studentFirstNameInput");
const middleNameInput = document.getElementById("studentMiddleNameInput");
const lastNameInput = document.getElementById("studentLastNameInput");
const studentClassSelect = document.getElementById("studentClassSelect");

function openAddStudentModal() {
  modal.style.display = "block";
}

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("closeX").addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("addStudentModalBtn").addEventListener("click", () => {
  addStudent();
});

async function addStudent() {
  firstNameInput.style.background = "transparent";
  lastNameInput.style.background = "transparent";

  const student = {
    firstName: firstNameInput.value,
    middleName: middleNameInput.value,
    lastName: lastNameInput.value,
    class: studentClassSelect.value,
  };

  if (!student.firstName || student.firstName === "") {
    firstNameInput.style.background = "red";
    return;
  }

  if (!student.lastName || student.lastName === "") {
    lastNameInput.style.background = "red";
    return;
  }

  const response = await window.api.insertStudent(student);
  if(response.error) {
    return showToast(response.error, "error");
  }


  showToast(response.message, "success");
  firstNameInput.value = "";
  lastNameInput.value = "";
  middleNameInput.value = "";
  studentClassSelect.value = "";
  modal.style.display = "none";
}

window.addEventListener("click", (event) => {
  if (event.target === modal) modal.style.display = "none";
});

// TODO: Add class to database and reference it as a foreign key in the students table
