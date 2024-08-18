import InventoryCart from '../InventoryCart';
import KitchenInventoryTable from './KitchenInventoryTable';

const KitchenInventory = () => {
  return (
    <section className="flex  flex-col gap-3 py-10">
      <div className="flex-between flex-wrap gap-3">
        <h1 className="text-[2rem] font-[600]">Kitchen Inventory</h1>
      </div>
      <KitchenInventoryTable />
      <InventoryCart main={false} />
    </section>
  );
};

export default KitchenInventory;
