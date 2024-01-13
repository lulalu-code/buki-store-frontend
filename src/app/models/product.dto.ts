export class Product {
    id?:string;
    title:string;
    description:string;
    author_name:string;
    category:string;
    cm_height:number|undefined;
    cm_width:number|undefined;
    cm_length:number|undefined;
    is_customable:boolean;
    imageURL:string;
    price:number|undefined;
    created_at: Date;

    constructor(
        id:string,
        title:string,
        description:string,
        author_name:string,
        category:string,
        cm_height:number|undefined,
        cm_width:number|undefined,
        cm_length:number|undefined,
        is_customable:boolean,
        imageURL:string,
        price:number|undefined,
        created_at: Date,
      ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author_name = author_name;
        this.category = category;
        this.cm_height = cm_height;
        this.cm_width = cm_width;
        this.cm_length = cm_length;
        this.is_customable = is_customable;
        this.imageURL = imageURL;
        this.price = price;
        this.created_at = created_at;
      }
}
