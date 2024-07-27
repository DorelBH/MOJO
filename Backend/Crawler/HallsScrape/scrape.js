const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// פונקציה לשמירת נתונים ל- providers.json
function saveProviders(providers) {
  const currentData = JSON.parse(fs.readFileSync('providers.json', 'utf8') || '[]');
  const newData = [...currentData, ...providers];
  fs.writeFileSync('providers.json', JSON.stringify(newData, null, 2));
  console.log('Data successfully written to providers.json');
}

// פונקציה לניקוי כתובת מהחלק 'ישראל' לאתר מיט מיט בלבד
function cleanAddress(address) {
  return address ? address.replace(', ישראל', '').trim() : '';
}

// פונקציה לשאיבת נתונים מהאתר הראשון
const baseUrl1 = 'https://www.mitchatnim.co.il';
async function scrapeProviderDetails1(providerUrl) {
  const response = await axios.get(providerUrl);
  const html = response.data;
  const $ = cheerio.load(html);

  let description = $('#secDescription .text').text().trim();
  if (description.includes('רוצה לשמוע על ספקים דומים? לחץ כאן')) {
    description = 'ספק זה לא מסר מידע נוסף על שירותיו.';
  }
  
  let address = $('.address').text().trim().split('\n')[0].trim();

  const phone = $('.phone-number').text().trim();
  const gallery = [];
  $('#divGalleryContainer .image img').each((index, element) => {
    gallery.push($(element).attr('data-src') || $(element).attr('src'));
  });

  const priceText = $('.filter-box .filter-item .title:contains("מחיר למנה")').next().find('p').text().trim();
  const price = priceText ? `${priceText} (למנה)` : 'לא זמין';

  return { description, address, phone, gallery, price };
}

async function scrapeProviders1() {
  const providers = [];
  const categoryUrls = [
    { url: 'https://www.mitchatnim.co.il/wedding/event-hall/', lastPage: 17 },
    { url: 'https://www.mitchatnim.co.il/wedding/events-gardens/', lastPage: 11 }
  ];

  for (const category of categoryUrls) {
    for (let page = 1; page <= category.lastPage; page++) {
      const response = await axios.get(`${category.url}page${page}/`);
      const html = response.data;
      const $ = cheerio.load(html);
      const providerElements = $('div.item.non-promoted');

      for (let index = 0; index < providerElements.length; index++) {
        const element = providerElements[index];
        const name = $(element).find('.name').text().trim();
        const imageUrl = $(element).find('img').attr('src') || $(element).find('img').attr('data-src');
        const briefDescription = $(element).find('.description p').text().trim();
        const providerUrl = baseUrl1 + $(element).find('a').attr('href');

        console.log(`Scraping provider: ${name}`);
        const { description, address, phone, gallery, price } = await scrapeProviderDetails1(providerUrl);

        providers.push({
          name,
          imageUrl,
          briefDescription,
          description,
          address,
          phone,
          gallery,
          price
        });
      }
    }
  }

  saveProviders(providers);
}

// פונקציה לשאיבת נתונים מהאתר השני
const baseUrl2 = 'https://www.mit4mit.co.il';
const categoryUrl = `${baseUrl2}/top/54719c5d3be563f2f305921e/?onlyPhone=&page=`;
async function scrapeProviderDetails2(providerUrl) {
  const response = await axios.get(providerUrl);
  const html = response.data;
  const $ = cheerio.load(html);

  const description = $('div.prettyParagraph .bizDescriptionText').text().trim();
  
  const gallery = [];
  $('div.tabcontent.styledBorder a.galleryPicWrapper img').each((index, element) => {
    const imageUrl = $(element).attr('src');
    console.log(`Found gallery image: ${imageUrl}`);
    gallery.push(imageUrl);
  });

  return { description, gallery };
}

async function scrapeProviders2() {
  const providers = [];

  for (let page = 1; page <= 5; page++) {
    const response = await axios.get(`${categoryUrl}${page}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const providerElements = $('.bizLinkDiv');

    if (providerElements.length === 0) break;

    for (let index = 0; index < providerElements.length; index++) {
      const element = providerElements[index];
      const name = $(element).find('.bizName h3').text().trim();
      const imageUrl = $(element).find('.businessImageWrapper img').attr('src');
      const briefDescription = $(element).find('.categoriesLine').text().trim();
      let address = $(element).find('.bizDetails meta[itemprop="address"]').attr('content');
      address = cleanAddress(address);
      const price = $(element).find('.bizExtraDetails meta[itemprop="priceRange"]').attr('content') || 'לא זמין';
      const phone = $(element).find('.bizExtraDetails meta[itemprop="telephone"]').attr('content');

      if (!phone) continue;

      const providerUrl = `${baseUrl2}/biz/${$(element).attr('id').split('_')[1]}`;

      console.log(`Scraping provider: ${name}`);
      const { description: detailedDescription, gallery } = await scrapeProviderDetails2(providerUrl);

      providers.push({
        name,
        imageUrl,
        briefDescription,
        description: detailedDescription,
        address,
        price,
        phone,
        gallery
      });
    }
  }

  saveProviders(providers);
}

// פונקציה להסרת ספקים כפולים
function removeDuplicateProviders() {
  const providers = JSON.parse(fs.readFileSync('providers.json', 'utf8') || '[]');
  const uniqueProviders = new Map();

  for (const provider of providers) {
    if (uniqueProviders.has(provider.name)) {
      const existingProvider = uniqueProviders.get(provider.name);
      if (existingProvider.imageUrl) continue; // שמור את הספק עם התמונה
    }
    uniqueProviders.set(provider.name, provider);
  }

  fs.writeFileSync('providers.json', JSON.stringify(Array.from(uniqueProviders.values()), null, 2));
  console.log('Duplicate providers removed and data successfully written to providers.json');
}

// קריאה לשתי הפונקציות הראשיות לשאיבת הנתונים ולאחר מכן להסרת ספקים כפולים
(async () => {
  try {
    await scrapeProviders1();
    await scrapeProviders2();
    removeDuplicateProviders();
  } catch (error) {
    console.error(error);
  }
})();
