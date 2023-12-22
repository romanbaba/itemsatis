export type UserData = Promise<User | undefined>;

export interface User {
    advertisementCount: string | null;
    advertisements: UserForAdvertisementsData[];
    avatarURL: string | undefined;
    bannerURL: string | undefined;
    createdAt: string | undefined;
    followers: string | null;
    last10Comments: Last10CommentData[];
    lastSeen: string;
    medals: MedalData[] | undefined;
    ratingOutOf10: string;
    storeRating: string | null;
    successfulTransaction: string | null;
    username: string;
}

export interface UserForAdvertisementsData {
    title: string;
    description: string;
    price: string;
    bannerURL: string | undefined;
}

export interface Last10CommentData {
    author: string;
    date: string;
    description: string;
    avatarURL: string | undefined;
    order: OrderData;
}

export interface OrderData {
    category: string;
    name: string;
    rates: OrderRateData[];
    bannerURL: string | undefined;
}

export interface OrderRateData {
    type: string;
    raiting: string;
}

export interface MedalData {
    name: string;
    description: string | undefined;
}