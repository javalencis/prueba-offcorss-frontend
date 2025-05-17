import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css'
import "../styles/productdetail.scss";
interface Product {
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
export const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          `/api-vtex/api/catalog_system/pub/products/search?fq=productId:${productId}`
        );
        const data: Product[] = await res.json();
        setProduct(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, []);
  console.log(product);
  return (
    <div className="productdetails">
      <div className="productdetails__images">
        <img src={product?.items[0]?.images?.[0]?.imageUrl} alt="" />
      </div>
      <div className="productdetails__info">
        <h3>{product?.productTitle}</h3>

        <div className="productdetails__info-brand">
          <p>{product?.productId}</p>
          <p>{product?.brand}</p>
        </div>
        <div className="productdetails__info-sizes">
          Tallas
          {product?.items.map((item) => (
            <div key={item.itemId} className="productdetails__info-size">
              {item.Talla[0]}
            </div>
          ))}
        </div>
        <div className="productdetails__info-color">
          <p >Color</p>
          <div
            style={{ backgroundColor: product?.items[0]["Codigo de color"][0] }}
            title={product?.Color[0]}
            className="productdetails__info-color--variation"
          >
            
          </div>
          {}
        </div>

        <p className="productdetails__info-description">
          <p className="productdetails__info-description--title">Descripción</p>
          {product?.description}
        </p>
      </div>
    </div>
  );
};
