const mongoose = require('mongoose');


const TimeSeriesSchema = new mongoose.Schema({
    minuteBucket: { type: Date, index: true, unique: true },
    records: { type: Array, default: [] }
});


module.exports = mongoose.model('TimeSeries', TimeSeriesSchema);