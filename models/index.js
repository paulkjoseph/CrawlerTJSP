const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const _ = require('lodash')
const {bdPass} = require('../config/config')
const sequelize = new Sequelize(bdPass.bd, bdPass.user, bdPass.password, {
    host: bdPass.host,
    dialect: bdPass.dialect
})
const db = {} 

fs.readdirSync(__dirname)
    .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
    })

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
    }
})

module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db)