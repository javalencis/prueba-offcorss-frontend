import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import "../styles/productdetail.scss";
import type { Product } from "../interfaces/Product";
export const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          `https://prueba-offcorss-backend-production.up.railway.app/api/products/${productId}`
        );
        const data: Product[] = await res.json();
        setProduct(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, []);
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="productdetails">
      <button onClick={handleGoBack} className="productdetails__back-button">
        &larr; Volver
      </button>
      <div className="productdetails__container">
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
            <p>Color</p>
            <div
              style={{
                backgroundColor: product?.items[0]["Codigo de color"][0],
              }}
              title={product?.Color[0]}
              className="productdetails__info-color--variation"
            ></div>
          </div>

          <p className="productdetails__info-description">
            <p className="productdetails__info-description--title">
              Descripción
            </p>
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
};
