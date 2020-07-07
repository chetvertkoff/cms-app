"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.addNewUser = exports.getUserByLogin = exports.getUsers = exports.login = void 0;
var tslib_1 = require("tslib");
var bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var user_1 = require("./../model/user");
exports.login = function (req, res) {
    try {
        var login_1 = req.body.login;
        var pass_1 = req.body.password;
        if (!login_1 || !pass_1)
            return res.status(400).send('Incorrect query');
        user_1.getUser(login_1, function (user) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var matchPass, token;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user)
                            return [2, res.status(400).send('Cannot find user')];
                        return [4, bcryptjs_1.default.compare(pass_1, user.password)];
                    case 1:
                        matchPass = _a.sent();
                        if (!matchPass)
                            return [2, res.status(400).send('Incorrect password')];
                        token = jsonwebtoken_1.default.sign({ userId: user._id }, 'mern', { expiresIn: '1h' });
                        delete user.login;
                        delete user.password;
                        res.send({ 'token': token, 'user': user });
                        return [2];
                }
            });
        }); });
    }
    catch (error) {
        res.status(400).send('Incorrect query');
    }
};
exports.getUsers = function (req, res) {
    try {
        user_1.findUsers(function (data) {
            res.send(data);
        });
    }
    catch (error) {
        res.status(400).send('Incorrect query');
    }
};
exports.getUserByLogin = function (req, res) {
    try {
        var login_2 = req.query.login;
        if (!login_2)
            return res.status(400).send('Incorrect query');
        user_1.getUser(login_2, function (user) {
            if (!user)
                return res.status(404).send('Cant find user');
            delete user.password;
            delete user.login;
            res.send(user);
        });
    }
    catch (error) {
        res.status(400).send('Incorrect query');
    }
};
exports.addNewUser = function (req, res) {
    try {
        var _a = req.body, password_1 = _a.password, login_3 = _a.login, name_1 = _a.name, role = _a.role;
        if (!login_3 || login_3 == ''
            || !name_1 || name_1 == ''
            || !password_1 || password_1 == '')
            return res.status(400).send('Values ​​are missing');
        user_1.getUser(login_3, function (user) {
            if (user)
                return res.status(409).send('User already exists');
            user_1.writeNewUser(tslib_1.__assign(tslib_1.__assign({}, req.body), { password: bcryptjs_1.default.hashSync(password_1) }), function (result) {
                if (result.ops[0].id) {
                    res.send({ status: 'ok' });
                }
                else {
                    res.status(400).send('Incorrect query');
                }
            });
        });
    }
    catch (error) {
        res.status(400).send('Incorrect query');
    }
};
exports.deleteUser = function (req, res) {
    try {
        var id_1 = +req.params.id;
        if (id_1) {
            res.send({ id: id_1 });
            user_1.removeUser(id_1, function (result) {
                res.send({ id: id_1 });
            });
        }
        else {
            res.status(400).send('Incorrect query');
        }
    }
    catch (error) {
        res.status(400).send('Incorrect query');
    }
};
