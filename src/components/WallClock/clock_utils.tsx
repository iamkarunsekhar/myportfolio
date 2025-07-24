// components/ui/Circle.tsx
import { ReactNode, CSSProperties } from 'react';

interface CircleProps {
  size: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Circle = ({ size, children, className = "", style = {} }: CircleProps) => {
  return (
    <div
      className={`rounded-full ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

// utils/getRomanNumeral.ts
export const getRomanNumeral = (index: number): string => {
  const numerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  return numerals[index];
};

interface MarkProps {
  rotation?: string;
  children?: ReactNode;
  className?: string;
}

export const Mark = ({ rotation = "0deg", children, className = "" }: MarkProps) => {
  return (
    <div
      className={`absolute top-2.5 left-1/2 text-center ${className}`}
      style={{
        transform: `translate3d(-50%, 0, 0) rotate(${rotation})`,
        transformOrigin: 'center 88px'
      }}
    >
      {children}
    </div>
  );
};

interface HandProps {
  rotation: string;
  borderWidth: number;
}

interface ClockHandsProps {
  time: Date;
  borderWidth?: number;
}

const SecondHand = ({ rotation, borderWidth }: HandProps) => {
  return (
    <div
      className="absolute bg-[#F68080] rounded-full top-2.5 left-1/2"
      style={{
        width: '1px',
        height: `${107 - 10 - borderWidth}px`,
        transform: `rotate(${rotation}) translate3d(-50%, 0, 0)`,
        transformOrigin: '0px bottom'
      }}
    />
  );
};

const MinuteHand = ({ rotation, borderWidth }: HandProps) => {
  return (
    <div
      className="absolute bg-[#F68080] rounded-full left-1/2"
      style={{
        width: '3px',
        height: `${107 - 25 - borderWidth}px`,
        top: '25px',
        transform: `rotate(${rotation}) translate3d(-50%, 0, 0)`,
        transformOrigin: '0px bottom'
      }}
    />
  );
};

const HourHand = ({ rotation, borderWidth }: HandProps) => {
  return (
    <div
      className="absolute bg-[#F68080] rounded-full left-1/2"
      style={{
        width: '4px',
        height: `${107 - 50 - borderWidth}px`,
        top: '50px',
        transform: `rotate(${rotation}) translate3d(-50%, 0, 0)`,
        transformOrigin: '0px bottom'
      }}
    />
  );
};

interface DotProps {
  size: number;
}

const Dot = ({ size }: DotProps) => {
  return (
    <Circle
      size={size}
      className="absolute bg-white top-1/2 left-1/2 shadow-lg"
      style={{
        transform: 'translate3d(-50%, -50%, 0)',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'
      }}
    />
  );
};

const ClockHands = ({ time, borderWidth = 10 }: ClockHandsProps) => {
  return (
    <div>
      <SecondHand 
        borderWidth={borderWidth} 
        rotation={`${time.getSeconds() * 6}deg`} 
      />
      <MinuteHand
        borderWidth={borderWidth}
        rotation={`${(time.getMinutes() + time.getSeconds() / 60) * 6}deg`}
      />
      <HourHand
        borderWidth={borderWidth}
        rotation={`${((time.getHours() % 12) + time.getMinutes() / 60 + time.getSeconds() / 3600) * 30}deg`}
      />
      <Dot size={10} />
    </div>
  );
};

export default ClockHands;
