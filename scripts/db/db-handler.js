const fs = require("fs");
const Database = require("better-sqlite3");

// Database file path
const dbPath = require("../file-paths").getDbPath();

//  Required tables for validation
const requiredTables = ["arrears", "fees", "payments", "students"];

class DatabaseHandler {
  constructor() {
    if (!fs.existsSync(dbPath)) {
      throw new Error("Database file not found. Please check the database.");
    }

    // Initialize database connection
    this.db = new Database(dbPath);
    this.validateDatabase();
  }

  // Method to validate the database
  validateDatabase() {
    // **Step 1: Check Database Integrity**
    const integrityCheck = this.db.pragma("integrity_check");
    if (integrityCheck[0].integrity_check !== "ok") {
      throw new Error(
        "Database integrity check failed. The database is corrupted."
      );
    }

    console.log("Database integrity check passed.");

    // **Step 2: Validate Required Tables**
    const existingTables = this.getExistingTables();
    const missingTables = requiredTables.filter(
      (table) => !existingTables.includes(table)
    );

    if (missingTables.length > 0) {
      throw new Error(
        `The following required tables are missing: ${missingTables.join(
          ", "
        )}.`
      );
    }
    console.log("All required tables are present.");
  }

  // Utility method to get existing tables in the database
  getExistingTables() {
    const query = `
      SELECT name 
      FROM sqlite_master 
      WHERE type='table'
    `;
    const rows = this.db.prepare(query).all();
    return rows.map((row) => row.name);
  }

  insertStudent(student) {
    try {
      const stmt = this.db.prepare(`
            INSERT INTO students ( first_name, middle_name, last_name, class, created_at)
            VALUES (?, ?, ?, ?, ?)
        `);
      stmt.run(
        student.firstName,
        student.middleName,
        student.lastName,
        student.class,
        new Date().toISOString()
      );
      return {
        success: true,
        message: "Student added successfully.",
      };
    } catch (error) {
      console.error("Database Error: ", error);
      return { success: false, message: error.message };
    }
  }

  getAllStudents() {
    try {
      const stmt = this.db.prepare(`SELECT * FROM students`);
      const records = stmt.all();
      return { success: true, data: records };
    } catch (error) {
      console.error("Database Error: ", error);
      return { success: false, message: error.message };
    }
  }

  getStudents(studentClass) {
    try {
      const stmt = this.db.prepare(`SELECT * FROM students WHERE class = ?`);
      const records = stmt.all(studentClass);
      return { success: true, data: records };
    } catch (error) {
      console.error("Database Error: ", error);
      return { success: false, message: error.message };
    }
  }

  makePayment(data) {
    try {
      const stmt = this.db.prepare(`
           INSERT INTO payments (student_id, class, amount, payment_mode, term, academic_year, payment_details, date_paid ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
      stmt.run(
        data.studentId,
        data.class,
        data.amount,
        data.paymentMode,
        data.term,
        data.academicYear,
        data.paymentDetails,
        new Date().toISOString()
      );
      return {
        success: true,
        message: "Payment made successfully.",
      };
    } catch (error) {
      console.error("Database Error: ", error);
      return { success: false, message: error.message };
    }
  }

  getOneFee(fee) {
    try {
      const stmt = this.db.prepare(`
          SELECT * FROM fees WHERE class = ? AND term = ? AND academic_year = ?
        `);
      const records = stmt.all(fee.class, fee.term, fee.academicYear);
      return { success: true, data: records };
    } catch (error) {
      console.error("Database Error: ", error);
      return { success: false, message: error.message };
    }
  }

  feeExists(fee) {
    const stmt = this.db.prepare(`
        SELECT 1 FROM fees
        WHERE class = ? AND term = ? AND academic_year = ?
        LIMIT 1
    `);

    const result = stmt.get(fee.class, fee.term, fee.academicYear);
    return result !== undefined; // Return true if a record exists
  }

  addFees(data) {
    try {
      // Checks if fees exist for the class, term and academic year before adding
      if (this.feeExists(data)) {
        return {
          success: false,
          message:
            "Fee already exists for the specified class, term, and academic year.",
        };
      }
      const stmt = this.db.prepare(`
          INSERT INTO fees (class, academic_year, term, amount, created_at) VALUES (?, ?, ?, ?, ?)
        `);
      stmt.run(
        data.class,
        data.academicYear,
        data.term,
        data.amount,
        new Date().toISOString()
      );
      return {
        success: true,
        message: "Fees added successfully.",
      };
    } catch (error) {
      console.error("Database Error: ", error);
      return { success: false, message: error.message };
    }
  }

  getAllFees() {
    try {
      const stmt = this.db.prepare(`SELECT * FROM fees`);
      const records = stmt.all();
      return { success: true, data: records };
    } catch (error) {
      console.error("Database Error: ", error);
      return { success: false, message: error.message };
    }
  }

  // Check whether student has already been billed with the fees in question
  studentBillExist(data) {
    const stmt = this.db.prepare(`
        SELECT 1 FROM arrears
        WHERE student_id = ? AND fees_id = ? 
        LIMIT 1
    `);

    const result = stmt.get(data.studentId, data.feesId);
    return result !== undefined; // Return true if a record exists
  }

  billStudent(data) {
    try {
       // check if student already billed
       if (this.studentBillExist(data)) {
        return {
          success: false,
          message:
            "Student has already been billed with this fees"
        };
      }

      const stmt = this.db.prepare(`
          INSERT INTO arrears ( student_id, fees_id, created_at ) VALUES ( ?, ?, ?)
        `);
      stmt.run(data.studentId, data.feesId, new Date().toISOString());
      return {
        success: true,
        message: "Fees attached to student successfully.",
      };
    } catch (error) {
      console.error("Database Error: ", error);
      return { success: false, message: error.message };
    }
  }

  // TODO: may not be needed
  getArrears() {
    try {
      const stmt = this.db.prepare(`
        SELECT s.id AS student_id, s.first_name, s.middle_name, s.last_name, s.class, SUM(f.amount) AS total_fees, p.total_paid AS total_paid
        FROM students s
        JOIN fees f ON f.class = s.class
        LEFT JOIN (
          SELECT student_id, term, academic_year,SUM(amount) AS total_paid
          FROM payments
          GROUP BY  student_id, term, academic_year
        ) p ON s.id = p.student_id AND f.term = p.term AND f.academic_year = p.academic_year
        GROUP BY s.id
        `);
      const records = stmt.all();
      return { success: true, data: records };
    } catch (error) {
      console.error("Database Error: ", error);
      return { success: false, message: error.message };
    }
  }

  // Close the database connection
  close() {
    this.db.close();
  }
}

module.exports = DatabaseHandler;
