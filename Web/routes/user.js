"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var auth_1 = tslib_1.__importDefault(require("./../middleware/auth"));
var user_1 = require("./../controller/user");
var user = express_1.default.Router();
user.get('/', auth_1.default, function (req, res) {
    res.send({ 'auth': 'ok' });
});
user.get('/getUsers', user_1.getUsers);
user.get('/getUser', user_1.getUserByLogin);
user.post('/', user_1.login);
user.post('/newUser', user_1.addNewUser);
user.delete('/deleteUser/:id', user_1.deleteUser);
exports.default = user;
