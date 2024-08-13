const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.mit4mit.co.il';
const categoryUrl = `${baseUrl}/category/19/?sort=reviewsDown&&page=`;
const outputDir = path.join(__dirname, 'BarScrape'); // תיקייה עבור הקבצים

// פונקציה לסריקת פרטי הספקים
async function scrapeProviderDetails(providerUrl) {
  const response = await axios(providerUrl);
  const html = response.data;
  const $ = cheerio.load(html);

  const description = $('div.prettyParagraph .bizDescriptionText').text().trim();
  
  // סריקת תמונות גלריה
  const gallery = [];
  $('div.tabcontent.styledBorder a.galleryPicWrapper img').each((index, element) => {
    const imageUrl = $(element).attr('src');
    console.log(`Found gallery image: ${imageUrl}`);
    gallery.push(imageUrl);
  });

  return { description, gallery };
}

// פונקציה לסריקת ספקים
async function scrapeProviders() {
  const providers = [];

  for (let page = 1; page <= 6; page++) {
    const response = await axios(`${categoryUrl}${page}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const providerElements = $('.bizLinkDiv');

    if (providerElements.length === 0) break;

    for (let index = 0; index < providerElements.length; index++) {
      const element = providerElements[index];
      const name = $(element).find('.bizName h3').text().trim();
      const imageUrl = $(element).find('.businessImageWrapper img').attr('src');
      const briefDescription = $(element).find('.bizDetails .categoriesLine').text().trim();
      const address = $(element).find('.bizDetails meta[itemprop="address"]').attr('content');
      const price = $(element).find('.bizExtraDetails meta[itemprop="priceRange"]').attr('content') || 'לא זמין';
      const phone = $(element).find('.bizExtraDetails meta[itemprop="telephone"]').attr('content');

      if (!phone) continue; // דלג על ספקים ללא מספר טלפון

      const providerUrl = `${baseUrl}${$(element).parent().attr('href')}`;

      console.log(`Scraping provider: ${name}`);
      const { description: detailedDescription, gallery } = await scrapeProviderDetails(providerUrl);

      providers.push({
        name,
        imageUrl,
        briefDescription,
        description: detailedDescription,
        address,
        price,
        phone,
        gallery // הוספת תמונות גלריה
      });
    }
  }

  // בדיקה אם התיקייה קיימת ואם לא, יצירתה
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // שמירת הנתונים לקובץ JSON
  const outputPath = path.join(outputDir, 'providers.json');
  fs.writeFileSync(outputPath, JSON.stringify(providers, null, 2));
  console.log('Data successfully written to providers.json');
}

// תזמון הרצת הסקריפט כל 24 שעות
const runInterval = 24 * 60 * 60 * 1000; // 24 שעות במילישניות
setInterval(() => {
  console.log('Starting provider scraping...');
  scrapeProviders().catch(console.error);
}, runInterval);

console.log('Scraping scheduled to run every 24 hours');
