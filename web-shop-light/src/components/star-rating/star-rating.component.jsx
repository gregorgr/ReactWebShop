import React from "react";
import './star-rating.styless.scss';


const StarRating = ({ averageRating }) => {
  // Zaokrožite oceno na gor
  const roundedRating = Math.ceil(averageRating);

  return (
    <ul className="list-unstyled d-flex justify-content-center mb-1">
      {Array.from({ length: 5 }, (_, index) => (
        <li key={index}>
          <i
            className={`fa fa-star ${
              index < roundedRating ? "text-warning" : "text-muted"
            }`}
          ></i>
        </li>
      ))}
    </ul>
  );
};

export default StarRating;
