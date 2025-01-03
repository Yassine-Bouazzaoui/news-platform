
document.addEventListener('DOMContentLoaded', () => {
    fetchLatestNews();
    fetchSuggestedAccounts();

    document.getElementById('login-button').addEventListener('click', () => {
        window.location.href = '/login.html';
    });
});

async function fetchLatestNews() {
    try {
        const response = await fetch('https://dummyjson.com/posts');
        const data = await response.json();
        displayNews(data.posts);
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles');
    }
}

async function fetchSuggestedAccounts() {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        displaySuggestedAccounts(data.users);
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les comptes suggérés');
    }
}

async function fetchUserImage(userId) {
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        const userData = await response.json();
        return userData.image;
    } catch (error) {
        console.error('Erreur lors du chargement de l\'image utilisateur :', error);
        return 'default-user-image.png';
    }
}

async function displayNews(newsData) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    const userImages = await Promise.all(newsData.map(post => fetchUserImage(post.userId)));

    newsData.forEach((post, index) => {
        const userImage = userImages[index];

        const postCard = `
            <div class="card shadow-sm h-100 d-flex flex-column">
                <!-- Flexbox pour aligner les éléments -->
                <div class="card-body flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img src="${userImage}" alt="User Image" class="user-image rounded-circle me-2" style="width: 40px; height: 40px;">
                            <h5 class="card-title mb-0">${post.title}</h5>
                        </div>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-light btn-sm save-button me-2">
                                <i class="fas fa-bookmark"></i>
                            </button>
                            <div class="dropdown">
                                <button class="btn btn-light btn-sm" data-bs-toggle="dropdown">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <i class="fas fa-link"></i> Copier le lien du post
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <i class="fas fa-times-circle"></i> Pas intéressé
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item text-danger" href="#">
                                            <i class="fas fa-flag"></i> Signaler ce post
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p class="card-text mt-3">${post.body}</p>
                    <div class="tags mb-3">
                        <i class="fas fa-tags tag-icon"></i> 
                        ${post.tags.map(tag => `<span class="badge bg-info">${tag}</span>`).join(' ')}
                    </div>
                </div>
                <!-- UserID et PostID -->
                <div class="card-info d-flex justify-content-between px-3 py-2">
                    <span class="user-id"><i class="fas fa-user"></i> User ID: ${post.userId}</span>
                    <span class="post-id"><i class="fas fa-id-badge"></i> Post ID: ${post.id}</span>
                </div>
                <!-- Réactions et vues en bas -->
                <div class="card-footer d-flex justify-content-between mt-auto">
                    <div class="reactions">
                        <span class="likes"><i class="fas fa-thumbs-up like-icon"></i> ${post.reactions.likes} Likes</span>
                        <span class="dislikes"><i class="fas fa-thumbs-down dislike-icon"></i> ${post.reactions.dislikes} Dislikes</span>
                    </div>
                    <div>
                        <span class="views"><i class="fas fa-eye view-icon"></i> ${post.views} Views</span>
                    </div>
                </div>
            </div>
        `;
        newsContainer.innerHTML += postCard;
    });
}
function showError(message, containerId = 'error-container') {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

function displaySuggestedAccounts(accounts) {
    const suggestedAccountsContainer = document.getElementById('suggested-accounts');
    suggestedAccountsContainer.innerHTML = '';

    accounts.slice(0, 5).forEach(account => {
        const accountCard = `
            <div class="suggested-account">
                <img src="${account.image}" alt="User Image">
                <p>${account.username}</p>
            </div>
        `;
        suggestedAccountsContainer.innerHTML += accountCard;
    });
}