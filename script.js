const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const itemsToMove = 1;
let currentIndex = itemsToMove; // Start at the first real item after the clones

// Clone the first and last items
const firstItems = Array.from(items).slice(0, itemsToMove);
const lastItems = Array.from(items).slice(-itemsToMove);

firstItems.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
});

lastItems.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.insertBefore(clone, carousel.firstChild);
});

function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const offset = -(currentIndex * itemWidth);
    carousel.style.transform = `translateX(${offset}px)`;
}

// Show the previous item
prevButton.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();

    // Check if we are at the clone and reset to the last item
    if (currentIndex < itemsToMove) {
        setTimeout(() => {
            currentIndex = items.length;
            carousel.style.transition = 'none'; // Temporarily disable transition for jump
            updateCarousel();
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease-in-out'; // Restore transition
            }, 20); // Delay to allow transition reset
        }, 500); // Match this delay with CSS transition duration
    }
});

// Show the next item
nextButton.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();

    // Check if we are at the clone and reset to the first item
    if (currentIndex >= items.length + itemsToMove) {
        setTimeout(() => {
            currentIndex = itemsToMove;
            carousel.style.transition = 'none'; // Temporarily disable transition for jump
            updateCarousel();
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease-in-out'; // Restore transition
            }, 20);
        }, 500);
    }
});

// Initial setup
updateCarousel();
