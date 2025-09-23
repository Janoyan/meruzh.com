var menuOpen = false;
var contentScrollY = 0;
var menuScrollY = 0;
window.alwaysOpen = false;

var menuItems = [
  {
    title: 'ՏՏ Դատաստան',
    description: 'Ի հարգանքս բոլոր նրանց, ովքեր սիրով են կատարում իրենց գործը։',
    image: '/images/itameta.png',
    link: '/essay/it-heaven-arm',
    englishLink: '/essay/it-heaven',
    dateString: '2023-11-17',
    hide: true,
  },
  {
    title: 'IT HEAVEN',
    description: 'Respect to all of them who do their job with love.',
    image: '/images/itmeta.webp',
    link: '/essay/it-heaven',
    armenianLink: '/essay/it-heaven-arm',
    dateString: '2023-11-17',
  },
  {
    title: 'Մեղսավոր ծրագրավորող',
    description: 'Այս հոդվածում անդրադարձել եմ պատճառաբանությունների, որոնց հանդիպել եմ, որոնք հենց իմ մոտ են ի հայտ եկել, կամ որոնցով ուրիշներն են արդարացել կապված վատ կոդ գրելու հետ։',
    image: '/images/g-arm.jpg',
    link: '/articles/guilty-programmer-arm',
    englishLink: '/articles/guilty-programmer',
    dateString: '2023-01-21',
    hide: true,
  },
  {
    title: 'GUILTY programmer',
    description: 'This article delves into the various reasons why experienced programmers may struggle to consistently write clean code, including factors like team dynamics, legacy code, motivation, and code review practices.',
    image: '/images/gp-1.webp',
    link: '/articles/guilty-programmer',
    armenianLink: '/articles/guilty-programmer-arm',
    dateString: '2023-01-21',
  },
  {
    title: 'WARRIOR’S CODE',
    description: 'The article explores the intriguing parallels between a software developer\'s role and that of a warrior. As two characters discuss their predicament in the world of programming, they touch upon the developer\'s unwavering principles, time management strategies, and the creation of utility programs.',
    image: '/images/wc-1.webp',
    link: '/articles/warriors-code',
    armenianLink: '/articles/warriors-code-arm',
    dateString: '2022-06-17',
  },
  {
    title: 'ՄԱՐՏԻԿԻ ԿԱՆՈՆՆԵՐԸ',
    description: 'Վճարիր գործիքներիդ համար, Բարձր արտադրողականության ժամանակահատված, Ստեղծիր օգնականներ, Միշտ ունեցիր անելիք։',
    image: '/images/wca-1.webp',
    link: '/articles/warriors-code-arm',
    englishLink: '/articles/warriors-code',
    dateString: '2022-06-17',
    hide: true,
  },
  {
    title: 'IP Rotation with NodeJS and Heroku',
    description: 'The article describes a method by which the IP address of the server can be changed based on the need.',
    image: '/images/here.jpeg',
    link: '/articles/ip-rotation',
    armenianLink: '/articles/ip-rotation-arm',
    dateString: '2022-04-11',
  },
  {
    title: 'Heroku: Մեկ NodeJS ծրագրի բազմաթիվ IP հասցեներ',
    description: 'Հոդվածում նկարագրվում է մի մեթոդ, որով կարելի է փոփոխել server-ի IP հասցեն անհրաժեշտությունից ելնելով։',
    image: '/images/iph.png',
    link: '/articles/ip-rotation-arm',
    englishLink: '/articles/ip-rotation',
    dateString: '2022-04-11',
    hide: true,
  },
  {
    title: 'Testing Asynchronous Events Using Manual Promise',
    description: 'In the article is described one of the ways I used for testing asynchronous logic of applications.',
    image: '/images/as1.jpeg',
    link: '/articles/testing-asynchronous-events-using-manual-promise',
    dateString: '2021-12-15',
  },
  {
    title: 'Powerful Aggregation Framework of MongoDB',
    description: 'As it’s known, MongoDB is a document-oriented database with lots of powerful features and advantages. One of those powerful features is the aggregation framework of MongoDB.',
    image: '/images/ap-h.png',
    link: '/articles/powerful-aggregation-framework-of-mongodb',
    dateString: '2021-07-30',
  },
  {
    title: 'Programming Prolongs Life',
    description: 'In this short article I shared my thoughts about creativity and how it\'s related to programming.',
    image: '/images/pp1.jpeg',
    link: '/articles/programming-prolongs-life',
    dateString: '2021-07-10',
  },
  {
    title: 'Monolithic Apps With The Intent Of Microservices',
    description: 'Microservices are great but they can complicate your work when you\'re not sure what your app will become eventually. Sometimes having monolithic app is better choice.',
    image: '/images/ma1.jpeg',
    link: '/articles/monolithic-apps-with-the-intent-of-microservices',
    dateString: '2021-03-22',
  },
  {
    title: 'Cloud Services VS Fake Startup Ideas',
    description: 'An article about how to use free tiers of cloud services to release MVPs of your startup ideas.',
    image: '/images/cloud-1.png',
    link: '/articles/cloud-services-vs-fake-startup-ideas',
    dateString: '2021-03-12',
  },
  {
    title: 'Management of environment files using CircleCI contexts',
    description: 'In this article I have described a mechanism which allows to facilitate management of .env files by using CircleCI contexts and a little bit scripting.',
    image: '/images/ci-1.png',
    link: '/articles/circle-ci-contexts',
    dateString: '2021-02-13',
  },
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren\'t only six tips, of course, I\'ve only listed the six most important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-develop',
    dateString: '2020-12-16',
  },
  {
    title: '[cybersecurity] Login with social account',
    description: 'Often in various websites and applications we see social login feature. Let\'s try to understand,if there is an information risk arising from that and ways of protecting our personal information.',
    image: '/images/cb-1.jpeg',
    link: '/articles/cybersecurity-login-with-social-accounts',
    armenianLink: '/articles/login-with-social-account-arm',
    dateString: '2020-08-16',
  },
  {
    title: 'ՄՈՒՏՔ ԱՅԼ ԿԱՅՔԻ ՄԻՋՈՑՈՎ',
    description: 'Հաճախ տարբեր կայքերում և հավելվածներում կարելի է հանդիպել «Մուտք այլ կայքի միջոցով» կոճակների։ Փորձենք հասկանալ ինչի համար են նախատեսված այդ կոճակները, դրանց օգտակարությունը, դրանցից բխող տեղեկատվական վտանգները և այդ վտանգներից պաշտպանվելու եղանակները։',
    image: '/images/cba-1.jpg',
    link: '/articles/login-with-social-account-arm',
    englishLink: '/articles/cybersecurity-login-with-social-accounts',
    dateString: '2020-08-16',
    hide: true,
  },
  {
    title: 'Adventures of Promise in Bluebird world',
    description: 'Once upon a time a boy named Promise decided to go travel in one of the famous worlds in his reality. Article is about several useful methods of bluebird npm package.',
    image: '/images/bluebird.png',
    link: '/articles/adventures-of-promise-in-bluebird-world',
    dateString: '2020-04-09',
  },
  {
    title: 'Cursor in MongoDB',
    description: 'In this short article, I would like to tell some basics about the working mechanism of the MongoDB cursor.',
    image: '/images/cursor-in-mongodb.png',
    link: '/articles/cursor-in-mongo-db',
    dateString: '2019-09-28',
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
  <div class="tech-bg">
  <video muted="muted" autoplay="autoplay" loop="loop" src="/images/bg.mp4"></video>
</div>
  <div class="left-section">
  <img class="avatar" src="/images/me.png">
  <p class="name">Meruzh Janoyan</p>
  <p class="title">Software Engineer</p>
  </div>
  <div class="right-section">
  ${menuItems.map((item) => item.hide ? '' : `
     <div class="feed-item" onclick="navigateTo('${item.link}')" >
      <a class="author" href="${item.link}">
        <img class="avatar" src="/images/me.png">
        <div class="namedate">
            <p class="name">Meruzh Janoyan</p>
        <p class="date" title="${dateFns.format(new Date(item.dateString), 'MMMM do, yyyy')}">${dateFns.formatDistanceToNow(new Date(item.dateString), { addSuffix: true })}</p>    
</div>

       </a>
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

  addLinkForOtherLanguage();
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
      <p>Հեղինակ՝ <a href="/"><img src="/images/jan.jpeg">Մերուժ Ջանոյան</a>, հրապարակվել է ${yearDiff > 0 ? diffTextArm : `${formattedDate}`}</p>
    </div>` :
    `<div id="author-info-container">
    <p>Written by <a href="/"><img src="/images/jan.jpeg">Meruzh Janoyan</a> ${yearDiff > 0 ? diffText : `on ${formattedDate}`}</p>
  </div>`;

  const hasLinkedinLink = document.querySelector('div.linkedin > iframe');
  const wrapperElement = document.querySelector('#container > .wrapper');
  wrapperElement.innerHTML = `${authorInfoDiv}${wrapperElement.innerHTML}${hasLinkedinLink ? '' : authorInfoDiv}`
}

function getArticlePath(path) {
  return path?.substring(path?.lastIndexOf('/') + 1) ?? '';
}


function addLinkForOtherLanguage() {
  const menuItem = menuItems.find((i) => getArticlePath(location.pathname) === getArticlePath(i.link));
  if (!menuItem || (!menuItem.englishLink && !menuItem.armenianLink)) {
    return;
  }
  const wrapperElement = document.querySelector('#container > .wrapper');

  const armenianItem = menuItems.find((i) => getArticlePath(menuItem.armenianLink) === getArticlePath(i.link) );
  const englishItem = menuItems.find((i) => getArticlePath(menuItem.englishLink) === getArticlePath(i.link) );
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
