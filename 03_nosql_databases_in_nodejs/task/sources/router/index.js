"use strict";
const express = require('express');
//const db = require('./../fake-db');
const router = express.Router();
const User = require('./../fake-db/users_db');
const url = require('url');


router.route('/users')
    .get(function (req, res, next) {
        let url_parts = url.parse(req.url, true);
        let query = url_parts.query;
        let params = query.searchValue ? {[query.searchBy]: query.searchValue} : {};
        console.log(query);
        User.find(params)
            .sort({[query.sortBy]: query.sortDir})
            .limit(+query.perPage)
            .select(query.filterBy)
            .exec(function (err, users, next) {
                if (err) next(err);
                let usersAmount = users.length + 1;
                let smthng = +query.offset * (+query.perPage);
                console.log(usersAmount);
                users.filter(function (item, index) {
                    console.log(index >= smthng);
                    return index >= smthng;
                });
                console.log(users);
                res.json({collection: users, total: usersAmount});
            });
    })
    .post(function (req, res, next) {

        const user_for_db = new User(req.body);
        user_for_db.duplicateIdProperty();
        user_for_db.save(function (err, user, next) {
            if (err) next(err);
            res.json(user);
        });

    });

router.route('/users/:id')
    .get(function (req, res, next) {
        const user_id = req.params.id;
        User.findById(user_id, function (err, user, next) {
            if (err)next(err);
            res.json(user);
        })
    })
    .put(function (req, res, next) {
        const user = req.body;
        User.update({_id: user.id}, user, {upsert: true}, function (err, db_user) {
            if (err)next(err);
            res.json(db_user);
        });
    })
    .delete(function (req, res, next) {
        const user_id = req.params.id;
        User.remove({_id: user_id}, function (err, user, next) {
            if (err) next(err);
            res.json(user);
        });

    });


module.exports = router;
