import { ImPen } from 'react-icons/im';
import IconButton from '../../../Components/UI/IconButton';
import Modal from '../../../Components/UI/Modal';
import { useGetMainInventoryQuery } from '../../../services/apiMainInventory';

import MainInventoryForm from './MainInventoryForm';
import SendToKitchenForm from './SendToKitchenForm';
import DataTable from '../../../Components/UI/DataTable';

const MainInventoryTable = () => {
  const { data, isLoading } = useGetMainInventoryQuery();
  const filterData = data?.filter(itm => +itm.quantity > 0);
  return (
    <DataTable
      edit
      rowColors
      isLoading={isLoading}
      head={['Ingredient', 'Quantity', '']}
      width={[30, 30, 10, 20]}
      data={filterData}
      errorMessage="No Stocks found in Main Inventory!"
      render={(itm, i) => (
        <Modal>
          <td className="px-3 py-2 font-[600]">{itm.ingredient.name}</td>
          <td className="px-3 py-2 font-[600]">
            {itm.quantity} {itm.ingredient.unit}
          </td>

          <td className="px-2">
            <Modal.Open id="send-kitchen">
              <button className="w-max rounded-lg bg-primary-200 px-2 py-1 text-[0.9rem] text-primary-500">
                Add to cart
              </button>
            </Modal.Open>
            <Modal.Window id="send-kitchen" zIndex="z-50" closeOnOverlay>
              <SendToKitchenForm item={itm} />
            </Modal.Window>
          </td>
          {/* Edit Button */}
          <td className="w-[10%] px-3 py-2">
            <Modal.Open id="edit">
              <IconButton
                className={`text-[1.3rem] text-primary-500 ${
                  i % 2 !== 0 ? 'hover:bg-primary-200' : ''
                }`}
              >
                <ImPen />
              </IconButton>
            </Modal.Open>
            <Modal.Window id="edit" closeOnOverlay zIndex="z-50">
              <MainInventoryForm edit item={itm} />
            </Modal.Window>
          </td>
        </Modal>
      )}
    />
  );
};

export default MainInventoryTable;
