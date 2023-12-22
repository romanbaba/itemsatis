export type AdvertisementsData = Promise<Advertisement | undefined>;

export interface Advertisement {
    lastUpdate: string | undefined;
    id: string;
    title: string;
    shortDescription: string;
    author: string;
    successfulTransaction: string | null;
    price: string;
    stockCount: string;
    longDescription: string;
    badges: string[];
    bannerURL: string | undefined;
    avatarURL: string | undefined;
}