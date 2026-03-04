const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema(
    {
        backgroundImage: {
            type: String,
            default: '/images/default-bg.jpg'
        },
        siteName: {
            type: String,
            default: 'StraightWay'
        }
    },
    {
        timestamps: true,
    }
);

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
