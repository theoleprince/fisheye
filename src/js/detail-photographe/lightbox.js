export function lightboxForm() {
    const divlightbox = document.createElement("div");
    divlightbox.innerHTML = `<!-- Lightbox -->
    <div class="lightbox" tabindex='0' role="Lightbox" aria-label="contenu de la light-box">
  <div class="lightbox-content">
    <button tabindex='0' class="lightbox-close" aria-label="Fermer la lightbox">&times;</button>
    <div tabindex='0' class="lightbox-media"></div>
    <button tabindex='0' aria-label="bouton precedent" class="lightbox-prev">&lt;</button>
    <button tabindex='0' aria-label="bouton suivant" class="lightbox-next">&gt;</button>
  </div>
</div>`
    return divlightbox
}
export function lightbox(media) {
    let currentMediaIndex = 0;
    // Find all media items
    let mediaItems = document.querySelectorAll(".media--photo");

    // Create an array of media indexes for easy navigation
    let mediaIndex = [];
    mediaItems.forEach((item, i) => {
        mediaIndex.push(i);
    });

    // Add click event listener to media items
    mediaItems.forEach((item, i) => {
        item.addEventListener("click", (event) => {
            openLightbox(i);
        });
    });

    // Add click event listeners to navigation buttons
    document.querySelector(".lightbox-prev").addEventListener("click", () => {
        prevMedia();
    });

    document.querySelector(".lightbox-next").addEventListener("click", (event) => {
        console.log(event)
        nextMedia();
    });


    document.onkeydown = function (event) {
        console.log(event)
        // Fleche gauche
        if (event.key == 'ArrowLeft') {
            prevMedia();
        }
        // Fleche droite
        else if (event.key == 'ArrowRight') {
            nextMedia();
        }
    }
    // Function to open the lightbox and show the selected media
    function openLightbox(index) {
        // Set current index
        const type = mediaItems[index].getAttribute("data-media-type");
        currentMediaIndex = index;

        // Get the selected media item
        const currentMedia = media[index];
        
        // Create a media element depending on the type of media
        let mediaElement;
        if (type == 'img') {
            console.log(currentMedia)
            mediaElement = document.createElement("img");
            mediaElement.src = currentMedia.image;
            mediaElement.setAttribute('alt', currentMedia.title);
            mediaElement.setAttribute('aria-label', currentMedia.title);
            mediaElement.setAttribute('tabindex', '0');
        } else if (type == 'video') {
            mediaElement = document.createElement("video");
            mediaElement.src = currentMedia.video;
            mediaElement.autoplay = true;
            mediaElement.setAttribute('aria-label', currentMedia.title);
            mediaElement.innerText = currentMedia.title;
            mediaElement.setAttribute('tabindex', '0');
            // mediaElement.controls = true;
        }

        // Add media element to lightbox
        const lightboxMedia = document.querySelector(".lightbox-media");
        lightboxMedia.innerHTML = "";
        lightboxMedia.setAttribute('aria-label', 'liker l\'image');
        lightboxMedia.setAttribute('tabindex', '0');
        lightboxMedia.appendChild(mediaElement);

        // Show lightbox
        document.querySelector(".lightbox").style.display = "block";
    }

    // Function to navigate to the previous media
    function prevMedia() {
        if (currentMediaIndex === 0) {
            currentMediaIndex = mediaIndex.length - 1;
        } else {
            currentMediaIndex--;
            console.log(currentMediaIndex)
        }

        openLightbox(mediaIndex[currentMediaIndex]);
    }

    // Function to navigate to the next media
    function nextMedia() {
        if (currentMediaIndex === mediaIndex.length - 1) {
            currentMediaIndex = 0;
        } else {
            currentMediaIndex++;
            console.log(currentMediaIndex)
        }

        openLightbox(mediaIndex[currentMediaIndex]);
    }


    document.onkeydown = function (event) {
        // Touche 'entrer'
        console.log(event)
        // if (event.keyCode == 9) {
        //     document.querySelector(".lightbox").style.display = "none";
        // }
        if (event.keyCode == 27) {
            document.querySelector(".lightbox").style.display = "none";
        }
    }

    // Function to close the lightbox
    document.querySelector(".lightbox-close").addEventListener("click", () => {
        document.querySelector(".lightbox").style.display = "none";
    });
}
