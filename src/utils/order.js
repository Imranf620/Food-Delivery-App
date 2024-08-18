import { toast } from 'react-toastify';

export const handleOrder = (
  userInfo,
  navigate,
  cart,
  searchParams,
  updateOrder,
  addOrder,
  dispatch,
  lockItems,
  resetAddOrder,
  resetUpdateOrder,
) => {
  // Get table and type
  const table = searchParams.get('table');
  const type = searchParams.get('type');
  const category = searchParams.get('category');

  if (!userInfo) {
    navigate(`/home?type=${type}&table=${table}&category=${category}`, { state: { user: false } });
  }

  const products = {};
  const deals = {};

  // If deals add in deals and if product add in products
  cart.items.forEach(itm => {
    if (itm.deal) {
      deals[itm.dealID] = itm.quantity;
    } else {
      products[itm.productID] = itm.quantity;
    }
  });

  // Prepare data
  let data = {};
  if (type === 'dine in') {
    data = {
      option: type.toLowerCase().replace(' ', '_'),
      table,
      products,
      deals,
    };
  } else {
    data = {
      option: type.toLowerCase().replace(' ', '_'),
      products,
      deals,
      customer_name: cart.userInfo.name,
      address: cart.userInfo.address,
      phone_number: cart.userInfo.phone,
    };
  }

  // If order already created update the order otherwise create new order
  if (cart.items.some(itm => itm.lock === true)) {
    updateOrder({ id: cart.orderId, data });
  } else {
    addOrder(data);
  }
};
