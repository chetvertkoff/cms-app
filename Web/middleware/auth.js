"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var auth = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token)
        res.status(401).send('Access denied');
    try {
        jsonwebtoken_1.default.verify(token, 'mern');
        next();
    }
    catch (error) {
        res.status(401).send('Access denied');
    }
};
exports.default = auth;
