import { Link } from 'react-router-dom';
// import LoadingSpinner from "./LoadingSpinner";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Button = ({
  children,
  className = '',
  variant = 'primary',
  link = false,
  to,
  disabled,
  onClick,
  ...props
}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const variantType = {
    outlined:
      'border-[2px] border-primary-300 hover:bg-primary-400 hover:text-white px-4 py-2 rounded-md hover:scale-105 hover:shadow-md',
    underline:
      'border-b-[2px] border-primary-500 hover:bg-primary-400 hover:text-white px-3 py-2 transition-all rounded-sm hover:scale-105 hover:shadow-md',
    primary:
      'bg-primary-200 py-2 px-8 rounded-md font-[500] text-[1.2rem] hover:scale-105 hover:shadow-md',
    dark: 'bg-gradient-to-br from-primary-300 to-primary-400  text-white py-2 px-4 rounded-md font-[500] text-[1rem] hover:bg-primary-400/90 transition-all hover:scale-105 hover:shadow-md hover:shadow-primary-200 ',
  };
  if (link)
    return (
      <Link
        to={to}
        className={`text-center hover:-translate-y-[1px] hover:shadow-lg active:-translate-y-0 active:shadow-md ${variantType[variant]} ${className}`}
      >
        {children}
      </Link>
    );

  return (
    <button
      {...props}
      disabled={disabled}
      className={`relative overflow-hidden disabled:transform-none disabled:cursor-not-allowed  disabled:text-white disabled:shadow-none ${variantType[variant]} ${className}`}
      onClick={e => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className="ripple bg-white/30"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ''
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'outlined', 'underline', 'dark']),
  link: PropTypes.bool,
  to: PropTypes.string,

  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
