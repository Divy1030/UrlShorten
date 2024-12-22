const express=require('express');
const { handleGenerateShortUrl, handleGetAnalysis } = require('../controllers/url');
const router=express.Router();


router.post("/", handleGenerateShortUrl);
router.get("/analysis/:short",handleGetAnalysis);

module.exports=router;