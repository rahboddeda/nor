document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("image-container");

  try {
    const res = await fetch("/images");
    const images = await res.json();

    images.forEach(image => {
      const card = document.createElement("div");
      card.classList.add("image-card", "fade-in");

      const img = document.createElement("img");
      img.src = `images/${image}`;
      img.alt = "Room Image";
      img.classList.add("card-image");
      img.addEventListener("click", () => openLightbox(img.src));

      card.appendChild(img);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load images:", error);
  }

  // Scroll animation
  // const observer = new IntersectionObserver(entries => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       entry.target.classList.add("visible");
  //       observer.unobserve(entry.target);
  //     }
  //   });
  // }, { threshold: 0.1 });

  // document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
});

function openLightbox(src) {
  // If lightbox already exists, remove it first
  const oldLightbox = document.getElementById("lightbox");
  if (oldLightbox) oldLightbox.remove();

  // Create new lightbox
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.className = "lightbox";

  // Inner content
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="close-btn">&times;</button>
      <img src="${src}" alt="Enlarged Image" />
    </div>
  `;

  document.body.appendChild(lightbox);
  lightbox.classList.add("visible");

  // Close on X button
  lightbox.querySelector(".close-btn").addEventListener("click", () => {
    closeLightbox();
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    const content = lightbox.querySelector(".lightbox-content");
    if (!content.contains(e.target)) {
      closeLightbox();
    }
  });
}

// Close lightbox function
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("visible");
    setTimeout(() => lightbox.remove(), 200);
  }
}


