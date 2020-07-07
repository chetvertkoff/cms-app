"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSomePageById = exports.updatePage = exports.addNewPage = exports.getSomePagesById = exports.getSomeParentPageById = void 0;
var tslib_1 = require("tslib");
var pages_1 = require("./../model/pages");
exports.getSomeParentPageById = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var parId, limit, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                parId = +req.params.id;
                if (req.query.limit)
                    limit = +req.query.limit + 1;
                else
                    limit = 0;
                return [4, pages_1.getPagesByParentId(parId, limit, function (err, data, count) {
                        new Promise(function (resolve, reject) {
                            var newData = {};
                            newData.length = count;
                            newData.data = data;
                            if (!data && !data.length)
                                reject();
                            resolve(newData);
                        })
                            .then(function (pages) {
                            res.send(pages);
                        })
                            .catch(function () {
                            res.status(404).send('Can not find page');
                        });
                    })];
            case 1:
                _a.sent();
                return [3, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).send('Incorrect query');
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.getSomePagesById = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var id, error_2;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = +req.params.id;
                return [4, pages_1.getPageById(id, function (err, data) {
                        if (!data && !data.length)
                            res.status(404).send('Can not find page');
                        return res.send(data);
                    })];
            case 1:
                _a.sent();
                return [3, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).send('Incorrect query');
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.addNewPage = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var page_1;
    return tslib_1.__generator(this, function (_a) {
        try {
            page_1 = req.body;
            new Promise(function (resolve, reject) {
                pages_1.getMaxID('pages', function (data) {
                    if (!data && !data.length)
                        res.status(404).send('Can not find page');
                    resolve(data[0].id);
                });
            }).then(function (id) {
                var idNew = +id + 1;
                return {
                    alias: page_1.alias,
                    isFolder: page_1.isContainer,
                    id: idNew,
                    title: page_1.title,
                    parent: +page_1.options.id,
                    parentName: page_1.options.parentName,
                    path: page_1.options.path,
                    isActive: page_1.active,
                    body: page_1.body,
                    metaDescription: page_1.metaDescription,
                    metaKeywords: page_1.metaKeywords,
                    metaTitle: page_1.metaTitle,
                    hasChild: false
                };
            })
                .then(function (data) {
                res.setHeader('Content-Type', 'application/json');
                pages_1.insertPage(data, function (insertResult) {
                    if (data.parent) {
                        pages_1.updateElemProp(data.parent, { hasChild: true }, function (updateResult) {
                            res.send({ id: data.id });
                        });
                    }
                    else {
                        res.send({ id: data.id });
                    }
                });
            });
        }
        catch (error) {
            res.status(400).send('Incorrect query');
        }
        return [2];
    });
}); };
exports.updatePage = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var page, error_3;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                page = req.body;
                delete page._id;
                return [4, pages_1.update(page)];
            case 1:
                _a.sent();
                setImmediate(function () {
                    res.setHeader('Content-Type', 'application/json');
                    res.send({ id: req.body._id });
                });
                return [3, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).send('Something went wrong');
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.deleteSomePageById = function (req, res) {
    try {
        var currentPage;
        new Promise(function (resolve, reject) {
            var id = +req.params.id;
            if (id) {
                pages_1.findElemsByProps({ id: id }, function (data) {
                    currentPage = data[0];
                    if (data[0].id) {
                        pages_1.findElemsByProps({ parent: data[0].parent }, function (data) {
                            if (data[0].parent && data.length == 1) {
                                pages_1.updateElemProp(data[0].parent, { hasChild: false }, null);
                            }
                            resolve(id);
                        }, 2);
                    }
                    else {
                        res.status(500).send('Something went wrong');
                    }
                }, 1);
            }
            else {
                res.status(500).send('Something went wrong');
            }
        })
            .then(function (id) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) return [3, 4];
                        if (!currentPage.isFolder) return [3, 2];
                        pages_1.deletePageWithChild(id, currentPage.title);
                        return [4, res.send({ id: id })];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        pages_1.deletePage(id);
                        return [4, res.send({ id: id })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        }); });
    }
    catch (error) {
        res.status(500).send('Something went wrong');
    }
};
