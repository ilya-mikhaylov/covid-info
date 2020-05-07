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

const newsApiKey = process.env.NEWS_API_KEY;
// const newsApi = new NewsAPI(newsApiKey);

const statsApiKey = process.env.STATS_API_KEY;
const statsApi = null;


const fakeNews = {
  status: 'ok',
  totalResults: 3094,
  articles: [
    {
      source: {
        id: null,
        name: 'Bleepingcomputer.com',
      },
      author: 'imranshabber',
      title: 'Bitcoin mutual funds with beneficial features',
      description: 'Bitcoin mutual funds with beneficial features - posted in Windows Crashes and Blue Screen of Death (BSOD) Help and Support: Bitcoin mutual funds are usable for the users of cryptocurrency, and it is a support facility to live in the society with easiness. Var…',
      url: 'https://www.bleepingcomputer.com/forums/t/718585/bitcoin-mutual-funds-with-beneficial-features/',
      urlToImage: 'https://www.bleepingcomputer.com/forums/public/style_images/master/meta_image.png',
      publishedAt: '2020-05-04T05:52:33Z',
      content: '0 members, 18 guests, 1 anonymous users',
    },
    {
      source: {
        id: null,
        name: 'Fxstreet.com',
      },
      author: 'Yohay Elam',
      title: "Forex Today: Pompeo pumps up the dollar, Trump's trade threats boost the yen, EZ data eyed",
      description: 'Here is what you need to know on Monday, May 4: Sino-American tensions are weighing on sentiment and boosting the dollar and the yen against the rest,',
      url: 'https://www.fxstreet.com/news/forex-today-pompeo-pumps-up-the-dollar-trumps-trade-threats-boost-the-yen-ez-data-eyed-202005040533',
      urlToImage: 'https://editorial.fxstreet.com/images/Macroeconomics/Countries/Asia/China/digital-stock-market-chart-display-57366454_Large.jpg',
      publishedAt: '2020-05-04T05:33:08Z',
      content: 'Here is what you need to know on Monday, May 4:\r\nSino-American tensions are weighing on sentiment and boosting the dollar and the yen against the rest, with gold prices also declining. Second-tier US and European figures coronavirus developments and relations… [+1885 chars]',
    },
    {
      source: {
        id: null,
        name: 'Softpedia.com',
      },
      author: 'Softpedia Windows',
      title: 'EasyMiner 0.97 (Donationware)',
      description: 'Download EasyMiner - A CPU and GPU miner for Litecoin, Bitcoin, and various other cryptocurrencies that supports multiple mining protocols, as well as proxies',
      url: 'https://www.softpedia.com/get/Internet/Other-Internet-Related/EasyMiner.shtml',
      urlToImage: 'https://windows-cdn.softpedia.com/screenshots/EasyMiner_1.png',
      publishedAt: '2020-05-04T05:26:01Z',
      content: 'EasyMiner is an application that functions as a CPU and GPU miner for various cryptocurrencies, such as Litecoin and Bitcoin. It supplies a GUI for minerd.exe and cgminer.exe, and it supports the getwork and Stratum mining protocols.\r\nThe program can be used … [+1379 chars]',
    },
    {
      source: {
        id: null,
        name: 'Bleepingcomputer.com',
      },
      author: 'bokers',
      title: 'Recovered Data From Ransomware',
      description: 'Recovered Data From Ransomware - posted in Ransomware Help & Tech Support: Dear All\n \nRecently i got info from my friend, that is so much people got infected with ransomware and need help to recovery their file and ask for help in this website.\nThe characteri…',
      url: 'https://www.bleepingcomputer.com/forums/t/718581/recovered-data-from-ransomware/',
      urlToImage: 'https://www.bleepingcomputer.com/forums/public/style_images/master/meta_image.png',
      publishedAt: '2020-05-04T05:05:38Z',
      content: 'Dear All\r\nRecently i got info from my friend, that is so much people got infected with ransomware and need help to recovery their file and ask for help in this website.\r\nThe characteristic of your pc / laptop are infected with ransomware :\r\n<ol><li>The appear… [+2514 chars]',
    },
    {
      source: {
        id: null,
        name: '99bitcoins.com',
      },
      author: 'Steven Hay',
      title: 'Bitcoin News Summary – May 4, 2020',
      description: 'The post Bitcoin News Summary – May 4, 2020 appeared first on 99 Bitcoins.\n﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿ The Brave browser, known for its Basic Attention Token crypto rewards for viewing ads, announced integration with the Binance exchange. The latest desktop version of Brave…',
      url: 'https://99bitcoins.com/bitcoin-news-summary-may-4-2020/',
      urlToImage: 'https://99bitcoins.com/wp-content/uploads/2020/05/This-week-in-Bitcoin-May-4-2020.png',
      publishedAt: '2020-05-04T05:00:59Z',
      content: 'The Brave browser, known for its Basic Attention Token crypto rewards for viewing ads, announced integration with the Binance exchange. The latest desktop version of Brave features a widget that allows users to buy and trade crypto through Binance, as well as… [+2304 chars]',
    },
    {
      source: {
        id: null,
        name: 'Dailyfintech.com',
      },
      author: 'Ilias Louis Hatzis',
      title: 'Waiting for Godot… Bitcoin’s halving',
      description: 'Waiting for Godot is a critically-acclaimed play written in 1948 by Irish writer Samuel Beckett. In the play. the two main characters, Vladimir and Estragon, wait for the arrival of someone named Godot. While they wait, they are visited by a messenger boy tha…',
      url: 'https://dailyfintech.com/2020/05/04/53248/',
      urlToImage: 'https://i1.wp.com/dailyfintech.com/wp-content/uploads/2020/05/1_yGofJhpnr8gS4FtIT58Ohg.png?fit=740%2C492&ssl=1',
      publishedAt: '2020-05-04T05:00:34Z',
      content: 'Waiting for Godot is a critically-acclaimed play written in 1948 by Irish writer Samuel Beckett. In the play. the two main characters, Vladimir and Estragon, wait for the arrival of someone named Godot. While they wait, they are visited by a messenger boy tha… [+5422 chars]',
    },
    {
      source: {
        id: null,
        name: 'Bitcoinist.com',
      },
      author: 'Yashu Gola',
      title: 'Bitcoin Sells Off at $9K Again as US-China Tensions Dent Risk Sentiment',
      description: 'Bitcoin failed to maintain a floor above $9,000 as renewed US-China trade tensions dented global risk sentiment. The cryptocurrency got off to poor start this week, but the market remained convinced about a long-term price rally. The bullish sentiment disrega…',
      url: 'https://bitcoinist.com/bitcoin-sells-off-at-9k-again-as-us-china-tensions-dent-risk-sentiment/',
      urlToImage: 'https://bitcoinist.com/wp-content/uploads/2020/05/eric-prouzet-TZB-1vfImhY-unsplash-1920x1278.jpg',
      publishedAt: '2020-05-04T04:51:42Z',
      content: '<ul><li>Bitcoin failed to maintain a floor above $9,000 as renewed US-China trade tensions dented global risk sentiment.</li><li>The cryptocurrency got off to poor start this week, but the market remained convinced about a long-term price rally.</li><li>The b… [+3140 chars]',
    },
    {
      source: {
        id: null,
        name: 'Newsbtc.com',
      },
      author: 'Aayush Jindal',
      title: 'Bitcoin Broke A Key Technical Pattern It’s Vulnerable to a Drop Toward $8K',
      description: 'Bitcoin is struggling to gain bullish momentum above $9,200 against the US Dollar. BTC price is currently declining and it could continue to slide towards $8,400 or $8,200. Bitcoin is facing an increase in selling pressure below $9,200 and $9,000. The price i…',
      url: 'https://www.newsbtc.com/2020/05/04/bitcoin-btc-vulnerable-drop-toward-8k/',
      urlToImage: 'https://www.newsbtc.com/wp-content/uploads/2020/05/shutterstock_104159093.jpg',
      publishedAt: '2020-05-04T03:28:45Z',
      content: 'Bitcoin is struggling to gain bullish momentum above $9,200 against the US Dollar. BTC price is currently declining and it could continue to slide towards $8,400 or $8,200.\r\n<ul><li>Bitcoin is facing an increase in selling pressure below $9,200 and $9,000.</l… [+2306 chars]',
    },
    {
      source: {
        id: null,
        name: 'Cointelegraph.com',
      },
      author: 'Cointelegraph By Turner Wright',
      title: 'Iranian Authorizes Issue License for 6000-Rig Crypto Farm',
      description: 'Iran’s Ministry of Industry, Mining and Trade issued a license to Turkey-based company iMiner for operating in the province of Semnan.',
      url: 'https://cointelegraph.com/news/iranian-authorizes-issue-license-for-6000-rig-crypto-farm',
      urlToImage: 'https://s3.cointelegraph.com/storage/uploads/view/1acc4544765aee16d9313d0e28faf759.jpg',
      publishedAt: '2020-05-04T03:09:00Z',
      content: 'Iran’s Ministry of Industry, Mine and Trade granted a license for cryptocurrency mining company iMiner to operate in the country. With 6,000 rigs, iMiner’s setup would purportedly make it one of the largest crypto miners in Iran.\r\nAccording to an article publ… [+1344 chars]',
    },
    {
      source: {
        id: null,
        name: 'Forevergeek.com',
      },
      author: 'ForeverGeek',
      title: 'Kinds of Gaming Platforms Where Bitcoins Exist',
      description: 'When it comes to the blockchain world and Bitcoin (BTC), the gaming industry is among the most interesting ones to talk about. If you have been in the world of cryptocurrency world for so long, you know that Bitcoin is the most popular digital currency. Gamin…',
      url: 'https://forevergeek.com/kinds-of-gaming-platforms-where-bitcoins-exist/',
      urlToImage: 'http://forevergeek.com/wp-content/media/2020/05/bitcoin-3137984_1280.jpg',
      publishedAt: '2020-05-04T02:44:24Z',
      content: 'When it comes to the blockchain world and Bitcoin (BTC), the gaming industry is among the most interesting ones to talk about.\r\nIf you have been in the world of cryptocurrency world for so long, you know that Bitcoin is the most popular digital currency. Gami… [+3221 chars]',
    },
    {
      source: {
        id: null,
        name: 'Yahoo.com',
      },
      author: 'Noelle Acheson',
      title: 'Crypto Long & Short: Why Bitcoin’s Big Rally Is a Sign of Its Economic Resilience',
      description: "Bitcoin's underlying technology and monetary system make it one of the few investable assets that is immune to the economic fluctuations we have ahead.",
      url: 'https://finance.yahoo.com/news/crypto-long-short-why-bitcoin-020059464.html',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/.wH73cXE5IF5cZyZ5ChiiA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyODA7aD04NDAuMDQyOTY0NTU0MjQyOA--/https://s.yimg.com/uu/api/res/1.2/keV61B9Jof6a7DHLmZZ1_Q--~B/aD02MTE7dz05MzE7c209MTthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en-US/coindesk_75/8cbac6699414d97aa198c801e4bf6461',
      publishedAt: '2020-05-04T02:00:59Z',
      content: 'Economic growth figures are starting to trickle in, and, as expected, theyre bad. Really bad. This past week the U.S. reported Q1 GDP growth as -4.8%. Italys GDP fell -4.5%, Spain came in at -5.2%, and France trumped that with a whopping -5.8%.  And thats jus… [+14942 chars]',
    },
    {
      source: {
        id: null,
        name: 'Coindesk.com',
      },
      author: 'Noelle Acheson',
      title: 'Crypto Long & Short: Why Bitcoin’s Big Rally Is a Sign of Its Economic Resilience',
      description: "Bitcoin's underlying technology and monetary system make it one of the few investable assets that is immune to the economic fluctuations we have ahead.",
      url: 'https://www.coindesk.com/bitcoin-economic-resilience',
      urlToImage: 'https://static.coindesk.com/static/images/meta-logo-53ae7f214a3e90249423b9f31135bdb7.png',
      publishedAt: '2020-05-04T02:00:59Z',
      content: 'Economic growth figures are starting to trickle in, and, as expected, theyre bad. Really bad. This past week the U.S. reported Q1 GDP growth as -4.8%. Italys GDP fell -4.5%, Spain came in at -5.2%, and France trumped that with a whopping -5.8%.  And thats jus… [+15060 chars]',
    },
    {
      source: {
        id: 'newsweek',
        name: 'Newsweek',
      },
      author: 'Andrew Whalen',
      title: "'Billions' Season 5 Premiere Annotated: Every Reference in Episode 1, From 'Click Click Boom' To Becky Lynch",
      description: '"Billions" is dense with historical, pop culture, musical and other references. Instead of pausing to Google each line, check out our reference guide to the season 5 premiere episode.',
      url: 'https://www.newsweek.com/billions-season-5-premiere-episode-spoilers-references-music-becky-lynch-1501552',
      urlToImage: 'https://d.newsweek.com/en/full/1586648/billions-season-five-premiere-decas.jpg',
      publishedAt: '2020-05-04T02:00:01Z',
      content: 'Billions is back and its fifth season premiere is as stuffed with as many obscure references, apt song selections and combative tête-à-têtes as ever. After a brief alliance in Season 4, U.S. Attorney Chuck Rhoades (Paul Giamatti) and hedge fund billionaire Bo… [+12142 chars]',
    },
    {
      source: {
        id: null,
        name: 'Avclub.com',
      },
      author: 'Scott Von Doviak on TV Club, shared by Scott Von Doviak to The A.V. Club',
      title: 'In its fifth season premiere, Billions sets a triple-cross in motion',
      description: 'As the fifth season of Billions opens, our two leads both find themselves in midlife crisis mode. In Chuck’s case, this is partially brought on by being forced to watch his father enact his own late-life crisis by marrying the much-younger mother of his child…',
      url: 'https://tv.avclub.com/in-its-fifth-season-premiere-billions-sets-a-triple-cr-1843198369',
      urlToImage: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/zqdr0um9abt0hrh4mqlt.jpg',
      publishedAt: '2020-05-04T02:00:00Z',
      content: 'As the fifth season of Billions opens, our two leads both find themselves in midlife crisis mode. In Chucks case, this is partially brought on by being forced to watch his father enact his own late-life crisis by marrying the much-younger mother of his child … [+5138 chars]',
    },
    {
      source: {
        id: null,
        name: 'Siliconangle.com',
      },
      author: 'Duncan Riley',
      title: 'Bitcoin continues to rise as some predict a bull run',
      description: 'The price of bitcoin has continued to rise over the last week and some analysts are now suggesting that the cryptocurrency is entering a strong bull run. Bitcoin was trading at $8,730,11 as of 9:30 p.m. EDT, down over the last 24 hours as some investors took …',
      url: 'https://siliconangle.com/2020/05/03/bitcoin-continues-rise-predicting-strong-bull-run/',
      urlToImage: 'https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2019/10/33378320138_620e66e3fd_c.jpg',
      publishedAt: '2020-05-04T01:54:10Z',
      content: 'The price of bitcoin has continued to rise over the last week and some analysts are now suggesting that the cryptocurrency is entering a strong bull run.\r\nBitcoin was trading at $8,730,11 as of 9:30 p.m. EDT, down over the last 24 hours as some investors took… [+3828 chars]',
    },
    {
      source: {
        id: 'the-times-of-india',
        name: 'The Times of India',
      },
      author: 'Sachin Dave and Saloni Shukla',
      title: 'Cryptocurrency exchanges approach RBI seeking clarity on status and taxability',
      description: 'The crypto exchanges have written to RBI and sought clarity on their status as lenders continue to deny banking services to them due to a lack of clear instructions from the regulator.',
      url: 'https://economictimes.indiatimes.com/industry/banking/finance/banking/cryptocurrency-exchanges-approach-rbi-seeking-clarity-on-status-taxability/articleshow/75523505.cms',
      urlToImage: 'https://img.etimg.com/thumb/msid-75525311,width-1070,height-580,imgsize-479128,overlay-economictimes/photo.jpg',
      publishedAt: '2020-05-04T01:41:00Z',
      content: 'Mumbai: Cryptocurrency platforms that have seen a revival in the last two months have sought clarity from the Reserve Bank of India (RBI) around their status in India after lack of clear directions continued to limit their banking options while also creating … [+1526 chars]',
    },
    {
      source: {
        id: null,
        name: 'Dailyfx.com',
      },
      author: 'David Cottle',
      title: 'Japanese Yen Regains Momentum Against USD, But Range Holds',
      description: 'The Japanese Yen has made gains on the US Dollar with another downtrend now forming. However, important near-term support has so far held.',
      url: 'https://www.dailyfx.com/forex/technical/home/analysis/usd-jpy/2020/05/04/Japanese-Yen-Regains-Momentum-Against-USD-But-Range-Holds.html',
      urlToImage: 'https://a.c-dn.net/b/1cXqSl/headline_YEN_01.JPG',
      publishedAt: '2020-05-04T01:21:00Z',
      content: 'Japanese Yen Technical Analysis Talking Points:\r\n<ul><li>USDJPY remains rangebound but has slipped</li><li>The direction of any durable range break could be instructive</li><li>AUD/JPY looks more obviously bullish</li></ul>The Japanese Yen remains confined to… [+2764 chars]',
    },
    {
      source: {
        id: null,
        name: 'Bitcoinist.com',
      },
      author: 'Nick Chong',
      title: 'Bitcoin Rallied Amid a “Catastrophic Economic Event” in Big Boost to Bull Case',
      description: 'One of the longest standing narratives is that Bitcoin is a “safe haven asset” or “store of value,” an asset that should outperform equities and bonds when there is a recession, geopolitical tension, or otherwise abnormal events taking place that would not be…',
      url: 'https://bitcoinist.com/bitcoin-rallied-amid-catastrophic-economic-event-in-boost-to-bull-case/',
      urlToImage: 'https://bitcoinist.com/wp-content/uploads/2020/05/sean-o-KMn4VEeEPR8-unsplash-1-1920x1276.jpg',
      publishedAt: '2020-05-04T01:00:44Z',
      content: 'One of the longest standing narratives is that Bitcoin is a “safe haven asset” or “store of value,” an asset that should outperform equities and bonds when there is a recession, geopolitical tension, or otherwise abnormal events taking place that would not be… [+2873 chars]',
    },
    {
      source: {
        id: null,
        name: 'Newsbtc.com',
      },
      author: 'Cole Petersen',
      title: 'If History Rhymes Bitcoin Could See a Major Post-Halving Crash',
      description: 'Bitcoin’s highly anticipated mining rewards halving is only eight days away, and cryptocurrency investors have long been debating what the short-term impacts of this event will be. In the long-term it is unquestionably bullish due to it causing a 50% annual i…',
      url: 'https://www.newsbtc.com/2020/05/04/if-history-rhymes-bitcoin-could-see-a-major-post-halving-crash/',
      urlToImage: 'https://www.newsbtc.com/wp-content/uploads/2020/05/davisco-5E5N49RWtbA-unsplash-2-scaled.jpg',
      publishedAt: '2020-05-04T01:00:20Z',
      content: 'Bitcoins highly anticipated mining rewards halving is only eight days away, and cryptocurrency investors have long been debating what the short-term impacts of this event will be.\r\nIn the long-term it is unquestionably bullish due to it causing a 50% annual i… [+2679 chars]',
    },
    {
      source: {
        id: null,
        name: 'Newsbtc.com',
      },
      author: 'Nick Chong',
      title: 'This Odd Signal Marked Bitcoin’s $3,700 Lows. Now It Says BTC Is Topping Out',
      description: 'It’s been a strong week for Bitcoin and the rest of the cryptocurrency market. Per data from Coin360.com, the leading cryptocurrency has gained close to 20% in the past seven days. While this is undoubtedly one of Bitcoin’s best weekly performances in months,…',
      url: 'https://www.newsbtc.com/2020/05/04/this-odd-signal-marked-bitcoins-3700-lows-now-says-btc-topping-out/',
      urlToImage: 'https://www.newsbtc.com/wp-content/uploads/2020/05/bryan-goff-eDpBjt6UL0-unsplash-scaled.jpg',
      publishedAt: '2020-05-04T00:00:58Z',
      content: 'It’s been a strong week for Bitcoin and the rest of the cryptocurrency market.\r\nPer data from Coin360.com, the leading cryptocurrency has gained close to 20% in the past seven days. While this is undoubtedly one of Bitcoin’s best weekly performances in months… [+3111 chars]',
    },
  ],
};
const fakeStats = [
  {
    _id: '5e7cc383cc87382473c9fe06',
    country: 'Latvia',
    totalCases: '896',
    newCases: '+17',
    totalDeaths: '16',
    totalRecovered: '348',
    activeCases: '532',
    criticalCases: '4',
    totalCasesPerMillion: '475',
    totalDeathsPerMillion: '8',
    __v: 0,
    lastUpdated: '2020-05-04T08:59:06.097Z',
  },
];
const url = 'https://www.kayak.com/travel-restrictions/';

app.use(cors());

app.get('/news', async (req, res) => {
  // let { country, offset } = req.query;
  // let date = moment();
  // if (offset !== 0 || offset !== undefined) {
  //   date = date.subtract(offset, 'days');
  // }
  // if (country === undefined) {
  //   country = 'world';
  // }
  // newsApi.v2.everything({
  //   q: `coronavirus ${country}`,
  //   from: moment(date).format('YYYY-MM-DD'),
  //   to: moment(date).format('YYYY-MM-DD'),
  //   language: 'en',
  //   sortBy: 'relevancy',
  //   page: 1,
  // }).then(response => {
  //   console.log(response);
  //   const news = response.articles.map(
  //     (item) => ({
  //       title: item.title,
  //       description: item.description,
  //       source: item.source.name,
  //       url: item.url,
  //       image: item.urlToImage,
  //       date: moment(item.publishedAt).format('DD.MM.YYYY'),
  //     }),
  //   );
  //   res.json({ news });
  // });

  const news = fakeNews.articles.map(
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

app.get('/stats', async (req, res) => {
  // let { country } = req.query;
  // if (country === undefined) {
  //   country = 'World';
  // }
  // const options = {
  //   method: 'POST',
  //   url: 'https://covid-19-live-stats.p.rapidapi.com/country',
  //   headers: {
  //     'x-rapidapi-host': 'covid-19-live-stats.p.rapidapi.com',
  //     'x-rapidapi-key': statsApiKey,
  //     'content-type': 'application/json',
  //     accept: 'application/json',
  //   },
  //   body: { country },
  //   json: true,
  // };
  // request(options, (error, response, body) => {
  //   if (error) throw new Error(error);
  //   res.json(body[0]);
  // });
  const {
    totalCases, newCases, totalDeaths, totalRecovered,
  } = fakeStats[0];
  res.json({
    totalCases,
    newCases,
    totalDeaths,
    totalRecovered,
  });
});

app.get('/restrictions', async (req, res) => {
  const { country } = req.query;
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
});

server.listen(port, () => console.log(`Listening on ${port}`));
