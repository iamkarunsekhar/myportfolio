import useClock from "@/hooks/useClock";
import ClockHands, { Circle, getRomanNumeral, Mark } from "./clock_utils";

interface ClockProps {
  className?: string;
  size: number;
}

const Clock = ({ className = "", size }: ClockProps) => {
  const time = useClock();
  
  return (
    <Circle size={size} className={className}>
      {Array(12).fill(null).map((_, i) => {
        return (
          <Mark
            key={i}
            rotation={`${i * 30}deg`}
          >
            {getRomanNumeral(i)}
          </Mark>
        );
      })}
      <ClockHands time={time} borderWidth={10} />
    </Circle>
  );
};

const StyledClock = ({ className = "", size, ...props }: ClockProps) => {
  return (
    <Clock
      className={`relative border-[4px] border-white shadow-lg z-[1] ${className}`}
      size={size}
      {...props}
    />
  );
};

export default StyledClock;
