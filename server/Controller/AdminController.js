const express = require('express')

const getCredentials = (req, res) => {
    const Credentials = { "username": "rahnumarued@gmail.com", "password": "tjqe issk uwow mnnv" }
    res.status(200).json(Credentials)
}

module.exports = { getCredentials }