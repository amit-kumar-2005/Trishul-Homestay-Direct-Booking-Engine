/* =====================================
   STICKY HEADER
===================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/* =====================================
   MOBILE MENU
===================================== */

const hamburger =
    document.querySelector(".hamburger");

const navLinks =
    document.querySelector(".nav-links");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

/* =====================================
   CLOSE MENU ON LINK CLICK
===================================== */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

/* =====================================
   SCROLL ANIMATION
===================================== */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);

document
    .querySelectorAll(
        ".trust-card, .room-card, .benefit-card, .testimonial-card"
    )
    .forEach(card => {

        card.classList.add("fade-up");

        observer.observe(card);

    });

/* =====================================
   CURRENT YEAR AUTO UPDATE
===================================== */

const yearElement =
    document.getElementById("current-year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}