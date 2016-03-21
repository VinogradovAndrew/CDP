"use strict";
const express = require('express');
const db = require('./../fake-db');
const router = express.Router();

router.route('/users')
    .get(function (req, res, next) {
        db.getCollection((err, data)=> {
            if (err) {
                next(err);
            }
            res.json(data);
        });
    })
    .post(function (req, res, next) {
        const user = req.body;
        db.create(user, (err, data)=> {
            if (err) {
                next(err);
            }
            res.json(data);
        });
    });

router.route('/users/:id')
    .get(function (req, res, next) {
        const user_id = req.params.id;
        db.getById(user_id, (err, data)=> {
            if (err) {
                next(err);
            }
            res.json(data);
        });
    })
    .put(function (req, res, next) {
        const user = req.body;
        db.update(user, (err, data)=> {
            if (err) {
                next(err);
            }
            res.json(data);
        });
    })
    .delete(function (req, res, next) {
        const user_id = req.params.id;
        db.remove(user_id, (err, data)=> {
            if (err) {
                next(err);
            }
            res.json(data);
        });
    });


module.exports = router;
