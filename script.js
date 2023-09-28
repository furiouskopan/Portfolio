const container = document.querySelector('.container.main');
const sections = document.querySelectorAll('section');
const navbarLinks = document.querySelectorAll('nav a');
const circles = document.querySelectorAll('.circle');

function updateActiveLink() {
    const scrollPosition = container.scrollTop;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${id}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLink.classList.add('active');
            circles[index].classList.add('active');
        } else {
            navLink.classList.remove('active');
            circles[index].classList.remove('active');
        }
    });
}
updateActiveLink();

container.addEventListener('scroll', updateActiveLink);

navbarLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, targetId);
            updateActiveLink();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const projectImages = document.querySelectorAll(".project-panel img");
    const fullscreenOverlay = document.getElementById("fullscreenOverlay");
    const fullscreenImage = document.getElementById("fullscreenImage");
    const closeFullscreen = document.getElementById("closeFullscreen");
    const carousels = document.querySelectorAll('.project-carousel');

    let currentProjectImages = [];
    let currentImageIndex = 0;
    
    carousels.forEach(carousel => {
        const nextButton = carousel.querySelector('.carousel-next');
        const prevButton = carousel.querySelector('.carousel-prev');
        const images = carousel.querySelectorAll('.project-image');
        
        images[currentImageIndex].classList.add('active');
        
        nextButton.addEventListener('click', function() {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].classList.add('active');
        });
        
        prevButton.addEventListener('click', function() {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            images[currentImageIndex].classList.add('active');
        });
    });

    function setFullscreenImage() {
        console.log('Setting fullscreen image to:', currentProjectImages[currentImageIndex].src);
        fullscreenImage.src = currentProjectImages[currentImageIndex].src;
        fullscreenImage.alt = currentProjectImages[currentImageIndex].alt;
    }
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            console.log("Image clicked");
            currentProjectImages = Array.from(img.parentElement.querySelectorAll('img'));
            currentImageIndex = currentProjectImages.indexOf(img);
            setFullscreenImage();
            fullscreenOverlay.style.display = "block";
        });
    });

    fullscreenOverlay.querySelector('.carousel-next').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        setFullscreenImage();
    });

    fullscreenOverlay.querySelector('.carousel-prev').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        setFullscreenImage();
    });

    closeFullscreen.addEventListener('click', function() {
        fullscreenOverlay.style.display = "none";
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            fullscreenOverlay.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const homeH1Elements = document.querySelectorAll(".home h1");
    const homeWires = document.querySelectorAll(".home .wire");
    const h1Borders = document.querySelectorAll(".home .h1-1");
    const aboutWires = document.querySelectorAll(".about .wire");
    const aboutDiv = document.querySelector(".about-div");
    const projectPanels = document.querySelectorAll(".projects .project-panel");
    const projectWires = document.querySelectorAll(".projects .wire");
    const profilePicture = document.querySelector(".profile-picture");

    function activateHomeWiresAndBorders() {
        homeWires.forEach(wire => {
            wire.style.backgroundColor = "chartreuse";
            wire.style.boxShadow = "0 0 15px chartreuse";
        });
        h1Borders.forEach(border => {
            border.style.boxShadow = "0 0 15px chartreuse";
        });
        profilePicture.style.boxShadow = "0 0 15px white, 0 0 20px chartreuse, 0 0 40px chartreuse, 0 0 90px chartreuse";
    }

    function deactivateHomeWiresAndBorders() {
        homeWires.forEach(wire => {
            wire.style.backgroundColor = "";
            wire.style.boxShadow = "";
        });
        h1Borders.forEach(border => {
            border.style.boxShadow = "";
        });
        profilePicture.style.boxShadow = "0 0 15px white";
    }

    function activateAboutWiresAndDiv() {
        aboutWires.forEach(wire => {
            wire.style.backgroundColor = "chartreuse";
            wire.style.boxShadow = "0 0 15px chartreuse";
        });
        aboutDiv.classList.add('active'); // Add the 'active' class
    }

    function deactivateAboutWiresAndDiv() {
        aboutWires.forEach(wire => {
            wire.style.backgroundColor = "";
            wire.style.boxShadow = "";
        });
        aboutDiv.classList.remove('active'); // Remove the 'active' class
    }
    function activateProjectWires() {
        projectWires.forEach(wire => {
            wire.style.backgroundColor = "chartreuse";
            wire.style.boxShadow = "0 0 15px chartreuse";
        });
    }

    function deactivateProjectWires() {
        projectWires.forEach(wire => {
            wire.style.backgroundColor = "";
            wire.style.boxShadow = "";
        });
    }

    // Attach event listeners for project panels
    projectPanels.forEach(panel => {
        panel.addEventListener("mouseover", activateProjectWires);
        panel.addEventListener("mouseout", deactivateProjectWires);
    });

    // Attach event listeners for project wires
    projectWires.forEach(wire => {
        wire.addEventListener("mouseover", activateProjectWires);
        wire.addEventListener("mouseout", deactivateProjectWires);
    });

    homeH1Elements.forEach(h1 => {
        h1.addEventListener("mouseover", activateHomeWiresAndBorders);
        h1.addEventListener("mouseout", deactivateHomeWiresAndBorders);
    });

    homeWires.forEach(wire => {
        wire.addEventListener("mouseover", activateHomeWiresAndBorders);
        wire.addEventListener("mouseout", deactivateHomeWiresAndBorders);
    });

    aboutWires.forEach(wire => {
        wire.addEventListener("mouseover", activateAboutWiresAndDiv);
        wire.addEventListener("mouseout", deactivateAboutWiresAndDiv);
    });

    aboutDiv.addEventListener("mouseover", activateAboutWiresAndDiv);
    aboutDiv.addEventListener("mouseout", deactivateAboutWiresAndDiv);
    
    profilePicture.addEventListener("mouseenter", activateHomeWiresAndBorders);
    profilePicture.addEventListener("mouseleave", deactivateHomeWiresAndBorders);
});

// Modal
// Get modal element
var modal = document.getElementById('contactModal');

// Get link that opens the modal
var link = document.getElementById("contactLink");

// Get the close button
var closeBtn = document.querySelector(".close-btn");

// Listen for open click
link.addEventListener('click', openModal);

// Listen for close click
closeBtn.addEventListener('click', closeModal);

// Listen for outside click
window.addEventListener('click', outsideClick);

// Function to open modal
function openModal() {
    modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
}

// Function to close modal if outside click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}



// document.getElementById("toggleButton").addEventListener("click", function() {
//     // Get all elements with the class 'wire'
//     var wires = document.querySelectorAll(".wire");

//     // Toggle the 'hidden' class for each wire
//     wires.forEach(function(wire) {
//         if (wire.classList.contains("hidden")) {
//             wire.classList.remove("hidden");
//         } else {
//             wire.classList.add("hidden");
//         }
//     });
// });

