let pets = JSON.parse(sessionStorage.getItem("pets")) || [];
let i = localStorage.getItem("i") ? parseInt(localStorage.getItem("i")) : 0;

function exibirPet(pet) {
    document.getElementById("displayPetImage").src = pet.image || "imgs/Default.jpg";
    document.getElementById("name-pet").innerText = pet.name || "Vazio";
    document.getElementById("species-pet").innerText = pet.species || "Vazio";
    document.getElementById("age-pet").innerText = pet.age || "Vazio";
    document.getElementById("race-pet").innerText = pet.race || "Vazio";
    document.getElementById("description-pet").innerText = pet.description || "Sem descrição";
}

function listarPets() {
    const petListContainer = document.getElementById("pet-list");
    petListContainer.innerHTML = "";

    pets.forEach((pet, index) => {
        const petDiv = document.createElement("article");
        petDiv.className = "pet-container";
        petDiv.setAttribute("data-index", index);

        petDiv.innerHTML = `
            <div class="pet-photo">
                <img src="${pet.image || "../public/imgs/Default.jpg"}" alt="Imagem do pet ${pet.name}">
            </div>
            <div id="pet-info">
                <div id="name-pet"> ${pet.name || "Vazio"} </div>
                <div id="name"> <p>Nome</p></div>
                <div id="species-pet"> ${pet.species || "Vazio"} </div>
                <div id="species">Espécie</div>
                <div id="age-pet"> ${pet.age || "Vazio"} </div> 
                <div id="age">Idade</div> 
                <div id="race-pet"> ${pet.race || "Vazio"} </div>
                <div id="race">Raça</div>
                <div id="description-pet"> ${pet.description || "Sem descrição"} </div>
                <div id="description"> 
                    <p> Descrição </p>
                </div>
                <div id="buttons-pet">
                <button onclick="editarPet(${index})">Editar</button>
                <button onclick="excluirPet(${index})">Excluir</button>
                </div>
            </div>
        `;
        petListContainer.appendChild(petDiv);
    });
}

function excluirPet(index) {
    pets.splice(index, 1);
    sessionStorage.setItem("pets", JSON.stringify(pets));
    listarPets();
}

let petEditIndex = null;

function editarPet(index) {
    petEditIndex = index;
    document.getElementById("pet-list").style.display = "none";
    document.getElementById("pet-edit").style.display = "block";
    const pet = pets[index];
    document.getElementById("petImage").src = pet.image || "./public/imgs/Default.jpg";
    document.getElementById("edit-name").value = pet.name || "";
    document.getElementById("edit-species").value = pet.species || "";
    document.getElementById("edit-age").value = pet.age || "";
    document.getElementById("edit-race").value = pet.race || "";
    document.getElementById("edit-description").value = pet.description || "";
}

function salvarEdicao() {
    if (petEditIndex !== null) {
        pets[petEditIndex] = {
            ...pets[petEditIndex],
            image: document.getElementById("petImage").src,
            name: document.getElementById("edit-name").value,
            species: document.getElementById("edit-species").value,
            age: document.getElementById("edit-age").value,
            race: document.getElementById("edit-race").value,
            description: document.getElementById("edit-description").value
        };
        sessionStorage.setItem("pets", JSON.stringify(pets));
        document.getElementById("pet-list").style.display = "block";
        document.getElementById("pet-edit").style.display = "none";
        petEditIndex = null;
        listarPets();
    }
}

function updatePetImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("petImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

listarPets();
