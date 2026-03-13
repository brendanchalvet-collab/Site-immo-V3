const biensGrid = document.getElementById('biens-grid');
let biens = [];
let currentIndex = 0;
const itemsPerSlide = 3;

// Charger le JSON
fetch('biens.json')
    .then(res => res.json())
    .then(data => {
        biens = data;
        displaySlide();
    })
    .catch(err => console.error("Erreur chargement JSON :", err));

// Afficher le slide courant
function displaySlide() {
    biensGrid.innerHTML = "";
    const end = currentIndex + itemsPerSlide;
    const slideItems = biens.slice(currentIndex, end);

    slideItems.forEach((bien, index) => {
        const card = document.createElement('div');
        card.classList.add('bien-card');
        card.onclick = () => {
            window.location.href = `bien.html?index=${currentIndex + index}`;
        };

        card.innerHTML = `
            <img src="${bien.image}" alt="${bien.titre}">
            <div class="bien-info">
                <h4>${bien.titre}</h4>
                <p class="prix">${bien.prix}</p>
                <p>${bien.description}</p>
            </div>
        `;
        biensGrid.appendChild(card);
    });
}

// Flèches
document.querySelector('.next').addEventListener('click', () => {
    if (currentIndex + itemsPerSlide < biens.length) {
        currentIndex += itemsPerSlide;
        displaySlide();
    }
});
document.querySelector('.prev').addEventListener('click', () => {
    if (currentIndex - itemsPerSlide >= 0) {
        currentIndex -= itemsPerSlide;
        displaySlide();
    }
});