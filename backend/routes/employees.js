const router = require('express').Router();
let Employee = require('../models/employee.model');

// Get all employees
router.route('/').get((req, res) => {
  Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Create a new employee
router.route('/add').post((req, res) => {
  const newEmployee = new Employee(req.body);

  newEmployee.save()
    .then(() => res.json('Employee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update an employee
router.route('/update/:id').post((req, res) => {
  Employee.findById(req.params.id)
    .then(employee => {
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.age = req.body.age;
      employee.dateOfJoining = req.body.dateOfJoining;
      employee.title = req.body.title;
      employee.department = req.body.department;
      employee.employeeType = req.body.employeeType;
      employee.currentStatus = req.body.currentStatus;

      employee.save()
        .then(() => res.json('Employee updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete an employee
router.route('/:id').delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json('Employee deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
