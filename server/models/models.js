const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Profile = sequelize.define('profile', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    gender: {type: DataTypes.STRING},
    fullYears: {type: DataTypes.INTEGER},
    city: {type: DataTypes.STRING}
})

User.hasMany(Profile)
Profile.belongsTo(User)

module.exports = {
    User, Profile
}