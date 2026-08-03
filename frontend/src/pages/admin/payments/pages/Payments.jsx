import { useEffect, useState } from "react";
import {
  getRecentPayments,
  getPaymentDetails,
} from "../../../../apis/services/payment-service";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "SUCCESS":
        return <span className="badge bg-success">{status}</span>;

      case "FAILED":
        return <span className="badge bg-danger">{status}</span>;

      case "PENDING":
        return <span className="badge bg-warning text-dark">{status}</span>;

      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const fetchRecentPayments = async () => {
    try {
      setLoading(true);

      const data = await getRecentPayments();

      setPayments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      fetchRecentPayments();
      return;
    }

    try {
      setLoading(true);

      const data = await getPaymentDetails(searchInput);

      setPayments([data]);
    } catch (err) {
      console.error(err);

      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    fetchRecentPayments();
  }, []);

  return (
    <div className="container-fluid py-3 py-md-4">
      <h3 className="fw-bold">Payments</h3>

      <p className="text-muted mb-4">Manage transactions</p>

      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Recent Payments</h5>

            <div className="input-group" style={{ maxWidth: "400px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search payment ID"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div
              className="table-responsive"
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Payment ID</th>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.cfPaymentId || "-"}</td>

                        <td>{payment.orderId}</td>

                        <td>{payment.customerName}</td>

                        <td>{payment.customerEmail}</td>

                        <td>₹{payment.amount}</td>

                        <td>{payment.paymentMethod || "-"}</td>

                        <td>{getStatusBadge(payment.status)}</td>

                        <td>{formatDate(payment.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No payments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
