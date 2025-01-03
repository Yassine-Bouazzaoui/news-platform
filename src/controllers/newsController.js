const { body, validationResult } = require('express-validator');

const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/posts';

const newsController = {
    async getAllNews(req, res) {
        try {
            const response = await axios.get(DUMMY_JSON_URL);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async getNewsById(req, res) {
        try {
            const { id } = req.params;
            const response = await axios.get(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async createNews(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newPost = req.body;
            const response = await axios.post(DUMMY_JSON_URL, newPost);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async updateNews(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { id } = req.params;
            const updatedPost = req.body;
            const response = await axios.put(`${DUMMY_JSON_URL}/${id}`, updatedPost);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async deleteNews(req, res) {
        try {
            const { id } = req.params;
            await axios.delete(`${DUMMY_JSON_URL}/${id}`);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }
};
module.exports = newsController;