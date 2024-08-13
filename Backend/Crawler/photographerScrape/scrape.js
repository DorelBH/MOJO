const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// תיקייה לשמירת הקבצים
const outputDir = path.join(__dirname, 'PhotographerScrape'); 

// פונקציה לשמירת הנתונים ל- providers.json בתוך התיקייה PhotographerScrape
function saveProviders(providers) {
  const outputPath = path.join(outputDir, 'providers.json');
  fs.writeFileSync(outputPath, JSON.stringify(providers, null, 2));
  console.log('Data successfully written to providers.json');
}

// פונקציה לשאיבת פרטי ספקים מהדף של הספק
async function scrapeProviderDetails(providerUrl) {
  const response = await axios.get(providerUrl);
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
  const baseUrl = 'https://www.mit4mit.co.il';
  const categoryUrl = `${baseUrl}/top/54719c753be563f2f3059220?onlyPhone&&page=`;

  for (let page = 1; page <= 15; page++) {
    const response = await axios.get(`${categoryUrl}${page}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const providerElements = $('.bizLinkDiv');

    if (providerElements.length === 0) break;

    for (let index = 0; index < providerElements.length; index++) {
      const element = providerElements[index];
      const name = $(element).find('.bizName h3').text().trim();
      const imageUrl = $(element).find('.businessImageWrapper img').attr('src');
      const briefDescription = $(element).find('.bizDetails .categoriesLine').text().trim();
      let address = $(element).find('.bizDetails meta[itemprop="address"]').attr('content');
      const phone = $(element).find('.bizExtraDetails meta[itemprop="telephone"]').attr('content');

      if (!phone) continue; // דלג על ספקים ללא מספר טלפון

      // הסרת ", ישראל" מהכתובת אם קיים
      if (address && address.includes(', ישראל')) {
        address = address.replace(', ישראל', '');
      }

      const providerUrl = `${baseUrl}${$(element).parent().attr('href')}`;

      console.log(`Scraping provider: ${name}`);
      const { description: detailedDescription, gallery } = await scrapeProviderDetails(providerUrl);

      providers.push({
        name,
        imageUrl,
        briefDescription,
        description: detailedDescription,
        address,
        phone,
        gallery
      });
    }
  }

  saveProviders(providers);
}

// תזמון הרצת הסקריפט כל 24 שעות
const runInterval = 24 * 60 * 60 * 1000; // 24 שעות במילישניות
setInterval(async () => {
  try {
    console.log('Starting provider scraping...');
    await scrapeProviders();
  } catch (error) {
    console.error(error);
  }
}, runInterval);

// בדיקה אם התיקייה קיימת ואם לא, יצירתה
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// קריאה ראשונית לפונקציה לסריקת ספקים
scrapeProviders().catch(console.error);

console.log('Scraping scheduled to run every 24 hours');
