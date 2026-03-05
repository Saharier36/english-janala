const createElement = (arr) => {
  const htmlElements = arr.map(
    (el) => `<span class="btn btn-active bg-[#BADEFF]/26">${el}</span>`,
  );
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("btn-active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("btn-active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  console.log(word);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
<div class="space-y-6 border-2 border-[#BADEFF]/26 rounded-xl p-5">
            <h2 class="text-2xl font-semibold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
            </h2>

            <div class="">
              <h3 class="font-semibold">Meaning</h3>
              <p class="bangla font-medium">${word.meaning}</p>
            </div>

            <div class="">
              <h3 class="font-semibold">Example</h3>
              <p class="text-">${word.sentence}</p>
            </div>

            <div class="">
              <h3 class="bangla font-medium mb-1">সমার্থক শব্দ গুলো</h3>
              <div class="">${createElement(word.synonyms)}</div>
            </div>
          </div>
`;
  document.getElementById("my_modal_5").showModal();
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
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white rounded-xl text-center p-10 h-full space-y-6">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-medium text-xl">Meaning /Pronounciation</p>
        <div class="font-semibold text-2xl text-gray-700 bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#BADEFF]/26 hover:bg-[#BADEFF] btn-square"><i class="fa-solid fa-circle-info text-[#374957]"></i></button>
          <button class="btn bg-[#BADEFF]/26 hover:bg-[#BADEFF] btn-square"><i class="fa-solid fa-volume-high text-[#374957]"></i></button>
        </div>
      </div>
    `;

    wordContainer.append(card);
  });
  manageSpinner(false);
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
    //     4. append into container
    LevelContainer.append(btnDiv);
  }
};
loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLevelWord(filterWords);
    });
});
