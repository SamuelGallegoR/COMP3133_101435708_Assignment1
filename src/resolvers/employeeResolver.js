const Employee = require('../models/Employee');

const employeeResolver = {
  Query: {
    getAllEmployees: async () => {
      return await Employee.find();
    },

    getEmployeeById: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) throw new Error("Employee not found");
      return employee;
    },

    getEmployeesByDesignationOrDepartment: async (_, { designation, department }) => {
      const query = {};
      if (designation) query.designation = designation;
      if (department) query.department = department;

      return await Employee.find(query);
    }
  },

  Mutation: {
    addEmployee: async (_, args) => {
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },

    updateEmployee: async (_, { id, ...updates }) => {
      const employee = await Employee.findByIdAndUpdate(id, updates, { new: true });
      if (!employee) throw new Error("Employee not found");
      return employee;
    },

    deleteEmployee: async (_, { id }) => {
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) throw new Error("Employee not found");
      return `Employee with ID ${id} deleted successfully.`;
    }
  }
};

module.exports = employeeResolver;
