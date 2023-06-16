export function creationDuFormulaireDeContact(photographer) {
    const contact = document.createElement("div");
    contact.innerHTML = `<div id="contactModal" aria-label='modal du contact' role='modal contact' class="modal">
    <div tabindex='0' class="modal-content" aria-label='formulaire de contact'>
      <span role='fermer' tabindex='0' class="close" aria-label='fermer'>&times;</span>
      <h2 tabindex='0'>Contactez-moi <br> ${photographer.name}</h2>
      <form id="contactForm">
        <label tabindex='0' for="Prenom">Prénom</label><br>
        <input tabindex='0' aria-label='Entrez votre prenom' type="text" name="Prenom" id="Prenom" required><br><br>
        <label tabindex='0' for="name">Nom</label><br>
        <input tabindex='0' aria-label='Entrez votre nom' type="text" name="name" id="name" required><br><br>
        <label tabindex='0' for="email">Email</label><br>
        <input tabindex='0' aria-label='Entrez votre email' type="email" name="email" id="email" required><br><br>
        <label tabindex='0' for="message">Votre message</label><br>
        <textarea tabindex='0' aria-label='Entrez votre message' name="message" id="message" required></textarea><br><br>
        <button tabindex='0' type="submit" aria-label='envoyer'>Envoyer</button>
      </form>
    </div>
  </div>`

    return contact;

}

export function contact() {
    // Récupérer le bouton pour ouvrir le modal
    var btnOpenModal = document.getElementById("btnOpenModal");

    // Récupérer le modal
    var modalContact = document.querySelector("#contactModal");
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector("#contactModal").style.display = "none";
    });

    // Lorsque l'utilisateur clique sur le bouton pour ouvrir le modal, afficher le modal
    btnOpenModal.onclick = function () {
        modalContact.style.display = "block";
    }

    // Envoyer les données du formulaire lorsque l'utilisateur clique sur le bouton de soumission
    var form = document.getElementById("contactForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });

    // quitter la modal esc
    modalContact.onkeydown = function (event) {
        console.log(event)
        if (event.keyCode == 27) {
            modalContact.style.display = "none";
        }
    }

    window.addEventListener("click", function (event) {
        if (event.target == modalContact) {
            modalContact.style.display = "none";
        }
    });
}