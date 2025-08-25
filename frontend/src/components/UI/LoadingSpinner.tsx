import React from "react";
import { Spin } from "antd";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpinner;
