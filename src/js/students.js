import { showHideContainer } from "./utils/show-container.js";

let currentStudent = null;

document.getElementById("studentsNav").addEventListener("click", async () => {
  const studentsRecords = await window.api.getAllStudents();

  showHideContainer("students");
  displayStudents(studentsRecords.data);
});

document
  .getElementById("filterByClassSelect")
  .addEventListener("click", async () => {
    const classSelected = document.getElementById("filterByClassSelect").value;
    document.getElementById("searchStudentInput").value = "";
    let students;

    if (classSelected === "all") students = await window.api.getAllStudents();
    else students = await window.api.getStudents(classSelected);

    displayStudents(students.data);
  });


document.getElementById("searchStudentInput").addEventListener("input", () => {
  const searchValue = document.getElementById("searchStudentInput").value.toLowerCase();

  const tableRows = document.getElementById("studentsListTableBody").getElementsByTagName('tr');

  for (let row of tableRows) {
    const nameCell = row.getElementsByTagName("td")[1]?.textContent.toLowerCase();
    row.style.display = nameCell && nameCell.includes(searchValue) ? "" : "none";
  }
})

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
      <td>
        <button id="billStudentBtn" title="Bill student">Bill Student</button>
      </td>
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

    row.querySelector("#billStudentBtn").addEventListener("click", () => {});

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

document.getElementById("addStudentButton").addEventListener("click", () => {
  document.getElementById("addStudentModal").style.display = "block";
});
