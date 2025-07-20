// src/components/Loader.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = ({ type = "movie", count = 6 }) => {
  if (type === "movie") {
    return (
      <div className="skeleton-container">
        {[...Array(count)].map((_, index) => (
          <div className="skeleton-card" key={index}>
            <Skeleton height={300} borderRadius={10} />
            <div className="skeleton-text">
              <Skeleton width={`80%`} />
              <Skeleton width={`60%`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "detail") {
    return (
      <div className="skeleton-detail">
        <Skeleton height={400} width={"100%"} />
        <Skeleton height={30} width={`70%`} />
        <Skeleton height={20} width={`90%`} count={3} />
      </div>
    );
  }

  return <Skeleton height={40} width={200} />;
};

export default Loader;
