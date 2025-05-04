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

    
})(jQuery);

