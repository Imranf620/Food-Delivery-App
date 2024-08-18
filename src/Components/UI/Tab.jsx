import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format, subDays } from 'date-fns';

const Tab = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCal, setShowCal] = useState(false);

  const last = +searchParams.get('last') || 7;

  const handleApplyDate = () => {
    if (showCal) {
      searchParams.delete('last');
      searchParams.set('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
      searchParams.set('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
      setSearchParams(searchParams);
    }
    setShowCal(!showCal);
  };

  const handleLast = (last) => {
    const endDate = new Date();
    const startDate = subDays(endDate, last);

    searchParams.delete('start_date');
    searchParams.delete('end_date');
    searchParams.set('last', last);
    searchParams.set('start_date', format(startDate, 'yyyy-MM-dd'));
    searchParams.set('end_date', format(endDate, 'yyyy-MM-dd'));
    setSearchParams(searchParams);

    setDateRange({
      ...dateRange,
      startDate: startDate,
      endDate: endDate,
    });
  };

  useEffect(() => {
    const startDateParam = searchParams.get('start_date');
    const endDateParam = searchParams.get('end_date');
    if(!startDateParam ||!endDateParam) {
      handleLast(last);
      return;
    }
    if (startDateParam && endDateParam) {
      const startDate = new Date(startDateParam);
      const endDate = new Date(endDateParam);
      setDateRange({
        ...dateRange,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      const defaultStartDate = subDays(new Date(), last);
      setDateRange({
        ...dateRange,
        startDate: defaultStartDate,
        endDate: new Date(),
      });
    }
  }, [searchParams, last]);

  return (
    <div className="flex items-center gap-2 rounded-md border-2 border-gray-100 bg-white px-2 py-[0.4rem] text-[0.7rem] sm:gap-4 sm:text-[0.9rem]">
      <div className="relative">
        <button
          onClick={handleApplyDate}
          className={`rounded-md px-3 py-[0.2rem] hover:bg-primary-500 hover:text-white ${
            ![1, 7, 30, 90].includes(last) ? 'bg-primary-500 text-white' : ''
          }`}
        >
          {showCal ? 'Apply' : 'Select Date'}
        </button>
        {showCal && (
          <div className="absolute left-0 top-[100%] z-10 mt-2 rounded-md border border-gray-200 bg-white shadow-lg">
            <DateRange
              editableDateInputs={true}
              onChange={item => setDateRange(item.selection)}
              moveRangeOnFirstSelection={false}
              ranges={[dateRange]}
              maxDate={new Date()}
            />
          </div>
        )}
      </div>
      <button
        onClick={() => handleLast(1)}
        className={`rounded-md px-3 py-[0.2rem] hover:bg-primary-500 hover:text-white ${
          last === 1 ? 'bg-primary-500 text-white' : ''
        }`}
      >
        Today
      </button>
      <button
        onClick={() => handleLast(7)}
        className={`rounded-md px-3 py-[0.2rem] hover:bg-primary-500 hover:text-white ${
          last === 7 ? 'bg-primary-500 text-white' : ''
        }`}
      >
        Last 7 days
      </button>
      <button
        onClick={() => handleLast(30)}
        className={`rounded-md px-3 py-[0.2rem] hover:bg-primary-500 hover:text-white ${
          last === 30 ? 'bg-primary-500 text-white' : ''
        }`}
      >
        Last 30 days
      </button>
      <button
        onClick={() => handleLast(90)}
        className={`rounded-md px-3 py-[0.2rem] hover:bg-primary-500 hover:text-white ${
          last === 90 ? 'bg-primary-500 text-white' : ''
        }`}
      >
        Last 90 days
      </button>
    </div>
  );
};

export default Tab;
