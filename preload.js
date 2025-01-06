const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getAllStudents: () => ipcRenderer.invoke("get-all-students"),
  getStudents: (studentClass) => ipcRenderer.invoke("get-students", studentClass),
  insertStudent: (student) => ipcRenderer.invoke("insert-student", student),
  makePayment: (data) => ipcRenderer.invoke("make-payment", data),
  addFees: (data) => ipcRenderer.invoke("add-fees", data),
  getAllFees: (data) => ipcRenderer.invoke("get-all-fees", data),
  getOneFee: (data) => ipcRenderer.invoke("get-one-fee", data),
  billStudent: (data) => ipcRenderer.invoke("bill-student", data),
  getArrears: (data) => ipcRenderer.invoke("get-arrears", data)
});
