import { ImPen } from 'react-icons/im';
import IconButton from '../../Components/UI/IconButton';
import Modal from '../../Components/UI/Modal';
import {
  usePrefetch,
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
} from '../../services/apiIngredients';
import IngredientForm from './IngredientForm';
import { MdDeleteForever } from 'react-icons/md';
import ConfirmDelete from '../../Components/UI/ConfirmDelete';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DataTable from '../../Components/UI/DataTable';

const IngredientsTable = () => {
  const [searchParams] = useSearchParams();
  const page = +searchParams.get('page') || 1;
  const { data, isLoading } = useGetIngredientsQuery(page);
  const [deleteIngredient, { isLoading: isDeleting, isSuccess, reset }] =
    useDeleteIngredientMutation();
  const prefetch = usePrefetch('getIngredients');

  // Handle prefetching
  const prefetchData = useCallback(() => {
    if (data?.next) {
      prefetch(page + 1);
    }
    if (data?.previous) {
      prefetch(page - 1);
    }
  }, [prefetch, page, data]);

  useEffect(() => {
    prefetchData();
  }, [prefetchData]);

  return (
    <DataTable
      head={['Name', 'Unit']}
      width={[20, 50, 10, 10]}
      edit
      del
      rowColors
      pagination
      textCenter
      data={data?.results}
      isLoading={isLoading}
      totalPages={Math.ceil(data?.count / 10)}
      next={data?.next && true}
      previous={data?.previous && true}
      render={(item, i) => (
        <Modal>
          <td className="px-3 py-2 text-start">{item.name}</td>
          <td>{item.unit}</td>

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
              <IngredientForm edit ingredient={item} />
            </Modal.Window>
          </td>
          {/* Delete Button */}
          <td className="w-[10%] px-3 py-2">
            <Modal.Open id="delete">
              <IconButton className="text-[1.3rem] text-red-500 hover:bg-red-200">
                <MdDeleteForever />
              </IconButton>
            </Modal.Open>
            <Modal.Window id="delete" center closeOnOverlay zIndex="z-50">
              <ConfirmDelete
                onConfirm={() => deleteIngredient(item.id)}
                message="Are you sure you want to delete this Ingredient?"
                successMessage={`Ingredient "${item.name}" successfully Deleted!`}
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

export default IngredientsTable;
