const form = document.querySelector("form");
const successMessage = document.querySelector("#success-message");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const subject = document.querySelector("#subject").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!/^[A-Za-z ]{3,50}$/.test(name)) {
    alert("Please enter a valid name using only letters and spaces.");
    return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
    }

    if (phone !== "" && !/^[6-9][0-9]{9}$/.test(phone)) {
    alert("Please enter a valid 10-digit Indian phone number.");
    return;
    }

    if (subject.length < 3) {
        alert("Please enter a subject.");
        return;
    }

    if (message.length < 10) {
        alert("Message should contain at least 10 characters.");
        return;
    }

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message
            })
        });

        const data = await response.json();

        if (data.success) {
            successMessage.style.display = "block";
            form.reset();
        }
    } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
    }
});
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});


/* SCROLL ANIMATION */

const animatedElements = document.querySelectorAll(
    ".about-card, .event-card, .gallery-item, .info-card, .why-card"
);

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

animatedElements.forEach(function(element) {
    observer.observe(element);
});
/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function() {
    let currentSection = "";

    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(function(link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});
/* BACK TO TOP */

const backToTop = document.querySelector("#backToTop");

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});