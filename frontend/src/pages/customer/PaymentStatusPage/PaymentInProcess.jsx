import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { getCustomerOrderDetails } from "../../../apis/services/order-service";

export default function PaymentInProcess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId") || searchParams.get("order_id");

  const [statusMessage, setStatusMessage] = useState(
    "Verifying payment with gateway..."
  );


  useEffect(() => {
    if (orderId) {
      verifyAndRedirect();
    } else {
      navigate("/customer/failed-payment?reason=Missing+Order+ID");
    }
  }, [orderId]);


  const verifyAndRedirect = async () => {
    try {
      setStatusMessage("Checking order & payment status...");

      console.log("Fetching order details for:", orderId);


      const order = await getCustomerOrderDetails(orderId);

      console.log("Order details:", order);


      const status = order?.status?.toUpperCase();


      await new Promise((resolve) => setTimeout(resolve, 1000));


      if (
        status === "PAID" ||
        status === "SUCCESS" ||
        status === "COMPLETED" ||
        status === "CONFIRMED"
      ) {

        navigate(
          `/customer/success-payment?orderId=${orderId}`
        );


      } else if (
        status === "FAILED" ||
        status === "CANCELLED" ||
        status === "DECLINED"
      ) {

        navigate(
          `/customer/failed-payment?orderId=${orderId}&reason=${encodeURIComponent(
            "Payment Failed"
          )}`
        );


      } else {

        navigate(
          `/customer/failed-payment?orderId=${orderId}&reason=${encodeURIComponent(
            "Payment Pending or Incomplete"
          )}`
        );

      }


    } catch (error) {

      console.error("Payment verification failed:", error);


      navigate(
        `/customer/failed-payment?orderId=${orderId || ""}&reason=${encodeURIComponent(
          "Verification Error"
        )}`
      );

    }
  };


  return (
    <>
      <style>{`
        .process-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1.5rem;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
        }

        .pulse-loader {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(13, 110, 253, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
      `}</style>


      <div
        className="container py-5 d-flex align-items-center justify-content-center"
        style={{ minHeight: "75vh" }}
      >

        <div
          className="card process-card text-center p-4 p-sm-5 w-100"
          style={{ maxWidth: "500px" }}
        >

          <div className="pulse-loader mb-4">
            <div
              className="spinner-border text-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem"
              }}
            />
          </div>


          <h3 className="fw-bold text-dark mb-2">
            Processing Payment...
          </h3>


          <p className="text-secondary small mb-3">
            {statusMessage}
          </p>


          <div className="alert alert-info border-0 bg-info-subtle text-info-emphasis py-2 px-3 rounded-3 small mb-0">
            ⏳ Please do not refresh or close this window.
          </div>

        </div>

      </div>
    </>
  );
}