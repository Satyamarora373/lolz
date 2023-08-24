import React from 'react';

function BenefitList({ benefits }) {
  return (
    <ul className="benefits-list">
      {benefits.map((benefit, index) => (
        <li key={index}>{benefit}</li>
      ))}
    </ul>
  );
}

export default BenefitList;
