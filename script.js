let weakPasswords = [];
let tips = [];
let weakPasswordMessages = [];

// Загрузка данных из JSON
async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    weakPasswords = data.weakPasswords;
    tips = data.tips;
    weakPasswordMessages = data.weakPasswordMessages;
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    // Резервные значения
    weakPasswords = ["123456", "password", "qwerty"];
    tips = ["Проверь свой пароль!", "Это просто пример..."];
  }
}

// Вызов функции при загрузке страницы
window.addEventListener('DOMContentLoaded', loadData);

function checkPassword() {
    const input = document.getElementById("password");
    const password = input.value.trim();
    const result = document.getElementById("result");
    const message = document.getElementById("message");
    const progressBar = document.getElementById("progress-bar");
    const levelText = document.getElementById("level-text");
    const tip = document.getElementById("tip");
  

  
    if (weakPasswords.includes(password.toLowerCase())) {
      message.textContent = weakPasswordMessages[Math.floor(Math.random() * weakPasswordMessages.length)];
      progressBar.style.width = "0%";
      progressBar.style.backgroundColor = "red";
      levelText.textContent = "0/5";
    } else {
      let score = 0;
  
      if (/[a-z]/.test(password)) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^a-zA-Z0-9]/.test(password)) score++;
  
      // Проверка на повторяющиеся символы
      let hasRepeats = /(\w)\1{2,}/gi.test(password);
      if (hasRepeats) {
        score = Math.max(score - 1, 0);
      }
  
      const strength = Math.min(score + Math.floor(password.length / 4), 5);
      const percent = strength * 20;
  
      progressBar.style.width = percent + "%";
  
      if (strength <= 2) {
        progressBar.style.backgroundColor = "#ff4d4d"; // красный
        message.textContent = "Надо подумать ещё...";
        levelText.textContent = `${strength}/5`;
      } else if (strength === 3) {
        progressBar.style.backgroundColor = "#ffa500"; // оранжевый
        message.textContent = "Хорошо, но можно лучше!";
        levelText.textContent = `${strength}/5`;
      } else if (strength === 4) {
        progressBar.style.backgroundColor = "#e5fb00"; // оранжевый
        message.textContent = "Отлично, но можно лучше!";
        levelText.textContent = `${strength}/5`;
      } else {
        progressBar.style.backgroundColor = "#90ee90"; // зелёный
        message.textContent = "Может, ты хакер?";
        levelText.textContent = `${strength}/5`;
      }
    }
  
    tip.textContent = "💡 Совет: " + tips[Math.floor(Math.random() * tips.length)];
  
    result.classList.remove("hidden");
  }
  
  function showGeneratorScreen() {
    const mainScreen = document.getElementById("main-screen");
    const generatorScreen = document.getElementById("generator-screen");
  
    mainScreen.classList.add("main-exit", "main-exit-active");
  
    setTimeout(() => {
      mainScreen.classList.add("hidden");
      mainScreen.classList.remove("main-exit", "main-exit-active");
  
      generatorScreen.classList.remove("hidden");
      generatorScreen.classList.add("generator-enter");
  
      setTimeout(() => {
        generatorScreen.classList.remove("generator-enter");
        generatorScreen.classList.add("generator-enter-active");
      }, 10);
    }, 300);
  }
  
  function backToMain() {
    const mainScreen = document.getElementById("main-screen");
    const generatorScreen = document.getElementById("generator-screen");
  
    generatorScreen.classList.add("generator-exit", "generator-exit-active");
  
    setTimeout(() => {
      generatorScreen.classList.add("hidden");
      generatorScreen.classList.remove("generator-exit", "generator-exit-active");
  
      mainScreen.classList.remove("hidden");
      mainScreen.classList.add("main-enter");
  
      setTimeout(() => {
        mainScreen.classList.remove("main-enter");
        mainScreen.classList.add("main-enter-active");
      }, 10);
    }, 300);
  }
  
  function generatePassword() {
    const length = parseInt(document.getElementById("length").value) || 12;
    const letters = document.getElementById("letters").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;
  
    let chars = "";
    if (letters) chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*";
  
    if (chars === "") {
      alert("Выбери хотя бы один тип символов!");
      return;
    }
  
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    document.getElementById("generated-password").textContent = "Сгенерированный пароль:\n" + pass;
  }
  
  function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains("dark-theme");
    const themeToggle = document.getElementById("theme-toggle");
  
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");
  
    themeToggle.textContent = isDark ? "🌙" : "☀️";
  }

  function copyPassword() {
    const passwordElement = document.getElementById("generated-password");
    const passwordText = passwordElement.textContent.replace("Сгенерированный пароль: ", "").trim();
  
    if (!passwordText) {
      alert("Нет пароля для копирования!");
      return;
    }
  
    navigator.clipboard.writeText(passwordText)
      .then(() => {
        alert("✅ Пароль скопирован в буфер обмена");
      })
      .catch(err => {
        alert("❌ Не удалось скопировать пароль: " + err);
      });
  }