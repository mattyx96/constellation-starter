import { useFadeElement } from '@/hooks/useFadeElement';
import { Button } from 'nebula-ds-react-library';
import { useState } from 'react';

export const Dashboard = () => {
  const [counter, setCounter] = useState(0);
  const [wallet, setWallet] = useState(200);
  const [enoughForToday, setEnoughForToday] = useState(false);
  const { isVisible, fadeIn, fadeOut, elementRef } = useFadeElement();

  const animateElement = () => {
    fadeIn();
    setTimeout(() => fadeOut(), 1000);
  };

  const increment = () => {
    if (counter === 9) {
      setWallet((prev) => prev + 50);
      setCounter(0);
      animateElement();
      setEnoughForToday(true);
    } else {
      setCounter(counter + 1);
    }
  };

  return (
    <div className="flex size-full flex-1 flex-col gap-10">
      <div className="flex size-full flex-col items-center justify-center gap-10">
        <div className="relative flex flex-col items-center gap-2">
          <h1
            className="header1 fade-element absolute -top-10 !leading-0"
            style={{
              opacity: isVisible ? 0.45 : 0,
              display: isVisible ? 'block' : 'none',
            }}
            ref={elementRef}
          >
            +50€
          </h1>
          <h1 className="display2 !leading-0">{wallet}€</h1>
          <Button
            className="w-fit"
            size="S"
            rounded="LBottom"
            disabled
            variant={'standard'}
          >
            Withdraw under maintenance
          </Button>
        </div>
        {enoughForToday ? (
          <span className="body3">
            Come back tomorrow with your next 10 clicks to earn more (: 😈
          </span>
        ) : (
          <Button
            className="w-fit"
            rounded="RBottom"
            disabled={enoughForToday}
            onClick={increment}
            variant={'outlined'}
          >
            Click to earn: <span className="header6">{counter}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
