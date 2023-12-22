# İtemsatis
İtemsatış'ın resmii web sitesi için kazıma yapabilen modül.

## Kurulum
```bash
npm i itemsatis
pnpm add itemsatis
yarn add itemsatis
```

## FAQ
### Bir kullanıcı verisi nasıl çekebilirim?
```js
/* import { getUser } from 'itemsatis'; */
const { getUser } = require('itemsatis');

(async () => {
    const user = await getUser('itemsatiscom', false);
    /*
        Uyarı:
         Bir kullanıcı verisi çekmeye çalışırken eğer
         kullanıcı bir mağaza ise 
         ikinci parametreyi true olarak ayarlayınız.
    */
    if (!user) {
        return console.error('Kullanıcı verisi bulunamadı.');
    }

    console.log(user);
})();
```

### Bir ilan verisi nasıl çekebilirim?
```js
/* import { getAdvertisement } from 'itemsatis'; */
const { getAdvertisement } = require('itemsatis');

(async () => {
    const ad = await getAdvertisement('https://www.itemsatis.com/discord/1-aylik-2x-boostlu-nitro-aninda-teslim-2135363.html');

    if (!ad) {
        return console.error('İlan verisi bulunamadı.');
    }

    console.log(ad);
})();
```
### Bir sorun mu yaşıyorsun?
Discord üzerinden bana ulaşabilirsiniz: https://discord.gg/altyapilar