export class Product {
    id?:string;
    title:string;
    description:string;
    author_name:string;
    category:string;
    height:number;
    width:number;
    length:number;
    is_customable:boolean;
    imageURL:string;
    price:number;

    constructor(
        id:string,
        title:string,
        description:string,
        author_name:string,
        category:string,
        height:number,
        width:number,
        length:number,
        is_customable:boolean,
        imageURL:string,
        price:number
      ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author_name = author_name;
        this.category = category;
        this.height = height;
        this.width = width;
        this.length = length;
        this.is_customable = is_customable;
        this.imageURL = imageURL;
        this.price = price;
      }
}
