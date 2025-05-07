(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Initially set the navbar to be visible
$('.sticky-top').css('top', '0px');

// Navbar scroll effect
var lastScrollTop = 0;
$(window).scroll(function () {
    var st = $(this).scrollTop();
    
    // Add shadow when scrolled
    if (st > 300) {
        $('.sticky-top').addClass('shadow-sm');
    } else {
        $('.sticky-top').removeClass('shadow-sm');
    }
    
    lastScrollTop = st;
});
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
        $(".testimonial-carousel").owlCarousel({
          autoplay: true,
          smartSpeed: 1000,
          center: true,
          dots: false,
          loop: true,
          nav : true,
          navText : [
              '<i class="bi bi-arrow-left"></i>',
              '<i class="bi bi-arrow-right"></i>'
          ],
          responsive: {
              0:{
                  items:1
              },
              768:{
                  items:2
              }
          }
      });
          
  


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })

    document.addEventListener('DOMContentLoaded', function() {
        var videoModal = document.getElementById('videoModal');
        if (videoModal) {
          videoModal.addEventListener('show.bs.modal', function(event) {
            var button = event.relatedTarget;
            var videoSrc = button.getAttribute('data-src');
            
            // Convert YouTube watch URL to embed URL
            if (videoSrc.includes('youtube.com/watch')) {
              videoSrc = videoSrc.replace('watch?v=', 'embed/');
            }
            
            var videoFrame = document.getElementById('videoFrame');
            videoFrame.src = videoSrc;
          });
          
          // Stop video when modal is closed
          videoModal.addEventListener('hide.bs.modal', function() {
            var videoFrame = document.getElementById('videoFrame');
            videoFrame.src = 'https://www.youtube.com/watch?v=GrpJdo3KXZg';
          });
        }
      });

      document.addEventListener('DOMContentLoaded', function() {
        // Get elements
        const helpButton = document.getElementById('helpButton');
        const personalClickCounter = document.getElementById('personalClickCounter');
        const totalClickCounter = document.getElementById('totalClickCounter');
        const surpriseMessage = document.getElementById('surpriseMessage');
        
        // Initialize counters
        let personalClicks = 0;
        let totalClicks = 0;
        
        // Check if there's a stored personal count in localStorage
        if (localStorage.getItem('helpClicks')) {
          personalClicks = parseInt(localStorage.getItem('helpClicks'));
          personalClickCounter.textContent = personalClicks;
        }
        
        // Fetch total clicks from server (simulated here)
        // In a real implementation, this would be an API call to your backend
        fetchTotalClicks();
        
        // Function to simulate fetching total clicks from server
        function fetchTotalClicks() {
          // Simulate initial count (in a real app, this would come from your server)
          // This uses a random number to simulate existing clicks for demonstration
          let serverTotalClicks = Math.floor(Math.random() * 10000) + 5000;
          
          // If you have a stored value in localStorage, use that instead for demo purposes
          if (localStorage.getItem('totalHelpClicks')) {
            serverTotalClicks = parseInt(localStorage.getItem('totalHelpClicks'));
          }
          
          totalClicks = serverTotalClicks;
          totalClickCounter.textContent = totalClicks.toLocaleString();
        }
        
        // Function to update total clicks on server (simulated)
        function updateTotalClicks() {
          // Increment total count
          totalClicks++;
          totalClickCounter.textContent = totalClicks.toLocaleString();
          
          // In a real app, this would be an API call to your server
          // For demo, we'll just store in localStorage
          localStorage.setItem('totalHelpClicks', totalClicks);
        }
        
        // Add click event
        helpButton.addEventListener('click', function() {
          // Increment personal counter
          personalClicks++;
          personalClickCounter.textContent = personalClicks;
          
          // Store in localStorage
          localStorage.setItem('helpClicks', personalClicks);
          
          // Update total clicks
          updateTotalClicks();
          
          // Show surprise message
          surpriseMessage.style.display = 'block';
          
          // Add animation class
          helpButton.classList.add('animate__animated', 'animate__pulse');
          
          // Generate random surprise effect
          const surpriseEffect = Math.floor(Math.random() * 4);
          
          switch(surpriseEffect) {
            case 0:
              // Confetti effect
              createConfetti();
              break;
            case 1:
              // Show different thank you messages
              const messages = [
                "Amazing! You just helped feed an endangered animal!",
                "Wonderful! Your click supports animal conservation!",
                "Thank you! Your help makes a difference!",
                "Awesome! You're helping protect wildlife!"
              ];
              surpriseMessage.querySelector('p').textContent = messages[Math.floor(Math.random() * messages.length)];
              break;
            case 2:
              // Show achievement based on personal clicks
              if (personalClicks === 5) {
                surpriseMessage.querySelector('h5').textContent = "Achievement Unlocked!";
                surpriseMessage.querySelector('p').textContent = "You've helped 5 animals!";
              } else if (personalClicks === 10) {
                surpriseMessage.querySelector('h5').textContent = "Achievement Unlocked!";
                surpriseMessage.querySelector('p').textContent = "Animal Hero: 10 clicks milestone!";
              } else if (personalClicks === 25) {
                surpriseMessage.querySelector('h5').textContent = "Achievement Unlocked!";
                surpriseMessage.querySelector('p').textContent = "Wildlife Champion: 25 clicks milestone!";
              }
              break;
            case 3:
              // Show animal fact
              const facts = [
                "Elephants can recognize themselves in mirrors!",
                "Giraffes have the same number of neck vertebrae as humans!",
                "Sloths can hold their breath underwater for up to 40 minutes!",
                "Pandas spend 10-16 hours a day eating bamboo!"
              ];
              surpriseMessage.querySelector('h5').textContent = "Animal Fact!";
              surpriseMessage.querySelector('p').textContent = facts[Math.floor(Math.random() * facts.length)];
              break;
          }
          
          // Check for milestone celebrations for total clicks
          const milestone = checkMilestone(totalClicks);
          if (milestone) {
            setTimeout(function() {
              surpriseMessage.querySelector('h5').textContent = "Community Milestone!";
              surpriseMessage.querySelector('p').textContent = milestone;
              surpriseMessage.style.display = 'block';
              createConfetti(); // Extra celebration for milestones
            }, 3500);
          }
          
          // Hide surprise message after 3 seconds
          setTimeout(function() {
            surpriseMessage.style.display = 'none';
            helpButton.classList.remove('animate__animated', 'animate__pulse');
          }, 3000);
        });
        
        // Function to check if we hit a community milestone
        function checkMilestone(count) {
          if (count % 1000 === 0) return `Together we've reached ${count.toLocaleString()} clicks!`;
          if (count % 500 === 0) return `We just hit ${count.toLocaleString()} clicks together!`;
          if (count % 100 === 0) return `${count.toLocaleString()} clicks for wildlife conservation!`;
          return null;
        }
        
        // Function to create confetti effect
        function createConfetti() {
          const confettiContainer = document.createElement('div');
          confettiContainer.style.position = 'absolute';
          confettiContainer.style.top = '0';
          confettiContainer.style.left = '0';
          confettiContainer.style.width = '100%';
          confettiContainer.style.height = '100%';
          confettiContainer.style.pointerEvents = 'none';
          confettiContainer.style.zIndex = '1000';
          
          // Create confetti pieces
          const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'];
          for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.opacity = '0.7';
            confettiContainer.appendChild(confetti);
            
            // Animate confetti
            const animationDuration = 1 + Math.random() * 2;
            confetti.style.animation = `fall ${animationDuration}s linear forwards`;
          }
          
          // Add confetti container to the membership item
          document.querySelector('.membership-item').appendChild(confettiContainer);
          
          // Remove confetti after animation
          setTimeout(() => {
            confettiContainer.remove();
          }, 3000);
          
          // Add confetti animation
          if (!document.getElementById('confettiStyle')) {
            const style = document.createElement('style');
            style.id = 'confettiStyle';
            style.textContent = `
              @keyframes fall {
                0% {
                  transform: translateY(0) rotate(0);
                  opacity: 0.7;
                }
                100% {
                  transform: translateY(100vh) rotate(360deg);
                  opacity: 0;
                }
              }
            `;
            document.head.appendChild(style);
          }
        }
      });

      //quizz
      document.addEventListener('DOMContentLoaded', function() {
        const quiz = document.getElementById('quiz');
        const questions = document.querySelectorAll('.question');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const resultContainer = document.querySelector('.result-container');
        const scoreElement = document.getElementById('score');
        const totalQuestionsElement = document.getElementById('total-questions');
        const restartBtn = document.getElementById('restartBtn');
        const progressBar = document.querySelector('.progress');
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');
        const achievements = {
            perfect: document.getElementById('perfect-score'),
            good: document.getElementById('good-score'),
            improve: document.getElementById('improve-score')
        };

        let currentQuestion = 0;
        let score = 0;
        let userAnswers = new Array(questions.length).fill(null);
        let currentDifficulty = 'easy';

        // Difficulty selection
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                difficultyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentDifficulty = btn.dataset.difficulty;
                resetQuiz();
            });
        });

        function getCurrentQuestions() {
            return Array.from(questions).filter(q => q.classList.contains(currentDifficulty));
        }

        function showQuestion(index) {
            const currentQuestions = getCurrentQuestions();
            questions.forEach(q => q.classList.remove('active'));
            currentQuestions[index].classList.add('active');
            
            // Update progress bar
            const progress = ((index + 1) / currentQuestions.length) * 100;
            progressBar.style.width = `${progress}%`;

            // Update button visibility
            prevBtn.style.display = index === 0 ? 'none' : 'block';
            nextBtn.textContent = index === currentQuestions.length - 1 ? 'Finish' : 'Next';
        }

        function selectOption(option) {
            const currentQuestions = getCurrentQuestions();
            const currentOptions = currentQuestions[currentQuestion].querySelectorAll('.option');
            currentOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            userAnswers[currentQuestion] = option.hasAttribute('data-correct');
        }

        function showAchievement(score, total) {
            const percentage = (score / total) * 100;
            achievements.perfect.classList.remove('show');
            achievements.good.classList.remove('show');
            achievements.improve.classList.remove('show');

            if (percentage === 100) {
                achievements.perfect.classList.add('show');
            } else if (percentage >= 70) {
                achievements.good.classList.add('show');
            } else {
                achievements.improve.classList.add('show');
            }
        }

        function resetQuiz() {
            currentQuestion = 0;
            score = 0;
            userAnswers.fill(null);
            questions.forEach(question => {
                question.querySelectorAll('.option').forEach(option => {
                    option.classList.remove('selected');
                });
            });
            quiz.style.display = 'block';
            resultContainer.style.display = 'none';
            showQuestion(0);
        }

        questions.forEach(question => {
            const options = question.querySelectorAll('.option');
            options.forEach(option => {
                option.addEventListener('click', () => selectOption(option));
            });
        });

        prevBtn.addEventListener('click', () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion(currentQuestion);
            }
        });

        nextBtn.addEventListener('click', () => {
            const currentQuestions = getCurrentQuestions();
            if (currentQuestion < currentQuestions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
            } else {
                // Calculate score
                score = userAnswers.filter(answer => answer === true).length;
                scoreElement.textContent = score;
                totalQuestionsElement.textContent = currentQuestions.length;
                
                // Show achievements
                showAchievement(score, currentQuestions.length);
                
                // Show results
                quiz.style.display = 'none';
                resultContainer.style.display = 'block';
            }
        });

        restartBtn.addEventListener('click', resetQuiz);

        // Initialize first question
        showQuestion(0);
    });

    // Quiz functionality
    $('.check-answer').click(function() {
      const button = $(this);
      const correctAnswer = button.data('correct');
      const selectedAnswer = button.closest('.quiz-container').find('input[type="radio"]:checked').val();
      const feedback = button.siblings('.quiz-feedback');
      
      if (!selectedAnswer) {
          feedback
              .removeClass('correct incorrect')
              .html('<div class="alert alert-warning mb-0">Please select an answer.</div>')
              .show();
          return;
      }
      
      if (selectedAnswer === correctAnswer) {
          feedback
              .removeClass('incorrect')
              .addClass('correct')
              .html('<div class="alert alert-success mb-0">Correct! Well done.</div>')
              .show();
      } else {
          feedback
              .removeClass('correct')
              .addClass('incorrect')
              .html('<div class="alert alert-danger mb-0">Incorrect. Try again!</div>')
              .show();
      }
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the mic button
    const micButton = document.getElementById('mic-button');
    
    // Add click event to mic button
    micButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Show the search modal
      const searchModal = new bootstrap.Modal(document.getElementById('search-modal'));
      searchModal.show();
      
      // Get references to search input and results container
      const searchInput = document.getElementById('search-input');
      const resultsContainer = document.getElementById('search-results');
      
      // Check if speech recognition is supported
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        // Update UI to show listening state
        searchInput.placeholder = 'Listening...';
        searchInput.disabled = true;
        resultsContainer.innerHTML = '<div class="alert alert-primary">Please speak now...</div>';
        
        // Start voice recognition
        recognition.start();
        
        // Handle successful voice input
        recognition.onresult = function(event) {
          const transcript = event.results[0][0].transcript;
          searchInput.value = transcript;
          searchInput.disabled = false;
          searchInput.placeholder = 'What are you looking for?';
          
          // Perform search with the transcribed text
          performSearch();
        };
        
        // Handle errors
        recognition.onerror = function(event) {
          resultsContainer.innerHTML = '<div class="alert alert-danger">Error occurred in voice recognition</div>';
          searchInput.disabled = false;
          searchInput.placeholder = 'What are you looking for?';
        };
        
        // Reset when finished
        recognition.onend = function() {
          searchInput.disabled = false;
          searchInput.placeholder = 'What are you looking for?';
        };
      } else {
        // Browser doesn't support speech recognition
        resultsContainer.innerHTML = '<div class="alert alert-warning">Your browser does not support voice recognition</div>';
      }
    });
    
    // Add this function to handle search
    function performSearch() {
      const searchTerm = document.getElementById('search-input').value.trim();
      const resultsContainer = document.getElementById('search-results');
      
      if (searchTerm === '') {
        resultsContainer.innerHTML = '<div class="alert alert-warning">Please enter a search term</div>';
        return;
      }
      
      // Show loading indicator
      resultsContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
      
      // Simulate search results (replace with actual search logic)
      setTimeout(() => {
        // Mock results - replace with your actual search implementation
        const results = [
          { title: 'About CSJ', url: '#About', description: 'Learn about our mission and values' },
          { title: 'Our Animals', url: '#animals', description: 'Discover the animals in our sanctuary' },
          { title: 'Conservation Projects', url: '#plants', description: 'Our ongoing conservation efforts' }
        ].filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (results.length > 0) {
          resultsContainer.innerHTML = '';
          results.forEach(result => {
            resultsContainer.innerHTML += `
              <div class="p-2 border-bottom">
                <a href="${result.url}" class="text-decoration-none">
                  <h5 class="mb-1 text-primary">${result.title}</h5>
                  <p class="mb-0 small text-muted">${result.description}</p>
                </a>
              </div>
            `;
          });
        } else {
          resultsContainer.innerHTML = `<div class="alert alert-info">No results found for "${searchTerm}"</div>`;
        }
      }, 500);
    }
  });


  //ai chat bot
  document.addEventListener('DOMContentLoaded', function() {
    // Chat interface elements
    const chatButton = document.getElementById('chatButton');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.querySelector('.close-chat');
    const sendButton = document.querySelector('.send-button');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatTyping = document.getElementById('chatTyping');
    
    // Initialize knowledge base for the chatbot
    const knowledgeBase = {
        greetings: ['hello', 'hi', 'hey', 'greetings', 'howdy', 'good morning', 'good afternoon', 'good evening'],
        biodiversity: ['biodiversity', 'ecosystem', 'species', 'conservation', 'nature', 'environment', 'wildlife'],
        endangered: ['endangered', 'extinct', 'threatened', 'conservation status', 'red list'],
        climate: ['climate', 'global warming', 'climate change', 'carbon', 'greenhouse', 'temperature', 'warming'],
        ocean: ['ocean', 'marine', 'sea', 'coral', 'reef', 'plastic', 'pollution', 'fish', 'sharks', 'whales'],
        forests: ['forest', 'rainforest', 'deforestation', 'trees', 'amazon', 'logging', 'timber', 'woodland'],
        analyze: ['analyze', 'identify', 'recognition', 'detect', 'image', 'photo', 'picture', 'upload'],
        content: ['generate', 'create', 'writer', 'article', 'content', 'text', 'story', 'write']
    };

    // Set up responses
    const responses = {
        greetings: [
            "Hello! I'm your biodiversity assistant. I can answer questions, analyze images of wildlife, or generate content about nature topics. How can I help you today?",
            "Hi there! I'm here to help with biodiversity information, image analysis, or content generation. What would you like to know or do?",
            "Greetings! I can assist you with information about nature, analyze wildlife images, or create content about biodiversity topics. What are you interested in today?"
        ],
        biodiversity: [
            "Biodiversity refers to the variety of life on Earth. It includes the diversity within species, between species, and of ecosystems. Would you like to learn more, analyze an image, or generate content about biodiversity?",
            "Biodiversity is essential for maintaining healthy ecosystems. It provides ecosystem services like clean air, water, and food. I can tell you more, analyze an image of wildlife, or generate content on this topic.",
            "The Earth's biodiversity is currently facing many threats including habitat loss, climate change, pollution, and overexploitation. Would you like information on a specific aspect, or would you like to use our image analysis or content generation tools?"
        ],
        endangered: [
            "There are currently over 40,000 species listed as threatened with extinction on the IUCN Red List. You can upload a wildlife image for analysis or ask me to generate content about specific endangered species.",
            "Endangered species are those at risk of becoming extinct. Major threats include habitat loss, poaching, climate change, and pollution. Would you like to analyze an image or generate content about conservation efforts?",
            "Conservation efforts worldwide aim to protect endangered species through habitat protection, breeding programs, and anti-poaching measures. I can help you analyze wildlife images or create educational content about this topic."
        ],
        climate: [
            "Climate change is a major threat to biodiversity. Rising temperatures affect habitats, migration patterns, and can lead to extinction. Would you like to analyze an environmental image or generate content about climate impacts?",
            "Global warming impacts ecosystems worldwide, from coral bleaching in oceans to drought in forests. I can answer specific questions, analyze images, or generate educational content on climate topics.",
            "Many species are struggling to adapt to rapid climate change. This includes shifts in flowering times, migration patterns, and habitat ranges. Would you like me to analyze an image or create content about climate adaptation?"
        ],
        ocean: [
            "Marine biodiversity is essential for healthy oceans. Threats include overfishing, pollution, habitat destruction, and climate change. Would you like to analyze a marine image or generate content about ocean conservation?",
            "Oceans cover 71% of Earth's surface and contain 97% of Earth's water. They're home to millions of species, many still undiscovered. I can help you identify marine species in images or create content about ocean ecosystems.",
            "Coral reefs are among the most diverse ecosystems on Earth, but they're threatened by warming oceans and acidification. Would you like to analyze a coral reef image or generate educational content about marine ecosystems?"
        ],
        forests: [
            "Forests cover about 31% of the world's land surface and are home to 80% of the world's terrestrial biodiversity. I can help you identify forest species in images or create content about forest ecosystems.",
            "Deforestation continues at an alarming rate worldwide, with about 10 million hectares lost annually. I can analyze forest images or generate educational content about deforestation impacts.",
            "Forests play a crucial role in climate regulation, water cycles, and providing habitat for countless species. Would you like to analyze a forest image or create content about forest conservation?"
        ],
        analyze: [
            "I can help analyze and identify wildlife or plants in images. Would you like to upload an image for analysis now?",
            "Our image analysis tool can identify species, conservation status, and provide information about wildlife and plants. Would you like to try it?",
            "Upload an image, and I can help identify wildlife, plants, and provide conservation information. Would you like to use the image analysis feature?"
        ],
        content: [
            "I can generate educational content about biodiversity topics. What specific topic would you like content about?",
            "Our content generator can create informative, persuasive, or story-based text about biodiversity. What topic are you interested in?",
            "Would you like me to generate content about a biodiversity topic? Just let me know the topic, style, and length you prefer."
        ],
        default: [
            "That's an interesting question about our natural world. I can help with biodiversity information, analyze wildlife images, or generate nature content. Which would you prefer?",
            "I'm here to help with questions about biodiversity, analyze images of wildlife, or generate educational content. What would you like to focus on?",
            "I'd be happy to discuss biodiversity topics, analyze nature images, or create content. Could you specify which service you'd like to use?",
            "As your biodiversity assistant, I can answer questions, identify species in images, or generate educational content. How can I assist you today?"
        ]
    };

    // Chat interface functions
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatBox.style.display = 'none';
        });
    }

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            chatTyping.style.display = 'block';
            
            // Simulate thinking time
            setTimeout(() => {
                chatTyping.style.display = 'none';
                processBotResponse(message);
            }, Math.random() * 1000 + 500); // Random delay between 500-1500ms for more natural feel
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processBotResponse(userMessage) {
        // Handle special commands
        if (userMessage.toLowerCase().includes('analyze image') || 
            userMessage.toLowerCase().includes('identify species') ||
            userMessage.toLowerCase().includes('upload picture')) {
            
            addMessage("I'd be happy to analyze an image for you! Please click the 'Analyze Image' button in the main interface, or you can type 'cancel' to continue our chat.", 'bot');
            return;
        }
        
        if (userMessage.toLowerCase().includes('generate content') || 
            userMessage.toLowerCase().includes('create article') ||
            userMessage.toLowerCase().includes('write about')) {
            
            const topic = extractTopic(userMessage);
            if (topic) {
                addMessage(`I'll help you generate content about "${topic}". Please use the Content Generator in the main interface. You can specify style and length there. Type 'cancel' to continue our chat.`, 'bot');
                // Pre-fill the topic in the content generator if accessible
                const topicInput = document.getElementById('topic');
                if (topicInput) {
                    topicInput.value = topic;
                    // Optionally scroll to the content generator
                    topicInput.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                addMessage("I'd be happy to generate content for you! Please use the Content Generator in the main interface where you can specify topic, style, and length. Type 'cancel' to continue our chat.", 'bot');
            }
            return;
        }
        
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse, 'bot');
    }
    
    function extractTopic(message) {
        // Extract topic from phrases like "write about tigers" or "generate content about coral reefs"
        const aboutMatch = message.match(/(?:write|create|generate)(?:\s\w+)*\s(?:about|on)\s([a-z\s]+)(?:\.|\?|$)/i);
        if (aboutMatch) return aboutMatch[1].trim();
        
        return null;
    }

    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check which category this message best fits
        let bestCategory = 'default';
        let bestMatchCount = 0;
        
        for (const [category, keywords] of Object.entries(knowledgeBase)) {
            const matchCount = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
            if (matchCount > bestMatchCount) {
                bestMatchCount = matchCount;
                bestCategory = category;
            }
        }
        
        // If it's a question about a specific animal or plant
        if (lowerMessage.includes('what is') || lowerMessage.includes('tell me about')) {
            const potentialSpecies = extractPotentialSpecies(lowerMessage);
            if (potentialSpecies) {
                return `The ${potentialSpecies} is a fascinating species. While I have limited information about it specifically, it's part of Earth's amazing biodiversity. Would you like to:
                
1. Generate educational content about ${potentialSpecies}
2. Upload an image of it for analysis
3. Learn more about similar species or its habitat`;
            }
        }
        
        // Get a random response from the appropriate category
        const categoryResponses = responses[bestCategory];
        return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    }
    
    function extractPotentialSpecies(message) {
        // Extract potential species names from patterns like "what is a tiger" or "tell me about pandas"
        const whatIsMatch = message.match(/what is an? ([a-z ]+)(\?|$)/i);
        const tellMeMatch = message.match(/tell me about ([a-z ]+)(\?|$)/i);
        
        if (whatIsMatch) return whatIsMatch[1].trim();
        if (tellMeMatch) return tellMeMatch[1].trim();
        
        return null;
    }

    // Add a welcome message when the chat first opens
    setTimeout(() => {
        if (chatMessages) {
            addMessage("Hello! I'm your biodiversity assistant. I can answer questions about species and ecosystems, analyze wildlife images, or generate educational content. How can I help you today?", 'bot');
        }
    }, 500);
    
    // IMAGE ANALYSIS FUNCTIONALITY
    const imageAnalysisButton = document.getElementById('image-analysis-button');
    
    if (imageAnalysisButton) {
        imageAnalysisButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show the image analysis modal if it exists
            const imageAnalysisModal = document.getElementById('image-analysis-modal');
            if (imageAnalysisModal && typeof bootstrap !== 'undefined') {
                const imageModal = new bootstrap.Modal(imageAnalysisModal);
                imageModal.show();
            }
            
            // Get references to image upload input and results container
            const imageInput = document.getElementById('image-input');
            const imageResultsContainer = document.getElementById('image-results');
            
            if (imageResultsContainer) {
                // Reset previous results
                imageResultsContainer.innerHTML = '<div class="alert alert-primary">Upload an image to analyze</div>';
            }
        });
    }
    
    // Handle image upload if the element exists
    const imageInput = document.getElementById('image-input');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const imageResultsContainer = document.getElementById('image-results');
            if (!imageResultsContainer) return;
            
            // Check if file is an image
            if (!file.type.match('image.*')) {
                imageResultsContainer.innerHTML = '<div class="alert alert-danger">Please select an image file</div>';
                return;
            }
            
            // Show loading indicator
            imageResultsContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Processing image...</span></div></div>';
            
            // Create a FileReader to read the image
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;
                
                img.onload = function() {
                    // Display the image preview
                    const imagePreview = document.createElement('div');
                    imagePreview.className = 'text-center mb-3';
                    imagePreview.innerHTML = `<img src="${img.src}" alt="Uploaded Image" class="img-fluid rounded" style="max-height: 200px;">`;
                    
                    // Simulate image analysis
                    setTimeout(() => {
                        // Mock analysis results
                        const results = analyzeImage(img);
                        
                        // Display analysis results
                        imageResultsContainer.innerHTML = '';
                        imageResultsContainer.appendChild(imagePreview);
                        
                        // Add analysis results
                        const resultsDiv = document.createElement('div');
                        resultsDiv.className = 'analysis-results';
                        
                        // Display detected objects/features
                        if (results.detectedObjects.length > 0) {
                            const objectsSection = document.createElement('div');
                            objectsSection.innerHTML = `
                                <h5 class="mt-3">Detected Objects</h5>
                                <ul class="list-group">
                                    ${results.detectedObjects.map(obj => 
                                    `<li class="list-group-item d-flex justify-content-between align-items-center">
                                        ${obj.name}
                                        <span class="badge bg-primary rounded-pill">${Math.round(obj.confidence * 100)}%</span>
                                    </li>`
                                    ).join('')}
                                </ul>
                            `;
                            resultsDiv.appendChild(objectsSection);
                        }
                        
                        // Display wildlife identification (if applicable)
                        if (results.wildlifeIdentification) {
                            const wildlifeSection = document.createElement('div');
                            wildlifeSection.innerHTML = `
                                <h5 class="mt-3">Wildlife Identification</h5>
                                <div class="alert alert-info">
                                    <strong>${results.wildlifeIdentification.species}</strong>
                                    <p class="mb-0">${results.wildlifeIdentification.info}</p>
                                    ${results.wildlifeIdentification.conservationStatus ? 
                                    `<p class="mt-2 mb-0"><strong>Conservation Status:</strong> 
                                        <span class="badge bg-${getConservationStatusColor(results.wildlifeIdentification.conservationStatus)}">
                                        ${results.wildlifeIdentification.conservationStatus}
                                        </span>
                                    </p>` : ''}
                                </div>
                            `;
                            resultsDiv.appendChild(wildlifeSection);
                        }
                        
                        // Display plants identification (if applicable)
                        if (results.plantsIdentification) {
                            const plantsSection = document.createElement('div');
                            plantsSection.innerHTML = `
                                <h5 class="mt-3">Plant Identification</h5>
                                <div class="alert alert-success">
                                    <strong>${results.plantsIdentification.species}</strong>
                                    <p class="mb-0">${results.plantsIdentification.info}</p>
                                </div>
                            `;
                            resultsDiv.appendChild(plantsSection);
                        }
                        
                        imageResultsContainer.appendChild(resultsDiv);
                        
                        // Add action buttons
                        const actionsDiv = document.createElement('div');
                        actionsDiv.className = 'mt-3';
                        actionsDiv.innerHTML = `
                            <button class="btn btn-outline-primary me-2" id="share-analysis">
                                <i class="bi bi-share"></i> Share
                            </button>
                            <button class="btn btn-outline-success" id="learn-more-btn">
                                <i class="bi bi-book"></i> Learn More
                            </button>
                            <button class="btn btn-outline-info" id="ask-chatbot-btn">
                                <i class="bi bi-chat-dots"></i> Ask Assistant
                            </button>
                        `;
                        imageResultsContainer.appendChild(actionsDiv);
                        
                        // Attach event handlers to the new buttons
                        document.getElementById('share-analysis')?.addEventListener('click', function() {
                            showNotification('Sharing functionality would be implemented here', 'info');
                        });
                        
                        document.getElementById('learn-more-btn')?.addEventListener('click', function() {
                            if (results.wildlifeIdentification) {
                                window.location.href = '#animals';
                            } else if (results.plantsIdentification) {
                                window.location.href = '#plants';
                            } else {
                                window.location.href = '#conservation';
                            }
                        });
                        
                        document.getElementById('ask-chatbot-btn')?.addEventListener('click', function() {
                            // Open chat and pre-fill a question about the identified species
                            if (chatBox && chatBox.style.display === 'none') {
                                chatBox.style.display = 'flex';
                            }
                            
                            let species = '';
                            if (results.wildlifeIdentification) {
                                species = results.wildlifeIdentification.species;
                            } else if (results.plantsIdentification) {
                                species = results.plantsIdentification.species;
                            }
                            
                            if (species && userInput) {
                                userInput.value = `Tell me more about ${species}`;
                                userInput.focus();
                            }
                        });
                    }, 1500);
                };
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    // Mock image analysis function
    function analyzeImage(img) {
        // Mock wildlife data
        const wildlife = [
            { 
                species: 'Amur Leopard', 
                info: 'One of the world\'s most endangered big cats, with an estimated 84 individuals remaining in the wild.',
                conservationStatus: 'Critically Endangered'
            },
            { 
                species: 'Mountain Gorilla', 
                info: 'Found in the mountainous regions of central Africa, with only about 1,000 individuals remaining.',
                conservationStatus: 'Endangered'
            },
            { 
                species: 'Giant Panda', 
                info: 'Native to south central China, known for their distinctive black and white coloring.',
                conservationStatus: 'Vulnerable'
            },
            { 
                species: 'African Elephant', 
                info: 'The largest living terrestrial animal with distinctively large ears and long trunk.',
                conservationStatus: 'Vulnerable'
            }
        ];
        
        // Mock plant data
        const plants = [
            { 
                species: 'Nepenthes rajah', 
                info: 'One of the largest pitcher plants in the world, endemic to Mount Kinabalu in Borneo.'
            },
            { 
                species: 'Venus Flytrap', 
                info: 'A carnivorous plant native to subtropical wetlands on the East Coast of the United States.'
            },
            { 
                species: 'Dragon Blood Tree', 
                info: 'An iconic tree native to the Socotra archipelago, known for its unique umbrella-shaped canopy.'
            }
        ];
        
        // Mock objects that might be detected
        const objects = [
            { name: 'Tree', confidence: 0.92 },
            { name: 'Water', confidence: 0.87 },
            { name: 'Mountain', confidence: 0.78 },
            { name: 'Animal', confidence: 0.95 },
            { name: 'Bird', confidence: 0.82 },
            { name: 'Vegetation', confidence: 0.97 },
            { name: 'Forest', confidence: 0.89 }
        ];
        
        // Randomly decide what kind of image this is
        const randomNum = Math.random();
        
        // Create response object
        const response = {
            detectedObjects: shuffleArray(objects).slice(0, 3 + Math.floor(Math.random() * 3)), // 3-5 random objects
            wildlifeIdentification: null,
            plantsIdentification: null
        };
        
        if (randomNum < 0.4) {
            // It's wildlife
            response.wildlifeIdentification = wildlife[Math.floor(Math.random() * wildlife.length)];
        } else if (randomNum < 0.7) {
            // It's a plant
            response.plantsIdentification = plants[Math.floor(Math.random() * plants.length)];
        } 
        // Otherwise just return the detected objects
        
        return response;
    }
    
    // Helper function to shuffle an array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    // Helper function to get badge color based on conservation status
    function getConservationStatusColor(status) {
        switch (status) {
            case 'Extinct':
            case 'Extinct in the Wild':
                return 'dark';
            case 'Critically Endangered':
                return 'danger';
            case 'Endangered':
                return 'warning';
            case 'Vulnerable':
                return 'primary';
            case 'Near Threatened':
                return 'info';
            case 'Least Concern':
                return 'success';
            default:
                return 'secondary';
        }
    }
    
    // CONTENT GENERATOR FUNCTIONALITY
    const generateContentButton = document.getElementById('generate-content-btn');
    
    if (generateContentButton) {
        generateContentButton.addEventListener('click', function() {
            generateContent();
        });
    }
    
    function generateContent() {
        // Get input values
        const topic = document.getElementById('topic')?.value.trim();
        const style = document.getElementById('style')?.value;
        const length = document.getElementById('length')?.value;
        
        // Validate input
        if (!topic) {
            // Better error handling with a custom alert
            showNotification('Please enter a biodiversity topic', 'error');
            return;
        }
        
        // Show loading indicator
        const responseDiv = document.getElementById('content-response');
        const generatedText = document.getElementById('generated-text');
        
        if (!responseDiv || !generatedText) return;
        
        responseDiv.style.display = 'block';
        
        // Create loading animation
        generatedText.innerHTML = `
            <div class="loading-animation">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p class="text-center text-muted">Generating your biodiversity content...</p>
        `;
        
        // Prepare parameters for content generation
        const contentParams = {
            topic: topic,
            style: style || 'informative',
            length: length || 'medium'
        };
        
        // Simulate API call with different responses based on parameters
        setTimeout(() => {
            const content = generateBiodiversityContent(contentParams);
            generatedText.innerHTML = content;
            
            // Scroll to the response
            responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Show success notification
            showNotification('Content successfully generated!', 'success');
            
            // Add a "Discuss with assistant" button
            const discussButton = document.createElement('button');
            discussButton.className = 'btn btn-outline-primary mt-3';
            discussButton.innerHTML = '<i class="bi bi-chat-dots"></i> Discuss with Assistant';
            discussButton.addEventListener('click', function() {
                // Open chat if closed
                if (chatBox && chatBox.style.display === 'none') {
                    chatBox.style.display = 'flex';
                }
                
                // Pre-fill a question about the topic
                if (userInput) {
                    userInput.value = `Let's discuss more about ${topic}`;
                    userInput.focus();
                }
            });
            
            // Add a copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'btn btn-outline-secondary mt-3 ms-2';
            copyButton.innerHTML = '<i class="bi bi-clipboard"></i> Copy Text';
            copyButton.addEventListener('click', function() {
                copyContent();
            });
            
            const buttonContainer = document.createElement('div');
            buttonContainer.appendChild(discussButton);
            buttonContainer.appendChild(copyButton);
            generatedText.appendChild(buttonContainer);
        }, 1500); // Simulate processing time
    }
    
    function generateBiodiversityContent(params) {
        const { topic, style, length } = params;
        
        // Base content lengths
        const contentLengths = {
            short: 1,
            medium: 2,
            long: 3
        };
        
        // Content templates based on style
        let content = '';
        
        if (style === 'informative') {
            content = generateInformativeContent(topic, contentLengths[length]);
        } else if (style === 'persuasive') {
            content = generatePersuasiveContent(topic, contentLengths[length]);
        } else if (style === 'story') {
            content = generateStoryContent(topic, contentLengths[length]);
        }
        
        return content;
    }
    
    function generateInformativeContent(topic, paragraphCount) {
        // Base informative templates about biodiversity
        const templates = [
            `${topic} is a critical component of Earth's biodiversity. Scientists have identified numerous species within this category that contribute to ecosystem stability and resilience.`,
            `Research shows that ${topic} plays a vital role in maintaining ecological balance. The intricate relationships between different species in this group support numerous ecosystem services.`,
            `Conservation efforts focused on ${topic} have increased in recent years. Experts emphasize the importance of protecting these species as they face numerous threats including habitat loss and climate change.`
        ];
        
        // Add more variety with additional templates
        const extraTemplates = [
            `Studies conducted by international research teams have documented over 500 unique interactions between ${topic} and other species, highlighting the complex web of life that sustains our planet.`,
            `The economic value of ecosystem services provided by ${topic} is estimated to be in the billions of dollars annually, yet this natural capital is rarely factored into development decisions.`
        ];
        
        // Combine templates based on length
        let allTemplates = templates;
        if (paragraphCount > templates.length) {
            allTemplates = [...templates, ...extraTemplates];
        }
        
        // Return appropriate number of paragraphs
        return allTemplates.slice(0, paragraphCount).join('\n\n');
    }
    
    function generatePersuasiveContent(topic, paragraphCount) {
        // Base persuasive templates about biodiversity
        const templates = [
            `We must act now to protect ${topic} before it's too late. Every day we delay conservation efforts, we risk losing invaluable biodiversity that may hold solutions to our greatest challenges.`,
            `Consider the profound impact that ${topic} has on our daily lives. From the food we eat to the air we breathe, biodiversity supports human existence in countless ways that we often take for granted.`,
            `Imagine a world without ${topic} - our ecosystems would collapse, threatening not just wildlife but human survival too. By supporting conservation efforts today, you're investing in a sustainable future for generations to come.`
        ];
        
        // Add more variety with additional templates
        const extraTemplates = [
            `The time for passive concern about ${topic} has passed. We need decisive action and committed funding to preserve these critical elements of our natural world before they vanish forever.`,
            `Your choices matter. Every sustainable product you purchase, every conservation organization you support, contributes to protecting ${topic} and securing the biodiversity our planet needs to thrive.`
        ];
        
        // Combine templates based on length
        let allTemplates = templates;
        if (paragraphCount > templates.length) {
            allTemplates = [...templates, ...extraTemplates];
        }
        
        // Return appropriate number of paragraphs
        return allTemplates.slice(0, paragraphCount).join('\n\n');
    }
    
    function generateStoryContent(topic, paragraphCount) {
      // Base story templates about biodiversity
      const templates = [
          `The morning sun filtered through the canopy as researchers made their way through the forest, in search of the elusive ${topic}. Their expedition represented years of dedication to understanding this critical piece of biodiversity.`,
          `"Look there!" whispered Dr. Chen, pointing to movement among the vegetation. The team held their breath as they observed the ${topic} in its natural habitat, a sight few had been privileged to witness in the wild.`,
          `Back at the research station, the team compiled their findings with excitement. The data they'd gathered about ${topic} would contribute to conservation efforts worldwide, potentially saving countless species from extinction.`
      ];
      
      // Add more variety with additional templates
      const extraTemplates = [
          `Local communities had lived alongside ${topic} for generations, developing traditional knowledge that proved invaluable to the scientific team. This collaboration between indigenous wisdom and modern science offered new hope for conservation strategies.`,
          `As the sun set on their final day in the field, the researchers reflected on their journey. Their work with ${topic} wasn't just about preserving one species – it was about protecting the intricate web of life that sustained entire ecosystems.`
      ];
      
      // Combine templates based on length
      let allTemplates = templates;
      if (paragraphCount > templates.length) {
          allTemplates = [...templates, ...extraTemplates];
      }
      
      // Return appropriate number of paragraphs
      return allTemplates.slice(0, paragraphCount).join('\n\n');
  }
  
  // Function to copy content to clipboard
  function copyContent() {
      const generatedText = document.getElementById('generated-text');
      if (!generatedText) return;
      
      // Create a temporary element to hold text without the buttons
      const tempElement = document.createElement('div');
      tempElement.innerHTML = generatedText.innerHTML;
      
      // Remove any buttons from the clone
      const buttons = tempElement.querySelectorAll('button');
      buttons.forEach(button => button.remove());
      
      // Get text content
      const textToCopy = tempElement.textContent.trim();
      
      // Use clipboard API to copy text
      navigator.clipboard.writeText(textToCopy)
          .then(() => {
              showNotification('Content copied to clipboard!', 'success');
          })
          .catch(err => {
              showNotification('Failed to copy content', 'error');
              console.error('Failed to copy: ', err);
          });
  }
  
  // Notification system
  function showNotification(message, type = 'info') {
      // Create notification container if it doesn't exist
      let notificationContainer = document.getElementById('notification-container');
      if (!notificationContainer) {
          notificationContainer = document.createElement('div');
          notificationContainer.id = 'notification-container';
          notificationContainer.className = 'notification-container';
          document.body.appendChild(notificationContainer);
      }
      
      // Create notification element
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      
      // Add icon based on type
      let icon = 'info-circle';
      if (type === 'success') icon = 'check-circle';
      if (type === 'error') icon = 'exclamation-circle';
      if (type === 'warning') icon = 'exclamation-triangle';
      
      notification.innerHTML = `
          <i class="bi bi-${icon}"></i>
          <span>${message}</span>
      `;
      
      // Add to container
      notificationContainer.appendChild(notification);
      
      // Remove after 3 seconds
      setTimeout(() => {
          notification.classList.add('fade-out');
          setTimeout(() => {
              notification.remove();
          }, 300);
      }, 3000);
  }
  
  // Add event listeners for special feature buttons if they exist
  document.querySelectorAll('[data-feature]').forEach(button => {
      button.addEventListener('click', function() {
          const feature = this.getAttribute('data-feature');
          
          if (feature === 'endangered-species') {
              window.location.href = '#endangered';
          } else if (feature === 'climate-impact') {
              window.location.href = '#climate';
          } else if (feature === 'conservation') {
              window.location.href = '#conservation';
          }
      });
  });
  
  // Handle scroll animations for sections
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  // Observe all sections for scroll animations
  document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
  });
  
  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
      });
  }
  
  // Handle dynamic search functionality if search input exists
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
      searchInput.addEventListener('input', function() {
          const query = this.value.toLowerCase().trim();
          
          // If search is empty, show all items
          if (!query) {
              document.querySelectorAll('.searchable-item').forEach(item => {
                  item.style.display = '';
              });
              return;
          }
          
          // Filter items based on search query
          document.querySelectorAll('.searchable-item').forEach(item => {
              const text = item.textContent.toLowerCase();
              if (text.includes(query)) {
                  item.style.display = '';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  }
  
  // Mobile menu toggle if it exists
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener('click', function() {
          navMenu.classList.toggle('show');
      });
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
              
              // Close mobile menu if open
              if (navMenu && navMenu.classList.contains('show')) {
                  navMenu.classList.remove('show');
              }
          }
      });
  });
});
        
        



  //analysis function
  document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the image analysis button (you'll need to add this to your HTML)
    const imageAnalysisButton = document.getElementById('image-analysis-button');
    
    // Add click event to image analysis button
    imageAnalysisButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Show the image analysis modal
      const imageModal = new bootstrap.Modal(document.getElementById('image-analysis-modal'));
      imageModal.show();
      
      // Get references to image upload input and results container
      const imageInput = document.getElementById('image-input');
      const imageResultsContainer = document.getElementById('image-results');
      
      // Reset previous results
      imageResultsContainer.innerHTML = '<div class="alert alert-primary">Upload an image to analyze</div>';
    });
    
    // Handle image upload and analysis
    document.getElementById('image-input').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const imageResultsContainer = document.getElementById('image-results');
      
      // Check if file is an image
      if (!file.type.match('image.*')) {
        imageResultsContainer.innerHTML = '<div class="alert alert-danger">Please select an image file</div>';
        return;
      }
      
      // Show loading indicator
      imageResultsContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Processing image...</span></div></div>';
      
      // Create a FileReader to read the image
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = function() {
          // Display the image preview
          const imagePreview = document.createElement('div');
          imagePreview.className = 'text-center mb-3';
          imagePreview.innerHTML = `<img src="${img.src}" alt="Uploaded Image" class="img-fluid rounded" style="max-height: 200px;">`;
          
          // Simulate image analysis (replace with actual analysis API in production)
          setTimeout(() => {
            // Mock analysis results - replace with actual image analysis implementation
            const results = analyzeImage(img);
            
            // Display analysis results
            imageResultsContainer.innerHTML = '';
            imageResultsContainer.appendChild(imagePreview);
            
            // Add analysis results
            const resultsDiv = document.createElement('div');
            resultsDiv.className = 'analysis-results';
            
            // Display detected objects/features
            if (results.detectedObjects.length > 0) {
              const objectsSection = document.createElement('div');
              objectsSection.innerHTML = `
                <h5 class="mt-3">Detected Objects</h5>
                <ul class="list-group">
                  ${results.detectedObjects.map(obj => 
                    `<li class="list-group-item d-flex justify-content-between align-items-center">
                      ${obj.name}
                      <span class="badge bg-primary rounded-pill">${Math.round(obj.confidence * 100)}%</span>
                    </li>`
                  ).join('')}
                </ul>
              `;
              resultsDiv.appendChild(objectsSection);
            }
            
            // Display wildlife identification (if applicable)
            if (results.wildlifeIdentification) {
              const wildlifeSection = document.createElement('div');
              wildlifeSection.innerHTML = `
                <h5 class="mt-3">Wildlife Identification</h5>
                <div class="alert alert-info">
                  <strong>${results.wildlifeIdentification.species}</strong>
                  <p class="mb-0">${results.wildlifeIdentification.info}</p>
                  ${results.wildlifeIdentification.conservationStatus ? 
                    `<p class="mt-2 mb-0"><strong>Conservation Status:</strong> 
                     <span class="badge bg-${getConservationStatusColor(results.wildlifeIdentification.conservationStatus)}">
                       ${results.wildlifeIdentification.conservationStatus}
                     </span>
                    </p>` : ''}
                </div>
              `;
              resultsDiv.appendChild(wildlifeSection);
            }
            
            // Display plants identification (if applicable)
            if (results.plantsIdentification) {
              const plantsSection = document.createElement('div');
              plantsSection.innerHTML = `
                <h5 class="mt-3">Plant Identification</h5>
                <div class="alert alert-success">
                  <strong>${results.plantsIdentification.species}</strong>
                  <p class="mb-0">${results.plantsIdentification.info}</p>
                </div>
              `;
              resultsDiv.appendChild(plantsSection);
            }
            
            imageResultsContainer.appendChild(resultsDiv);
            
            // Add action buttons
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'mt-3';
            actionsDiv.innerHTML = `
              <button class="btn btn-outline-primary me-2" id="share-analysis">
                <i class="bi bi-share"></i> Share
              </button>
              <button class="btn btn-outline-success" id="learn-more-btn">
                <i class="bi bi-book"></i> Learn More
              </button>
            `;
            imageResultsContainer.appendChild(actionsDiv);
            
            // Attach event handlers to the new buttons
            document.getElementById('share-analysis').addEventListener('click', function() {
              alert('Sharing functionality would be implemented here');
            });
            
            document.getElementById('learn-more-btn').addEventListener('click', function() {
              if (results.wildlifeIdentification) {
                window.location.href = '#animals'; // Link to your animals section
              } else if (results.plantsIdentification) {
                window.location.href = '#plants'; // Link to your plants section
              } else {
                window.location.href = '#conservation'; // Generic conservation page
              }
            });
          }, 1500);
        };
      };
      
      reader.readAsDataURL(file);
    });
    
    // Mock image analysis function (replace with actual API in production)
    function analyzeImage(img) {
      // This is a mock function - in production you would use a real image analysis API
      // like Google Cloud Vision, Azure Computer Vision, or TensorFlow.js
      
      // Generate random analysis results for demo purposes
      const wildlife = [
        { 
          species: 'Amur Leopard', 
          info: 'One of the world\'s most endangered big cats, with an estimated 84 individuals remaining in the wild.',
          conservationStatus: 'Critically Endangered'
        },
        { 
          species: 'Mountain Gorilla', 
          info: 'Found in the mountainous regions of central Africa, with only about 1,000 individuals remaining.',
          conservationStatus: 'Endangered'
        },
        { 
          species: 'Giant Panda', 
          info: 'Native to south central China, known for their distinctive black and white coloring.',
          conservationStatus: 'Vulnerable'
        },
        { 
          species: 'African Elephant', 
          info: 'The largest living terrestrial animal with distinctively large ears and long trunk.',
          conservationStatus: 'Vulnerable'
        }
      ];
      
      const plants = [
        { 
          species: 'Nepenthes rajah', 
          info: 'One of the largest pitcher plants in the world, endemic to Mount Kinabalu in Borneo.'
        },
        { 
          species: 'Venus Flytrap', 
          info: 'A carnivorous plant native to subtropical wetlands on the East Coast of the United States.'
        },
        { 
          species: 'Dragon Blood Tree', 
          info: 'An iconic tree native to the Socotra archipelago, known for its unique umbrella-shaped canopy.'
        }
      ];
      
      const objects = [
        { name: 'Tree', confidence: 0.92 },
        { name: 'Water', confidence: 0.87 },
        { name: 'Mountain', confidence: 0.78 },
        { name: 'Animal', confidence: 0.95 },
        { name: 'Bird', confidence: 0.82 },
        { name: 'Vegetation', confidence: 0.97 },
        { name: 'Forest', confidence: 0.89 }
      ];
      
      // Randomly decide what kind of image this is
      const randomNum = Math.random();
      
      // Create response object
      const response = {
        detectedObjects: shuffleArray(objects).slice(0, 3 + Math.floor(Math.random() * 3)), // 3-5 random objects
        wildlifeIdentification: null,
        plantsIdentification: null
      };
      
      if (randomNum < 0.4) {
        // It's wildlife
        response.wildlifeIdentification = wildlife[Math.floor(Math.random() * wildlife.length)];
      } else if (randomNum < 0.7) {
        // It's a plant
        response.plantsIdentification = plants[Math.floor(Math.random() * plants.length)];
      } 
      // Otherwise just return the detected objects
      
      return response;
    }
    
    // Helper function to shuffle an array
    function shuffleArray(array) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    }
    
    // Helper function to get badge color based on conservation status
    function getConservationStatusColor(status) {
      switch (status) {
        case 'Extinct':
        case 'Extinct in the Wild':
          return 'dark';
        case 'Critically Endangered':
          return 'danger';
        case 'Endangered':
          return 'warning';
        case 'Vulnerable':
          return 'primary';
        case 'Near Threatened':
          return 'info';
        case 'Least Concern':
          return 'success';
        default:
          return 'secondary';
      }
    }
  });

 // AI Content Generator Function
// Content templates for each style
const contentTemplates = {
  informative: [
      "{topic} is a critical component of Earth's biodiversity. Scientists have identified numerous species within this category that contribute to ecosystem stability and resilience.",
      "Research shows that {topic} plays a vital role in maintaining ecological balance. The intricate relationships between different species in this group support numerous ecosystem services.",
      "Conservation efforts focused on {topic} have increased in recent years. Experts emphasize the importance of protecting these species as they face numerous threats including habitat loss and climate change.",
      "The biodiversity of {topic} varies significantly across different geographical regions. Local adaptations have resulted in unique traits and characteristics that enable these organisms to thrive in specific environments.",
      "Human activities have dramatically impacted {topic} over the past century. Industrial development, agricultural expansion, and urbanization have all contributed to declining populations and reduced habitat range.",
      "Modern technology is revolutionizing how scientists study {topic}. DNA analysis, satellite tracking, and environmental DNA sampling have all provided new insights into behavior patterns and population dynamics.",
      "Climate change poses a significant threat to {topic}, with shifting temperature and precipitation patterns disrupting established ecosystems. Adaptation strategies are crucial for ensuring the survival of vulnerable species."
  ],
  persuasive: [
      "We must act now to protect {topic} before it's too late. Every day we delay conservation efforts, we risk losing invaluable biodiversity that may hold solutions to our greatest challenges.",
      "Consider the profound impact that {topic} has on our daily lives. From the food we eat to the air we breathe, biodiversity supports human existence in countless ways that we often take for granted.",
      "Imagine a world without {topic} - our ecosystems would collapse, threatening not just wildlife but human survival too. By supporting conservation efforts today, you're investing in a sustainable future for generations to come.",
      "The economic value of preserving {topic} far outweighs the short-term gains from exploitation. Sustainable management practices can provide long-term benefits for both local communities and global ecosystems.",
      "Your individual choices matter in the protection of {topic}. Simple changes in consumption habits can collectively make a significant impact on reducing threats to biodiversity worldwide."
  ],
  story: [
      "The morning sun filtered through the canopy as researchers made their way through the forest, in search of the elusive {topic}. Their expedition represented years of dedication to understanding this critical piece of biodiversity.",
      "'Look there!' whispered Dr. Chen, pointing to movement among the vegetation. The team held their breath as they observed the {topic} in its natural habitat, a sight few had been privileged to witness in the wild.",
      "Back at the research station, the team compiled their findings with excitement. The data they'd gathered about {topic} would contribute to conservation efforts worldwide, potentially saving countless species from extinction.",
      "Local communities had lived alongside {topic} for generations, developing traditional knowledge that proved invaluable to the scientific team. This collaboration between indigenous wisdom and modern science offered new hope for conservation strategies.",
      "As the sun set on their final day in the field, the researchers reflected on their journey. Their work with {topic} wasn't just about preserving one species – it was about understanding the interconnected web of life that sustains us all."
  ],
  scientific: [
      "{topic} exhibits remarkable phylogenetic diversity across its taxonomic range. Genomic analyses have revealed significant genetic differentiation among populations, suggesting adaptive radiation in response to varied ecological niches.",
      "The ecological role of {topic} has been extensively documented in longitudinal studies spanning multiple decades. Meta-analyses indicate a strong correlation between {topic} abundance and ecosystem resilience metrics (p<0.001).",
      "Recent research on {topic} has identified several bioactive compounds with potential pharmaceutical applications. Preliminary in vitro studies suggest antimicrobial and anti-inflammatory properties warranting further investigation.",
      "Conservation status assessments of {topic} indicate population declines of approximately 32% over the past three decades. Anthropogenic factors, particularly habitat fragmentation and climate change, are primary drivers of this trend."
  ],
  "social-media": [
      "🌿 Did you know? {topic} is way more important than most people realize! Scientists are discovering new species every year that could hold the key to ecosystem health. #Biodiversity #Conservation",
      "🔍 MIND BLOWN! {topic} contains some of the most incredible adaptations in the natural world. Nature's been perfecting these designs for millions of years! #NatureIsAmazing #Science",
      "🌎 Today's biodiversity spotlight: {topic}! Without these amazing organisms, our planet would be a completely different place. Share this post to spread awareness! #SaveBiodiversity",
      "⏰ The race to save {topic} is on! Conservation efforts are making progress, but we need YOUR help to ensure these incredible species have a future. #ClimateAction #Wildlife"
  ]
};

// Function to generate content
function generateContent() {
  // Get input values
  const topic = document.getElementById('topic').value.trim();
  const style = document.getElementById('style').value;
  const length = document.getElementById('length').value;
  
  // Validate input
  if (!topic) {
      showNotification('Please enter a biodiversity topic', 'error');
      return;
  }
  
  // Show loading indicator
  const responseDiv = document.getElementById('content-response');
  const generatedText = document.getElementById('generated-text');
  responseDiv.style.display = 'block';
  
  generatedText.innerHTML = `
      <div class="loading-animation">
      <span></span>
      <span></span>
      <span></span>
      </div>
      <p class="text-center text-muted">Generating your biodiversity content...</p>
  `;
  
  // Simulate API call with different responses based on parameters
  setTimeout(() => {
      try {
          const content = generateBiodiversityContent(topic, style, length);
          generatedText.innerHTML = content;
          
          // Scroll to the response
          responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          // Show success notification
          showNotification('Content successfully generated!', 'success');
      } catch (error) {
          generatedText.innerHTML = `<div class="error-message">An error occurred: ${error.message}</div>`;
          showNotification('Error generating content', 'error');
      }
  }, Math.random() * 500 + 1000); // Randomized loading time for realism
}

// Function to generate biodiversity content
function generateBiodiversityContent(topic, style, length) {
  // Base content lengths
  const contentLengths = {
      'very-short': 1,
      'short': 2,
      'medium': 3,
      'long': 4
  };
  
  const paragraphCount = contentLengths[length] || 2; // Default to short if invalid
  
  // Get templates for selected style
  const templates = contentTemplates[style] || contentTemplates.informative;
  
  // Select random paragraphs based on length
  let selectedParagraphs = [];
  
  // If we have fewer templates than requested paragraphs, use all templates
  if (templates.length <= paragraphCount) {
      selectedParagraphs = [...templates];
  } else {
      // Otherwise select random paragraphs without repetition
      const indices = new Set();
      while (indices.size < paragraphCount) {
          indices.add(Math.floor(Math.random() * templates.length));
      }
      selectedParagraphs = Array.from(indices).map(index => templates[index]);
  }
  
  // Replace {topic} placeholder with actual topic
  const content = selectedParagraphs
      .map(para => para.replace(/{topic}/g, topic))
      .join('\n\n');
      
  return content;
}

// Function to copy content
function copyContent() {
  const text = document.getElementById('generated-text').innerText;
  navigator.clipboard.writeText(text)
      .then(() => {
          showNotification('Content copied to clipboard!', 'success');
      })
      .catch(err => {
          showNotification('Failed to copy content', 'error');
          console.error('Failed to copy: ', err);
      });
}

// Show notification function
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  // Add icon based on type
  let icon = 'info-circle';
  if (type === 'error') icon = 'exclamation-circle';
  if (type === 'success') icon = 'check-circle';
  
  notification.innerHTML = `
      <i class="fas fa-${icon}"></i>
      <span>${message}</span>
  `;
  
  // Add to notification container or create one
  let container = document.querySelector('.notification-container');
  if (!container) {
      container = document.createElement('div');
      container.className = 'notification-container';
      document.body.appendChild(container);
  }
  
  // Add to container
  container.appendChild(notification);
  
  // Show with animation
  setTimeout(() => {
      notification.classList.add('show');
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
          if (notification.parentElement) {
              notification.parentElement.removeChild(notification);
          }
      }, 300);
  }, 5000);
}

// Set up event listeners when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Generate button event listener
  document.getElementById('generateBtn').addEventListener('click', generateContent);
  
  // Copy button event listener
  document.getElementById('copyBtn').addEventListener('click', copyContent);
  
  // Example topics event listeners
  const exampleButtons = document.querySelectorAll('.btn-example');
  exampleButtons.forEach(button => {
      button.addEventListener('click', function() {
          document.getElementById('topic').value = this.textContent;
          generateContent();
      });
  });
  
  // Allow form submission with Enter key
  document.getElementById('topic').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          generateContent();
      }
  });
});

    
})(jQuery);

