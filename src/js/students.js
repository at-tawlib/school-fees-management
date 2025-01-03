import { showHideContainer } from "./utils/show-container.js";

let currentStudent = null;

document.getElementById("studentsNav").addEventListener("click", async () => {
  const studentsRecords = await window.api.getAllStudents();

  showHideContainer("students");
  displayStudents(studentsRecords.data);
});

function displayStudents(students) {
  const tableBody = document.getElementById("studentsListTableBody");
  tableBody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.first_name} ${student.middle_name} ${student.last_name}</td>
      <td>${student.class}</td>
      <td></td>
      <td></td>
      <td>
        <button id="makePaymentBtn" title="Make Payment">pay fees</button>
      </td>
    `;

    row.querySelector("#makePaymentBtn").addEventListener("click", () => {
      currentStudent = student;

      document.getElementById("makePaymentModal").style.display = "block";
      document.getElementById(
        "modalStudentName"
      ).textContent = `${student.first_name} ${student.middle_name} ${student.last_name}`;
      document.getElementById("modalStudentClass").textContent = student.class;
      document.getElementById("modalStudentId").textContent = student.id;
    });
    tableBody.appendChild(row);
  });
}

function filterStudents() {
  const filter = document.getElementById("searchStudentInput").value;
  // TODO: add logic to filter students
}

document
  .getElementById("searchStudentInput")
  .addEventListener("input", filterStudents);

document
  .getElementById("filterByClassSelect")
  .addEventListener("change", (event) => {
    const selectedClass = event.target.value;
    const filteredStudents = studentsList.filter((student) => {
      return student.class.toLowerCase() === selectedClass.toLowerCase();
    });
    students = filteredStudents;
    displayStudents(students);
  });

document.getElementById("addStudentButton").addEventListener("click", () => {
  document.getElementById("addStudentModal").style.display = "block";
});
