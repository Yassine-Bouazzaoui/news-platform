const axios = require('axios');

const newsController = {
    async createNews(req, res) {
        const { title, body, userId } = req.body;

        try {
            const userResponse = await axios.get(`https://dummyjson.com/users/${userId}`);
            if (!userResponse.data) {
                return res.status(400).json({ message: 'User not found' });
            }

            const postResponse = await axios.post('https://dummyjson.com/posts/add', {
                title,
                body,
                userId
            });

            res.status(201).json({ message: 'Article created successfully', news: postResponse.data });
        } catch (error) {
            console.error('Detailed article creation error:', error.response ? error.response.data : error.message);
            res.status(500).json({ message: 'Internal server error', error: error.response ? error.response.data : error.message });
        }
    },

    async getAllNews(req, res) {
        try {
            const response = await axios.get('https://dummyjson.com/posts');
            const posts = response.data.posts;

            posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const recentPosts = posts.slice(0, 10);

            const postsWithUserImages = await Promise.all(recentPosts.map(async post => {
                const userResponse = await axios.get(`https://dummyjson.com/users/${post.userId}`);
                return {
                    ...post,
                    userImage: userResponse.data.image
                };
            }));

            res.status(200).json({ posts: postsWithUserImages });
        } catch (error) {
            console.error('Detailed fetching error:', error.response ? error.response.data : error.message);
            res.status(500).json({ message: 'Internal server error', error: error.response ? error.response.data : error.message });
        }
    },

    async getNewsById(req, res) {
        const { id } = req.params;
        try {
            const response = await axios.get(`https://dummyjson.com/posts/${id}`);
            const post = response.data;

            const userResponse = await axios.get(`https://dummyjson.com/users/${post.userId}`);
            post.userImage = userResponse.data.image;

            res.status(200).json(post);
        } catch (error) {
            console.error('Detailed fetching error:', error.response ? error.response.data : error.message);
            res.status(500).json({ message: 'Internal server error', error: error.response ? error.response.data : error.message });
        }
    },

    async updateNews(req, res) {
        const { id } = req.params;
        const { title, body } = req.body;

        try {
            const response = await axios.put(`https://dummyjson.com/posts/${id}`, {
                title,
                body
            });

            res.status(200).json(response.data);
        } catch (error) {
            console.error('Detailed updating error:', error.response ? error.response.data : error.message);
            res.status(500).json({ message: 'Internal server error', error: error.response ? error.response.data : error.message });
        }
    },

    async deleteNews(req, res) {
        const { id } = req.params;

        try {
            await axios.delete(`https://dummyjson.com/posts/${id}`);
            res.status(204).send();
        } catch (error) {
            console.error('Detailed deletion error:', error.response ? error.response.data : error.message);
            res.status(500).json({ message: 'Internal server error', error: error.response ? error.response.data : error.message });
        }
    }
};

module.exports = newsController;