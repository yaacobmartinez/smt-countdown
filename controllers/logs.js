const express = require('express')
const Log = require('../models/logs')

exports.getAll = async (req, res) => {
    try {
        const logs = await Log.find({})
        res.json({logs})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}

exports.add = async (req, res) => {
    try {
        const log = new Log(req.body)
        const newLog = log.save()
        res.json({success: true, message: 'created'})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}

exports.delete = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.json({success: false, message: 'ID is required'})
        }
        const deletedLog = await Log.findByIdAndRemove(req.params.id)
        res.json({success: true, message: 'deleted'})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}