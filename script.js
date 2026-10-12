(() => {
  "use strict";
  const DURATION = 60;
  const passages = [
    "Программирование помогает превращать идеи в работающие цифровые продукты. Чтобы создать хороший сайт, важно продумать его структуру, внешний вид и удобство для пользователя.",
    "Скорость печати развивается благодаря регулярной практике. Старайся смотреть на экран, держать руки расслабленно и нажимать клавиши точно. Постепенно движения станут увереннее.",
    "Интернет объединяет людей, знания и технологии. Современные веб-сайты создаются с помощью HTML, CSS и JavaScript. Эти инструменты помогают строить страницы, оформлять интерфейс и добавлять интерактивные функции.",
    "Хороший результат складывается из маленьких шагов. Сначала сосредоточься на точности, затем постепенно увеличивай скорость. Ошибки помогают понять, что стоит потренировать в следующий раз.",
    "Компьютер выполняет команды, которые человек записывает в понятной для машины форме. Алгоритм помогает разбить большую задачу на последовательные и проверяемые действия.",
    "Клавиатура становится удобнее, когда пальцы привыкают к расположению клавиш. Не спеши в начале тренировки: ровный ритм и точность со временем принесут лучший результат.",
    "В старых игровых автоматах яркие пиксели, простые мелодии и высокий счёт создавали особую атмосферу. Сегодня ретро-дизайн напоминает об этой эпохе и вдохновляет новые проекты.",
    "Перед публикацией сайта полезно проверить все ссылки, изображения и кнопки. Даже небольшая проверка помогает заметить ошибки до того, как страницу увидят посетители.",
    "HTML задаёт структуру страницы, CSS отвечает за внешний вид, а JavaScript добавляет поведение. Вместе эти технологии позволяют создавать интерактивные сайты прямо в браузере.",
    "Если задача кажется сложной, раздели её на небольшие этапы. Закончи один этап, проверь результат и только потом переходи к следующему. Так проще находить и исправлять ошибки.",
    "Git помогает сохранять историю изменений проекта. Благодаря коммитам можно сравнить версии файлов, понять причину ошибки и при необходимости вернуться к рабочему состоянию.",
    "GitHub Pages публикует статические сайты из репозитория. После загрузки HTML, CSS, JavaScript и медиафайлов проект может стать доступен по публичной ссылке.",
    "Хороший интерфейс не должен заставлять человека угадывать, что делать дальше. Понятные подписи, заметные кнопки и полезные сообщения делают сайт приятнее и доступнее.",
    "Во время тренировки печатай спокойно и старайся не смотреть на клавиатуру. Если ошибся, продолжай работать и обращай внимание на точность, а не только на итоговую скорость.",
    "Переменная хранит значение, которое программа использует во время работы. Функция объединяет действия в отдельный блок, а событие позволяет реагировать на нажатие кнопки или ввод текста.",
    "Адаптивный дизайн помогает сайту выглядеть хорошо на телефоне, планшете и большом экране. Для этого используют гибкие размеры, сетки и специальные правила CSS.",
    "Перед началом работы полезно сформулировать цель проекта. Когда понятно, какую проблему решает сайт и кому он нужен, проще выбирать функции и оценивать результат.",
    "Цифровая безопасность начинается с внимательности. Не вводи личные данные на незнакомых страницах, проверяй адрес сайта и помни, что игровой секретный код не заменяет настоящую защиту.",
    "Музыка, цвет и движение могут создавать настроение интерфейса, но не должны мешать главной задаче. Хороший дизайн сочетает выразительность с удобством использования.",
    "Каждая новая попытка печати даёт возможность улучшить результат. Запоминай сложные сочетания букв, сохраняй спокойный темп и радуйся прогрессу, даже если он начинается с маленьких шагов."
  ];
  const $ = id => document.getElementById(id);
  const passageEl=$('passage'), input=$('typing-input'), startBtn=$('start-btn'), wpmEl=$('wpm'), errorsEl=$('errors'), timeEl=$('time'), progressEl=$('time-progress'), hintEl=$('hint'), resultEl=$('result'), resultCopy=$('result-copy');
  let target='', started=false, finished=false, startTime=0, rafId=null;
  function choosePassage(){return passages[Math.floor(Math.random()*passages.length)];}
  function renderPassage(typed='') { passageEl.replaceChildren(); for(let i=0;i<target.length;i++){const span=document.createElement('span');span.textContent=target[i];if(i<typed.length)span.className=typed[i]===target[i]?'correct':'incorrect';else if(i===typed.length&&!finished)span.className='current';passageEl.appendChild(span);} }
  function calculate(typed){let errors=0;for(let i=0;i<typed.length;i++)if(i>=target.length||typed[i]!==target[i])errors++;const elapsedMinutes=Math.max((performance.now()-startTime)/60000,1/60);const correct=Math.max(0,typed.length-errors);return {errors,wpm:Math.round((correct/5)/elapsedMinutes)};}
  function updateStats(){const s=calculate(input.value);wpmEl.textContent=s.wpm;errorsEl.textContent=s.errors;}
  function tick(){if(!started||finished)return;const elapsed=(performance.now()-startTime)/1000;const remaining=Math.max(0,Math.ceil(DURATION-elapsed));timeEl.innerHTML=`${remaining}<span class="seconds">с</span>`;progressEl.style.width=`${remaining/DURATION*100}%`;if(remaining<=0){finishTest();return;}rafId=requestAnimationFrame(tick);}
  function beginTest(){if(started||finished)return;started=true;startTime=performance.now();hintEl.textContent='Печатай исходный текст. Таймер уже идёт!';startBtn.textContent='ТЕСТ ИДЁТ';rafId=requestAnimationFrame(tick);}
  function finishTest(){if(finished)return;finished=true;started=false;if(rafId!==null)cancelAnimationFrame(rafId);input.disabled=true;const s=calculate(input.value);wpmEl.textContent=s.wpm;errorsEl.textContent=s.errors;timeEl.innerHTML='0<span class="seconds">с</span>';progressEl.style.width='0%';renderPassage(input.value);resultCopy.textContent=`Итоговая скорость: ${s.wpm} слов/мин · Ошибки: ${s.errors}. Нажми «ПОВТОРИТЬ», чтобы сыграть ещё раз.`;resultEl.classList.remove('hidden');hintEl.textContent='Сеанс завершён. Итог показан выше; результаты не сохраняются.';startBtn.textContent='↻ ПОВТОРИТЬ';}
  function resetTest(){if(rafId!==null)cancelAnimationFrame(rafId);target=choosePassage();started=false;finished=false;startTime=0;input.value='';input.disabled=true;wpmEl.textContent='0';errorsEl.textContent='0';timeEl.innerHTML=`${DURATION}<span class="seconds">с</span>`;progressEl.style.width='100%';resultEl.classList.add('hidden');hintEl.textContent='Нажми «СТАРТ», затем печатай текст. Таймер запустится с первой клавиши.';startBtn.innerHTML='<span aria-hidden="true">▶</span> СТАРТ';renderPassage();}
  startBtn.addEventListener('click',()=>{if(finished)resetTest();input.disabled=false;input.focus();if(!started)hintEl.textContent='Начни печатать — таймер запустится с первой клавиши.';});
  input.addEventListener('input',()=>{if(finished)return;if(!started&&input.value.length>0)beginTest();renderPassage(input.value);if(started)updateStats();if(input.value.length>=target.length)finishTest();});
  input.addEventListener('keydown',e=>{if(e.key==='Enter')e.preventDefault();});
  // Promo codes are playful easter eggs, not access protection.
  const menuToggle=$('menu-toggle'), menu=$('site-menu'), codeInput=$('secret-code'), submit=$('code-submit'), menuHint=$('menu-hint');
  const bikeModal=$('bike-modal'), creatorModal=$('creator-modal'), videoModal=$('video-modal'), video=$('developer-video');let showBikeAfterVideo=false;
  menuToggle.addEventListener('click',()=>{const opening=menu.classList.contains('hidden');menu.classList.toggle('hidden',!opening);menuToggle.setAttribute('aria-expanded',String(opening));});
  function openModal(m){m.classList.remove('hidden');}function closeModal(m){m.classList.add('hidden');}
  function enterCode(){const code=codeInput.value.trim().toUpperCase();menu.classList.add('hidden');menuToggle.setAttribute('aria-expanded','false');if(code==='ARSEN'){closeModal(creatorModal);openModal(bikeModal);menuHint.textContent='Промокод ARSEN принят!';}else if(code==='554'){menuHint.textContent='Промокод 554 принят — открываю сайт школы.';window.open('https://sch554.spb.ru/?ysclid=mv53c8qibp294634775','_blank','noopener,noreferrer');}else if(code==='AFIZK'){showBikeAfterVideo=true;closeModal(bikeModal);closeModal(creatorModal);openModal(videoModal);menuHint.textContent='AFIZK принят. После закрытия видео появится велосипедный постер.';video.currentTime=0;const play=video.play();if(play&&play.catch)play.catch(()=>{});}else{menu.classList.remove('hidden');menuToggle.setAttribute('aria-expanded','true');menuHint.textContent='Неизвестный промокод. Попробуй ARSEN, 554 или AFIZK.';}}
  submit.addEventListener('click',enterCode);codeInput.addEventListener('keydown',e=>{if(e.key==='Enter')enterCode();});
  $('arsen-button').addEventListener('click',()=>{menu.classList.add('hidden');menuToggle.setAttribute('aria-expanded','false');openModal(bikeModal);});
  document.querySelectorAll('[data-close]').forEach(btn=>btn.addEventListener('click',()=>{const m=$(btn.dataset.close);const wasVideo=m===videoModal;if(wasVideo){video.pause();video.currentTime=0;}closeModal(m);if(wasVideo&&showBikeAfterVideo){showBikeAfterVideo=false;openModal(bikeModal);}}));
  [bikeModal,creatorModal,videoModal].forEach(m=>m.addEventListener('click',e=>{if(e.target!==m)return;const wasVideo=m===videoModal;if(wasVideo){video.pause();video.currentTime=0;}closeModal(m);if(wasVideo&&showBikeAfterVideo){showBikeAfterVideo=false;openModal(bikeModal);}}));
  document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;const m=[bikeModal,creatorModal,videoModal].find(x=>!x.classList.contains('hidden'));if(!m)return;const wasVideo=m===videoModal;if(wasVideo){video.pause();video.currentTime=0;}closeModal(m);if(wasVideo&&showBikeAfterVideo){showBikeAfterVideo=false;openModal(bikeModal);}});
  resetTest();
})();
