import React from 'react';
import { FiUsers , FiDollarSign, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { AiTwotoneShop } from "react-icons/ai";
import { GiCardboardBoxClosed } from "react-icons/gi";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="card shadow-sm border-0 rounded-4 h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2 text-muted fw-semibold">
            {Icon && <Icon size={20} />}
            <span>{title}</span>
          </div>
          <FiArrowRight className="text-muted" style={{ cursor: "pointer" }} />
        </div>
        <h2 className="mb-0 fw-bold">{value}</h2>
        
      </div>
    </div>
  );
};

export default StatCard;