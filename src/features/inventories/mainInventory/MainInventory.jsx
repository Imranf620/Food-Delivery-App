import { MdOutlineAddCircleOutline } from 'react-icons/md';
import Button from '../../../Components/UI/Button';
import Modal from '../../../Components/UI/Modal';
import MainInventoryTable from './MainInventoryTable';
import MainInventoryForm from './MainInventoryForm';
import InventoryCart from '../InventoryCart';

const MainInventory = () => {
  return (
    <section className="flex  flex-col gap-3 py-10">
      <div className="flex-between flex-wrap gap-3">
        <h1 className="text-[2rem] font-[600]">Main Inventory</h1>
        <Modal>
          <Modal.Open id="add-stock">
            <Button variant="dark" className="flex items-center gap-3">
              <MdOutlineAddCircleOutline className="text-[1.3rem]" />
              <span>Add New</span>
            </Button>
          </Modal.Open>
          <Modal.Window id="add-stock" closeOnOverlay>
            <MainInventoryForm />
          </Modal.Window>
        </Modal>
      </div>
      <MainInventoryTable />
      <InventoryCart main={true} />
    </section>
  );
};

export default MainInventory;
