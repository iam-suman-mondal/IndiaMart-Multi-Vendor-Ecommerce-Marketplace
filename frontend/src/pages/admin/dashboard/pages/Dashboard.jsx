import { FiUsers , FiDollarSign } from 'react-icons/fi';
import { AiTwotoneShop } from "react-icons/ai";
import { GiCardboardBoxClosed } from "react-icons/gi";
import StatCard from '../components/StatCard';
import RevenueGraph from '../components/RevenueGraph';
import OrdersSummaryGraph from '../components/OrdersSummaryGraph';

const statsData = [
    { id: 1, title: 'Monthly Revenue', value: '₹ 3156', icon: FiDollarSign },
    { id: 2, title: 'Monthly Orders', value: '62', icon: GiCardboardBoxClosed },
    { id: 3, title: 'Customers', value: '10', icon: FiUsers },
    { id: 4, title: 'Vendors', value: '4', icon: AiTwotoneShop },
];

const Dashboard = () => {
  return (
    <div className='container-fluid py-3 py-md-4'>
      <h3 className='lh-1 fw-bold'>Admin Dashboard</h3>
      <p className='text-muted mb-4'>Monitor key metrics and manage platform efficiently</p>

      {/* Stats Row */}
      <div className='row g-3 mb-4'>
        {statsData.map((stat) => (
          <div key={stat.id} className='col-12 col-sm-6 col-xl-3'>
            <StatCard 
              title={stat.title} 
              value={stat.value} 
              icon={stat.icon} 
            />
          </div>
        ))}
      </div>

      {/* Graphs */}
      <div className='row g-3'>
        {/* Graph 1 */}
        <div className='col-12 col-lg-8'>
          <div className='card shadow-sm border-0 rounded-4 h-100'>
            <div className='card-body'>
              <h5 className='card-title fw-bold mb-4'>Revenue Overview</h5>
              <RevenueGraph />
            </div>
          </div>
        </div>

        {/* Graph 2 */}
        <div className='col-12 col-lg-4'>
          <div className='card shadow-sm border-0 rounded-4 h-100'>
            <div className='card-body'>
              <h5 className='card-title fw-bold mb-4'>Orders Summary</h5>
              <OrdersSummaryGraph />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;