const express = require('express');
const { shortenUrl, redirectUrl } = require('../controllers/urlController');

const router = express.Router();

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Create a short URL
 *     description: Convert a long URL into a short URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 example: "https://example.com"
 *               customAlias:
 *                 type: string
 *                 example: "myalias"
 *     responses:
 *       200:
 *         description: Short URL successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     shortUrl:
 *                       type: string
 *                     longUrl:
 *                       type: string
 *                     customAlias:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Custom alias already taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 errorCode:
 *                   type: string
 *                 example:
 *                   success: false
 *                   message: "Custom alias already taken"
 *                   errorCode: "ALIAS_EXISTS"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 errorCode:
 *                   type: string
 *                 example:
 *                   success: false
 *                   message: "An unexpected error occurred"
 *                   errorCode: "INTERNAL_SERVER_ERROR"
 */
router.post('/shorten', shortenUrl);

/**
 * @swagger
 * /{shortId}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirects the user to the long URL based on the shortId
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Redirect to the long URL
 *       302:
 *         description: Redirect to the long URL
 *       404:
 *         description: URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 errorCode:
 *                   type: string
 *                 example:
 *                   success: false
 *                   message: "Short URL not found"
 *                   errorCode: "URL_NOT_FOUND"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 errorCode:
 *                   type: string
 *                 example:
 *                   success: false
 *                   message: "An unexpected error occurred"
 *                   errorCode: "INTERNAL_SERVER_ERROR"
 */
router.get('/:shortId', redirectUrl);

module.exports = router;
