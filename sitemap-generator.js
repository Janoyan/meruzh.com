const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const folderPath = './articles';
const sitemapPath = './sitemapx.xml';

const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

const sitemapFooter = `
</urlset>`;

let sitemapContent = sitemapHeader;

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // Check if the file is an HTML file
    if (path.extname(file).toLowerCase() === '.html') {
      const htmlContent = fs.readFileSync(filePath, 'utf8');
      const $ = cheerio.load(htmlContent);

      const url = $('meta[property="og:url"]').attr('content');
      const date = $('meta[property="article:published_time"]').attr('content');

      if (url && date) {
        sitemapContent += `
  <url>
    <loc>${url}</loc>
    <lastmod>${date}</lastmod>
  </url>`;
      }
    }
  });

  sitemapContent += sitemapFooter;

  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('Sitemap generated and saved to', sitemapPath);
});
