const service = require("../services/employee/employee-service");

const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: "An error occurred",
        error: error.message
    });
};

const checkValidId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid employee ID"
        });
    }
    next();
};

module.exports = {
    addEmployee: async (req, res) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "At least one field is required in the request body"
                });
            }
            const result = await service.createNewEmployee(req.body);
            if (result.affectedRows === 1) {
                res.status(201).json({
                    success: true,
                    message: "New Employee Created",
                    data: result
                });
            } else {
                handleServerError(res, new Error("Failed to add new employee"));
            }
        } catch (error) {
            handleServerError(res, error);
        }
    },

    getAllEmployee: async (req, res) => {
        try {
            const result = await service.getAllEmployee();
            if (result.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "All Employee details were fetched successfully",
                    data: result
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No employee details found"
                });
            }
        } catch (error) {
            handleServerError(res, error);
        }
    },

    getEmployeeById: [
        checkValidId,
        async (req, res) => {
            try {
                const result = await service.getEmployeeById(req.params.id);
                if (result.length > 0) {
                    res.status(200).json({
                        success: true,
                        message: "Specific Employee detail were displayed successfully",
                        data: result
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: "No employee detail present in database with this id"
                    });
                }
            } catch (error) {
                handleServerError(res, error);
            }
        }],


    updateEmployee: [
        checkValidId,
        async (req, res) => {
            try {
                if (!req.body || Object.keys(req.body).length === 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Request body is empty"
                    });
                }

                const existingEmployee = await service.getEmployeeById(req.params.id);
                if (!existingEmployee.length > 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Employee not found"
                    });
                }

                const result = await service.updateEmployeeDetail(req.body, req.params.id);
                res.status(201).json({
                    success: true,
                    message: "Employee detail updated successfully",
                    data: result
                });
            } catch (error) {
                handleServerError(res, error);
            }
        }
    ],

    deleteEmployee: [
        checkValidId,
        async (req, res) => {
            try {
                const existingEmployee = await service.getEmployeeById(req.params.id);
                if (!existingEmployee.length > 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Employee not found"
                    });
                }
                const result = await service.deleteEmployeeDetail(req.params.id);
                res.status(200).json({
                    success: true,
                    message: "Employee detail deleted successfully",
                });
            } catch (error) {
                handleServerError(res, error);
            }
        }
    ]
};
