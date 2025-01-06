import { showToast } from "../utils/toast.js";

const billClassModal = document.getElementById("billClassModal");

document.getElementById("billClassCloseXBtn").addEventListener("click", function() {
    billClassModal.style.display = "none";
}); 

document.getElementById("cancelBillClassButton").addEventListener("click", function() {
    billClassModal.style.display = "none";
}); 

document.getElementById("submitBillClassButton").addEventListener("click", async () => {
    const studentClass = document.getElementById("billClassSelect").value;
    const academicYear = document.getElementById("billClassAcademicYear").value;
    const term = document.getElementById("billClassTerm").value;

    if (!academicYear || !studentClass || !term) {
        showToast("Please fill all the fields", "error");
        return;
    }

    const response = await window.api.getOneFee({class: studentClass, term: term, academicYear})
    console.log(response);

    if(!response.success) {
        showToast(studentRes.message, "error");
        return;
    }

    const feeId = response.data[0].id;

    const studentRes = await window.api.getStudents(studentClass);
    console.log(studentRes);

    if(!studentRes.success) {
        showToast(studentRes.message, "error");
        return;
    }

    if (studentRes.data.length === 0 || studentRes.data === "") {
        showToast("No students found in class to bill", "error");
        return;
    }

    const billedStudents = [];
    for (const student of studentRes.data) {
        console.log("Student: ", student)
        const res = await window.api.billStudent({studentId: student.id, feesId: feeId});
        if (!res.success) {
            showToast(res.message, "error");
            // showToast(`${billedStudents.length} students billed`, "error")
            return;
        }
        billedStudents.push(student);
    }

    showToast(`${billedStudents.length} students billed`, "success");
    document.getElementById("feesAmount").value = "";
    billClassModal.style.display = "none";
});