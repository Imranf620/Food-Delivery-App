import { ImPen } from 'react-icons/im';
import DataTable from '../../Components/UI/DataTable';
import IconButton from '../../Components/UI/IconButton';
import Modal from '../../Components/UI/Modal';
import {
  useDeleteDealMutation,
  useGetDealsQuery,
} from '../../services/apiDeals';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import ConfirmDelete from '../../Components/UI/ConfirmDelete';
import Button from '../../Components/UI/Button';
import DealDetails from './DealDetails';

const DealTable = () => {
  const { data, isLoading } = useGetDealsQuery();
  const [deleteDeal, { isLoading: isDeleting, isSuccess, reset }] =
    useDeleteDealMutation();
  const navigate = useNavigate();

  return (
    <DataTable
      edit
      del
      rowColors
      isLoading={isLoading}
      head={['Name', 'Products', 'Price', 'Detail']}
      width={[30, 20, 20, 10, 10, 10]}
      data={data}
      errorMessage="No Deals added yet!"
      render={(itm, i) => (
        <Modal>
          <td className="px-3 py-2 font-[600]">{itm.name}</td>
          <td className="px-3 py-2 font-[600]">
            {itm.products?.reduce((acc, itm) => acc + itm.quantity, 0)}
          </td>
          <td className="px-3 py-2 font-[600]">{itm.price}</td>
          <td>
            <Modal.Open id="details">
              <Button variant="underline">View</Button>
            </Modal.Open>
            <Modal.Window zIndex="z-50" id="details" closeOnOverlay>
              <DealDetails deal={itm} />
            </Modal.Window>
          </td>

          {/* Edit Button */}
          <td className="w-[10%] px-3 py-2">
            <IconButton
              onClick={() => navigate(`add?deal=${itm.id}&edit=true`)}
              className={`text-[1.3rem] text-primary-500 ${
                i % 2 !== 0 ? 'hover:bg-primary-200' : ''
              }`}
            >
              <ImPen />
            </IconButton>
          </td>
          {/* Delete Button */}
          <td className="w-[10%] px-3 py-2">
            <Modal.Open id="delete">
              <IconButton className="text-[1.3rem] text-red-500 hover:bg-red-200">
                <MdDeleteForever />
              </IconButton>
            </Modal.Open>
            <Modal.Window zIndex="z-50" id="delete" center closeOnOverlay>
              <ConfirmDelete
                onConfirm={() => deleteDeal(itm.id)}
                message="Are you sure you want to delete this Deal?"
                successMessage={`Deal "${itm.name}" successfully Deleted!`}
                isLoading={isDeleting}
                isSuccess={isSuccess}
                reset={reset}
              />
            </Modal.Window>
          </td>
        </Modal>
      )}
    />
  );
};

export default DealTable;
