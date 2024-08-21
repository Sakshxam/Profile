document.addEventListener("DOMContentLoaded", () => {
 const pages = document.querySelectorAll(".page");
 const navLinks = document.querySelectorAll(".nav-link");
 const darkModeToggle = document.querySelector(".dark-mode-toggle");
 const themeIcon = document.getElementById("theme-icon");
 const body = document.body;
 const hamburgerIcon = document.querySelector(".hamburger-icon");
 const navigation = document.getElementById("navigation");
 const navigationPopup = document.getElementById("navigation-popup");
 const closePopupButton = document.getElementById("close-popup");
 const newsletterForm = document.getElementById("newsletter-form");
 let currentIndex = 0;
 let darkMode = false;

 function changePage(index) {
 if (index < 0 || index >= pages.length) return;
 pages[currentIndex].classList.remove("active");
 currentIndex = index;
 pages[currentIndex].classList.add("active");
 if (!localStorage.getItem('popupClosed')) {
 showPopup();
 }
 }

 function showPopup() {
 navigationPopup.style.display = "block";
 }

 function handleFormSubmit(event) {
 event.preventDefault(); 
 const formData = new FormData(newsletterForm);
 fetch(newsletterForm.action, {
 method: 'POST',
 body: formData,
 headers: {
 'Accept': 'application/json'
 }
 })
 .then(response => {
 if (response.ok) {
 alert('Thank you for subscribing!');
 newsletterForm.reset();
 } else {
 alert('Oops! Something went wrong. Please try again.');
 }
 })
 .catch(error => {
 console.error('Error:', error);
 alert('Oops! Something went wrong. Please try again.');
 });
 }

 function updateTitleOnExit() {
 document.title = "Come Back";
 }

 document.addEventListener("click", (event) => {
 if (!navigation.contains(event.target) && !hamburgerIcon.contains(event.target)) {
 if (navigation.classList.contains("open")) {
 navigation.classList.remove("open");
 hamburgerIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
 hamburgerIcon.classList.add("rotate");
 setTimeout(() => {
 hamburgerIcon.classList.remove("rotate");
 }, 500); 
 }
 }
 });

 document.addEventListener("keydown", (event) => {
 switch (event.key) {
 case "ArrowDown":
 case "s":
 changePage(currentIndex + 1);
 break;
 case "ArrowUp":
 case "w":
 changePage(currentIndex - 1);
 break;
 }
 });

 darkModeToggle.addEventListener("click", () => {
 darkMode = !darkMode;
 body.classList.toggle("dark-mode", darkMode);
 themeIcon.className = darkMode ? "fas fa-sun" : "fas fa-moon";
 darkModeToggle.classList.toggle("rotate");
 });

 navLinks.forEach((link, index) => {
 link.addEventListener("click", () => changePage(index));
 });

 hamburgerIcon.addEventListener("click", () => {
 navigation.classList.toggle("open");
 const isOpen = navigation.classList.contains("open");
 hamburgerIcon.innerHTML = `<i class="${isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}"></i>`;
 hamburgerIcon.classList.add("rotate");
 setTimeout(() => {
 hamburgerIcon.classList.remove("rotate");
 }, 500); 
 });

 if (!localStorage.getItem('popupClosed')) {
 showPopup();
 }

 newsletterForm.addEventListener("submit", handleFormSubmit);
 closePopupButton.addEventListener("click", () => {
 navigationPopup.style.display = "none";
 localStorage.setItem('popupClosed', 'true');
 });

 window.addEventListener("beforeunload", updateTitleOnExit);
});
