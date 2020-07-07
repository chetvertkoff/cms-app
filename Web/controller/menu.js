"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullmenu = void 0;
var menu_1 = require("../model/menu");
exports.getFullmenu = function (req, res) {
    try {
        menu_1.getMenu(function (data, error) {
            if (!data && !data.length) {
                res.status(404).send('Can not find menu');
            }
            return res.send(data);
        });
    }
    catch (error) {
        res.status(400).send('Incorrect query');
    }
};
