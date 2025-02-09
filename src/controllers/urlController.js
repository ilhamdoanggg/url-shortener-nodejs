const { generateShortUrl, getOriginalUrl } = require('../services/urlService');
const logger = require('../helper/logger');
const TAG = 'URL_CONTROLLER';
const sendResponse = require('../helper/response');

/**
 * Creates a new short URL for a given long URL and optional custom alias.
 * Returns a successful response with the short URL, long URL, custom alias,
 * and the creation date. If the custom alias is already taken, returns a 400
 * error with a message indicating that the alias already exists. If an error
 * occurs while creating the short URL, returns a 500 error with an error
 * message.
 * @param {Object} req - The request object, containing the long URL and
 * optional custom alias.
 * @param {Object} res - The response object to send the HTTP response.
 */
const shortenUrl = (req, res) => {
	try {
		const { longUrl, customAlias } = req.body;
		const result = generateShortUrl(longUrl, customAlias);

		if (result.error) {
			logger.warn(`${TAG} - Custom alias "${customAlias}" already taken.`);
			return sendResponse(res, 400, false, 'Custom alias already taken', null, 'ALIAS_EXISTS');
		}

		logger.info(`${TAG} - Short URL created: ${result.shortUrl} for ${longUrl}`);
		return sendResponse(res, 200, true, 'Short URL successfully created', {
			shortUrl: result.shortUrl,
			longUrl,
			customAlias,
			createdAt: new Date().toISOString(),
		});
	} catch (error) {
		logger.error(`${TAG} - Error creating short URL: ${error.message}`);
		return sendResponse(res, 500, false, 'An unexpected error occurred', null, 'INTERNAL_SERVER_ERROR');
	}
};

/**
 * Redirects the user to the original long URL based on the provided shortId.
 * Logs the redirect action and handles errors if the shortId is not found or if an unexpected error occurs.
 *
 * @param {Object} req - The request object, containing the URL parameters.
 * @param {Object} res - The response object to send the HTTP response.
 */

const redirectUrl = (req, res) => {
	if (req.params.shortId==='docs') {
		logger.error(`${TAG} - Short URL not found in request.`);
		return res.redirect('/api/docs/');
	}
	try {
		const { shortId } = req.params;
		const longUrl = getOriginalUrl(shortId);

		if (!longUrl) {
			logger.error(`${TAG} - Short URL "${shortId}" not found.`);
			return sendResponse(res, 404, false, 'Short URL not found', null, 'URL_NOT_FOUND');
		}

		logger.info(`${TAG} - Redirecting ${shortId} to ${longUrl}`);
		return res.redirect(longUrl);
	} catch (error) {
		logger.error(`${TAG} - Error in redirect: ${error.message}`);
		return sendResponse(res, 500, false, 'An unexpected error occurred', null, 'INTERNAL_SERVER_ERROR');
	}
};

module.exports = { shortenUrl, redirectUrl };
