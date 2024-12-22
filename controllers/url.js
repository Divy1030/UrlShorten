const shortid = require('shortid');
const URL = require('../models/model');

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ message: "Url is required" });
    const shortID = shortid.generate();
    try {
        const result = await URL.create({
            short: shortID,
            redirectURL: body.url,
            visitHistory: []  // Changed from 'visithistory' to 'visitHistory'
        });
        console.log('Short URL created:', result);
        return res.status(200).json({ short: shortID });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function handleGetAnalysis(req, res) {
    const short = req.params.short;
    try {
        const entry = await URL.findOne({ short: short });
        if (!entry) {
            console.log('Short URL not found:', short);
            return res.status(404).json({ message: "Short URL not found" });
        }
        console.log('Analysis data:', entry);
        return res.status(200).json({ visitHistory: entry.visitHistory, visitHistoryCount: entry.visitHistory.length });
    } catch (error) {
        console.error('Error fetching analysis:', error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalysis
};