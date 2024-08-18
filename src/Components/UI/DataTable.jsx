import { Children } from 'react';
import Table from './Table';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { useSearchParams } from 'react-router-dom';

const DataTable = ({
  head,
  edit = false,
  del = false,
  totalPages,
  render,
  data,
  rowColors = false,
  width,
  isLoading = false,
  pagination = false,
  textCenter = false,
  next = false,
  previous = false,
  errorMessage = 'No results were found!',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get('page') || 1;
  // Handle page
  const handlePage = (next = true) => {
    if (next) {
      searchParams.set('page', page + 1);
    } else {
      searchParams.set('page', page - 1);
    }
    setSearchParams(searchParams);
  };
  return (
    <div
      className={`custom-scrollbar relative flex  w-full min-w-[98%] flex-col overflow-x-auto border-2 border-primary-100`}
    >
      <Table>
        <Table.Head
          className={`border-2 border-primary-500 bg-primary-500 px-3 ${textCenter ? 'text-center' : 'text-start'} text-[1.2rem] font-[600] text-white`}
        >
          <Table.Row>
            {head?.map((itm, i) => (
              <Table.Data
                key={i}
                className={`px-3 py-2 ${i === 0 ? 'text-start' : textCenter ? 'text-center' : ''} w-[${width.at(i)}%]`}
              >
                {itm}
              </Table.Data>
            ))}
            {edit && (
              <Table.Data className="w-[10%] px-3 py-2">Edit</Table.Data>
            )}
            {del && (
              <Table.Data className="w-[10%] px-3 py-2">Delete</Table.Data>
            )}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {!isLoading &&
            Children.toArray(
              data?.map((item, i) => (
                <Table.Row
                  key={i}
                  className={`${textCenter ? 'text-center' : ''} ${!rowColors ? 'border-2 border-primary-100' : i % 2 !== 0 ? 'bg-primary-100' : ''} `}
                >
                  {render(item, i)}
                </Table.Row>
              )),
            )}
        </Table.Body>
      </Table>
      {isLoading && (
        <div className="flex-center my-20">
          <Spinner />
        </div>
      )}
      {(data?.length === 0 || !data) && !isLoading && (
        <p className="my-20 text-center text-primary-500">{errorMessage}</p>
      )}
      {pagination && (
        <div className="flex-between w-full bg-primary-500 px-3 py-2 text-[1.2rem]">
          <div className="flex gap-3 text-white">
            <span className="font-[600]">Pages:</span>
            <span>
              {isNaN(totalPages) || !totalPages ? 0 : page} of{' '}
              {isNaN(totalPages) || !totalPages ? 0 : totalPages}
            </span>
          </div>

          <div className=" flex items-center gap-3">
            <button
              className="rounded-lg border-2 border-primary-100 px-6 py-1 text-[1rem] text-white hover:bg-white hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-white"
              disabled={!data || !previous}
              onClick={() => handlePage(false)}
            >
              Prev
            </button>
            <button
              className="rounded-lg border-2 border-primary-100 px-6 py-1 text-[1rem] text-white hover:bg-white hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-white"
              disabled={!next || !data}
              onClick={() => handlePage(true)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  head: PropTypes.arrayOf(PropTypes.string).isRequired,
  edit: PropTypes.bool,
  del: PropTypes.bool,
  render: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  rowColors: PropTypes.bool,
  width: PropTypes.arrayOf(PropTypes.number),
  isLoading: PropTypes.bool,
  pagination: PropTypes.bool,
  textCenter: PropTypes.bool,
  totalPages: PropTypes.number,
  next: PropTypes.bool,
  previous: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default DataTable;
