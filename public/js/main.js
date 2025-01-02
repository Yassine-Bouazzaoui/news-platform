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

function displayNews(newsData) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    newsData.forEach(post => {

        const postCard = `
              <div class="col-md-4 mb-4">
                <div class="card shadow-sm h-100 d-flex flex-column">
                    <!-- Flexbox pour aligner les éléments -->
                    <div class="card-body flex-grow-1">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
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
            </div>
        `;
        newsContainer.innerHTML += postCard;
    });
}

function showError(message) {
    
}
document.addEventListener('DOMContentLoaded', () => {fetchLatestNews();});