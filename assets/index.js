// Array of "hello" translations
const languages = [
  "Hello!👋",
  "Hola!👋",
  "Bonjour!👋",
  "Ciao!👋",
  "こんにちは!👋",
  "안녕하세요!👋",
  "你好!👋",
  "Привет!👋",
  "مرحبا!👋",
];
const helloElement = document.getElementById("hello");
let index = 0;

// Function to change the greeting text
function changeWord() {
  if (index < languages.length) {
    helloElement.style.opacity = 0; // Fade out
    setTimeout(() => {
      helloElement.textContent = languages[index];
      helloElement.style.opacity = 1; // Fade in
      index++; // Move to the next word in the array
    }, 200); // Time for fade-out effect
  }
}

// Function to start splash screen animation
function startAnimation() {
  helloElement.textContent = languages[0];
  helloElement.style.opacity = 1; // Show first word immediately

  setTimeout(() => {
    changeWord(); // Start showing the next words
    index = 1;

    const interval = setInterval(() => {
      if (index < languages.length) {
        changeWord();
      } else {
        clearInterval(interval); // Stop cycling through words
        document.getElementById("splash").classList.add("slide-up");
        setTimeout(() => {
          document.getElementById("content").style.opacity = "1"; // Show main content
          document.getElementById("splash").style.display = "none"; // Hide splash screen
        }, 1000); // Match animation duration
      }
    }, 350);
  }, 1000);
}

// Scroll reset on load and session handling
window.onload = () => {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual"; // Prevent browser scroll restoration

  const splashScreen = document.getElementById("splash");
  const content = document.getElementById("content");

  if (localStorage.getItem("skipSplash") === "true") {
    localStorage.removeItem("skipSplash"); // Reset the flag for the next session
    splashScreen.style.display = "none";
    content.style.opacity = "1";

    // Scroll to a saved section if available
    const targetSection = sessionStorage.getItem("scrollToSection");
    if (targetSection) {
      const section = document.querySelector(targetSection);
      if (section) section.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("scrollToSection");
    }
  } else {
    splashScreen.style.display = "flex";
    content.style.opacity = "0";
    startAnimation();
  }
};

// Reset splash screen and reload when logo is clicked
document.querySelector(".navbar-logo a").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  localStorage.removeItem("skipSplash"); // Ensure splash screen shows on reload
  window.location.href = "index.html"; // Navigate to index.html
});

// Select the burger menu and navbar links
const burgerMenu = document.getElementById("burger-menu");
const navbarLinks = document.getElementById("navbar-links");
const navLinks = document.querySelectorAll(".navbar-links a");

// Add a click event listener to the burger menu
burgerMenu.addEventListener("click", () => {
  // Toggle the active class on the navbar links
  navbarLinks.classList.toggle("active");

  // Toggle the open class on the burger menu (for animation)
  burgerMenu.classList.toggle("open");
});

// Close the burger menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarLinks.classList.remove("active");
    burgerMenu.classList.remove("open");
  });
});

// JavaScript to observe sections
document.addEventListener("DOMContentLoaded", () => {
  // Select all <section> elements
  const sections = document.querySelectorAll("section");

  // Set up the IntersectionObserver
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the 'in-view' class when the section is visible
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); // Stop observing the section
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the section is visible
  );

  // Observe each section
  sections.forEach((section) => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", () => {
  const targetSection = sessionStorage.getItem("scrollToSection");
  if (targetSection) {
    const section = document.querySelector(targetSection);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    sessionStorage.removeItem("scrollToSection");
  }
});

document.getElementById("year").innerHTML = new Date().getFullYear();
