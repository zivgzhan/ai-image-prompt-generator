// Get the page elements that JavaScript needs to control.
const ideaInput = document.getElementById("idea-input");
const generateButton = document.getElementById("generate-button");
const results = document.getElementById("results");

// These prompt styles are simple templates for beginners to understand.
const promptTemplates = [
  "A cinematic image of {idea}, dramatic natural lighting, rich details, balanced composition, ultra realistic.",
  "A dreamy digital painting of {idea}, soft colors, gentle atmosphere, elegant brushwork, high detail.",
  "A futuristic concept art scene showing {idea}, bold shapes, glowing accents, sharp focus, wide angle view.",
  "A minimalist editorial photo of {idea}, clean background, refined styling, subtle shadows, professional composition.",
  "A fantasy illustration of {idea}, magical mood, intricate textures, atmospheric lighting, highly detailed."
];

function createPrompts(idea) {
  return promptTemplates.map(function(template) {
    return template.replace("{idea}", idea);
  });
}

function showPrompts(prompts) {
  // Clear old results before showing new ones.
  results.innerHTML = "";

  prompts.forEach(function(prompt, index) {
    const card = document.createElement("div");
    card.className = "prompt-card";

    card.innerHTML = `
      <strong>Prompt ${index + 1}</strong>
      <p>${prompt}</p>
    `;

    results.appendChild(card);
  });
}

generateButton.addEventListener("click", function() {
  const idea = ideaInput.value.trim();

  if (idea === "") {
    results.innerHTML = '<div class="prompt-card">Please enter an image idea first.</div>';
    return;
  }

  const prompts = createPrompts(idea);
  showPrompts(prompts);
});
