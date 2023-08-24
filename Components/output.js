import React from 'react';
import Heading from './Heading'
import CreditScore from './CreditScore';
import CreditCardOffer from './CreditCardOffer';
import BenefitList from './BenefitList';
import './output.css'
function output() {
  const creditScore = 500; 
  const cardType = 'Platinum Rewards Card';
  const benefits = [
    'Generous Rewards Program: Earn points for every purchase you make...',
    'Travel Perks: Enjoy complimentary access to airport lounges...',
    'Cashback Opportunities: Get a percentage of your spending back...',
    // Add more benefits here
  ];

  const cardDetails = `
    Credit Card Type: ${cardType}
    Credit Score: ${creditScore}
    Benefits:
    ${benefits.join('\n')}
  `;

  const mailToLink = `mailto:recipient@example.com?subject=Credit Card Details&body=${encodeURIComponent(cardDetails)}`;

  return (
    <div className="">
      <Heading />
      <br/>
      <CreditScore score={creditScore} />
      <CreditCardOffer cardType={cardType} />
      <BenefitList benefits={benefits} />
      <a
        href={mailToLink}
        className="pdf-button"
      >
        Send Card Details and Benefits via Email
      </a>
    </div>
  );
}

export default output;
