const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/posts';

const newsController = {
    // TODO: Question 5 - Implémenter les méthodes du contrôleur
    async getAllNews(req, res) {
        try {
            // Utiliser axios pour faire une requête à DummyJSON
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async getNewsById(req, res) {
        // TODO: Implémenter la récupération d'un article par son ID
    },

    async createNews(req, res) {
        
    },

    async updateNews(req, res) {
        res.status(501).json({ message: 'La modification des articles n’est pas encore implémentée.' });
    },
    async deleteNews(req, res) {
        res.status(501).json({ message: 'La suppression des articles n’est pas encore implémentée.' });
    }
    
};

module.exports = newsController;