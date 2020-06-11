import React, { useState, useEffect } from 'react';

export default function CountDown(props) {

  const defaultCountdown = 5;
  const countdown = props.countdown || defaultCountdown;

  const [timeLeft, setTimeLeft] = useState(countdown);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const calculateTimeLeft = () => {
    if (timeLeft <= 1) {
      props.timeOver() 
    }
    return timeLeft - 1;
  }

  return (
    <>
      {timeLeft}
    </>
  )
}