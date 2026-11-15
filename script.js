/*
 * meruzh.com v2 — renders the profile home page and wraps every article
 * into a "post" layout. Article HTML files are not modified: this script
 * moves their existing #container node into the post card at runtime.
 */

const PROFILE = {
  name: 'Meruzh Janoyan',
  nameArm: 'Մերուժ Ջանոյան',
  avatar: '/images/my-photo-1.jpg',
  smallAvatar: '/images/jan.jpeg',
};

// Articles don't include the icon font, so load it here instead of editing every article.
if (!document.querySelector('link[href*="font-awesome"]')) {
  const fa = document.createElement('link');
  fa.rel = 'stylesheet';
  fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
  document.head.appendChild(fa);
}

let siteData = null;
const dataPromise = fetch(`/data.json?${Date.now()}`)
  .then((r) => r.json())
  .then((d) => (siteData = d))
  .catch(() => null);

document.addEventListener('DOMContentLoaded', async () => {
  if (document.body.classList.contains('profile-page')) {
    const data = await dataPromise;
    if (data) renderProfilePage(data);
    startNetworkBackground();
    return;
  }

  if (document.querySelector('#container > .wrapper')) {
    renderPostPage();
    startNetworkBackground();
    const data = await dataPromise;
    if (data) fillPostPage(data);
  }
});

/* ---------- animated background ---------- */

// Slowly drifting dots joined by faint lines, drawn behind all content.
// Shows a still frame for visitors who prefer reduced motion and pauses
// while the tab is hidden.
function startNetworkBackground() {
  if (document.getElementById('bg-net')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'bg-net';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LINK = 140;
  let nodes = [];
  let w = 0;
  let h = 0;
  let frame = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(Math.min(80, Math.max(24, (w * h) / 18000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 1,
    }));
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(10, 102, 194, ${0.22 * (1 - d / LINK)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.fillStyle = 'rgba(0, 170, 128, 0.55)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step() {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -10) n.x = w + 10;
      if (n.x > w + 10) n.x = -10;
      if (n.y < -10) n.y = h + 10;
      if (n.y > h + 10) n.y = -10;
    }
    draw();
    frame = requestAnimationFrame(step);
  }

  function start() {
    if (!reduceMotion && !frame) frame = requestAnimationFrame(step);
  }

  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = null;
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  resize();
  start();
}

/* ---------- helpers ---------- */

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isArmenian(text) {
  return /[԰-֏]/.test(text || '');
}

function paragraphs(text) {
  return String(text || '')
    .split(/\n\s*\n/)
    .map((p) => `<p>${esc(p.trim())}</p>`)
    .join('');
}

function monthYear(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function fullDate(date, lang) {
  if (lang === 'hy') return formatArmDate(date);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function monthsBetween(start, end) {
  const a = new Date(start);
  const b = end ? new Date(end) : new Date();
  return Math.max(1, (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1);
}

function durationText(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y} yr${y > 1 ? 's' : ''}` : '', m ? `${m} mo${m > 1 ? 's' : ''}` : '']
    .filter(Boolean)
    .join(' ');
}

function shortAgo(date) {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days >= 365) return `${Math.floor(days / 365)}y`;
  if (days >= 30) return `${Math.floor(days / 30)}mo`;
  if (days >= 7) return `${Math.floor(days / 7)}w`;
  if (days >= 1) return `${days}d`;
  return 'today';
}

function initials(name) {
  return String(name)
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function logoColor(name) {
  const palette = ['#0a66c2', '#057642', '#915907', '#b24020', '#5f4b8b', '#2d6e7e', '#7a3e65'];
  let h = 0;
  for (const ch of String(name)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}

function logo(name, icon, image, plain) {
  if (image) {
    return `<div class="logo has-img"><img src="${esc(image)}" alt="${esc(name)} logo"></div>`;
  }
  if (plain) {
    return `<div class="logo plain" style="color:${logoColor(name)}"><i class="${icon}"></i></div>`;
  }
  if (icon) {
    return `<div class="logo" style="background:${logoColor(name)}"><i class="${icon}"></i></div>`;
  }
  return `<div class="logo" style="background:${logoColor(name)}">${esc(initials(name) || '•')}</div>`;
}

function detailValue(item, label) {
  return item.details?.find((d) => d.label === label)?.value;
}

function articlePath(path) {
  return path?.substring(path.lastIndexOf('/') + 1).replace(/\.html$/, '') ?? '';
}

function visiblePosts(data) {
  return [...data.publications]
    .filter((p) => !p.hide)
    .sort((a, b) => (a.dateString > b.dateString ? -1 : 1));
}

function currentRole(data) {
  return [...data.companies].sort((a, b) => (a.startDate > b.startDate ? -1 : 1)).find((c) => !c.endDate);
}

function headline(data) {
  if (data.headline) return data.headline;
  const role = currentRole(data);
  return role ? `${role.title} at ${role.companyName}` : 'Senior Software Engineer';
}

function link(url) {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
}

function formatArmDate(date) {
  const monthNames = [
    'հունվարի', 'փետրվարի', 'մարտի', 'ապրիլի', 'մայիսի', 'հունիսի',
    'հուլիսի', 'օգոստոսի', 'սեպտեմբերի', 'հոկտեմբերի', 'նոյեմբերի', 'դեկտեմբերի',
  ];
  return `${monthNames[date.getMonth()]} ${date.getDate()}-ին, ${date.getFullYear()}թ.`;
}

/* ---------- shared chrome ---------- */

function topNav(active) {
  return `
  <header class="topnav">
    <div class="topnav-inner">
      <a class="brand" href="/" aria-label="Home"><img src="${PROFILE.smallAvatar}" alt=""></a>
      <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input id="search-input" type="search" placeholder="Search articles" autocomplete="off" aria-label="Search articles">
        <div id="search-results" class="search-results" hidden></div>
      </div>
      <nav class="nav-links">
        <a href="/" class="${active === 'home' ? 'active' : ''}"><i class="fa-solid fa-house"></i><span>Home</span></a>
        <a href="/#activity" class="${active === 'posts' ? 'active' : ''}"><i class="fa-solid fa-newspaper"></i><span>Articles</span></a>
        <a href="/#experience"><i class="fa-solid fa-briefcase"></i><span>Experience</span></a>
        <a href="#" data-contact><i class="fa-solid fa-envelope"></i><span>Contact</span></a>
      </nav>
    </div>
  </header>`;
}

function bindSearch(data) {
  const input = document.getElementById('search-input');
  const box = document.getElementById('search-results');
  if (!input || !box) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      box.hidden = true;
      return;
    }
    const hits = data.publications
      .filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(q))
      .slice(0, 8);
    box.innerHTML = hits.length
      ? hits.map((p) => `
          <a href="${esc(p.link)}">
            <img src="${esc(p.image)}" alt="">
            <span>${esc(p.title)}</span>
          </a>`).join('')
      : '<p class="empty">No articles found</p>';
    box.hidden = false;
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) box.hidden = true;
  });
}

function bindContact(data) {
  document.querySelectorAll('[data-contact]').forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal(data);
    })
  );
}

function openContactModal(data) {
  const rows = [
    ['fa-solid fa-envelope', 'Email', data.email, `mailto:${data.email}`],
    ['fa-solid fa-globe', 'Website', data.website, link(data.website)],
    ['fa-brands fa-github', 'GitHub', data.github, link(data.github)],
    ['fa-brands fa-linkedin', 'LinkedIn', data.linkedin, link(data.linkedin)],
    ['fa-brands fa-youtube', 'YouTube', data.youtube, link(data.youtube)],
  ].filter((r) => r[2]);

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <div class="modal-head">
        <h2 id="contact-title">${PROFILE.name}</h2>
        <button class="icon-btn" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <h3>Contact info</h3>
        ${rows.map(([icon, label, value, href]) => `
          <div class="contact-row">
            <i class="${icon}"></i>
            <div>
              <p class="label">${label}</p>
              <a href="${esc(href)}" target="_blank" rel="noopener">${esc(value)}</a>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => e.key === 'Escape' && close();
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('[data-close]')) close();
  });
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
  overlay.querySelector('[data-close]').focus();
}

/* ---------- profile (home) page ---------- */

function renderProfilePage(data) {
  const posts = visiblePosts(data);
  const role = currentRole(data);
  const companies = [...data.companies].sort((a, b) => (a.startDate > b.startDate ? -1 : 1));
  const education = [...(data.educationAndTrainings || [])].sort((a, b) => (a.startDate > b.startDate ? -1 : 1));
  const years = Math.floor(monthsBetween(data.careerStartDate) / 12);
  // Orgs shown in the profile header: entries marked "featured" in data.json,
  // otherwise the current job and the first degree.
  const featured = [...data.companies, ...education].filter((e) => e.featured);
  const headerOrgs = featured.length
    ? featured
    : [role, education.find((e) => /degree/i.test(e.title)) || education[0]].filter(Boolean);
  const armenianPosts = data.publications.filter((p) => p.hide && isArmenian(p.title));

  document.body.innerHTML = `
  ${topNav('home')}
  <div class="page profile-layout">
    <main class="main-col">

      <section class="card profile-top">
        <div class="cover">
          <div class="cover-term" aria-hidden="true"><span class="prompt">$</span> whoami<span class="cursor"></span></div>
        </div>
        <div class="profile-body">
          <img class="avatar-lg" src="${PROFILE.avatar}" alt="${PROFILE.name}">
          <div class="profile-row">
            <div class="profile-id">
              <h1>${PROFILE.name}</h1>
              <p class="headline">${esc(headline(data))}</p>
              <p class="meta">${esc(data.currentLocation)} · <a href="#" data-contact>Contact info</a></p>
              <p class="meta strong">${years}+ years of experience · ${posts.length} articles</p>
            </div>
            <ul class="profile-orgs">
              ${headerOrgs.map((org) => `<li>${logo(org.companyName, education.includes(org) ? 'fa-solid fa-graduation-cap' : null, org.logo)}<span>${esc(org.companyName)}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </section>

      <section class="card section">
        <h2>About</h2>
        <div class="about-text clamp" id="about-text">${paragraphs(data.about || defaultAbout(data, years, role))}</div>
      </section>

      <section class="card section" id="activity">
        <div class="section-head">
          <div>
            <h2>Activity</h2>
            <p class="sub">${posts.length} articles</p>
          </div>
        </div>
        <div class="activity-list">
          ${posts.map((p, i) => activityItem(p, i >= 3)).join('')}
        </div>
        ${posts.length > 3 ? `<button class="show-all" data-toggle-posts>Show all ${posts.length} articles <i class="fa-solid fa-arrow-right"></i></button>` : ''}
      </section>

      <section class="card section" id="experience">
        <h2>Experience</h2>
        <ul class="entries">${companies.map(experienceEntry).join('')}</ul>
      </section>

      <section class="card section" id="education">
        <h2>Education</h2>
        <ul class="entries">${education.map(educationEntry).join('')}</ul>
      </section>

      ${data.projects?.length ? `
      <section class="card section" id="projects">
        <h2>Projects</h2>
        <ul class="entries">${data.projects.map(projectEntry).join('')}</ul>
      </section>` : ''}
    </main>

    <aside class="side-col">
      <section class="card side-card">
        <h3>Links</h3>
        <ul class="link-list">
          ${data.website ? `<li><i class="fa-solid fa-globe"></i><a href="${esc(link(data.website))}">${esc(data.website)}</a></li>` : ''}
          ${data.github ? `<li><i class="fa-brands fa-github"></i><a href="${esc(link(data.github))}" target="_blank" rel="noopener">${esc(data.github)}</a></li>` : ''}
          ${data.linkedin ? `<li><i class="fa-brands fa-linkedin"></i><a href="${esc(link(data.linkedin))}" target="_blank" rel="noopener">${esc(data.linkedin)}</a></li>` : ''}
          ${data.youtube ? `<li><i class="fa-brands fa-youtube"></i><a href="${esc(link(data.youtube))}" target="_blank" rel="noopener">${esc(data.youtube)}</a></li>` : ''}
        </ul>
      </section>

      ${armenianPosts.length ? `
      <section class="card side-card">
        <h3>Հայերեն հոդվածներ</h3>
        <p class="sub">Articles in Armenian</p>
        <ul class="mini-posts">${armenianPosts.map(miniPost).join('')}</ul>
      </section>` : ''}

      <footer class="site-footer">© ${new Date().getFullYear()} ${PROFILE.name} · meruzh.com</footer>
    </aside>
  </div>`;

  bindSearch(data);
  bindContact(data);
  bindSeeMore();

  document.querySelector('[data-toggle-posts]')?.addEventListener('click', (e) => {
    document.querySelectorAll('.activity-item.is-extra').forEach((el) => el.classList.remove('is-extra'));
    e.currentTarget.remove();
  });

  const about = document.getElementById('about-text');
  if (about && about.scrollHeight > about.clientHeight + 4) {
    about.insertAdjacentHTML('afterend', '<button class="see-more" data-unclamp="about-text">…see more</button>');
  } else {
    about?.classList.remove('clamp');
  }
  bindSeeMore();

  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}

function defaultAbout(data, years, role) {
  const roleText = role ? ` Currently I work as ${role.title} at ${role.companyName}.` : '';
  return `Software engineer with ${years}+ years of experience, mostly on the back end with Node.js and TypeScript.${roleText}\n\nI also write articles and essays about engineering, cybersecurity and life as a developer — you can find them in the Activity section below.`;
}

function activityItem(post, extra) {
  const date = new Date(post.dateString);
  return `
  <a class="activity-item ${extra ? 'is-extra' : ''}" href="${esc(post.link)}">
    <img src="${esc(post.image)}" alt="" loading="lazy">
    <div class="activity-text">
      <p class="activity-meta">${PROFILE.name} posted this · <span title="${esc(fullDate(date))}">${shortAgo(date)}</span></p>
      <h3>${esc(post.title)}</h3>
      <p class="activity-desc">${esc(post.description)}</p>
    </div>
  </a>`;
}

function miniPost(post) {
  return `
  <li>
    <a href="${esc(post.link)}">
      <img src="${esc(post.image)}" alt="" loading="lazy">
      <span>${esc(post.title)}</span>
    </a>
  </li>`;
}

function seeMoreBlock(id, text) {
  if (!text) return '';
  return `<div class="entry-desc clamp" id="${id}">${paragraphs(text)}</div>
          <button class="see-more" data-unclamp="${id}">…see more</button>`;
}

function bindSeeMore() {
  document.querySelectorAll('[data-unclamp]:not([data-bound])').forEach((btn) => {
    btn.dataset.bound = '1';
    const target = document.getElementById(btn.dataset.unclamp);
    if (target && target.scrollHeight <= target.clientHeight + 4) {
      target.classList.remove('clamp');
      btn.remove();
      return;
    }
    btn.addEventListener('click', () => {
      target?.classList.remove('clamp');
      btn.remove();
    });
  });
}

let entryCounter = 0;

function experienceEntry(job) {
  const id = `entry-${entryCounter++}`;
  const model = detailValue(job, 'Work Model');
  const type = detailValue(job, 'Employment Type');
  const place = [detailValue(job, 'Location'), model].filter(Boolean);
  const stack = detailValue(job, 'Main Stack');
  const months = monthsBetween(job.startDate, job.endDate);
  return `
  <li class="entry">
    ${logo(job.companyName, job.companyName === 'Freelance' ? 'fa-solid fa-laptop-code' : null, job.logo)}
    <div class="entry-body">
      <h3>${esc(job.title)}</h3>
      <p>${esc(job.companyName)}${type ? ` · ${esc(type)}` : ''}</p>
      <p class="muted">${monthYear(job.startDate)} – ${job.endDate ? monthYear(job.endDate) : 'Present'} · ${durationText(months)}</p>
      ${place.length ? `<p class="muted">${place.map(esc).join(' · ')}</p>` : ''}
      ${seeMoreBlock(id, job.description)}
      ${stack ? `<p class="skills"><i class="fa-regular fa-gem"></i> <span>${esc(stack)}</span></p>` : ''}
    </div>
  </li>`;
}

function educationEntry(item) {
  const id = `entry-${entryCounter++}`;
  const skills = detailValue(item, 'Skills Learned');
  return `
  <li class="entry">
    ${logo(item.companyName, 'fa-solid fa-graduation-cap', item.logo)}
    <div class="entry-body">
      <h3>${esc(item.companyName)}</h3>
      <p>${esc(item.title)}</p>
      <p class="muted">${monthYear(item.startDate)} – ${item.endDate ? monthYear(item.endDate) : 'Present'}</p>
      ${seeMoreBlock(id, item.description)}
      ${skills ? `<p class="skills"><i class="fa-regular fa-gem"></i> <span>${esc(skills)}</span></p>` : ''}
    </div>
  </li>`;
}

function projectEntry(project) {
  const id = `entry-${entryCounter++}`;
  const type = detailValue(project, 'Type');
  const team = detailValue(project, 'Development Team');
  const stack = detailValue(project, 'Stack');
  return `
  <li class="entry">
    ${logo(project.title, 'fa-solid fa-diagram-project', project.logo, true)}
    <div class="entry-body">
      <h3>${esc(project.title)}</h3>
      <p class="muted">${[type, team].filter(Boolean).map(esc).join(' · ')}</p>
      ${seeMoreBlock(id, project.description)}
      ${stack ? `<p class="skills"><i class="fa-regular fa-gem"></i> <span>${esc(stack)}</span></p>` : ''}
    </div>
  </li>`;
}

/* ---------- article (post) page ---------- */

function pageLang() {
  return document.querySelector('meta[http-equiv="content-language"]')?.getAttribute('content') === 'hy' ? 'hy' : 'en';
}

function publishedDate() {
  const value = document.querySelector('meta[property="article:published_time"]')?.getAttribute('content');
  return value ? new Date(value) : null;
}

function renderPostPage() {
  const container = document.getElementById('container');
  const lang = pageLang();
  const date = publishedDate();
  const name = lang === 'hy' ? PROFILE.nameArm : PROFILE.name;

  document.body.classList.add('post-page');

  const shell = document.createElement('div');
  shell.innerHTML = `
  ${topNav('posts')}
  <div class="page post-layout">
    <aside class="left-col">
      <section class="card mini-profile">
        <div class="cover"></div>
        <a href="/"><img class="avatar-md" src="${PROFILE.avatar}" alt="${PROFILE.name}"></a>
        <a href="/" class="mini-name">${PROFILE.name}</a>
        <p class="mini-headline" id="mini-headline">Senior Software Engineer</p>
        <p class="mini-location" id="mini-location"></p>
        <a href="/" class="mini-link">View profile</a>
      </section>
    </aside>

    <main class="center-col">
      <article class="card post">
        <header class="post-head">
          <a href="/"><img class="avatar-sm" src="${PROFILE.smallAvatar}" alt=""></a>
          <div class="post-author">
            <a href="/" class="author-name">${name}</a>
            <p class="author-headline" id="author-headline">Senior Software Engineer</p>
            <p class="post-date" id="post-date">${
              date ? `<span title="${esc(fullDate(date, lang))}">${shortAgo(date)}</span> · ${esc(fullDate(date, lang))} · ` : ''
            }<i class="fa-solid fa-earth-americas"></i></p>
          </div>
        </header>
        <div id="post-lang"></div>
        <div id="post-body"></div>
      </article>
    </main>

    <aside class="right-col">
      <section class="card side-card" id="more-posts" hidden>
        <h3>${lang === 'hy' ? 'Այլ հոդվածներ' : 'More articles'}</h3>
        <ul class="mini-posts"></ul>
      </section>
      <footer class="site-footer">© ${new Date().getFullYear()} ${PROFILE.name} · meruzh.com</footer>
    </aside>
  </div>`;

  // Move the original article node into the post card so the article itself stays untouched.
  shell.querySelector('#post-body').appendChild(container);
  container.classList.add('active');
  while (shell.firstChild) document.body.appendChild(shell.firstChild);
}

function fillPostPage(data) {
  bindSearch(data);
  bindContact(data);

  const text = headline(data);
  document.getElementById('author-headline').textContent = text;
  document.getElementById('mini-headline').textContent = text;
  document.getElementById('mini-location').textContent = data.currentLocation || '';

  const current = data.publications.find((p) => articlePath(p.link) === articlePath(location.pathname));

  if (current && !publishedDate()) {
    const date = new Date(current.dateString);
    document.getElementById('post-date').innerHTML =
      `<span>${shortAgo(date)}</span> · ${esc(fullDate(date, pageLang()))} · <i class="fa-solid fa-earth-americas"></i>`;
  }

  if (current) {
    const otherLink = current.armenianLink || current.englishLink;
    const other = otherLink && data.publications.find((p) => articlePath(p.link) === articlePath(otherLink));
    if (other) {
      const label = current.armenianLink ? 'Կարդալ հայերեն' : 'Read in English';
      document.getElementById('post-lang').innerHTML = `
        <a class="lang-switch" href="${esc(other.link)}">
          <i class="fa-solid fa-language"></i> ${label}
        </a>`;
    }
  }

  const lang = pageLang();
  const more = visiblePosts(data)
    .concat(data.publications.filter((p) => p.hide))
    .filter((p) => articlePath(p.link) !== articlePath(location.pathname))
    .filter((p) => (lang === 'hy') === isArmenian(p.title))
    .slice(0, 5);

  if (more.length) {
    const card = document.getElementById('more-posts');
    card.querySelector('ul').innerHTML = more.map(miniPost).join('');
    card.hidden = false;
  }
}

/* Used by articles with inline video previews. */
function playVideo(wrapperId, videoSrc) {
  const wrapperElement = document.getElementById(wrapperId);
  wrapperElement.style.height = '350px';

  const preloader = document.createElement('img');
  preloader.className = 'video-preloader';
  preloader.src = '/images/video-preloader.gif';

  const video = document.createElement('video');
  video.src = videoSrc;
  video.muted = true;
  video.loop = true;
  video.autoplay = true;

  wrapperElement.innerHTML = '';
  wrapperElement.appendChild(preloader);
  wrapperElement.appendChild(video);

  video.addEventListener('playing', () => preloader.remove());
}
