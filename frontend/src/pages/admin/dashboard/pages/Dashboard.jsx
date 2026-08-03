import { useEffect, useState } from "react";
import {
  FiUsers,
  FiDollarSign,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";
import { AiTwotoneShop } from "react-icons/ai";
import { GiCardboardBoxClosed } from "react-icons/gi";
import RevenueGraph from "../components/RevenueGraph";
import { fetchRevenueAndOrderAndGraphData } from "../../../../apis/services/order-service";
import { getAllCustomerAndVendorCount } from "../../../../apis/services/user-service";
import { Link } from "react-router";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Dashboard = () => {
  4;
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [weeklyOrders, setWeeklyOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [weeklySales, setWeeklySales] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatWeeklySales = (sales) => {
    const salesMap = new Map(
      sales.map((item) => [item.day.substring(0, 3), item.income]),
    );

    return daysOfWeek.map((day) => ({
      day,
      income: salesMap.get(day) || 0,
    }));
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data1 = await fetchRevenueAndOrderAndGraphData();
        const data2 = await getAllCustomerAndVendorCount();

        setWeeklyRevenue(data1.weeklyRevenue);
        setWeeklyOrders(data1.weeklyOrders);
        setWeeklySales(formatWeeklySales(data1.weeklySales));
        
        setTotalCustomers(data2.customerCount);
        setTotalVendors(data2.vendorCount);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="container-fluid py-3 py-md-4">
      <h3 className="lh-1 fw-bold">Admin Dashboard</h3>
      <p className="text-muted mb-4">
        Monitor key metrics and manage platform efficiently
      </p>

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        {/* Weekly Revenue */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2 text-muted fw-semibold">
                  <FiDollarSign size={20} />
                  <span>Weekly Revenue</span>
                </div>
                <Link to={"/admin/payments"}>
                <FiArrowRight
                  className="text-muted"
                /></Link>
              </div>
              <h2 className="mb-0 fw-bold">{weeklyRevenue}</h2>
            </div>
          </div>
        </div>

        {/* Weekly Orders */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2 text-muted fw-semibold">
                  <GiCardboardBoxClosed size={20} />
                  <span>Weekly Orders</span>
                </div>
                <Link to={"/admin/orders"}>
                  <FiArrowRight className="text-muted" />
                </Link>
              </div>
              <h2 className="mb-0 fw-bold">{weeklyOrders}</h2>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2 text-muted fw-semibold">
                  <FiUsers size={20} />
                  <span>Customers</span>
                </div>
                <Link to={"/admin/customers"}>
                  <FiArrowRight className="text-muted" />
                </Link>
              </div>
              {/* <h2 className="mb-0 fw-bold">{totalCustomers}</h2> */}
              <h2 className="mb-0 fw-bold">7</h2>
            </div>
          </div>
        </div>

        {/* Total Vendors */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2 text-muted fw-semibold">
                  <AiTwotoneShop size={20} />
                  <span>Vendors</span>
                </div>
                <Link to={"/admin/vendors"}>
                  <FiArrowRight className="text-muted" />
                </Link>
              </div>
              {/* <h2 className="mb-0 fw-bold">{totalVendors}</h2> */}
              <h2 className="mb-0 fw-bold">4</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="card shadow-sm border-0 rounded-4 h-100">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-4">Revenue Overview</h5>
          <RevenueGraph graphData={weeklySales} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
