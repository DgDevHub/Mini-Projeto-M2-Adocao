let pets = JSON.parse(sessionStorage.getItem("pets")) || [];
let i = localStorage.getItem("i") ? parseInt(localStorage.getItem("i")) : 0;
console.log(pets);
sessionStorage.removeItem("pets");

// Função para exibir detalhes de um pet
function exibirPet(pet) {
    document.getElementById("displayPetImage").src = pet.image || "imgs/Default.jpg";
    document.getElementById("name-pet").innerText = pet.name || "Vazio";
    document.getElementById("species-pet").innerText = pet.species || "Vazio";
    document.getElementById("age-pet").innerText = pet.age || "Vazio";
    document.getElementById("race-pet").innerText = pet.race || "Vazio";
    document.getElementById("description-pet").innerText = pet.description || "Sem descrição";
}

// Função para listar todos os pets
function listarPets() {
    const petListContainer = document.getElementById("pet-list");
    petListContainer.innerHTML = ""; // Limpa o conteúdo anterior

    pets.forEach((pet, index) => {
        // Cria um elemento div para cada pet
        const petDiv = document.createElement("article");
        petDiv.className = "pet-container"; // Adiciona uma classe para estilização
        petDiv.setAttribute("data-index", index);

        // Adiciona o conteúdo do pet
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

        // Adiciona o div do pet ao contêiner
        petListContainer.appendChild(petDiv);
    });
}

// Função para excluir um pet
function excluirPet(index) {
    pets.splice(index, 1); // Remove o pet do array
    sessionStorage.setItem("pets", JSON.stringify(pets)); // Atualiza o sessionStorage
    listarPets(); // Recarrega a lista de pets
}

// Variável para armazenar o índice do pet que está sendo editado
let petEditIndex = null;

// Função para mostrar o formulário de edição com dados do pet selecionado
function editarPet(index) {
    petEditIndex = index;

    // Esconde a lista de pets e mostra o formulário de edição
    document.getElementById("pet-list").style.display = "none";
    document.getElementById("pet-edit").style.display = "block";

    // Preenche o formulário com os dados do pet selecionado
    const pet = pets[index];
    document.getElementById("petImage").src = pet.image || "./public/imgs/Default.jpg";
    document.getElementById("edit-name").value = pet.name || "";
    document.getElementById("edit-species").value = pet.species || "";
    document.getElementById("edit-age").value = pet.age || "";
    document.getElementById("edit-race").value = pet.race || "";
    document.getElementById("edit-description").value = pet.description || "";
}

// Função para salvar as edições
function salvarEdicao() {
    if (petEditIndex !== null) {
        // Atualiza os dados do pet no array pets
        pets[petEditIndex] = {
            ...pets[petEditIndex],
            image: document.getElementById("petImage").src,
            name: document.getElementById("edit-name").value,
            species: document.getElementById("edit-species").value,
            age: document.getElementById("edit-age").value,
            race: document.getElementById("edit-race").value,
            description: document.getElementById("edit-description").value
        };

        // Atualiza o sessionStorage com os dados editados
        sessionStorage.setItem("pets", JSON.stringify(pets));

        // Volta a exibir a lista de pets e esconde o formulário de edição
        document.getElementById("pet-list").style.display = "block";
        document.getElementById("pet-edit").style.display = "none";

        // Limpa o índice de edição e recarrega a lista de pets
        petEditIndex = null;
        listarPets();
    }
}

// Função para atualizar a imagem do pet quando um novo arquivo é selecionado
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

// Exibir todos os pets ao carregar a página
listarPets();
