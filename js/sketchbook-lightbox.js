const sketchLinks = [...document.querySelectorAll(".sketchbook-grid a")];

if (sketchLinks.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "custom-lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Sketchbook image viewer");
  lightbox.innerHTML = `
    <button class="custom-lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
    <button class="custom-lightbox-nav custom-lightbox-prev" type="button" aria-label="Previous image">
      <span aria-hidden="true">&lsaquo;</span>
    </button>
    <figure>
      <img alt="">
      <figcaption></figcaption>
    </figure>
    <button class="custom-lightbox-nav custom-lightbox-next" type="button" aria-label="Next image">
      <span aria-hidden="true">&rsaquo;</span>
    </button>
  `;
  document.body.append(lightbox);

  const image = lightbox.querySelector("img");
  const counter = lightbox.querySelector("figcaption");
  const closeButton = lightbox.querySelector(".custom-lightbox-close");
  const previousButton = lightbox.querySelector(".custom-lightbox-prev");
  const nextButton = lightbox.querySelector(".custom-lightbox-next");
  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + sketchLinks.length) % sketchLinks.length;
    const thumbnail = sketchLinks[currentIndex].querySelector("img");
    image.src = sketchLinks[currentIndex].href;
    image.alt = thumbnail?.alt || `Sketchbook image ${currentIndex + 1}`;
    counter.textContent = `${currentIndex + 1} / ${sketchLinks.length}`;
  };

  const openLightbox = (index) => {
    showImage(index);
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    sketchLinks[currentIndex].focus();
  };

  sketchLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(index);
    });
  });

  previousButton.addEventListener("click", () => showImage(currentIndex - 1));
  nextButton.addEventListener("click", () => showImage(currentIndex + 1));
  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
    if (event.key === "Escape") closeLightbox();
  });
}
