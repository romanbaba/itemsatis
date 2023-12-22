import { load } from 'cheerio';
import type {
  Last10CommentData,
  MedalData,
  UserData,
  UserForAdvertisementsData,
} from '../typings/UserData';

/**
 *
 * @param {string} username
 * @param [isStore=false]
 * @returns
 */
export async function getUser(username: string, isStore: boolean = false): UserData {
  try {
    const url = isStore
      ? `https://www.itemsatis.com/p/${username}`
      : `https://www.itemsatis.com/profil/${username}.html`;
    const responseURL = (await fetch(url)).url;
    if (!responseURL.startsWith(url)) return undefined;

    const htmlData = await (await fetch(url)).text();
    const $ = load(htmlData, null, false);

    const lastSeen = $('div.userDetails small').first().text();
    const createdAt = $('div.userRegister').first().text().split(':')[1]?.trim();
    const ratingOutOf10 = $('div.userReviewBox span').first().text();
    const storeRating = $('div.reviewCount').first().text();
    const avatarURL = $('div.userAvatar img').first().attr('src');
    const bannerURL = $('div.container.bannerContainer img').first().attr('src');
    const successfulTransaction = $('div.userPointPositive').first().text();
    const advertisementCount = $('span.badge.badge-default').first().text();
    const followers = $('span.badge.badge-default').eq(2).text();

    const medalSelector = $('div.userMedals div');
    const medals: MedalData[] = medalSelector.toArray().map((data) => {
      const medalData = data.attributes.find((a) => a.name === 'data-original-title')?.value;
      if (!medalData) {
        return { name: '', description: undefined };
      }

      const medalSelect = load(medalData);
      const name = medalSelect('b').first().text();
      const description = medalData.split('<br>')[1];

      return {
        name,
        description,
      };
    });

    const commentSelector = $('div div.panel-body div.row');
    const last10Comments: Last10CommentData[] = commentSelector
      .toArray()
      .map((data) => {
        const commentSelect = load(data);

        const author = commentSelect('div.content a.author').first().text();
        const _avatarURL = commentSelect('a.avatar img').first().attr('src');
        const date = commentSelect('.date').first().text();
        const description = commentSelect('div.text').first().text();
        const order = {
          category: commentSelect('div.postBoxDatas div.postBoxCategory').first().text(),
          name: commentSelect('div.postBoxDatas h3').first().text(),
          rates: commentSelect('div.rateBoxPoint')
            .toArray()
            .map((commentData) => {
              const ratingSelect = load(commentData);
              return {
                type: ratingSelect('b').first().text(),
                raiting: ratingSelect('span').first().text(),
              };
            }),
          bannerURL: commentSelect('div.postBoxProfile img').first().attr('src'),
        };

        return {
          author,
          date,
          description,
          avatarURL: _avatarURL,
          order,
        };
      })
      .slice(2)
      .filter((user) => user.author !== username);

    const advertisementSelector = $('div.AdvertBox-Main');
    const advertisements: UserForAdvertisementsData[] = advertisementSelector.toArray().map((data) => {
      const advertisementSelect = load(data);

      const title = advertisementSelect('div.AdvertBox-Title').first().text();
      const description = advertisementSelect('div.AdvertBox-ItemDesc').first().text();
      const price = advertisementSelect('div.AdvertBox-Price').first().text();
      const _bannerURL = advertisementSelect('a img').first().attr('src');

      return {
        title,
        description,
        price,
        bannerURL: _bannerURL,
      };
    });

    return {
      advertisementCount,
      advertisements,
      avatarURL,
      bannerURL,
      createdAt,
      followers,
      last10Comments,
      lastSeen,
      medals,
      ratingOutOf10,
      storeRating,
      successfulTransaction,
      username,
    };
  }
  catch (err) {
    return undefined;
  }
}
