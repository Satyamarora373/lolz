import React from 'react';

function CreditCardOffer({ cardType }) {
  return (
    <div className="credit-card-offer">
      <h2>Explore Our Premium Credit Card</h2>
      <br/>
      <p className="credit-card-type">{cardType}</p>
    </div>
  );
}

export default CreditCardOffer;
