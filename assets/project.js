// Add event listeners to all header links except the logo
document.querySelectorAll(".navbar-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href.startsWith("index.html#")) {
      const sectionId = href.split("#")[1];
      sessionStorage.setItem("scrollToSection", `#${sectionId}`); // Save target section
    }
    localStorage.setItem("skipSplash", "true"); // Skip splash on navigation
  });
});

// Ensure the splash screen appears if the logo is clicked
document.querySelector(".navbar-logo a").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default behavior
  localStorage.removeItem("skipSplash"); // Reset splash state
  window.location.href = "index.html"; // Navigate to index.html
});

// Function to add 'in-view' class when the element is in the viewport
function observeProjectDetails() {
  const projectDetails = document.querySelectorAll(".project-details");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view"); // Add animation class
          observer.unobserve(entry.target); // Stop observing
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the element is visible
  );

  projectDetails.forEach((detail) => observer.observe(detail));
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", observeProjectDetails);

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
