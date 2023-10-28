const title = 'Six tips to speed up Node.js Apps development';
const description = "This article highlights the six most important tips I have learned by analyzing my previous projects from the last few years. In it, I have compiled a list of recommendations to help in facilitating the development process of node.js apps. There aren't only six tips, of course, I've only listed the six most important ones according to my experience.";
const publishedTime = new Date('12-16-2020').toISOString();
const url = 'https://meruzh.com/articles/6-tips-to-speed-up-node-js-apps-develop';
const imageUrl = '/images/node-js.jpg';

const result = `
    <title>${title}</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1"/>
    <meta property="og:site_name" content="meruzh.com"/>
    <meta property="og:type" content="article"/>
    <meta property="article:published_time" content="${publishedTime}"/>
    <meta name="title" content="${title}"/>
    <meta property="og:title" content="${title}"/>
    <meta name="description" content="${description}"/>
    <meta property="og:description" content="${description}"/>
    <meta property="og:url" content="${url}"/>
    <meta property="al:web:url"content="${url}"/>
    <meta property="og:image" content="${imageUrl}"/>
    <meta property="article:author" content="Meruzh Janoyan"/>
    <meta name="author" content="Meruzh Janoyan"/>
    <meta name="robots" content="index,follow,max-image-preview:large"/>
    <meta name="referrer" content="unsafe-url"/>
    <meta property="twitter:title" content="${title}"/>
    <meta name="twitter:site" content=""/>
    <meta property="twitter:description" content="${description}"/>
    <meta name="twitter:image:src" content="${imageUrl}"/>
    <meta name="twitter:card" content="summary_large_image"/>
`;

console.log(result);
