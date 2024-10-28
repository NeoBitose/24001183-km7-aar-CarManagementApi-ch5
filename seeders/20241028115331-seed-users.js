'use strict';

const bcrypt = require('bcryptjs'); 

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('bismillah', 10);
    return queryInterface.bulkInsert('Users', [
      {
        email: 'alifrmdn@example.com',
        password: hashedPassword,
        firstName: 'Alif',
        lastName: 'Ramadhan',
        phone: '1234567890',
        fotoProfil: 'https://example.com/profile1.jpg',
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'admin@example.com',
        password: hashedPassword,
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '0987654321',
        fotoProfil: 'https://example.com/profile2.jpg',
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'member@example.com',
        password: hashedPassword,
        firstName: 'Eric',
        lastName: 'Joe',
        phone: '0987654321',
        fotoProfil: 'https://example.com/profile2.jpg',
        role: "member",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};