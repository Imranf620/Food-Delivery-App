import { MdOutlineAddCircleOutline } from 'react-icons/md';
import Button from '../../Components/UI/Button';

import DealTable from './DealTable';
import { useGetDealsQuery } from '../../services/apiDeals';

const Deals = () => {
  const { data } = useGetDealsQuery();
  console.log(data);
  return (
    <section className="flex flex-col gap-8 py-10">
      <div className="flex-between flex-wrap gap-3 border-b-2 border-primary-200/30 pb-5">
        <h1 className="text-[2rem] font-[600]">Deals</h1>

        <Button
          link
          to="add"
          variant="dark"
          className="flex items-center gap-3"
        >
          <MdOutlineAddCircleOutline className="text-[1.3rem]" />
          <span>Add New</span>
        </Button>
      </div>
      <DealTable />
    </section>
  );
};

export default Deals;
