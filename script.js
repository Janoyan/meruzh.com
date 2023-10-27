var menuOpen = false;
window.alwaysOpen = false;

var menuItems = [
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren\'t only six tips, of course, I\'ve only listed the six most important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-dev',
    dateString: 'Dec 16, 2020'
  },
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren\'t only six tips, of course, I\'ve only listed the six most important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-dev',
    dateString: 'Dec 16, 2020'
  },
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlight years. In important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-dev',
    dateString: 'Dec 16, 2020'
  },
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlights the six most important tips I have learned by analyzing my previous projects from tights the six most important tips I have learned by analyzing my previous projects from tights the six most important tips I have learned by analyzing my previous projects from tights the six most important tips I have learned by analyzing my previous projects from tights the six most important tips I have learned by analyzing my previous projects from tights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren\'t only six tips, of course, I\'ve only listed the six most important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-dev',
    dateString: 'Dec 16, 2020'
  },
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren\'t only six tips, of course, I\'ve only listed the six most important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-dev',
    dateString: 'Dec 16, 2020'
  },
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren\'t only six tips, of course, I\'ve only listed the six most important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-dev',
    dateString: 'Dec 16, 2020'
  },
  {
    title: 'Six tips to speed up Node.js Apps development',
    description: 'This article highlights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren\'t only six tips, of course, I\'ve only listed the six most important ones according to my experience.',
    image: '/images/node-js.jpg',
    link: '/articles/6-tips-to-speed-up-node-js-apps-dev',
    dateString: 'Dec 16, 2020'
  },
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

  document.querySelector('#menu-button').addEventListener('click', () => {
    if (menuOpen && !window.alwaysOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  console.log(window.alwaysOpen, '=====')
  if (window.alwaysOpen) {
    openMenu();
    document.getElementById('liqued-button').classList.add('hidden');
  }
});

function navigateTo(link) {
  location.href = link;
}

function openMenu() {
  document.getElementById('menu-container').classList.add('active');
  document.getElementById('jan-button').classList.add('active');
  document.getElementById('container').classList.remove('active');
  menuOpen = true;
}


function closeMenu() {
  document.getElementById('menu-container').classList.remove('active');
  document.getElementById('jan-button').classList.remove('active');
  document.getElementById('container').classList.add('active');
  menuOpen = false;
}

