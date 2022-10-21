import {makeAutoObservable} from "mobx";

class AsideStore {
    public asideVisible = false;

    constructor() {
        makeAutoObservable(this)
    }

    public toggleAside = () => {
        this.asideVisible = !this.asideVisible;
    };

    public closeAside = () => {
        this.asideVisible = false;
    }

    public openAside = () => {
        this.asideVisible = true;
    }
}

export default new AsideStore();