import React from 'react';

function CreditScore({ score }) {
  const borderColor = getColorBasedOnScore(score);

  return (
    <div className="score-container">
      <div
        className="score-semi-circle"
        style={{ borderColor: borderColor }}
      ></div>
      <p className="score-label" >{score}</p>
    </div>
  );
}

function getColorBasedOnScore(score) {
  if (score < 500) {
    return '#FF5733'; // Red
  } else if (score >= 500 && score < 700) {
    return '#FFC300'; // Yellow
  } else {
    return '#2ECC71'; // Green
  }
}

export default CreditScore;
