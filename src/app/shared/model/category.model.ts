export class Category {
    urlName: string;

    constructor(
        public name: string,
        public id?: number | string
    ) {
        this.urlName = name.trim().toLowerCase().split(' ').join('-');
    }
}