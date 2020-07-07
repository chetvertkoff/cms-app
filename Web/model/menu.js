"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = void 0;
var tslib_1 = require("tslib");
var mongodb_1 = require("mongodb");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var settings_1 = tslib_1.__importDefault(require("../settings"));
dotenv_1.default.config();
var dbName = 'CRUD';
var db;
mongodb_1.MongoClient(settings_1.default.URL, { useUnifiedTopology: true })
    .connect(function (err, client) {
    db = client.db(dbName);
});
exports.getMenu = function (callback) {
    db
        .collection('menu')
        .find({})
        .toArray(function (err, data) {
        callback(data, err);
    });
};
