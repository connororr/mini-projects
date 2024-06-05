import React, { useEffect, useRef, useState } from 'react';
import './App.css';

export default function App() {
    const [isRed, setIsRed] = useState<boolean>(false);
    const [isYellow, setIsYellow] = useState<boolean>(false);
    const [isGreen, setIsGreen] = useState<boolean>(false);
    const timeouts = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
           activateLightTimers();
           return () => {
               timeouts.current.forEach((timeoutId) => clearTimeout(timeoutId));
           }
    }, []);

    async function activateLightTimers() {
        while (true) {
            setIsRed(true);
            await checkRedFinished();
            setIsRed( false);
            setIsYellow(true);
            await checkYellowFinished();
            setIsYellow(false);
            setIsGreen(true);
            await checkGreenFinished();
            setIsGreen(false);
        }
    }
    function checkRedFinished(): Promise<void> {
        return checkLightFinished(4000);
    }

    function checkYellowFinished(): Promise<void> {
        return checkLightFinished(500);
    }

    function checkGreenFinished(): Promise<void> {
        return checkLightFinished(3000);
    }

    function checkLightFinished(timeInMs: number): Promise<void> {
        return new Promise((res) => {
            const timeout = setTimeout(() => {
                res();
            }, timeInMs);
            timeouts.current.push(timeout);
        })
    }

    return (
      <div className="Traffic-light">
        <div
            aria-label={'Current light is red'}
            aria-live="polite"
            className={[
                'Traffic-light-item',
                isRed && 'Traffic-light-item-red'
            ].filter(Boolean).join(' ')}>
        </div>
        <div
            aria-live="polite"
            className={[
            'Traffic-light-item', isYellow && 'Traffic-light-item-yellow'
        ].filter(Boolean).join(' ')}></div>
        <div
            aria-live="polite"
            className={[
            'Traffic-light-item', isGreen && 'Traffic-light-item-green'
        ].filter(Boolean).join(' ')}></div>
      </div>
  );
}