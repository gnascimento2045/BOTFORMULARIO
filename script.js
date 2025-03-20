const SUPABASE_URL = "https://jpxthqrntaqczftqaofs.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpweHRocXJudGFxY3pmdHFhb2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTU4MTcsImV4cCI6MjA1NzU3MTgxN30._CWzAU5HTVSe98BJa95fQG96qOwd5iodnSSAYxfn0QU";

// Variáveis globais para armazenar os dados
let userName = '';
let userPhone = '';

// Função para exibir uma mensagem do bot
function displayMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Rola para o final da conversa
}

// Função para iniciar a conversa automaticamente assim que a página carrega
function startConversation() {
    displayMessage("👋Seja Bem Vindo! \n 😊 Vi que você deseja uma simulação de crédito. \n Preencha o formulário e nossos consultores entrarão em contato com você em breve! 🚀🔽", "bot");
    setTimeout(() => {
        showStartButton();
    }, 500);
   
}




// Exibe o botão para o usuário iniciar a conversa
function showStartButton() {
    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = `<buttonnew onclick="showNameForm()">INICIAR CONVERSA</buttonnew>`;
}

// Exibe o formulário para coletar o nome
function showNameForm() {
    displayMessage("Perfeito!! Digite seu nome e sobrenome? 👇", "bot");

    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = `<input type="text" id="name" placeholder="Digite seu nome e sobrenome" required>`;
    inputContainer.innerHTML += `<button onclick="saveName()">Próximo</button>`;

    // Adiciona evento para enviar a mensagem ao pressionar ENTER
    const nameInput = document.getElementById("name");
    nameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            saveName();
        }
    });
}

// Salva o nome inserido pelo usuário e exibe a próxima pergunta
function saveName() {
    const nameInput = document.getElementById("name").value;
    if (!nameInput) {
        alert("Por favor, digite seu nome.");
        return;
    }

    userName = nameInput;  // Armazena o nome na variável global
    displayMessage(userName, "user");  // Exibe a resposta do usuário à direita
    displayMessage(`Certo ${userName}, Poderia me informar seu número de telefone WhatsApp com DDD 👇`, "bot");

    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = `<input type="text" id="phone" placeholder="Ex: (11) 98765-4321" required>`;
    inputContainer.innerHTML += `<button onclick="savePhone()">Próximo</button>`;

    // Adiciona evento para enviar a mensagem ao pressionar ENTER
    const phoneInput = document.getElementById("phone");
    phoneInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            savePhone();
        }
    });
}

// Salva o telefone inserido pelo usuário e envia os dados
function savePhone() {
    const phoneInput = document.getElementById("phone").value;
    if (!phoneInput) {
        alert("Por favor, digite seu número de telefone.");
        return;
    }

    userPhone = phoneInput;  // Armazena o telefone na variável global
    displayMessage(userPhone, "user");  // Exibe a resposta do usuário à direita
    displayMessage(`✅ Cadastro Realizado! Aguarde que logo entraremos em contato.`, "bot");

    // Desabilita o formulário e o botão para impedir novos envios
    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = "";  // Remove o formulário e o botão

    // Agora você pode enviar os dados para a API
    submitData();
}

// Envia os dados para o Supabase
function submitData() {
    const payload = {
        nome: userName,
        telefone: userPhone
    };

    const headers = {
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`
    };

    fetch(`${SUPABASE_URL}/rest/v1/FormCliente`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            // Caso necessário, você pode adicionar mais lógica aqui para verificar o sucesso do envio
        } else {
            alert("Erro ao realizar cadastro. Tente novamente.");
        }
    })
    .catch(error => {
        console.error("Erro na solicitação:", error);
        alert("Erro na comunicação com o servidor. Tente novamente.");
    });
}

// Inicia a conversa assim que a página for carregada
window.onload = startConversation;
