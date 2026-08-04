import React, { useEffect, useState } from "react";
import ProductCard from "../../shared/components/ProductCard";
import { getBestSellingProducts } from "../../../../apis/services/product-service"; // adjust path

export default function BestSellers() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchBestSellingProducts();
  }, []);

  const fetchBestSellingProducts = async () => {
    try {
      const data = await getBestSellingProducts();
      console.log(data)
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch best selling products", error);
    }
  };


  return (
    <div className="bg-light rounded-4 p-2 p-sm-3 p-md-4 mx-1 mx-sm-2 my-4 shadow-sm">

      <h2 className="text-center text-dark fw-bold mb-3 mb-md-4 fs-3 fs-md-2">
        Best Sellers
      </h2>

      <div className="row g-2 g-sm-3 g-md-4 row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">

        {products.map((product) => (
          <div 
            className="col d-flex align-items-stretch" 
            key={product.productId}
          >
            <div className="w-100">
              <ProductCard product={product} />
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}