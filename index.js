function showPage(pageId) {
  const sections = document.querySelectorAll("section");

  // Hide all sections
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Display the selected section
  document.getElementById(pageId).style.display = "block";
}

// document.addEventListener("DOMContentLoaded", function () {
//   const hamburger = document.querySelector(".hamburger_menuH");
//   const menu = document.querySelector(".nav_bar_div");

//   hamburger.addEventListener("click", () => {
//     hamburger.classList.toggle("open"); // Toggle 'open' class for the hamburger icon
//     menu.classList.toggle("open"); // Toggle 'open' class for the side menu
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger_menuH");
  const menu = document.querySelector(".nav_bar_div");

  console.log("Hamburger menu:", hamburger); // Debugging: Check if the element is found
  console.log("Navigation bar:", menu); // Debugging: Check if the element is found

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      menu.classList.toggle("open");
    });
  } else {
    console.error(
      "One or more elements are not found. Check your HTML and class names."
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const carouselSlide = document.querySelector(".carousel_slide");
  const images = document.querySelectorAll(".carousel_slide img");
  const peelOffTarget = document.querySelector(".peel-off-target"); // Target for peel-off effect
  const slideInTarget = document.querySelector(".slide-in-target"); // Target for slide-in effect
  const slideInBottomTarget = document.querySelector(".slide-in-bottom-target"); // Target for slide-in from bottom effect
  const splitTarget = document.querySelector(".split-target"); // Current image to split
  const revealTarget = document.querySelector(".reveal-target"); // Next image to reveal

  let currentIndex = 0;
  const totalImages = images.length;
  const intervalTime = 10000; // Time in milliseconds for automatic scrolling (10 seconds)

  // Get references to the buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Update the slide position based on the current index
  function updateCarouselPosition() {
    if (totalImages > 0) {
      const slideWidth = images[0].clientWidth;
      carouselSlide.style.transform = `translateX(${
        -slideWidth * currentIndex
      }px)`;

      // Remove 'active', 'peel', 'slide-in', 'split', and 'reveal' classes from all images
      images.forEach((img) => {
        img.classList.remove("active", "peel", "slide-in", "split", "reveal");
      });

      // Add 'active' class to the current image
      images[currentIndex].classList.add("active");

      // Apply the 'peel' class only if the current image is the peel-off target
      if (images[currentIndex] === peelOffTarget) {
        setTimeout(() => {
          peelOffTarget.classList.add("peel");
        }, 0); // Use timeout to ensure animation triggers correctly
      }

      // Apply the 'slide-in' class only if the current image is the slide-in target
      if (images[currentIndex] === slideInTarget) {
        setTimeout(() => {
          slideInTarget.classList.add("slide-in");
        }, 0); // Use timeout to ensure animation triggers correctly
      }

      // Apply the 'slide-in-bottom' class only if the current image is the slide-in from bottom target
      if (images[currentIndex] === slideInBottomTarget) {
        setTimeout(() => {
          slideInBottomTarget.classList.add("slide-in-bottom");
        }, 0); // Use timeout to ensure animation triggers correctly
      }

      // Split the current image and reveal the next one
      const nextIndex = (currentIndex + 1) % totalImages; // Calculate next index
      if (images[currentIndex] === splitTarget) {
        setTimeout(() => {
          splitTarget.classList.add("split"); // Add split class to the current image
        }, 0); // Use timeout to ensure animation triggers correctly

        setTimeout(() => {
          if (images[nextIndex]) {
            images[nextIndex].classList.add("reveal"); // Add reveal class to the next image
          }
        }, 1000); // Delay to match the split animation duration
      }
    }
  }

  // Go to the next slide
  function nextSlide() {
    currentIndex++;
    if (currentIndex >= totalImages) {
      currentIndex = 0; // Loop back to the first image
    }
    updateCarouselPosition();
  }

  // Go to the previous slide
  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalImages - 1; // Loop back to the last image
    }
    updateCarouselPosition();
  }

  // Automatically scroll the carousel every intervalTime milliseconds
  const autoScroll = setInterval(nextSlide, intervalTime);

  // Initialize the carousel
  window.addEventListener("resize", updateCarouselPosition);
  updateCarouselPosition();

  // Adding event listeners for buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  } else {
    console.error("Previous button (prevBtn) not found in the DOM.");
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  } else {
    console.error("Next button (nextBtn) not found in the DOM.");
  }
});

//PROPERTIES CAROUSEL

function setupCarousel(carouselContainerSelector) {
  var carouselContainers = document.querySelectorAll(carouselContainerSelector);

  carouselContainers.forEach(function (carouselContainer) {
    var carouselSlide = carouselContainer.querySelector(".carousel-slide");
    var images = carouselSlide.querySelectorAll("img");
    var prevButton = carouselContainer.querySelector(".prev_property");
    var nextButton = carouselContainer.querySelector(".next_property");

    var currentIndex = 0;
    var totalImages = images.length;

    function updateCarousel() {
      var imageWidth = images[0].clientWidth;
      carouselSlide.style.transform = `translateX(${
        -imageWidth * currentIndex
      }px)`;
    }

    nextButton.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    });

    prevButton.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
    });

    // Initial update to set the carousel to the correct position
    updateCarousel();
  });
}

// Initialize each carousel with the class 'carousel-container'
setupCarousel(".carousel-container");

//loadMoreCarousels

var carouselCount = 1; // Starting count based on initial setup

function loadMoreCarousels() {
  // Increment the carousel count for unique identification
  carouselCount++;

  // Create the new carouselContainer structure
  var newCarouselContainer = document.createElement("div");
  newCarouselContainer.className = "carouselContainer slideIn"; // Use slideIn class
  newCarouselContainer.innerHTML = `
    <div class="property_sectionCarousel">
      <!-- Carousel 1 -->
      <div class="property_sectionCarousel_div">
        <div class="carousel-container">
          <div class="carousel-slide">
            <img src="HaridaImages/house1.png" alt="House 1" />
            <img src="HaridaImages/house2.png" alt="House 2" />
            <img src="HaridaImages/house4.png" alt="House 3" />
          </div>
          <div class="overlay">
            <div class="overlay_btn">
              <                      <div class="buttons">
                        <div class="buttons_1">
                          <div class="btn">
                            <a href="hotOffer.html">Featured</a>
                          </div>
                        </div>
                        <div class="buttons_div">
                          <div class="buttons_2">
                            <div class="btn">
                              <a href="onGoing.html">ONGOING</a>
                            </div>
                          </div>
                          <div class="buttons_3">
                            <div class="btn">
                              <a href="hotOffer.html">HOT OFFER</a>
                            </div>
                          </div>
                        </div>
                      </div>
            </div>
            <div class="overlay_amount">
              <div class="start_amount">
                <div class="amount">Starting From 15,000,000</div>
                        <div class="amountImg">
                          <div class="amountImg_div" title="Favourite">
                            <img src="HaridaImages/Vector (1).png" />
                          </div>
                          <div class="amountImg_div" title="Add to compare">
                            <img src="HaridaImages/plusCircel.png" />
                          </div>
                        </div>
                                      </div>
            </div>
          </div>
          <button class="prev_property">❮</button>
          <button class="next_property">❯</button>
        </div>
        <div class="details_section">
          <div class="residentials_div">
            <div class="residentials">
              Two3Four Residence – 2  Apartment chevron
            </div>
          </div>
          <div class="residential">
            <div class="residentials">Two3Four residence</div>
          </div>
          <div class="residential_details">
            <div class="residentials">Apartment, Residential</div>
            <div class="details">Details</div>
          </div>
        </div>
      </div>
      <!-- Carousel 2 -->
      <div class="property_sectionCarousel_div">
        <div class="carousel-container">
          <div class="carousel-slide">
            <img src="HaridaImages/house1.png" alt="House 1" />
            <img src="HaridaImages/house2.png" alt="House 2" />
            <img src="HaridaImages/house4.png" alt="House 3" />
          </div>
          <div class="overlay">
            <div class="overlay_btn">
                                    <div class="buttons">
                        <div class="buttons_1">
                          <div class="btn">
                            <a href="hotOffer.html">Featured</a>
                          </div>
                        </div>
                        <div class="buttons_div">
                          <div class="buttons_2">
                            <div class="btn">
                              <a href="onGoing.html">ONGOING</a>
                            </div>
                          </div>
                          <div class="buttons_3">
                            <div class="btn">
                              <a href="hotOffer.html">HOT OFFER</a>
                            </div>
                          </div>
                        </div>
                      </div>
            </div>
            <div class="overlay_amount">
              <div class="start_amount">
                <div class="amount">Starting From 15,000,000</div>
                        <div class="amountImg">
                          <div class="amountImg_div" title="Favourite">
                            <img src="HaridaImages/Vector (1).png" />
                          </div>
                          <div class="amountImg_div" title="Add to compare">
                            <img src="HaridaImages/plusCircel.png" />
                          </div>
                        </div>
                                      </div>
            </div>
          </div>
          <button class="prev_property">❮</button>
          <button class="next_property">❯</button>
        </div>
        <div class="details_section">
          <div class="residentials_div">
            <div class="residentials">
              Two3Four Residence – 2  Apartment chevron
            </div>
          </div>
          <div class="residential">
            <div class="residentials">Two3Four residence</div>
          </div>
          <div class="residential_details">
            <div class="residentials">Apartment, Residential</div>
            <div class="details">Details</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append the new carouselContainer to the main container in the DOM
  document
    .querySelector(".mainCarouselContainer") // Adjust to your main container class
    .appendChild(newCarouselContainer);

  // Reinitialize the carousel functionality for the newly added carousels
  setupCarousel(".carousel-container");
}

// Function to initialize all carousels
function setupCarousel(carouselContainerSelector) {
  var carouselContainers = document.querySelectorAll(carouselContainerSelector);

  carouselContainers.forEach(function (carouselContainer) {
    var carouselSlide = carouselContainer.querySelector(".carousel-slide");
    var images = carouselSlide.querySelectorAll("img");
    var prevButton = carouselContainer.querySelector(".prev_property");
    var nextButton = carouselContainer.querySelector(".next_property");

    var currentIndex = 0;
    var totalImages = images.length;

    function updateCarousel() {
      var imageWidth = images[0].clientWidth;
      carouselSlide.style.transform = `translateX(${
        -imageWidth * currentIndex
      }px)`;
    }

    nextButton.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    });

    prevButton.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
    });

    // Initial update to set the carousel to the correct position
    updateCarousel();
  });
}

// Initial setup for carousels on page load
setupCarousel(".carousel-container");
