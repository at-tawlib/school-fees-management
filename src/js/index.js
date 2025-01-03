import { showHideContainer } from "./utils/show-container.js";

document.getElementById("dashboardNav").addEventListener("click", function () {
    showHideContainer("dashboard");
});

document.getElementById("addFeesButton").addEventListener("click", function () {
  document.getElementById("addFeesModal").style.display = "block";
});
