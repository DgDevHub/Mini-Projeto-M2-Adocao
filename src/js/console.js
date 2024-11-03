function updatePetImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const petImage = document.getElementById('petImage');
            if (petImage) {
                petImage.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
}
// Array para armazenar os pets
let pets = JSON.parse(sessionStorage.getItem("pets")) || [];
let i = localStorage.getItem("i") ? parseInt(localStorage.getItem("i")) : 0;

class Pet {
    constructor(name, species, age, race, description, image = "../public/imgs/Default.jpg") {
        this.name = name;
        this.species = species;
        this.age = age;
        this.race = race;
        this.description = description;
        this.image = image;
    }
}

// Função para registrar um novo pet
function RegistrarPet() {
    const name = document.getElementById("input-name").value.trim();
    const species = document.getElementById("input-species").value.trim();
    const age = document.getElementById("input-age").value.trim();
    const race = document.getElementById("input-race").value.trim();
    const description = document.getElementById("input-description").value.trim();
    const petImageSrc = document.getElementById("petImage").src;

    const newPet = new Pet(name, species, age, race, description, petImageSrc);
    pets.push(newPet);
    sessionStorage.setItem("pets", JSON.stringify(pets));

    // Atualiza o índice
    i++;
    localStorage.setItem("i", i);
    localStorage.removeItem("i");
    console.log(i)

    // Limpa os campos
    document.getElementById("input-name").value = '';
    document.getElementById("input-species").value = '';
    document.getElementById("input-age").value = '';
    document.getElementById("input-race").value = '';
    document.getElementById("input-description").value = '';
    document.getElementById('petImage').src = '../public/imgs/Default.jpg';
}
