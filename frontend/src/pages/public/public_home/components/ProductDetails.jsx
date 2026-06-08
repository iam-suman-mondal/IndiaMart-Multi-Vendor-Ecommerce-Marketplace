import { useParams } from "react-router";
import dummyimg from "../images/dummy_image.png";

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
];

export default function ProductDetails() {
  const { id } = useParams();

  const product = productArray.find(
    (p) => p.productId === Number(id)
  );

  if (!product) {
    return (
      <h3 className="text-center mt-5">
        Product not found
      </h3>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      <div className="card border-0 shadow-sm">
        <div className="row g-0">

          {/* Product Image */}
          <div className="col-12 col-lg-5">
            <div className="h-100 p-3">
              <img
                src={product.image}
                alt={product.productName}
                className="img-fluid w-100 rounded"
                style={{
                  objectFit: "cover",
                  minHeight: "300px",
                  maxHeight: "500px",
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="col-12 col-lg-7">
            <div className="d-flex flex-column h-100 p-4">

              <h2 className="fw-bold mb-3">
                {product.productName}
              </h2>

              <h3 className="text-success fw-bold mb-3">
                ₹{product.price}
              </h3>

              <p className="text-muted mb-4">
                {product.productDescription}
              </p>

              <div className="mb-3">
                <span className="fw-semibold">Brand:</span>{" "}
                {product.brand}
              </div>

              <div className="mb-4">
                <span className="fw-semibold">Category:</span>{" "}
                {product.category}
              </div>

              {/* Push buttons to bottom */}
              <div className="mt-auto">
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <button className="btn btn-warning px-4">
                    Add to Cart
                  </button>

                  <button className="btn btn-outline-primary px-4">
                    Add to Wishlist
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}