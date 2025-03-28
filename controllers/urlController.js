import Url from '../models/urlModel.js';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';

// POST /url/shorten
export const shortenUrl = async (req, res) => {
  const { originalUrl, alias, expiry } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  const shortUrl = alias || nanoid(7);

  const expiresAt = expiry ? new Date(Date.now() + expiry * 1000) : null;

  try {
    const newUrl = await Url.create({ originalUrl, shortUrl, alias: shortUrl, expiresAt });
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /url/:alias
export const redirectToOriginalUrl = async (req, res) => {
  const { alias } = req.params;

  try {
    const url = await Url.findOne({ alias });

    if (!url || (url.expiresAt && url.expiresAt < new Date())) {
      return res.status(404).json({ error: 'Short URL not found or expired' });
    }

    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /url/stats/:alias
export const getUrlStats = async (req, res) => {
  const { alias } = req.params;

  try {
    const url = await Url.findOne({ alias });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /url/:alias
export const deleteUrl = async (req, res) => {
  const { alias } = req.params;

  try {
    const deletedUrl = await Url.findOneAndDelete({ alias });

    if (!deletedUrl) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({ message: 'URL deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
