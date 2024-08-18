import { LuClipboardList } from 'react-icons/lu';
import ProductForm from './ProductForm';
import { useParams } from 'react-router-dom';
import { useGetProductWithIdQuery } from '../../services/apiProducts';
import Spinner from '../../Components/UI/Spinner';

const EditProduct = () => {
  const { productId } = useParams();
  const { data, isLoading } = useGetProductWithIdQuery(productId);

  return (
    <section className="mx-auto flex w-[100%] max-w-[800px] flex-col gap-5 py-10 lg:w-[80%]">
      <div className="flex-center gap-3 rounded-md bg-primary-500 py-2 text-[1.5rem] font-[600] uppercase tracking-wide text-white shadow-lg ">
        <LuClipboardList />
        <h1>Edit Product</h1>
      </div>
      {data && !isLoading && (
        <ProductForm edit product={data} productId={productId} />
      )}
      {isLoading && (
        <div className="mx-auto mt-20">
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default EditProduct;
