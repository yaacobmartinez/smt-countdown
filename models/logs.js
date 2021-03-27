const express = require("express");
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: [true, 'URL is required']
    },
    log_type: {
        type: String,
        enum: ['start', 'stop'],
        default: 'start'
    },
})

module.exports = mongoose.model("logs", logSchema)