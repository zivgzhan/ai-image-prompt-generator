// Get the page elements that JavaScript needs to control.
const ideaInput = document.getElementById("idea-input");
const generateButton = document.getElementById("generate-button");
const results = document.getElementById("results");
const suggestionBar = document.getElementById("language-suggestion");

// The generated prompts stay in English because most image tools handle English prompts well.
const promptTemplates = [
  "A cinematic image of {idea}, dramatic natural lighting, rich details, balanced composition, ultra realistic.",
  "A dreamy digital painting of {idea}, soft colors, gentle atmosphere, elegant brushwork, high detail.",
  "A futuristic concept art scene showing {idea}, bold shapes, glowing accents, sharp focus, wide angle view.",
  "A minimalist editorial photo of {idea}, clean background, refined styling, subtle shadows, professional composition.",
  "A fantasy illustration of {idea}, magical mood, intricate textures, atmospheric lighting, highly detailed."
];

const languagePaths = {
  en: "/en/",
  zh: "/zh/",
  es: "/es/",
  ja: "/ja/"
};

const languageNames = {
  en: "English",
  zh: "中文",
  es: "Español",
  ja: "日本語"
};

const messages = {
  en: {
    empty: "Please enter an image idea first.",
    tooShort: "Please enter a more specific description with at least 3 characters.",
    promptLabel: "Prompt",
    browserLanguage: "Your browser language looks like {language}. Switch to {language}?",
    switchButton: "Switch",
    dismissButton: "Dismiss"
  },
  zh: {
    empty: "请先输入一个图片想法。",
    tooShort: "请输入更具体的描述，至少 3 个字符。",
    promptLabel: "提示词",
    browserLanguage: "检测到你的浏览器语言是{language}，是否切换到{language}页面？",
    switchButton: "切换",
    dismissButton: "忽略"
  },
  es: {
    empty: "Introduce primero una idea de imagen.",
    tooShort: "Escribe una descripción más específica con al menos 3 caracteres.",
    promptLabel: "Prompt",
    browserLanguage: "Tu navegador parece estar en {language}. ¿Cambiar a {language}?",
    switchButton: "Cambiar",
    dismissButton: "Cerrar"
  },
  ja: {
    empty: "まず画像アイデアを入力してください。",
    tooShort: "3 文字以上で、もう少し具体的に入力してください。",
    promptLabel: "プロンプト",
    browserLanguage: "ブラウザの言語は{language}のようです。{language}ページに切り替えますか？",
    switchButton: "切り替える",
    dismissButton: "閉じる"
  }
};

function getCurrentLanguage() {
  const lang = document.documentElement.lang.toLowerCase();

  if (lang.startsWith("zh")) {
    return "zh";
  }

  if (lang.startsWith("es")) {
    return "es";
  }

  if (lang.startsWith("ja")) {
    return "ja";
  }

  return "en";
}

function getBrowserLanguage() {
  const browserLang = (navigator.language || "").toLowerCase();

  if (browserLang.startsWith("zh")) {
    return "zh";
  }

  if (browserLang.startsWith("es")) {
    return "es";
  }

  if (browserLang.startsWith("ja")) {
    return "ja";
  }

  if (browserLang.startsWith("en")) {
    return "en";
  }

  return "";
}

function saveLanguageChoice(language) {
  try {
    localStorage.setItem("preferredLanguage", language);
  } catch (error) {
    // Some browsers block localStorage. The language link still works without it.
  }
}

function getSavedLanguageChoice() {
  try {
    return localStorage.getItem("preferredLanguage");
  } catch (error) {
    return "";
  }
}

function createPrompts(idea) {
  return promptTemplates.map(function(template) {
    return template.replace("{idea}", idea);
  });
}

function showMessage(text) {
  results.innerHTML = "";

  const card = document.createElement("div");
  card.className = "prompt-card error-card";
  card.textContent = text;

  results.appendChild(card);
}

function showPrompts(prompts, currentMessages) {
  // Clear old results before showing new ones.
  results.innerHTML = "";

  prompts.forEach(function(prompt, index) {
    const card = document.createElement("div");
    const label = document.createElement("strong");
    const text = document.createElement("p");

    card.className = "prompt-card";
    label.textContent = currentMessages.promptLabel + " " + (index + 1);
    text.textContent = prompt;

    card.appendChild(label);
    card.appendChild(text);
    results.appendChild(card);
  });
}

function showLanguageSuggestion(currentLanguage, currentMessages) {
  const savedLanguage = getSavedLanguageChoice();
  const browserLanguage = getBrowserLanguage();

  if (!suggestionBar || savedLanguage || !browserLanguage || browserLanguage === currentLanguage) {
    return;
  }

  const targetName = languageNames[browserLanguage];
  const text = currentMessages.browserLanguage.replaceAll("{language}", targetName);
  const message = document.createElement("span");
  const switchButton = document.createElement("button");
  const dismissButton = document.createElement("button");

  message.textContent = text;
  switchButton.type = "button";
  switchButton.textContent = currentMessages.switchButton;
  dismissButton.type = "button";
  dismissButton.className = "quiet-button";
  dismissButton.textContent = currentMessages.dismissButton;

  switchButton.addEventListener("click", function() {
    saveLanguageChoice(browserLanguage);
    window.location.href = languagePaths[browserLanguage];
  });

  dismissButton.addEventListener("click", function() {
    suggestionBar.hidden = true;
  });

  suggestionBar.appendChild(message);
  suggestionBar.appendChild(switchButton);
  suggestionBar.appendChild(dismissButton);
  suggestionBar.hidden = false;
}

const currentLanguage = getCurrentLanguage();
const currentMessages = messages[currentLanguage];

document.querySelectorAll("[data-lang-link]").forEach(function(link) {
  link.addEventListener("click", function() {
    saveLanguageChoice(link.dataset.lang);
  });
});

showLanguageSuggestion(currentLanguage, currentMessages);

generateButton.addEventListener("click", function() {
  const idea = ideaInput.value.trim();

  if (idea === "") {
    showMessage(currentMessages.empty);
    return;
  }

  if (idea.length < 3) {
    showMessage(currentMessages.tooShort);
    return;
  }

  const prompts = createPrompts(idea);
  showPrompts(prompts, currentMessages);
});
