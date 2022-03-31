// created by Irina Shushkevych
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrent')
const updateUser = require('./updateUser')
const updateAvatars = require('./updateAvatars')

module.exports = { register, login, logout, getCurrent, updateUser, updateAvatars }