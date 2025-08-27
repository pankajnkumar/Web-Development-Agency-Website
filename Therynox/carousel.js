document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    let currentIndex = 2; // Start at first real image (after clones)
    let isDragging = false;
    let startPos = 0;
    const realSlideCount = 5;
    let isTransitioning = false;
    let autoSlideInterval;
    const SLIDE_DURATION = 2000; // 2 seconds per slide
    const TRANSITION_DURATION = 500; // 0.5 seconds transition

    // Initialize the carousel
    function initCarousel() {
        updateSlides();
        setupEventListeners();
        startAutoSlide();
    }

    // Start auto sliding
    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(() => {
            if (!isDragging && !isTransitioning) {
                currentIndex++;
                updateSlides();
                handleInfiniteScroll();
            }
        }, SLIDE_DURATION);
    }

    // Stop auto sliding
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Update slide positions and classes
    function updateSlides() {
        // Remove all classes first
        slides.forEach(slide => {
            slide.classList.remove('active', 'adjacent', 'outer');
        });

        // Add appropriate classes
        slides.forEach((slide, index) => {
            const diff = index - currentIndex;
            if (diff === 0) {
                slide.classList.add('active');
            } else if (Math.abs(diff) === 1) {
                slide.classList.add('adjacent');
            } else {
                slide.classList.add('outer');
            }
        });

        // Update dots based on real slide position
        const dotIndex = ((currentIndex - 2) % realSlideCount + realSlideCount) % realSlideCount;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === dotIndex);
        });

        // Update track position
        const activeSlide = slides[currentIndex];
        const containerWidth = track.parentElement.offsetWidth;
        const slideWidth = activeSlide.offsetWidth;
        const slideOffset = activeSlide.offsetLeft;
        const centerOffset = (containerWidth - slideWidth) / 2;
        const scrollOffset = slideOffset - centerOffset;
        
        track.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        track.style.transform = `translateX(-${scrollOffset}px)`;
    }

    // Handle infinite scroll transition
    function handleInfiniteScroll() {
        if (isTransitioning) return;

        if (currentIndex <= 1) { // Before first real image
            isTransitioning = true;
            track.style.transition = 'none';
            currentIndex = realSlideCount + 1;
            updateSlides();
            requestAnimationFrame(() => {
                track.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                setTimeout(() => {
                    isTransitioning = false;
                }, TRANSITION_DURATION);
            });
        } else if (currentIndex >= realSlideCount + 2) { // After last real image
            isTransitioning = true;
            // First, move to the clone of the first image
            currentIndex = realSlideCount + 2;
            updateSlides();
            // Then, after a small delay, move to the first real image
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 2;
                updateSlides();
                requestAnimationFrame(() => {
                    track.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                    setTimeout(() => {
                        isTransitioning = false;
                    }, TRANSITION_DURATION);
                });
            }, 50);
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // Arrow click events
        leftArrow.addEventListener('click', () => {
            if (isTransitioning) return;
            stopAutoSlide();
            currentIndex--;
            updateSlides();
            handleInfiniteScroll();
            startAutoSlide();
        });

        rightArrow.addEventListener('click', () => {
            if (isTransitioning) return;
            stopAutoSlide();
            currentIndex++;
            updateSlides();
            handleInfiniteScroll();
            startAutoSlide();
        });

        // Dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                stopAutoSlide();
                currentIndex = index + 2; // Adjust for cloned slides
                updateSlides();
                handleInfiniteScroll();
                startAutoSlide();
            });
        });

        // Touch events
        track.addEventListener('touchstart', (e) => {
            if (isTransitioning) return;
            stopAutoSlide();
            isDragging = true;
            startPos = e.touches[0].clientX;
            track.style.transition = 'none';
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging || isTransitioning) return;
            const currentPos = e.touches[0].clientX;
            const diff = currentPos - startPos;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    currentIndex--;
                } else {
                    currentIndex++;
                }
                updateSlides();
                handleInfiniteScroll();
                isDragging = false;
                startAutoSlide();
            }
        });

        track.addEventListener('touchend', () => {
            isDragging = false;
            track.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            startAutoSlide();
        });

        // Mouse events
        track.addEventListener('mousedown', (e) => {
            if (isTransitioning) return;
            stopAutoSlide();
            isDragging = true;
            startPos = e.pageX;
            track.style.transition = 'none';
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDragging || isTransitioning) return;
            const currentPos = e.pageX;
            const diff = currentPos - startPos;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    currentIndex--;
                } else {
                    currentIndex++;
                }
                updateSlides();
                handleInfiniteScroll();
                isDragging = false;
                startAutoSlide();
            }
        });

        track.addEventListener('mouseup', () => {
            isDragging = false;
            track.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            startAutoSlide();
        });

        track.addEventListener('mouseleave', () => {
            isDragging = false;
            track.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            startAutoSlide();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (!isTransitioning) {
                updateSlides();
            }
        });
    }

    // Initialize the carousel
    initCarousel();
}); 