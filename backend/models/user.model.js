module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      // username: the username of the system user
      username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      }, 
      // password: the password of the system user
      password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }, 
      // fullName: the name and surname of the system user
      fullName:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      // email: the email of the system user
      email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
      },
      // isAdmin: a boolean field that indicates system users with admin priviledges
      isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
      },
      // isStationManager: a boolean field that indicates system users with station manager priviledges
      isStationManager: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
      }
    },{
      timestamps: false
    });
    return user;
  };