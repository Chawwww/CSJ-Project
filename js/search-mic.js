// This script adds functionality to the search and microphone icons in your navigation

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the search and microphone icons
    const searchIcon = document.querySelector('.fa-search').parentElement;
    const micIcon = document.querySelector('.fa-microphone').parentElement;
    
    // Create search overlay elements
    const searchOverlay = document.createElement('div');
    searchOverlay.id = 'search-overlay';
    searchOverlay.className = 'position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center';
    searchOverlay.style.zIndex = '9999';
    searchOverlay.style.display = 'none';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'bg-white p-4 rounded shadow-lg w-75 max-width-600';
    searchContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-primary m-0">Search CSJ</h4>
            <button id="close-search" class="btn btn-sm btn-light">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="input-group mb-3">
            <input type="text" id="search-input" class="form-control" placeholder="What are you looking for?">
            <button class="btn btn-primary" type="button" id="search-button">
                <i class="fas fa-search"></i>
            </button>
        </div>
        <div id="search-results" class="mt-3"></div>
    `;
    
    searchOverlay.appendChild(searchContainer);
    document.body.appendChild(searchOverlay);
    
    // Style for the search overlay
    const style = document.createElement('style');
    style.textContent = `
        #search-overlay {
            transition: all 0.3s ease;
        }
        .max-width-600 {
            max-width: 600px;
        }
        #search-results {
            max-height: 300px;
            overflow-y: auto;
        }
        .search-result-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
        }
        .search-result-item:hover {
            background-color: #f8f9fa;
        }
        .listening-animation {
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Event listener for search icon
    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.style.display = 'flex';
        document.getElementById('search-input').focus();
    });
    
    // Close search overlay when close button is clicked
    document.getElementById('close-search').addEventListener('click', function() {
        searchOverlay.style.display = 'none';
    });
    
    // Close search overlay when clicking outside the search container
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.style.display = 'none';
        }
    });
    
    // Handle search functionality
    document.getElementById('search-button').addEventListener('click', performSearch);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = document.getElementById('search-input').value.trim();
        const resultsContainer = document.getElementById('search-results');
        
        if (searchTerm === '') {
            resultsContainer.innerHTML = '<div class="alert alert-warning">Please enter a search term</div>';
            return;
        }
        
        // Show loading state
        resultsContainer.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        
        // Simulate search results (replace with actual search API call)
        setTimeout(() => {
            // Mock search results based on the website sections
            const mockResults = [
                { title: 'About CSJ', url: '#About', content: 'Learn about CSJ and our mission to protect wildlife...' },
                { title: 'Animals at CSJ', url: '#animals', content: 'Discover the various animals we care for at our sanctuary...' },
                { title: 'Plant Conservation', url: '#plants', content: 'Our plant conservation efforts and botanical gardens...' },
                { title: 'Community Programs', url: '#community', content: 'Get involved with our community programs and events...' }
            ].filter(item => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (mockResults.length > 0) {
                resultsContainer.innerHTML = '';
                mockResults.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.innerHTML = `
                        <h5 class="text-primary">${result.title}</h5>
                        <p class="mb-0">${result.content}</p>
                    `;
                    resultItem.addEventListener('click', function() {
                        window.location.href = result.url;
                        searchOverlay.style.display = 'none';
                    });
                    resultsContainer.appendChild(resultItem);
                });
            } else {
                resultsContainer.innerHTML = `
                    <div class="alert alert-info">
                        No results found for "${searchTerm}". Please try different keywords.
                    </div>
                `;
            }
        }, 800);
    }
    
    // Voice search functionality
    micIcon.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Check if the browser supports the Web Speech API
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            // First show the search overlay
            searchOverlay.style.display = 'flex';
            
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            
            const searchInput = document.getElementById('search-input');
            const resultsContainer = document.getElementById('search-results');
            
            // Update UI to show listening state
            searchInput.placeholder = 'Listening...';
            searchInput.classList.add('listening-animation');
            searchInput.disabled = true;
            resultsContainer.innerHTML = '<div class="alert alert-primary">Please speak now...</div>';
            
            recognition.start();
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                searchInput.value = transcript;
                searchInput.classList.remove('listening-animation');
                searchInput.disabled = false;
                searchInput.placeholder = 'What are you looking for?';
                performSearch();
            };
            
            recognition.onerror = function(event) {
                resultsContainer.innerHTML = `
                    <div class="alert alert-danger">
                        Error occurred in voice recognition: ${event.error}
                    </div>
                `;
                searchInput.classList.remove('listening-animation');
                searchInput.disabled = false;
                searchInput.placeholder = 'What are you looking for?';
            };
            
            recognition.onend = function() {
                searchInput.classList.remove('listening-animation');
                searchInput.disabled = false;
                searchInput.placeholder = 'What are you looking for?';
            };
        } else {
            // Show search overlay with message
            searchOverlay.style.display = 'flex';
            document.getElementById('search-results').innerHTML = `
                <div class="alert alert-warning">
                    Sorry, your browser does not support speech recognition.
                    Please try using a modern browser like Chrome.
                </div>
            `;
        }
    });
});