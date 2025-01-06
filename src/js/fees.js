import { showHideContainer } from "./utils/show-container.js";
import { showToast } from "./utils/toast.js";

const feesTable = document.getElementById("feesTable");
const feesTableHead = document.getElementById("feesTableHead");
const feesTableBody = document.getElementById("feesTableBody");

document.getElementById("feesNav").addEventListener("click", async function () {
  showHideContainer("fees");
});

document.getElementById("addFeesButton").addEventListener("click", function () {
  document.getElementById("addFeesModal").style.display = "block";
});

document
  .getElementById("viewFeesButton")
  .addEventListener("click", async () => {
    const response = await window.api.getAllFees();

    if (!response.success) {
      showToast("Error occurred", "error");
      return;
    }

    feesTableHead.innerHTML = "";
    feesTableBody.innerHTML = "";
    feesTable.innerHTML = "";

    const tableHeadRow = document.createElement("tr");
    tableHeadRow.innerHTML = `
        <th>Number</th>
        <th>Class</th>
        <th>Academic Year</th>
        <th>Term</th>
        <th>Fees</th>
        <th>Actions</th>
    `;
    feesTableHead.appendChild(tableHeadRow);
    feesTable.appendChild(feesTableHead);

    // TODO: add filters and search functionality and option to update amount
    response.data.forEach((record, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${record.class} </td>
        <td>${record.academic_year} </td>
        <td>${record.term} </td>
        <td>${record.amount} </td>
        <td>
          <div style="display: flex; justify-content: center">
           <button id="btnEditDailyStats" class="btn-edit-record" title="Edit record">
            <i class="fa-solid fa-edit"></i>
            Edit
          </button>
          </div>
        </td>
      `;
      feesTableBody.appendChild(row);
    });

    feesTable.appendChild(feesTableBody);
  });

document.getElementById("billClassButton").addEventListener("click", () => {
  document.getElementById("billClassModal").style.display = "block";
});

function displayArrears(data) {
  const tableBody = document.getElementById("arrearsListTableBody");
  tableBody.innerHTML = "";
  data.forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${record.student_id}</td>
        <td>${record.first_name} ${record.middle_name} ${record.last_name}</td>
        <td>${record.class}</td>
        <td>${record.total_fees}</td>
        <td>${record?.total_paid || 0}</td>
        <td>${record.total_fees - record?.total_paid || 0}</td>
        <td>
            <button id="addFeesBtn" title="Add Fees">add fees</button>
        </td>
        `;
    tableBody.appendChild(row);
  });
}
