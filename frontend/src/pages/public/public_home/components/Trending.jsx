import { Link } from "react-router";
import ProductCard from "../../shared/components/ProductCard";
import dummyimg from "../images/dummy_image.jpeg";

const productArray =   [
  {
    "productId": 1,
    "productName": "Wireless Bluetooth Headphones",
    "productDescription": "Over-ear wireless headphones with noise cancellation and 30-hour battery life.",
    "brand": "SoundMax",
    "category": "Electronics",
    "price": 2999,
    "image": dummyimg
  },
  {
    "productId": 2,
    "productName": "Smart Watch Pro",
    "productDescription": "Fitness tracking smartwatch with heart rate monitoring and GPS.",
    "brand": "FitTech",
    "category": "Wearables",
    "price": 4999,
    "image": dummyimg
  },
  {
    "productId": 3,
    "productName": "Gaming Mouse",
    "productDescription": "Ergonomic RGB gaming mouse with programmable buttons.",
    "brand": "GameX",
    "category": "Accessories",
    "price": 1499,
    "image": dummyimg
  },
  {
    "productId": 4,
    "productName": "Men's Casual T-Shirt",
    "productDescription": "Premium cotton round-neck t-shirt for everyday comfort.",
    "brand": "UrbanWear",
    "category": "Fashion",
    "price": 799,
    "image": dummyimg
  },
  {
    "productId": 5,
    "productName": "Women's Running Shoes",
    "productDescription": "Lightweight running shoes with breathable mesh upper.",
    "brand": "RunFit",
    "category": "Footwear",
    "price": 2499,
    "image": dummyimg
  },
{
    "productId": 6,
    "productName": "Mechanical Gaming Keyboard",
    "productDescription": "Tactile blue-switch keyboard with customizable per-key RGB backlighting.",
    "brand": "GameX",
    "category": "Accessories",
    "price": 3499,
    "image": dummyimg
  }
];

export default function TopTrending() {
  return (
    <div className="bg-light rounded-4 p-4 mx-2 my-4 shadow-sm">
      <h2 className="text-center text-dark fw-bold mb-4">
        Top Trends
      </h2>
      
      
      <div className="row g-4 justify-content-center row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6">
        {productArray.map((product) => {
          return (
            <div className="col d-flex align-items-stretch" key={product.productId}>
              <div className="w-100">
                <ProductCard product={product} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}