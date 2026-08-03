import React from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/CartSlice";
export default function ProductCard({ product }) {
   const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };
  return (
    <>
      <style>{`
        .card-hover-effect {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
          box-shadow 0.3s ease;
        }

        .card-hover-effect:hover {
          transform: scale(1.04);
          box-shadow:0 10px 20px rgba(0,0,0,0.12)!important;
        }
      `}</style>


      <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden card-hover-effect bg-white">


        <Link
          to={`/product/${product.productId}`}
          className="text-decoration-none text-dark h-100 d-flex flex-column"
        >


          {/* IMAGE */}

          <div 
            className="bg-light d-flex align-items-center justify-content-center"
            style={{height:"200px"}}
          >

            <img
              src={product.image}
              className="w-100 h-100"
              alt={product.name}
              style={{
                objectFit:"cover"
              }}
            />

          </div>



          {/* BODY */}

          <div className="card-body d-flex flex-column p-3">


            {/* PRODUCT NAME */}

            <h6 className="card-title text-truncate mb-1 fw-semibold">
              {product.name}
            </h6>



            {/* BRAND */}

            <p className="small text-muted mb-2">

              <span className="fw-medium text-secondary">
                Brand:
              </span>

              {" "}{product.brand}

            </p>



            {/* DESCRIPTION */}

            <p
              className="small text-secondary mb-3"
              style={{
                overflow:"hidden",
                display:"-webkit-box",
                WebkitLineClamp:2,
                WebkitBoxOrient:"vertical",
                minHeight:"38px"
              }}
            >

              {product.description}

            </p>



            {/* CATEGORY */}

            <span className="badge bg-light text-secondary mb-2 w-fit">
              {product.category}
            </span>



            {/* PRICE */}

            <div className="mt-auto">

              <h5 className="text-dark fw-bold mb-0">

                ₹{product.price?.toLocaleString("en-IN")}

              </h5>

            </div>


          </div>

        </Link>



        {/* ADD CART BUTTON */}

         <div className="px-3 pb-3 pt-0">
        <button className="btn btn-primary w-100 fw-medium" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>
      </div>


      </div>

    </>
  );
}