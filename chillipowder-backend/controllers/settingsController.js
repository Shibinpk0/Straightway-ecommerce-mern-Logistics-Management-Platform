const asyncHandler = require('express-async-handler');
const Settings = require('../models/Settings');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
    let settings = await Settings.findOne();
    if (!settings) {
        settings = await Settings.create({});
    }
    res.json(settings);
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = asyncHandler(async (req, res) => {
    const { backgroundImage, siteName } = req.body;

    let settings = await Settings.findOne();

    if (settings) {
        settings.backgroundImage = backgroundImage || settings.backgroundImage;
        settings.siteName = siteName || settings.siteName;

        const updatedSettings = await settings.save();
        res.json(updatedSettings);
    } else {
        const newSettings = await Settings.create({
            backgroundImage,
            siteName
        });
        res.json(newSettings);
    }
});

module.exports = {
    getSettings,
    updateSettings,
};
