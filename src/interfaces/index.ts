
interface T {

}

export interface IImageItem extends T {
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
    id: number;
}

export interface IFilterOptions extends T {
    "NSFW categories": IFilterOption[];
    "Popular anime": IFilterOption[];
    nsfw: IFilterOption[];
    "nsfw part 2": IFilterOption[];
    "Popular games": IFilterOption[];
}

export interface IFetchImagesResponse extends T {
    prevPage: string;
    nextPage: string;
    imageList: IImageItem[];
    filterOptions: IFilterOptions;
}