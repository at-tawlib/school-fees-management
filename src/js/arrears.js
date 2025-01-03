import { showHideContainer } from "./utils/show-container.js";

document.getElementById("feesNav").addEventListener("click", async function () {
  showHideContainer("fees");
  const records = await window.api.getArrears();
  displayArrears(records.data);
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
