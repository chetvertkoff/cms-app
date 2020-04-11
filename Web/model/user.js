"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mongodb_1 = require("mongodb");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var pages_1 = require("./pages");
dotenv_1.default.config();
var dbName = 'CRUD';
var db;
mongodb_1.MongoClient(process.env.URL, { useUnifiedTopology: true })
    .connect(function (err, client) {
    db = client.db(dbName);
});
exports.getUser = function (login, callback) {
    db
        .collection('users')
        .find({ login: login })
        .limit(1)
        .toArray(function (err, data) {
        callback(data[0]);
    });
};
exports.writeNewUser = function (user, callback) {
    pages_1.getMaxID('users', function (data) {
        db
            .collection('users')
            .insertOne({
            id: data[0].id + 1,
            login: user.login,
            password: user.password,
            profile: {
                name: user.name,
                role: user.role,
                avatar: user.avatar
            }
        })
            .then(function (result) { return callback(result); });
    });
};
exports.findUsers = function (callback) {
    db
        .collection('users')
        .find()
        .project({ _id: 0, login: 0, password: 0 })
        .toArray(function (err, data) {
        callback(data, err);
    });
};
exports.removeUser = function (id, callback) {
    db
        .collection('users')
        .deleteOne({ id: id })
        .then(function (result) { return callback(result); });
};
