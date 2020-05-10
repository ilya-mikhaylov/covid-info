const http = require('http');
const express = require('express');

const port = process.env.PORT || 7000;
const app = express();
const server = http.createServer(app);

const request = require('request');
const dotenv = require('dotenv').config();
const cors = require('cors');
const moment = require('moment');
const NewsAPI = require('newsapi');
const rp = require('request-promise');
const $ = require('cheerio');
const path = require('path');
const publicPath = path.join(__dirname, 'client/build');

const newsApiKey = process.env.NEWS_API_KEY;
const newsApi = new NewsAPI(newsApiKey);

const statsApiKey = process.env.STATS_API_KEY;
const statsApi = null;

const url = 'https://www.kayak.com/travel-restrictions/';

app.use(cors());

app.get('/news', async (req, res) => {
  let { country, offset } = req.query;
  let date = moment();
  if (offset !== 0 || offset !== undefined) {
    date = date.subtract(offset, 'days');
  }
  if (country === undefined) {
    country = 'World';
  } else if (country === 'S. Korea') {
    country = 'South Korea';
  } else if (country === 'N. Korea') {
    country = 'North Korea';
  }
  newsApi.v2.everything({
    q: `coronavirus ${country}`,
    from: moment(date).format('YYYY-MM-DD'),
    to: moment(date).format('YYYY-MM-DD'),
    language: 'en',
    sortBy: 'relevancy',
    page: 1,
  }).then(response => {
    console.log(response);
    const news = response.articles.map(
      (item) => ({
        title: item.title,
        description: item.description,
        source: item.source.name,
        url: item.url,
        image: item.urlToImage,
        date: moment(item.publishedAt).format('DD.MM.YYYY'),
      }),
    );
    res.json({ news });
  });
});

app.get('/stats', async (req, res) => {
	let { country } = req.query;
	if (country === undefined) {
	  country = 'World';
	} else if (country === 'S. Korea') {
	  country = 'South Korea';
	} else if (country === 'N. Korea') {
	  country = 'North Korea';
	}
	const options = {
	  method: 'POST',
	  url: 'https://covid-19-live-stats.p.rapidapi.com/country',
	  headers: {
		'x-rapidapi-host': 'covid-19-live-stats.p.rapidapi.com',
		'x-rapidapi-key': statsApiKey,
		'content-type': 'application/json',
		accept: 'application/json',
	  },
	  body: { country },
	  json: true,
	};
	request(options, (error, response, body) => {
	  if (error) throw new Error(error);
	  res.json(body[0]);
	});
  });

app.get('/restrictions', async (req, res) => {
  let { country } = req.query;
  if (country === 'S. Korea') {
    country = 'South Korea';
  } else if (country === 'N. Korea') {
    country = 'North Korea';
  } else if (country === 'Canada') {
    rp(url)
      .then((html) => {
        const response = $('p:contains("Canada has restricted")', html)
          .parent()
          .text()
          // .split('\n')
          // .slice(2)
          // .join('\n');
          console.log('>>>>>>')
          console.log(response)
        if (response === '') {
          res.json({
            response: 'No data available.',
          });
        } else {
          res.json({
            response,
          });
        }
      })
      .catch((err) => {
        res.json({
          response: 'No data available.',
        });
      });
  } else {
    rp(url)
      .then((html) => {
        const response = $(`h3:contains("${country}")`, html)
          .parent()
          .text()
          .split('\n')
          .slice(2)
          .join('\n');
        if (response === '') {
          res.json({
            response: 'No data available.',
          });
        } else {
          res.json({
            response,
          });
        }
      })
      .catch((err) => {
        res.json({
          response: 'No data available.',
        });
      });
  }
});

app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(port, () => console.log(`Listening on ${port}`));
