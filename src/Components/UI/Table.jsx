import PropTypes from 'prop-types';

const Table = ({ children, className = '' }) => {
  return (
    <table className={`w-full border-2 border-primary-100 ${className}`}>
      {children}
    </table>
  );
};

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Head = ({ children, className = '' }) => {
  return <thead className={className}>{children}</thead>;
};

Head.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Row = ({ children, className = '' }) => {
  return <tr className={className}>{children}</tr>;
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Data = ({ children, className = '' }) => {
  return <td className={className}>{children}</td>;
};

Data.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Body = ({ children, className = '' }) => {
  return <tbody className={className}>{children}</tbody>;
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Table.Head = Head;
Table.Row = Row;
Table.Data = Data;
Table.Body = Body;

export default Table;
