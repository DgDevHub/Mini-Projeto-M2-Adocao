function updatePetImage(event) {
    const file = event.target.files[0]; // Pega o primeiro arquivo
    const petImage = document.getElementById('petImage'); // Obtém a imagem

    if (file) {
        const reader = new FileReader(); // Cria um FileReader
        reader.onload = function(e) {
            petImage.src = e.target.result; // Atualiza a src da imagem
        }
        reader.readAsDataURL(file); // Lê o arquivo como URL
    }
}