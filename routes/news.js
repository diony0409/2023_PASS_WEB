const express     = require('express');
const router      = express.Router();

const axios       = require('axios');
const cheerio     = require('cheerio');


router.get('/', async function(req, res) {
    
    url = "https://news.naver.com/main/ranking/popularDay.naver";
    
    
    try {
        var context = new Array();
        const result = await axios.get(url, {responseType: 'arraybuffer', responseEncoding: 'binary'});
        //const html = result.data;
        const decoder = new TextDecoder('euc-kr');
        const html = decoder.decode(result.data);
        const $ = cheerio.load(html);
        const newsList = $('.rankingnews_list > li');
        newsList.each(function(index, news) {
            let title = $(news).find('div > a').text();
            let link = $(news).find('div > a').attr('href');
            context.push({title: title, link: link});
        });
        res.render('news', {context: context});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;