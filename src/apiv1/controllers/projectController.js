'use strict'

const util = require('util')
const mysql = require('mysql2')
const db = require('../../configs/configsDatabase')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM project'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM project WHERE id = ?'
        db.query(sql, [req.params.projectID], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let projectID = req.params.projectID;
        let sql = 'UPDATE project SET ? WHERE id = ?'
        db.query(sql, [data, projectID], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO project SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM project WHERE id = ?'
        db.query(sql, [req.params.projectID], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}
