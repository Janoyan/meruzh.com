const title = 'Cursor in MongoDB';
const description = "In this short article, I would like to tell some basics about the working mechanism of the MongoDB cursor.";
const publishedTime = new Date('09-28-2019').toISOString();
const url = 'https://meruzh.com/articles/cursor-in-mongo-db';
const imageUrl = '/images/cursor-in-mongodb.png';

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
    <meta property="al:web:url" content="${url}"/>
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
