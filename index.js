const express = require('express');
const mongoose = require('mongoose');
const URL = require('./models/model');
const urlRoutes = require('./Routes/url');
// const { handleGetAnalysis } = require('./controllers/url');

const app = express();
const port = 8001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shorten', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Redirect route
app.get('/:short', async (req, res) => {
    const short = req.params.short;
    try {
        const entry = await URL.findOneAndUpdate(
            { short: short },  // Ensure this matches the schema field
            { $push: { visitHistory: { timestamp: Date.now() } } },  // Changed from 'visithistory' to 'visitHistory'
            { new: true }
        );
        if (!entry) {
            console.log('Short URL not found:', short);
            return res.status(404).json({ message: 'Short URL not found' });
        }
        console.log('Visit history updated:', entry.visitHistory);
        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error updating visit history:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Analysis route
app.get('/analysis/:short', urlRoutes);

// URL routes
app.use('/url', urlRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});