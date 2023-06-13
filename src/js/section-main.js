export function baliseMain() {
        // creation du main
        const mainElt = document.createElement("main");
        mainElt.setAttribute('class', 'main');
        mainElt.setAttribute('role', 'contenu principal');
        mainElt.setAttribute('aria-label', 'contenu principal');

        return mainElt;
}