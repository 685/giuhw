
export type TFilterIdDataType = string;

interface T {
}

export interface IImageItem extends T {
    isVideo: boolean;
    id: string;
    url: string;
    channel: string;
    channelId: string;
    category: string;
    guild: string;
    author: string;
}

export interface IFilterOption extends T {

    name: string;
    id: TFilterIdDataType;
}


export enum EFilterOptions  {
    pop_anime="Popular anime",
    pop_games="Popular games",
    nsfw="nsfw",
    nsfw2="nsfw part 2",
    nsfw_cats="NSFW categories",
}

export interface IFilterOptions extends T {
    "NSFW categories": IFilterOption[];
    "Popular anime": IFilterOption[];
    nsfw: IFilterOption[];
    "nsfw part 2": IFilterOption[];
    "popular games": IFilterOption[];
}

export interface IFetchImagesResponse extends T {
    prevPage: string;
    nextPage: string;
    pageCount: number;
    imageList: IImageItem[];
    filterOptions: IFilterOptions;
}