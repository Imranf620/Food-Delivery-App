import PropTypes from "prop-types";

const IconButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`cursor-pointer px-4 py-2  rounded-lg hover:bg-primary-100 font-[700] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default IconButton;
