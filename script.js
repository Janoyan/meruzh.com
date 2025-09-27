var menuOpen = false;
var contentScrollY = 0;
var menuScrollY = 0;
window.alwaysOpen = false;


document.addEventListener("DOMContentLoaded", async () => {
  fetch(`/data.json?${Date.now()}`).then(async (response) => {
    const myData = await response.json();
    await loadApp(myData);
  });


});

async function loadApp(myData) {
  document.body.innerHTML = `
  <div id="menu-container">
  <div class="tech-bg">
  <video muted="muted" autoplay="autoplay" loop="loop" src="/images/bg.mp4"></video>
</div>
  <div class="left-section">
  <img class="avatar" src="/images/me.png" >
  <p class="name">Meruzh Janoyan</p>
  <p class="title">Senior Software Engineer</p>
  <div class="short-summary">
  <div class="ss-item">
    <p class="label">🌎 Location</p>
    <p class="value">${myData.currentLocation}</p>
  </div>
  <div class="ss-item">
    <p class="label">✉️ Email</p>
    <p class="value">${myData.email}</p>
  </div>
  <div class="ss-item">
    <p class="label">👨🏻‍🎓Degree</p>
    <p class="value">B.S. in Information Security</p>
  </div>
  <div class="ss-item">
    <p class="label">🧑🏻‍💻 Work Experience</p>
    <p class="value">${dateFns.formatDistance(new Date(myData.careerStartDate), new Date, {addSuffix: false})}</p>
  </div>
  <div class="ss-item">
    <p class="label">🗂️ Projects Completed</p>
    <p class="value">${myData.projects.length}+</p>
  </div>
  <div class="ss-item">
    <p class="label">🏢 Companies worked</p>
    <p class="value">${myData.companies.length}</p>
  </div>
  <div class="ss-item">
    <p class="label">📝 Articles Published</p>
    <p class="value">${myData.publications.filter((p) => p.type=== 'article').length}</p>
  </div>
  
  <div class="ss-item">
    <p class="label">⌖ Main stack</p>
    <p class="value"></p>
  </div>
  
  <div class="ss-item" style="border: none">
    <p class="label"></p>
    <p class="value">JavaScript, TypeScript, NodeJS, NestJS, PostgrSQL, Micro-Services</p>
  </div>
  
   </div>
  </div>
  <div class="right-section">
  ${myData.publications.map((item) => item.hide ? '' : `
     <div class="feed-item" >
      <div class="author" >
        <img class="avatar" src="/images/me.png" >
        <div class="namedate">
            <p class="name" >Meruzh Janoyan</p>
        <p class="date" title="${dateFns.format(new Date(item.dateString), 'MMMM do, yyyy')}">${dateFns.formatDistanceToNow(new Date(item.dateString), { addSuffix: true })}</p>    
</div>

       </div>
       <p class="title">${item.title}</p>
       <p class="description">${item.description}</p>
       <img class="cover" src="${item.image}"/>
       <div class="actions">
       <a class="read" href="${item.link}">READ MORE</a>
        </div>

    </div>
  `).join('')}
  </div>
  
  </div>

  ${document.body.innerHTML}`;

  addLinkForOtherLanguage(myData);
  addAuthorInfo();
  addNavigationBar();

  if (window.alwaysOpen) {
    openMenu();
  }
}

function navigateTo(link) {
  location.href = link;
}

function openMenu() {
  contentScrollY = window.scrollY;
  document.body.classList.add('blue');
  document.getElementById('menu-container').classList.add('active');
  document.getElementById('container').classList.remove('active');
  window.scrollTo(0, menuScrollY);
  menuOpen = true;
}


function addAuthorInfo() {
  const publishedTimeString = document.querySelector('meta[property="article:published_time"]')?.getAttribute('content');
  if (!publishedTimeString) {
    return;
  }

  const lang = document.querySelector('meta[http-equiv="content-language"]')?.getAttribute('content');
  const date = new Date(publishedTimeString);
  const formattedDate = lang !== 'hy' ? date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : formatArmDate(date);
  const yearDiff = new Date().getFullYear() - date.getFullYear();
  const diffText = yearDiff > 1 ? `${yearDiff} years ago <span>(${formattedDate})` : yearDiff === 1 ? `a year ago <span>(${formattedDate})` : '';
  const diffTextArm = yearDiff > 0 ? `${yearDiff} տարի առաջ <span>(${formattedDate})` : '';

  const authorInfoDiv = lang === 'hy' ? `
    <div id="author-info-container">
      <p>Հեղինակ՝ <a href="/"><img src="/images/jan.jpeg">Մերուժ Ջանոյան</a>, հրապարակվել է ${yearDiff > 0 ? diffTextArm : `${formattedDate}`}</p>
    </div>` :
    `<div id="author-info-container">
    <p>Written by <a href="/"><img src="/images/jan.jpeg">Meruzh Janoyan</a> ${yearDiff > 0 ? diffText : `on ${formattedDate}`}</p>
  </div>`;

  const hasLinkedinLink = document.querySelector('div.linkedin > iframe');
  const wrapperElement = document.querySelector('#container > .wrapper');
  wrapperElement.innerHTML = `${authorInfoDiv}${wrapperElement.innerHTML}${hasLinkedinLink ? '' : authorInfoDiv}`
}
function addNavigationBar() {
  if (location.pathname === '/') {
    return;
  }

  const lang = document.querySelector('meta[http-equiv="content-language"]')?.getAttribute('content');

  const navigationBarDiv =  `<div id="navigation-bar-space"></div><div id="navigation-bar">
<a id="back-button" href="/">Meruzh Janoyan's personal website</a>
</div>`

  const wrapperElement = document.querySelector('#container > .wrapper');
  wrapperElement.innerHTML = `${navigationBarDiv}${wrapperElement.innerHTML}`
}

function getArticlePath(path) {
  return path?.substring(path?.lastIndexOf('/') + 1) ?? '';
}


function addLinkForOtherLanguage(myData) {
  const menuItem = myData.publications.find((i) => getArticlePath(location.pathname) === getArticlePath(i.link));
  if (!menuItem || (!menuItem.englishLink && !menuItem.armenianLink)) {
    return;
  }
  const wrapperElement = document.querySelector('#container > .wrapper');

  const armenianItem = myData.publications.find((i) => getArticlePath(menuItem.armenianLink) === getArticlePath(i.link) );
  const englishItem = myData.publications.find((i) => getArticlePath(menuItem.englishLink) === getArticlePath(i.link) );
  if (englishItem) {
    wrapperElement.innerHTML = `<div style="background: white" class="other-link"><img src="${englishItem.image}"><a href="${englishItem.link}">Read in English</a></div>${wrapperElement.innerHTML}`
  }
  if (armenianItem) {
    wrapperElement.innerHTML = `<div style="background: white" class="other-link"><img src="${armenianItem.image}"><a href="${armenianItem.link}">Կարդալ Հայերեն</a></div>${wrapperElement.innerHTML}`
  }
}

function formatArmDate(date) {
  const day = date.getDate();
  const year = date.getFullYear().toString();
  const monthNames = [
    'հունվարի',
    'փետրվարի',
    'մարտի',
    'ապրիլի',
    'մայիսի',
    'հունիսի',
    'հուլիսի',
    'օգոստոսի',
    'սեպտեմբերի',
    'հոկտեմբերի',
    'նոյեմբերի',
    'դեկտեմբերի'
  ];

  return `${monthNames[date.getMonth()]} ${day}-ին, ${year}թ.`;
}


async function renderShortSummary(cvData) {

}