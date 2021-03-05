const db = require("../models");
const user = db.user;
const bcrypt = require('bcrypt');

exports.create = (req, res, next) => {
    /*
    This controller for the user model initializes a new user object 
    and then saves it to the database.
    */

    // Validate request 
    
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            //mporei na mpei kai apla send kai to mhnuma
            message: "You should provide a <username> and <password> for the new user!"
        });
        return;
    }

    // Create a newUser object
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName || null,
        email: req.body.email || null,
        isAdmin: req.body.isAdmin || false,
        isStationManager: req.body.isStationManager || false
    };

    // Insert the newUser into the users table
    user.create(newUser)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(
                {message: err.message + ": username is not available" || "Some error occurred while creating the user."}
            );
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const isAdmin = req.query.isAdmin;
    const condition = isAdmin ? {isAdmin: {[Op.eq]: 1}} : null;

    user.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    user.findByPk(id)
        .then(data => {
            if (data){
                res.send(data);
            } else {
                res.status(400).send({
                    message: "Not Found User with id=" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    user.update(req.body, {
        where: {id: id},
        raw: true
    })
    .then(function (result,err) {
            console.log(err);
            console.log(result);
            if (result[0] !== 1) {
                return res.status(400).send({
                    message: `Cannot update User with id=${id}. User not found!`
                });
            } else {
                user.findByPk(id)
                .then(data => {
                    if (data){
                        res.send(data);
                    } else {
                        res.status(400).send({
                            message: "Not Found User with id=" + id
                        });
                    }
                })
                .catch(err => {
                    return res.status(500).send({
                        message: "Error retrieving User with id=" + id
                    });
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message + ": username is not available" || "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    user.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. User not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    user.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} users were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};
