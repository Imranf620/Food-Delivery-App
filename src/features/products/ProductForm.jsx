import { useForm, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import Button from '../../Components/UI/Button';
import Input from '../../Components/UI/Input';
import { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { useGetCategoriesQuery } from '../../services/apiCategories';
import { useGetIngredientsQuery } from '../../services/apiIngredients';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '../../services/apiProducts';
import { toast } from 'react-toastify';

const ProductForm = ({ edit = false, product, productId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    control,
    setValue,
    reset,
    setError: setFormError,
  } = useForm({
    defaultValues: edit
      ? {
          productName: product.name,
          category: product.category.name,
          price: product.price,
          costPrice: product.cost_price,
        }
      : {},
  });

  const ingredient = useWatch({
    name: 'ingredient',
    control,
  });
  const [ingredients, setIngredients] = useState(
    (edit &&
      product.ingredients.map(itm => ({
        ingredientID: itm.ingredient.ingredientID,
        quantity: itm.quantity,
        unit: itm.ingredient.unit,
        name: itm.ingredient.name,
      }))) ||
      [],
  );
  const [error, setError] = useState('');
  const { data: catData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery('all');
  const { data: ingData, isLoading: isIngLoading } =
    useGetIngredientsQuery('all');

  const [
    createProduct,
    { isLoading: isCreating, isSuccess, reset: resetCreateProdState },
  ] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateProductMutation();
  // Add Ingredients
  const handleAddIngredient = () => {
    if (error) setError('');
    if (errors.quantity) setFormError('quantity', {});

    const values = getValues();
    const ing = ingData.find(itm => values.ingredient === itm.ingredientID);
    const isIngExists = ingredients.find(
      itm => itm.ingredientID === ing.ingredientID,
    );

    if (isIngExists) return;
    if (!values.quantity)
      return setFormError('quantity', { message: 'Please add quantity here!' });
    setIngredients(prev => [...prev, { ...ing, quantity: values.quantity }]);
  };
  // REmove an ingredient
  const removeIng = id => {
    setIngredients(ingredients.filter(ing => ing.ingredientID !== id));
  };

  const onSubmit = data => {
    // If no ing added return error
    if (!ingredients.length)
      return setError('Please add at least one Ingredient!');

    // Get All ingredients ID's
    const allIng = {};
    ingredients.forEach(ing => (allIng[ing.ingredientID] = ing.quantity));
    console.log(data.category);
    const preparedData = {
      name: data.productName,
      categoryID: catData.find(cat => cat.name === data.category).categoryID,
      cost_price: +data.costPrice,
      price: +data.price,
      ingredients: allIng,
    };

    if (edit) {
      updateProduct({ id: productId, data: preparedData });
    } else {
      createProduct(preparedData);
    }
  };

  useEffect(() => {
    if (edit) {
      setValue('category', product.category.name);
    } else {
      setValue('category', catData?.at(0).name);
    }
  }, [product, catData, edit, setValue]);

  useEffect(() => {
    const ing = ingData?.find(itm => itm.ingredientID === ingredient);
    setValue('unit', ing?.unit);
    setValue('quantity', ing?.quantity);
  }, [ingredient]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setIngredients([]);
      setTimeout(() => resetCreateProdState(), 3000);
      toast.success('Your product is added successfully!');
    }
    if (isUpdated) {
      toast.success('Your product is updated successfully!');
    }
  }, [isSuccess, reset, resetCreateProdState, isUpdated]);
  return (
    <div>
      <form
        className="mt-4 flex flex-col gap-3 rounded-md bg-white p-5 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Product Name */}
        <Input
          label="Product Name"
          register={register}
          required="Product Name is required!"
          id="productName"
          type="text"
          error={errors?.productName?.message}
          showError
          autoFocus
        />
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          {/* Category */}
          <div
            className="
          flex flex-col gap-3"
          >
            <label className="text-[1rem] font-[500] sm:text-[1rem] md:text-[1.2rem]">
              Category *
            </label>
            <select
              className="cursor-pointer rounded-md border-2 border-gray-300 bg-transparent  px-4 py-2 text-[1.1rem] outline-none focus:border-primary-400 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-80"
              disabled={isCategoryLoading}
              // defaultValue={edit ? product.category.name : catData?.at(0).name}
              id="category"
              {...register('category')}
            >
              {catData?.map((cat, i) => (
                <option key={i} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <span></span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Price */}
            <Input
              label="Cost"
              register={register}
              required="Cost Price is required!"
              type="number"
              step="any"
              min={0}
              id="costPrice"
              error={errors?.costPrice?.message}
              showError
            />
            <Input
              label="Price"
              register={register}
              required="Price is required!"
              type="number"
              step="any"
              min={0}
              id="price"
              error={errors?.price?.message}
              showError
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2 sm:gap-x-8">
          {/* Ingredients */}
          <div
            className="
          flex flex-col gap-3"
          >
            <label className="text-[1rem] font-[500] sm:text-[1rem] md:text-[1.2rem]">
              Ingredients *
            </label>
            <select
              className="cursor-pointer rounded-md border-2 border-gray-300 bg-transparent  px-4 py-2 text-[1.1rem] outline-none focus:border-primary-400 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-80"
              disabled={isIngLoading}
              defaultValue={1}
              id="ingredient"
              {...register('ingredient')}
            >
              <option value={1} disabled>
                Select ingredient
              </option>
              {ingData?.map((ing, i) => (
                <option key={i} value={ing.ingredientID}>
                  {ing.name}
                </option>
              ))}
            </select>
            <span></span>
          </div>
          {/* Unit */}
          <div className="flex  gap-2 ">
            <Input
              disabled={true}
              className="w-full"
              register={register}
              type="text"
              id="unit"
              label="Unit"
            />
            {/* Quantity */}
            <Input
              register={register}
              id="quantity"
              label="Quantity"
              min={0}
              type="number"
              className="w-full"
              error={errors?.quantity?.message}
              showError
            />
          </div>
        </div>
        <div>
          <Button variant="dark" type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </Button>
          {/* Display ingredients */}
          <ul className="mt-3 flex flex-wrap items-center gap-3">
            {ingredients?.map((ing, i) => (
              <li
                key={i}
                className="flex items-center gap-5 rounded-md bg-primary-100 px-2 py-1 font-[600] text-primary-500"
              >
                <span>
                  {ing.name}: {ing.quantity} {ing.unit}
                </span>
                <HiX
                  className="cursor-pointer transition-all hover:scale-110"
                  onClick={() => removeIng(ing.ingredientID)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Display error or success message */}
        <div className="mt-5 flex justify-end">
          {error && (
            <p className={`-100 mr-auto bg-red-100 px-3 py-2 text-red-500`}>
              {error}
            </p>
          )}
          <Button type="submit" className="px-10" variant="dark">
            {isCreating || isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  onCloseModal: PropTypes.func,
  edit: PropTypes.bool,
  product: PropTypes.object,
  productId: PropTypes.string,
};

export default ProductForm;
