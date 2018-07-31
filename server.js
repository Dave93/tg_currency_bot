const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:davr2412ak@localhost:5432/salary_bot_users', {
    dialect: 'postgres',
    logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });

const Users = sequelize.define('users', {
  userId: {
      type: Sequelize.INTEGER
  },
  isAdmin: {
      type: Sequelize.INTEGER
  },
  first_name: {
      type: Sequelize.STRING
  },
  last_name: {
      type: Sequelize.STRING
  },
  username: {
      type: Sequelize.STRING
  }
});

sequelize.sync();

module.exports = {
  users: Users
}