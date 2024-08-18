import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const RippleEffect = ({ children, onClick }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 500);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <div
      className="relative overflow-hidden w-full h-full"
      onClick={(e) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick?.(e);
      }}
    >
      {isRippling ? (
        <span
          className="ripple bg-primary-500/10 h-full w-full"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ""
      )}
      <span className="content">{children}</span>
    </div>
  );
};

RippleEffect.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default RippleEffect;
