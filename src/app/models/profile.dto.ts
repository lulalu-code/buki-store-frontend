import { Product } from "./product.dto";

export class ProfileDTO {
    id?: string;
    name:string;
    email:string;
    zone:string;
    profile_image: string;
    products: Product[];

    constructor(
        name: string,
        email: string,
        zone: string,
        profile_image: string,
        products: Product[]
      ) {
        this.name = name;
        this.email = email;
        this.zone = zone;
        this.profile_image = profile_image;
        this.products = products;
      }
}
