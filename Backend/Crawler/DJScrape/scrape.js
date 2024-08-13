const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path'); // Import path module

const baseUrl = 'https://www.mit4mit.co.il';
const categoryUrl = `${baseUrl}/category/3?onlyPhone&&page=`;
const outputDir = path.join(__dirname, 'DJScrape'); // Set output directory

async function scrapeProviderDetails(providerUrl) {
  const response = await axios.get(providerUrl);
  const html = response.data;
  const $ = cheerio.load(html);

  const description = $('div.prettyParagraph .bizDescriptionText').text().trim();
  
  // Scrape gallery images
  const gallery = [];
  $('div.tabcontent.styledBorder a.galleryPicWrapper img').each((index, element) => {
    const imageUrl = $(element).attr('src');
    console.log(`Found gallery image: ${imageUrl}`);
    gallery.push(imageUrl);
  });

  return { description, gallery };
}

async function scrapeProviders() {
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
      const briefDescription = $(element).find('.bizDetails .categoriesLine').text().trim();
      let address = $(element).find('.bizDetails meta[itemprop="address"]').attr('content');
      if (address && address.includes(', ישראל')) {
        address = address.replace(', ישראל', '');
      }
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
        gallery
      });
    }
  }

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save providers to JSON file inside DJScrape directory
  fs.writeFileSync(path.join(outputDir, 'providers.json'), JSON.stringify(providers, null, 2));
  console.log('Data successfully written to DJScrape/providers.json');
}

// Run the scrapeProviders function every 24 hours
setInterval(() => {
  console.log('Starting provider scraping...');
  scrapeProviders().catch(console.error);
}, 86400000); // 24 hours in milliseconds

// Run the scrape once immediately upon starting the script
scrapeProviders().catch(console.error);
