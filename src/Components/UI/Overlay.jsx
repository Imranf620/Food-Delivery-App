import PropTypes from "prop-types";
const Overlay = ({ show, onClick, className = "", transparent }) => {
  if (!show) return null;

  return (
    <div
      onClick={onClick}
      className={`${
        transparent ? "bg-transparent" : "bg-black/20 backdrop-blur-sm"
      } fixed z-10 inset-0  ${className}`}
    ></div>
  );
};

Overlay.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  transparent: PropTypes.bool,
};

export default Overlay;
