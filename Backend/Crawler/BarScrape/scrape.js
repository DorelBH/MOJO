const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const baseUrl = 'https://www.mit4mit.co.il';
const categoryUrl = `${baseUrl}/category/19/?sort=reviewsDown&&page=`;

async function scrapeProviderDetails(providerUrl) {
  const response = await axios(providerUrl);
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
        gallery // Added gallery images
      });
    }
  }

  fs.writeFileSync('providers.json', JSON.stringify(providers, null, 2));
  console.log('Data successfully written to providers.json');
}

scrapeProviders().catch(console.error);
