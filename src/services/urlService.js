const urls = {}; 
const logger = require('../helper/logger');
const TAG = 'URL_SERVICE';
const url = process.env.URL || 'https://urlshortener.com/';
const generateShortUrl = (longUrl, customAlias) => {
  console.log({urls})
  if (customAlias) {
    if (urls[customAlias]) {
      logger.warn( `${TAG} - Custom alias "${customAlias}" already exists.`);
      return { error: "Custom alias already exists" };
    }
    urls[customAlias] = longUrl;
    logger.info( `${TAG} - Short URL created: ${url + customAlias} for ${longUrl}`);
    return { shortUrl: url + customAlias };
  }

  const shortId = Math.random().toString(36).substring(2, 8);
  urls[shortId] = longUrl;
  logger.info( `${TAG} - Short URL created: ${url + shortId} for ${longUrl}`);
  return { shortUrl: url + shortId };
};

const getOriginalUrl = (shortId) => {
  logger.info( `${TAG} - URL_CONTROLLER - redirectUrl: ${shortId}`);
  console.log({urls})
  return urls[shortId] || null;
};

module.exports = { generateShortUrl, getOriginalUrl };
