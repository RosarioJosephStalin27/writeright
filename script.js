// document.getElementById("checkBtn").addEventListener("click", () => {
//   const text = document.getElementById("textInput").value;
//   checkGrammar(text);
// });

// function checkGrammar(text) {
//   const loading = document.getElementById("loading");
//   loading.style.display = "block";  

//   fetch("https://api.languagetoolplus.com/v2/check", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: `text=${encodeURIComponent(text)}&language=en-US`
//   })
//     .then(response => response.json())
//     .then(data => displayResults(data))
//     .catch(error => console.error("Error:", error))
//     .finally(() => {
//       loading.style.display = "none";  
//     });
// }

// function displayResults(data) {
//   const resultDiv = document.getElementById("resultArea");
//   resultDiv.innerHTML = ""; 

//   if (data.matches.length === 0) {
//     resultDiv.innerHTML = "<p>✅ No mistakes found!</p>";
//     return;
//   }

//   const originalText = document.getElementById("textInput").value;

//   data.matches.forEach(match => {
//     const { message, replacements, offset, length } = match;

   
//     const incorrectText = originalText.substr(offset, length);
//     const suggestion = replacements.length ? replacements[0].value : "No suggestion";

//     const errorBox = document.createElement("div");
//     errorBox.style.marginBottom = "10px";
//     errorBox.style.padding = "10px";
//     errorBox.style.border = "1px solid #ccc";
//     errorBox.style.borderRadius = "5px";
//     errorBox.style.backgroundColor = "#fefefe";

//     errorBox.innerHTML = `
//       <strong>❌ Mistake:</strong> <em style="color:red;">${incorrectText}</em><br>
//       <strong>✔ Suggestion:</strong> <span style="color:green;">${suggestion}</span><br>
//       <strong>💡 Explanation:</strong> ${message}
//     `;

//     resultDiv.appendChild(errorBox);
//   });
// }
// LanguageTool.init({ apiUrl: "https://api.languagetoolplus.com" });

// checkBtn.addEventListener("click", async () => {
//   const { matches } = await LanguageTool.check(textInput.value, "en-US");
//   LanguageTool.decorateTextarea(textInput, matches);   
// });
function checkGrammar() {
  const inputText = document.getElementById("inputText").value;
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (!inputText.trim()) {
    resultsContainer.innerHTML = "<p>Please enter some text.</p>";
    return;
  }

  fetch("https://api.languagetoolplus.com/v2/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      text: inputText,
      language: "en-US"
    })
  })
    .then(response => response.json())
    .then(data => {
      if (!data.matches.length) {
        resultsContainer.innerHTML = "<p>No mistakes found. Great job!</p>";
        return;
      }

      data.matches.forEach(match => {
        const offset = match.offset;
        const length = match.length;
        const mistakeWord = inputText.substr(offset, length);

        const suggestion = match.replacements.length > 0 ? match.replacements[0].value : "No suggestion";
        const explanation = match.message;

        const resultBox = document.createElement("div");
        resultBox.classList.add("result-box");

        resultBox.innerHTML = `
          <strong>❌ Mistake:</strong> <span>${mistakeWord}</span><br>
          <strong>✅ Suggestion:</strong> ${suggestion}<br>
          <strong>💡 Explanation:</strong> ${explanation}
        `;

        resultsContainer.appendChild(resultBox);
      });
    })
    .catch(error => {
      resultsContainer.innerHTML = "<p>Something went wrong. Try again later.</p>";
      console.error("Error:", error);
    });
}
