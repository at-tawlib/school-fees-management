// This function is used to show and hide the container based on the container name passed as an argument.
export function showHideContainer(container) {
  const dashboardContainer = document.getElementById("dashboardContainer");
  const studentsContainer = document.getElementById("studentsContainer");
  const feesContainer = document.getElementById("arrearsContainer");

  switch (container) {
    case "dashboard":
      dashboardContainer.style.display = "flex";
      studentsContainer.style.display = "none";
      feesContainer.style.display = "none";
      break;
    case "students":
      dashboardContainer.style.display = "none";
      studentsContainer.style.display = "flex";
      feesContainer.style.display = "none";
      break;
    case "fees":
      dashboardContainer.style.display = "none";
      studentsContainer.style.display = "none";
      feesContainer.style.display = "flex";
      break;
  }
}
