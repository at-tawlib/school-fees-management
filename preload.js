const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getAllStudents: () => ipcRenderer.invoke("get-all-students"),
  getStudents: (studentClass) => ipcRenderer.invoke("get-students", studentClass),
  insertStudent: (student) => ipcRenderer.invoke("insert-student", student),
  makePayment: (data) => ipcRenderer.invoke("make-payment", data),
  addFees: (data) => ipcRenderer.invoke("add-fees", data),
  attachFeesToStudent: (data) => ipcRenderer.invoke("attach-fees-student", data),
  getArrears: (data) => ipcRenderer.invoke("get-arrears", data)
});
