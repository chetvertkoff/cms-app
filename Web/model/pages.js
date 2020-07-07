"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findElemsByProps = exports.updateElemProp = exports.getMaxID = exports.findChild = exports.deletePageWithChild = exports.deletePage = exports.update = exports.insertPage = exports.getPageById = exports.getPagesByParentId = void 0;
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
exports.getPagesByParentId = function (id, limit, callback) {
    try {
        var pages;
        var count;
        Promise.all([
            new Promise(function (resolve) {
                db
                    .collection('pages')
                    .find({ $or: [{ parent: id }, { id: id }] })
                    .limit(limit)
                    .toArray(function (err, data) {
                    pages = data;
                    resolve();
                });
            }),
            new Promise(function (resolve) {
                db
                    .collection('pages')
                    .find({ $or: [{ parent: id }, { id: id }] })
                    .count()
                    .then(function (newCount) {
                    count = newCount;
                    resolve();
                });
            })
        ])
            .then(function () {
            callback(null, pages, count);
        })
            .catch(function (err) { return callback(err); });
    }
    catch (error) { }
};
exports.getPageById = function (id, callback) {
    db
        .collection('pages')
        .find({ id: id })
        .limit(1)
        .toArray(function (err, data) {
        callback(err, data);
    });
};
exports.insertPage = function (page, callback) {
    if (page) {
        db
            .collection('pages')
            .insertOne(page)
            .then(function (data) { return callback(data); });
    }
};
exports.update = function (page) {
    if (page) {
        db
            .collection('pages')
            .updateOne({ id: page.id }, { $set: tslib_1.__assign({}, page) });
    }
};
exports.deletePage = function (id) {
    if (id) {
        db
            .collection('pages')
            .deleteOne({ id: id });
    }
};
exports.deletePageWithChild = function (id, title) {
    try {
        db
            .collection('pages')
            .deleteMany({ $or: [{ path: { $regex: ".*" + title + ".*" } }, { id: id }] });
    }
    catch (error) {
    }
};
exports.findChild = function (id, callback) {
    try {
        db
            .collection('pages')
            .find({ parent: id })
            .limit(1)
            .project({ id: 1, _id: 0 })
            .toArray(function (err, data) {
            if (err)
                throw new Error;
            callback(data);
        });
    }
    catch (error) {
    }
};
exports.getMaxID = function (collection, callback) { return (db
    .collection(collection)
    .find()
    .sort({ 'id': -1 })
    .project({ id: 1, _id: 0 })
    .limit(1)
    .toArray(function (err, data) {
    callback(data);
})); };
exports.updateElemProp = function (id, props, callback) {
    if (id && props) {
        db
            .collection('pages')
            .updateOne({ id: id }, { $set: tslib_1.__assign({}, props) })
            .then(function (data) { return callback(data); });
    }
};
exports.findElemsByProps = function (props, callback, limit) {
    try {
        db
            .collection('pages')
            .find(props)
            .limit(limit)
            .toArray(function (err, data) {
            if (err)
                throw new Error;
            callback(data);
        });
    }
    catch (error) {
    }
};
