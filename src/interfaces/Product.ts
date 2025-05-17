
export interface Product {
  productId: string;
  productTitle: string;
  brand: string;
  description: string;
  Color: string[];
  items: {
    itemId: string;
    "Codigo de color": string[];
    Talla: string[];
    images: {
      imageUrl: string;
      imageText: string;
    }[];
    sellers: {
      commertialOffer: {
        Price: number;
        PriceWithoutDiscount: number;
      };
    }[];
  }[];
}

export interface ProductListData { 
  data: Product[];
  total: number;
  from: number;
  to: number;
}