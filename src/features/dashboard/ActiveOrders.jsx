import Button from '../../Components/UI/Button';
import DataTable from '../../Components/UI/DataTable';
import Modal from '../../Components/UI/Modal';
import { useGetActiveOrdersQuery } from '../../services/apiOrders';
import OrderDetail from './OrderDetail';
const colors = {
  processing: 'text-primary-500',
  completed: 'text-green-500',
  cancelled: 'text-red-500',
};
const ActiveOrders = () => {
  const { data: activeOrders, isLoading } = useGetActiveOrdersQuery();

  return (
    <section className="rounded-md bg-white px-3 py-5 shadow-sm">
      <h2 className="text-[1.3rem] font-[600] capitalize">Active Orders</h2>
      <DataTable
        head={['Order ID', 'Type', 'Name', 'Date', 'Status', 'View']}
        width={[20, 15, 25, 25, 15]}
        data={activeOrders}
        isLoading={isLoading}
        render={item => (
          <>
            <td className="px-3 py-2 text-start">#{item.id}</td>
            <td className="px-3 py-2 capitalize">
              {item.cart.option.replace('_', ' ')}
            </td>
            <td className="px-3 py-2 capitalize">
              {item.customer_name ?? '-'}
            </td>
            <td className="px-3 py-2">
              <div>{new Date(item.created_at).toLocaleDateString()} </div>
              <div>{new Date(item.created_at).toLocaleTimeString()}</div>
            </td>
            <td
              className={`font-[700] capitalize ${colors[item.order_status.toLowerCase()]}
        `}
            >
              {item.order_status === 'processing'
                ? 'in progress'
                : item.order_status}
            </td>
            <Modal>
              <Modal.Open id="view-order">
                <td>
                  <Button variant="underline" className="text-primary-500">
                    View
                  </Button>
                </td>
              </Modal.Open>
              <Modal.Window zIndex="z-50" id="view-order" closeOnOverlay>
                <OrderDetail order={item} />
              </Modal.Window>
            </Modal>
          </>
        )}
      />
    </section>
  );
};

export default ActiveOrders;
