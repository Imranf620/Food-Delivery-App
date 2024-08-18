import DataTable from '../../../Components/UI/DataTable';
import Modal from '../../../Components/UI/Modal';
import { useGetKitchenInventoryQuery } from '../../../services/apiKitchenInventory';
import SendToMainForm from './SendToMainForm';

const KitchenInventoryTable = () => {
  const { data, isLoading } = useGetKitchenInventoryQuery();
  const filterdata = data?.filter(itm => +itm.quantity > 0);
  return (
    <DataTable
      data={filterdata}
      rowColors
      isLoading={isLoading}
      head={['Ingredients', 'Quantity', '']}
      width={[30, 30, 10, 10]}
      render={itm => (
        <>
          <td className="px-3 py-2 font-[600]">{itm.ingredient.name}</td>
          <td className="px-3 py-2 font-[600]">
            {itm.quantity} {itm.ingredient.unit}
          </td>
          <td className="px-2 py-1">
            <Modal>
              <Modal.Open id="send-main">
                <button className="w-max rounded-lg bg-primary-200 px-2 py-1 text-[0.9rem] text-primary-500">
                  Add to cart
                </button>
              </Modal.Open>
              <Modal.Window id="send-main" zIndex="z-50" closeOnOverlay>
                <SendToMainForm item={itm} />
              </Modal.Window>
            </Modal>
          </td>
        </>
      )}
    />
  );
};

export default KitchenInventoryTable;
