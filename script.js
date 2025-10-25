var menuOpen = false;
var contentScrollY = 0;
var menuScrollY = 0;
window.alwaysOpen = false;


document.addEventListener("DOMContentLoaded", async () => {
  emailjs.init('5DlYgjbK0Mldwc-t_');
  fetch(`/data.json?${Date.now()}`).then(async (response) => {
    const myData = await response.json();
    await loadApp(myData);
  });


});
async function logPublicationsAndCleanUrl() {
  const url = new URL(window.location.href);
  const publications = url.searchParams.get('publications');
  const cleanUrl = url.origin + url.pathname;

  if (publications) {
    const infoRes = await fetch('https://api.country.is');
    const info = await infoRes.json();
    emailjs.send("service_e2paqxd","template_2ieq3nz",{
      publications,
      cleanUrl,
      CC: info?.body.country ?? 'UNKNOWN',
      date: new Date().toISOString(),
    });
  }

  window.history.replaceState({}, document.title, cleanUrl);
}

async function loadApp(myData) {
  logPublicationsAndCleanUrl();
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
  ${myData.publications.sort((a, b) => a.dateString > b.dateString ? -1 : 1).map((item, itemIndex) => item.hide ? '' : `
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
       <div class="cover-wrapper" id="wrapper-${itemIndex}">
                ${item.type === 'video' ? `<div class="dark"></div><i onclick="playVideo('wrapper-${itemIndex}', '${item.src}')" class="fa-solid fa-play play-button"></i>`: ''}
               
        
              <img class="cover" src="${item.image}"/>
        </div>
       <div class="actions">
       ${item.link ? `<a class="read" href="${item.link}">READ MORE</a>`: ''}
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

  const armenianItem = myData.publications.find((i) => i.link && getArticlePath(menuItem.armenianLink) === getArticlePath(i.link) );
  const englishItem = myData.publications.find((i) => i.link && getArticlePath(menuItem.englishLink) === getArticlePath(i.link) );
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

function playVideo(wrapperId, videoSrc) {
  const wrapperElement = document.getElementById(wrapperId);
  wrapperElement.style.height = '350px';

  // Create preloader and video elements
  const preloader = document.createElement('img');
  preloader.className = 'video-preloader';
  preloader.src = '/images/video-preloader.gif';

  const video = document.createElement('video');
  video.src = videoSrc;
  video.muted = true;
  video.loop = true;
  video.autoplay = true;

  // Add elements to wrapper
  wrapperElement.innerHTML = '';
  wrapperElement.appendChild(preloader);
  wrapperElement.appendChild(video);

  // Remove preloader once video starts playing
  video.addEventListener('playing', () => {
    preloader.remove();
  });

}


async function renderShortSummary(cvData) {

}