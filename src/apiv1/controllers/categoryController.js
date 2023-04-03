'use strict'

const util = require('util')
const mysql = require('mysql2')
const db = require('../../configs/configsDatabase')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM theloai'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM theloai WHERE id = ?'
        db.query(sql, [req.params.theloaiID], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let theloaiID = req.params.theloaiID;
        let sql = 'UPDATE theloai SET ? WHERE id = ?'
        db.query(sql, [data, theloaiID], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO theloai SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM theloai WHERE id = ?'
        db.query(sql, [req.params.theloaiID], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}
