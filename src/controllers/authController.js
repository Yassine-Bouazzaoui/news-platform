const axios = require('axios');

const authController = {
    async register(req, res) {
        const { username, email, password } = req.body;
    
        try {
            
            const userResponse = await axios.post('https://dummyjson.com/users/add', {
                username,
                email,
                password
            });
    
            if (userResponse.data) {
                res.status(201).json({
                    message: 'User created successfully',
                    user: userResponse.data
                });
            } else {
                res.status(400).json({ message: 'Failed to create user' });
            }
        } catch (error) {
            console.error('Detailed register error:', error.response ? error.response.data : error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    async login(req, res) {
        console.log('Body reçu:', req.body); 
        
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
    
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
    
            const data = await response.json();
            console.log('Réponse de dummyjson:', data); 
    
            if (response.ok) {
                return res.status(200).json({
                    message: 'Login successful',
                    user: data
                });
            } else {
                return res.status(response.status).json(data);
            }
    
        } catch (error) {
            console.error('Erreur:', error);
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
};

module.exports = authController;