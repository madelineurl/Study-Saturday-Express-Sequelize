'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

Student.beforeCreate(newStudent => {
  newStudent.firstName = newStudent.firstName[0]
                        .toUpperCase()
                        .concat(newStudent.
                        firstName.slice(1));
  newStudent.lastName = newStudent.lastName[0]
                        .toUpperCase()
                        .concat(newStudent.
                        lastName.slice(1));
});

module.exports = Student;
