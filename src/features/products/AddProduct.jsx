import { LuClipboardList } from 'react-icons/lu';
import ProductForm from './ProductForm';

const AddProduct = () => {
  return (
    <section className="mx-auto flex w-[100%] max-w-[800px] flex-col gap-5 py-10 lg:w-[80%]">
      <div className="flex-center gap-3 rounded-md bg-primary-500 py-2 text-[1.5rem] font-[600] uppercase tracking-wide text-white shadow-lg">
        <LuClipboardList />
        <h1>Add Product</h1>
      </div>
      <ProductForm />
    </section>
  );
};

export default AddProduct;
