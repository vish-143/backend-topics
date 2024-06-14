const pool = require("../../config/dbconfig")

module.exports = {
    createNewEmployee: (data) => {
        const {
            FirstName,
            LastName,
            City,
            Email
        } = data
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO employee(FirstName,LastName,City,Email) VALUES (?,?,?,?)`
            pool.query(
                sql,
                [
                    FirstName,
                    LastName,
                    City,
                    Email
                ],
                ((error, result) => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve(result)
                    }
                })
            )
        })
    },

    getAllEmployee: () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM employee`
            pool.query(
                sql,
                [],
                ((error, result) => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve(result)
                    }
                })
            )
        })
    },

    getEmployeeById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM employee WHERE id=?`
            pool.query(
                sql,
                [id],
                ((error, result) => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve(result)
                    }
                })
            )
        })
    },

    updateEmployeeDetail: (data, id) => {
        return new Promise((resolve, reject) => {
            const columnNames = Object.keys(data);
            const columnValues = columnNames.map(columnName => data[columnName]);

            if (columnNames.length === 0 || !id) {
                reject(new Error('At least one column name and value, and employee ID are required'));
                return;
            }

            const placeholders = columnNames.map(columnName => `${columnName}=?`).join(', ');

            const sql = `UPDATE employee SET ${placeholders} WHERE id=?`;

            const queryValues = [...columnValues, id];

            pool.query(
                sql,
                queryValues,
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    deleteEmployeeDetail: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM employee WHERE id=?`
            pool.query(
                sql,
                [id],
                ((error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            )
        })
    }
}