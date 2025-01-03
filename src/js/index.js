document.getElementById("dashboardNav").addEventListener("click", function() {
    document.getElementById("dashboardContainer").style.display = "flex";
    document.getElementById("studentsContainer").style.display = "none";
});

document.getElementById("addFeesButton").addEventListener("click", function() {
    document.getElementById("addFeesModal").style.display = "block";
});