document.getElementById('create-article-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    errorMessage.textContent = '';
    successMessage.textContent = '';
    errorMessage.classList.add('d-none');
    successMessage.classList.add('d-none');

    if (!title || !body) {
        errorMessage.textContent = 'Both title and body are required.';
        errorMessage.classList.remove('d-none');
        return;
    }

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userId = parseInt(localStorage.getItem('userId')); // Convertir userId en entier
    if (isAuthenticated !== 'true' || isNaN(userId)) {
        errorMessage.textContent = 'Vous devez être connecté pour créer un article.';
        errorMessage.classList.remove('d-none');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/news/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body, userId })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);
            successMessage.textContent = 'Article créé avec succès!';
            successMessage.classList.remove('d-none');
            setTimeout(() => {
                window.location.href = 'news.html';
            }, 2000); 
        } else {
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'An unexpected error occurred.';
            errorMessage.classList.remove('d-none');
            console.error('Error details:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'An unexpected error occurred while submitting the form.';
        errorMessage.classList.remove('d-none');
    }
});