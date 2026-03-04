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

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full space-y-3.5 py-10">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
    <p class="text-[#79716B] text-[13px] bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="text-2xl lg:text-3xl font-medium bangla">নেক্সট Lesson এ যান</h2>
  </div>
    `;
    return;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white rounded-xl text-center p-10 h-full space-y-6">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-medium text-xl">Meaning /Pronounciation</p>
        <div class="font-semibold text-2xl text-gray-700 bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
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
