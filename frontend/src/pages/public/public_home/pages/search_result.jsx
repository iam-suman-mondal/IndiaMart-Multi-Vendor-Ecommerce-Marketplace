import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "../../shared/components/ProductCard";
import { searchProducts } from "../../../../apis/services/product-service";


export default function SearchResults() {

  const [searchParams] = useSearchParams();

  const query = searchParams.get("productName") || "";


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    if(query){

      loadProducts();

    }

  }, [query]);




  const loadProducts = async () => {

    try {

      setLoading(true);


      console.log("Searching product:", query);


      const data = await searchProducts(query);


      console.log("Search result:", data);


      setProducts(data);


    } catch(error){

      console.error(
        "Failed to search products:",
        error
      );

      setProducts([]);

    }
    finally{

      setLoading(false);

    }

  };




  return (

    <div className="container py-4 py-md-5">


      {/* Loading */}

      {
        loading ?

        (
          <div className="text-center py-5">

            <div className="spinner-border text-primary"></div>

            <p className="mt-3">
              Searching products...
            </p>

          </div>
        )

        :

        products.length > 0 ?

        (

          <div className="row g-3 g-md-4 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">


            {
              products.map((product)=>(

                <div
                  className="col d-flex align-items-stretch"
                  key={product.productId}
                >

                  <div className="w-100">

                    <ProductCard product={product}/>

                  </div>


                </div>

              ))
            }


          </div>

        )

        :

        (

          <div
            className="card text-center p-5 border-0 shadow-sm rounded-4 my-4 mx-auto"
            style={{
              maxWidth:"520px"
            }}
          >

            <div className="fs-1 text-muted mb-3">
              🔍
            </div>


            <h4 className="fw-bold">
              No Matching Products
            </h4>


            <p className="text-muted">

              No products found for 
              <strong>
                {" "} "{query}"
              </strong>

            </p>


          </div>

        )

      }


    </div>

  );

}