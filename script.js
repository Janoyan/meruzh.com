var menuOpen = false;
var contentScrollY = 0;
var menuScrollY = 0;
window.alwaysOpen = false;

var menuItems = [
  {
    title: 'WARRIOR’S CODE',
    description: 'The article explores the intriguing parallels between a software developer\'s role and that of a warrior. As two characters discuss their predicament in the world of programming, they touch upon the developer\'s unwavering principles, time management strategies, and the creation of utility programs.',
    image: '/images/wc-1.webp',
    link: '/articles/warriors-code',
    dateString: 'June 17, 2022',
    background: 'linear-gradient(96deg, rgb(255 255 255) 42%, rgb(255 0 0) 100%)'
  },
  {
    title: 'Management of environment files using CircleCI contexts',
    description: 'In this article I have described a mechanism which allows to facilitate management of .env files by using CircleCI contexts and a little bit scripting.',
    image: '/images/ci-1.png',
    link: '/articles/circle-ci-contexts',
    dateString: 'Feb 13, 2021',
    background: 'linear-gradient(71deg, rgb(254 255 254) 42%, rgb(0 5 201) 100%);'
  },
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren\'t only six tips, of course, I\'ve only listed the six most important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-develop',
    dateString: 'Dec 16, 2020',
    background: 'linear-gradient(16deg, rgba(132,222,166,1) 42%, rgba(68,138,73,1) 100%);'
  },
  {
    title: '[cybersecurity] Login with social account',
    description: 'Often in various websites and applications we see social login feature. Let\'s try to understand,if there is an information risk arising from that and ways of protecting our personal information.',
    image: '/images/cb-1.jpeg',
    link: '/articles/cybersecurity-login-with-social-accounts',
    dateString: 'August 16, 2020',
    background: 'linear-gradient(258deg, rgb(217 202 127) 42%, rgb(255 247 208) 100%);'
  },
  {
    title: 'ՄՈՒՏՔ ԱՅԼ ԿԱՅՔԻ ՄԻՋՈՑՈՎ',
    description: 'Հաճախ տարբեր կայքերում և հավելվածներում կարելի է հանդիպել «Մուտք այլ կայքի միջոցով» կոճակների։ Փորձենք հասկանալ ինչի համար են նախատեսված այդ կոճակները, դրանց օգտակարությունը, դրանցից բխող տեղեկատվական վտանգները և այդ վտանգներից պաշտպանվելու եղանակները։',
    image: '/images/cba-1.jpg',
    link: '/articles/login-with-social-account-arm',
    dateString: 'Օգոստոսի 16, 2020թ.',
    background: 'linear-gradient(202deg, rgb(232 172 162) 42%, rgb(147 205 255) 100%)'
  },
  {
    title: 'Adventures of Promise in Bluebird world',
    description: 'Once upon a time a boy named Promise decided to go travel in one of the famous worlds in his reality. Article is about several useful methods of bluebird npm package.',
    image: '/images/bluebird.png',
    link: '/articles/adventures-of-promise-in-bluebird-world',
    dateString: 'Apr 9, 2020',
    background: 'linear-gradient(16deg, rgb(148 227 237) 42%, rgb(255 255 255) 100%)'
  },
  {
    title: 'Cursor in MongoDB',
    description: 'In this short article, I would like to tell some basics about the working mechanism of the MongoDB cursor.',
    image: '/images/cursor-in-mongodb.png',
    link: '/articles/cursor-in-mongo-db',
    dateString: 'Sep 28, 2019',
    background: 'linear-gradient(14deg, rgb(238 233 167) 42%, rgb(237 208 31) 100%);'
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
      <div class="menu-item" onclick="navigateTo('${item.link}')" style="background: ${item.background}">
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
  document.body.classList.add('blue');
  document.getElementById('menu-container').classList.add('active');
  document.getElementById('jan-button').classList.add('active');
  document.getElementById('container').classList.remove('active');
  window.scrollTo(0, menuScrollY);
  menuOpen = true;
}


function closeMenu() {
  menuScrollY = window.scrollY;
  document.body.classList.remove('blue');
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
      <p>Հեղինակ՝ <a target="_blank" href="https://linkedin.com/in/meruzh"><img src="/images/linkedin.png">Մերուժ Ջանոյան</a>, հրապարակվել է ${yearDiff > 0 ? diffTextArm : `${formattedDate}`}</p>
    </div>` :
    `<div id="author-info-container">
    <p>Written by <a target="_blank" href="https://linkedin.com/in/meruzh"><img src="/images/linkedin.png">Meruzh Janoyan</a> ${yearDiff > 0 ? diffText : `on ${formattedDate}`}</p>
  </div>`;

  const hasLinkedinLink = document.querySelector('div.linkedin > iframe');
  const wrapperElement = document.querySelector('#container > .wrapper');
  wrapperElement.innerHTML = `${authorInfoDiv}${wrapperElement.innerHTML}${hasLinkedinLink ? '' : authorInfoDiv}`
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
