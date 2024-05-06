import express from "express";
import axios from "axios";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 5001;

app.get("/", (request, response) => {
    response.json({ "Working": true });
});

app.get("/dislike", async (request, response) => {
    try {
        let videoId = request.query.videoId;
        let passedDate = request.query.passedDate;
        let passedTime = request.query.passedTime;
        console.log(passedDate, passedTime);
        const videoData = await axios.get(`https://returnyoutubedislikeapi.com/Votes?videoId=${videoId}`);
        response.json(videoData.data);
    } catch (e) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/scrap-data", async (request, response) => {
    const videoId = request.query.videoId;
    let browser;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(`https://www.youtube.com/watch?v=${videoId}`);

        const thumbnailUrl = await page.$eval('meta[property="og:image"]', element => element.getAttribute('content'));
        const videoTitle = await page.$eval('meta[property="og:title"]', element => element.getAttribute('content'));
        const linkCanonical = await page.$eval('link[rel="canonical"]', element => element.getAttribute('href'));
        const linkAlternate = await page.$eval('link[rel="alternate"]', element => element.getAttribute('href'));
        const descriptionShort = await page.$eval('meta[name="description"]', element => element.getAttribute('content'));

        const ytInitialPlayerResponse = await page.evaluate(() => {
            return window.ytInitialPlayerResponse;
        });
        const description = ytInitialPlayerResponse.videoDetails.shortDescription
        const author = ytInitialPlayerResponse.videoDetails.author
        const channelId = ytInitialPlayerResponse.videoDetails.channelId
        const isCrawlable = ytInitialPlayerResponse.videoDetails.isCrawlable
        const isLiveContent = ytInitialPlayerResponse.videoDetails.isLiveContent
        const keywords = ytInitialPlayerResponse.videoDetails.keywords
        const lengthSeconds = ytInitialPlayerResponse.videoDetails.lengthSeconds
        const thumbnail = ytInitialPlayerResponse.videoDetails.thumbnail

        const fetchedData = {
            url: thumbnailUrl,
            title: videoTitle,
            videoLink: linkCanonical,
            videoAltLink: linkAlternate,
            descriptionShort,
            description,
            author,
            channelId,
            isCrawlable,
            isLiveContent,
            keywords,
            lengthSeconds,
            thumbnail
        };
        response.json(fetchedData);

    } catch (error) {
        console.error('Error fetching data:', error);
        response.status(500).send('Internal Server Error');
    } finally {
        if (browser) {
            await browser.close();
        }
    }
})

app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`);
})