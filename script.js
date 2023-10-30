var menuOpen = false;
var contentScrollY = 0;
var menuScrollY = 0;
window.alwaysOpen = false;

var menuItems = [
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren\'t only six tips, of course, I\'ve only listed the six most important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-develop',
    dateString: 'Dec 16, 2020'
  },
  {
    title: 'Cursor in MongoDB',
    description: 'In this short article, I would like to tell some basics about the working mechanism of the MongoDB cursor.',
    image: '/images/cursor-in-mongodb.png',
    link: '/articles/cursor-in-mongo-db',
    dateString: 'Sep 28, 2019'
  }
];

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
 <div id="liqued-button">
  <section class="stage">
        <figure class="ball bubble" id="menu-button">
            <img id="jan-button" src="/images/jan.jpeg">
        </figure>
  </section>
  </div>

  <div id="menu-container">
  ${menuItems.map((item) => `
      <div class="menu-item" onclick="navigateTo('${item.link}')">
        <img src="${item.image}">
        <div>
            <p class="title">${item.title}</p>
            <p class="description">${item.description}</p>
            <p class="datestring">${item.dateString}</p>
        </div>
    </div>
  `).join()}
  </div>

  ${document.body.innerHTML}`;

  addAuthorInfo();

  document.querySelector('#menu-button').addEventListener('click', () => {
    if (menuOpen && !window.alwaysOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (window.alwaysOpen) {
    openMenu();
    document.getElementById('liqued-button').classList.add('hidden');
  }
});

function navigateTo(link) {
  location.href = link;
}

function openMenu() {
  contentScrollY = window.scrollY;
  document.getElementById('menu-container').classList.add('active');
  document.getElementById('jan-button').classList.add('active');
  document.getElementById('container').classList.remove('active');
  window.scrollTo(0, menuScrollY);
  menuOpen = true;
}


function closeMenu() {
  menuScrollY = window.scrollY;
  document.getElementById('menu-container').classList.remove('active');
  document.getElementById('jan-button').classList.remove('active');
  document.getElementById('container').classList.add('active');
  window.scrollTo(0, contentScrollY);
  menuOpen = false;
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
      <p>Հեղինակ՝ <a target="_blank" href="https://linkedin.com/in/meruzh">Մերուժ Ջանոյան</a>, հրապարակվել է ${yearDiff > 0 ? diffTextArm : `${formattedDate}`}</p>
    </div>` :
    `<div id="author-info-container">
    <p>Written by <a target="_blank" href="https://linkedin.com/in/meruzh">Meruzh Janoyan</a> ${yearDiff > 0 ? diffText : `on ${formattedDate}`}</p>
  </div>`;

  const wrapperElement = document.querySelector('#container > .wrapper');
  wrapperElement.innerHTML = `${authorInfoDiv}${wrapperElement.innerHTML}${authorInfoDiv}`
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
