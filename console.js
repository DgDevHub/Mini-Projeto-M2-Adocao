function updatePetImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('petImage').src = e.target.result;  // Atualiza a imagem de preview
            document.getElementById('displayPetImage').src = e.target.result;  // Mostra a imagem na área .pet-photo
        };
        reader.readAsDataURL(file);  // Converte a imagem para URL base64
    }
}
class Pet {
    constructor(name, species, age, race, description, image = "default-pet.jpg") {
        this.name = name;
        this.species = species;
        this.age = age;
        this.race = race;
        this.description = description;
        this.image = image;
    }
}

// Array para armazenar os pets
let pets = [];

// Função para registrar um novo pet
function registerPet() {
    // Obter os valores dos campos do formulário
    const name = document.getElementById("petName").value.trim();
    const species = document.getElementById("petSpecies").value.trim();
    const age = document.getElementById("petAge").value.trim();
    const race = document.getElementById("petRace").value.trim();
    const description = document.getElementById("petDescription").value.trim();
}
function EnviarInputs() {
    // Coloque aqui o código que você quer executar ao clicar no botão
    console.log("Botão foi clicado!");
}