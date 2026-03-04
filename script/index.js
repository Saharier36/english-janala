const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white rounded-xl text-center p-10 space-y-6">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-medium text-xl">Meaning /Pronounciation</p>
        <div class="font-semibold text-2xl text-gray-700 bangla">"${word.meaning} / ${word.pronunciation}"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#BADEFF]/26 hover:bg-[#BADEFF] btn-square"><i class="fa-solid fa-circle-info text-[#374957]"></i></button>
          <button class="btn bg-[#BADEFF]/26 hover:bg-[#BADEFF] btn-square"><i class="fa-solid fa-volume-high text-[#374957]"></i></button>
        </div>
      </div>
    `;

    wordContainer.append(card);
  });
};

const displayLessons = (lessons) => {
  // 1.get the container & empty
  const LevelContainer = document.getElementById("level-container");
  LevelContainer.innerHTML = "";
  // 2.get into every lessons
  for (const lesson of lessons) {
    //     3.create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
    //     4. append into container
    LevelContainer.append(btnDiv);
  }
};
loadLessons();
