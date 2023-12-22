import { load } from 'cheerio';
import type { AdvertisementsData } from '../typings/AdvertisementData';

/**
 *
 * @param {string} url
 * @returns
 */
export async function getAdvertisement(url: string): AdvertisementsData {
  try {
    if (!url.startsWith('https://www.itemsatis.com')) return undefined;

    const responseURL = (await fetch(url)).url;
    if (!responseURL.startsWith(url)) return undefined;

    const htmlData = await (await fetch(url)).text();
    const $ = load(htmlData, null, false);

    const lastUpdate = $('span.advert-last-update').first().attr('data-tooltip');
    const id = $('div.post-detail-information h1 small').first().text();
    const title = $('div.post-detail-information h1').first().text().split(' ').slice(1).join(' ');
    const shortDescription = $('p.ilan-kisa-aciklama').first().text();
    const author = $('div.seller-info-left a').first().text();
    const successfulTransaction = $('div.seller-info-right b').first().text();
    const price = $('div.price-box div').first().text().replaceAll(',', '.').replace(/[\n\s]/g, '');
    const stockCount = $('div.stock-box b').first().text();
    const longDescription = $('div.col-md-12.no-padding p').eq(1).text();
    const bannerURL = $('div.post-detail-main img').first().attr('src');
    const avatarURL = $('div.seller-information-box-left img').first().attr('src');

    const badgeSelector = $('div.post-detail-boxes div');
    const badges = badgeSelector.toArray().map((data) => {
      const badgeSelect = load(data);
      const badge = badgeSelect('span').first().text();

      return badge;
    });

    return {
      lastUpdate,
      id,
      title,
      shortDescription,
      author,
      successfulTransaction,
      price,
      stockCount,
      longDescription,
      badges,
      bannerURL,
      avatarURL,
    };
  }
  catch (err) {
    return undefined;
  }
}
