// script.js
document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendButton = document.querySelector("button");
    let step = 0;
    let userName = "";
    let userPhone = "";

    function appendMessage(text, sender) {
        const message = document.createElement("div");
        message.classList.add("message", sender);
        message.innerText = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showInputField(placeholder, buttonText) {
        userInput.style.display = "block";
        userInput.placeholder = placeholder;
        sendButton.innerText = buttonText;
        sendButton.style.display = "block";
    }

    function formatPhoneNumber(number) {
        number = number.replace(/\D/g, "");
        if (number.length === 11) {
            return `(${number.slice(0,2)}) ${number.slice(2,7)}-${number.slice(7)}`;
        }
        return null;
    }

    function nextStep() {
        const userText = userInput.value.trim();
        if (userText === "") return;

        appendMessage(userText, "user");
        userInput.value = "";

        if (step === 1) {
            userName = userText;
            setTimeout(() => {
                appendMessage(`${userName}, digite seu número de telefone WhatsApp com DDD 👇`, "bot");
                showInputField("", "ENVIAR");
                step++;
            }, 1000);
        } else if (step === 2) {
            const formattedNumber = formatPhoneNumber(userText);
            if (!formattedNumber) {
                appendMessage("Número inválido. Digite um número válido!", "bot");
                return;
            }
            userPhone = formattedNumber;
            setTimeout(() => {
                appendMessage(`Só para confirmar. Esse número ${userPhone}, está correto?`, "bot");
                chatBox.innerHTML += '<div class="message bot"><button onclick="confirmPhone(true)">Sim</button> <button onclick="confirmPhone(false)">Digitei errado</button></div>';
                userInput.style.display = "none";
                sendButton.style.display = "none";
            }, 1000);
            step++;
        } else if (step === 4) {
            setTimeout(() => {
                appendMessage("Cadastro Realizado\nAguarde que logo entraremos em contato.", "bot");
            }, 1000);
        }
    }

    window.confirmPhone = function (correct) {
        if (correct) {
            appendMessage("Sim", "user");
            setTimeout(() => {
                appendMessage("Qual seu melhor e-mail?", "bot");
                showInputField("Seu melhor e-mail", "ENVIAR");
                step++;
            }, 1000);
        } else {
            appendMessage("Digitei errado", "user");
            setTimeout(() => {
                appendMessage("Digite novamente o numero", "bot");
                showInputField("", "ENVIAR");
                step = 2;
            }, 1000);
        }
    };

    document.getElementById("userInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            nextStep();
        }
    });

    sendButton.addEventListener("click", nextStep);

    // Iniciar conversa automaticamente
    setTimeout(() => {
        appendMessage("👋 Olá! Quer solicitar uma simulação de crédito de forma rápida? Preencha o formulário abaixo e receba sua simulação personalizada! 🔽", "bot");
        chatBox.innerHTML += '<div class="message bot"><button onclick="startChat()">INICIAR</button></div>';
    }, 1000);    

    window.startChat = function () {
        document.querySelector("button").remove();
        appendMessage("INICIAR", "user");
        setTimeout(() => {
            appendMessage("Perfeito!! Digite seu nome e sobrenome? 👇", "bot");
            showInputField("Nome e Sobrenome", "ENVIAR");
            step = 1;
        }, 1000);
    };
});