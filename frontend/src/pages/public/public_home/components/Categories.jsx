import { useParams } from 'react-router'
import ProductCard from '../../shared/components/ProductCard'
import dummyimg from '../images/dummy_image.png'

const Products =   [
  {
    "productId": 1,
    "productName": "Wireless Bluetooth Headphones",
    "productDescription": "Over-ear wireless headphones with noise cancellation and 30-hour battery life.",
    "brand": "SoundMax",
    "category": "electronics",
    "price": 2999,
    "image": dummyimg
  },
  {
    "productId": 2,
    "productName": "Smart Watch Pro",
    "productDescription": "Fitness tracking smartwatch with heart rate monitoring and GPS.",
    "brand": "FitTech",
    "category": "electronics",
    "price": 4999,
    "image": dummyimg
  },
  {
    "productId": 3,
    "productName": "Gaming Mouse",
    "productDescription": "Ergonomic RGB gaming mouse with programmable buttons.",
    "brand": "GameX",
    "category": "gaming",
    "price": 1499,
    "image": dummyimg
  },
  {
    "productId": 4,
    "productName": "Men's Casual T-Shirt",
    "productDescription": "Premium cotton round-neck t-shirt for everyday comfort.",
    "brand": "UrbanWear",
    "category": "fashion",
    "price": 799,
    "image": dummyimg
  },
  {
    "productId": 5,
    "productName": "Women's Running Shoes",
    "productDescription": "Lightweight running shoes with breathable mesh upper.",
    "brand": "RunFit",
    "category": "footwear",
    "price": 2499,
    "image": dummyimg
  },
];
export default function CategoryComponent(){
  const{category}=useParams();
  const filteredProducts = Products.filter(
    (item) => item.category === category
  );
  return (
   <div className="container py-4">
  <h2 className="mb-4 text-capitalize text-center text-md-start">
    {category} Products
  </h2>

  <div className="row">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div
          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          key={product.productId}
        >
          <ProductCard product={product} />
        </div>
      ))
    ) : (
      <div className="text-center">
        <p>No products found in this category.</p>
      </div>
    )}
  </div>
</div>
  )
}