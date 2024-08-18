import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGetTablesQuery } from '../../services/apiTables';
import Spinner from '../../Components/UI/Spinner';
const Tables = ({ onCloseModal }) => {
  const { data: tables, isLoading, error } = useGetTablesQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = tableNum => {
    searchParams.set('table', `${tableNum}`);
    setSearchParams(searchParams);
    onCloseModal();
  };

  return (
    <>
      <h1 className="py-5 text-center text-[1.4rem] font-[700]">Tables</h1>
      {error && !isLoading && (
        <div className="my-20 text-center text-red-500">
          Error: {error.message}
        </div>
      )}
      {isLoading && (
        <div className="flex-center my-20">
          <Spinner />
        </div>
      )}
      {tables && !isLoading && (
        <ul
          className="flex flex-wrap justify-center gap-4 overflow-y-auto p-2 sm:p-5 md:p-10 
            "
        >
          {[...tables].reverse().map((table, i) => (
            <li
              onClick={() => !table.is_reserved && handleClick(table.number)}
              key={i}
              className={`flex-center w-[80px] cursor-pointer rounded-lg ${table.is_reserved ? 'cursor-not-allowed bg-red-400' : 'bg-green-400 hover:scale-105'} p-5 text-[1.3rem] font-[600] text-white `}
            >
              <div>H{table.number}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

Tables.propTypes = {
  onCloseModal: PropTypes.func,
};

export default Tables;
