import { studentsList } from "./students_list.js";

let students = studentsList;

document.getElementById("studentsNav").addEventListener("click", () => {
  document.getElementById("studentsContainer").style.display = "flex";
  document.getElementById("dashboardContainer").style.display = "none";
  console.log(studentsList);

  displayStudents(students);
});

function displayStudents(students) {
  const tableBody = document.getElementById("studentsListTableBody");
  tableBody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.class}</td>
      <td>${student.fees_paid}</td>
      <td>${student.arreas}</td>
      <td></td>
    `;
    tableBody.appendChild(row);
  });
}

function filterStudents() {
  const filter = document.getElementById("searchStudentInput").value;

  const filteredStudents = studentsList.filter((student) => {
    return student.name.toLowerCase().includes(filter.toLowerCase());
  });
  students = filteredStudents;
  displayStudents(students);
}

document.getElementById("searchStudentInput").addEventListener("input", filterStudents);

document.getElementById("filterByClassSelect").addEventListener("change", (event) => {
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