const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    const repose = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await repose.json();
    resultDiv.innerHTML = `
    <p><strong>Word:</strong> ${data[0].word || "NA"}</p>
<br>
    <p><strong>Definition:</strong> ${
      data[0].meanings[0]?.definitions[0]?.definition || "NA"
    }</p>
<br>
    <p><strong>Part of Speech:</strong> ${
      data[0].meanings[0]?.partOfSpeech || "NA"
    }</p>
<br>
    <p><strong>Synonyms:</strong> ${
      data[0].meanings[2]?.synonyms?.join(", ") || "NA"
    }</p>
<br>
<p><strong>Antonyms:</strong> ${
      data[0].meanings[0]?.antonyms.join(", ") || "NA"
    }</p>
<br>
 <p><strong>Example:</strong> ${
   data[0].meanings[0]?.definitions[2]?.example || "NA"
 }</p>
<br>
      <p><strong>Audio:</strong> 
    ${
      data[0].phonetics[2]?.audio
        ? `<audio controls><source src="${data[0].phonetics[2].audio}" type="audio/mpeg"></audio>`
        : "NA"
    }
    </p>
    <br>
`;
    resultDiv.innerHTML += `<a href="${data[0].sourceUrls}" target="_blank">Read more</a>`;
  } catch (error) {
    resultDiv.innerHTML = `
    <h3>Sorry, could not fetch the data</h3>
    <div class="error-bg"></div>
    <img src="errorimage.png" alt="Error Image" class="error-img">
`;

  }

  console.log(`Word = ${word}`);
};
