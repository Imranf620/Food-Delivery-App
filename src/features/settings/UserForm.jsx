import { FaRegUser } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Button from '../../Components/UI/Button';
import Input from '../../Components/UI/Input';
import { useForm } from 'react-hook-form';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../../services/apiUsers';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const UserForm = ({ edit, user, onCloseModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: edit
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
        }
      : {},
  });

  const [
    createUser,
    { isLoading: isCreating, isSuccess: isCreated, reset: resetCreate },
  ] = useCreateUserMutation();

  const [
    updateUser,
    { isLoading: isUpdating, isSuccess: isUpdated, reset: updateReset },
  ] = useUpdateUserMutation();

  const onSubmit = data => {
    if (edit) {
      updateUser({ id: user.id, data });
    } else {
      createUser(data);
    }
  };

  useEffect(() => {
    if (isCreated) {
      toast.success('User successfully created!', { autoClose: 5000 });
      resetCreate();
      onCloseModal();
    }

    if (isUpdated) {
      toast.success('User updated successfully!', { autoClose: 5000 });
      updateReset();
    }
  }, [isCreated, isUpdated, resetCreate, updateReset, onCloseModal]);

  return (
    <div>
      <div className="flex items-center justify-center gap-3 bg-primary-500 py-3 text-[1.4rem] font-[600] text-white">
        <FaRegUser />
        <span>{edit ? 'Edit' : 'Add new'} User</span>
      </div>
      <form
        className="mt-4 flex flex-col gap-3 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="User Name"
          register={register}
          required="User Name is required!"
          id="name"
          type="text"
          error={errors?.name?.message}
          showError
        />
        <Input
          label="Email"
          register={register}
          required="Email is required!"
          id="email"
          type="email"
          error={errors?.email?.message}
          showError
        />
        {!edit && (
          <Input
            label="Password"
            register={register}
            required="Password is required!"
            id="password"
            type="password"
            error={errors?.password?.message}
            minLength={6}
            showError
          />
        )}

        <div className="flex flex-col gap-2 ">
          <label htmlFor="role" className="text-[1.2rem] font-[500]">
            Role
          </label>
          <select
            {...register('role', { required: 'Role is required!' })}
            id="role"
            className="rounded-md border-2 bg-transparent px-4 py-2  outline-none focus:border-gray-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-80"
          >
            <option value="cashier">Cashier</option>
            <option value="manager">Manager</option>
            <option value="staff">Kitchen Staff</option>
          </select>
        </div>

        <div className="mt-5 flex justify-end">
          <Button
            disabled={isCreating || isUpdating}
            type="submit"
            className="px-10"
            variant="dark"
          >
            {isCreating || isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  edit: PropTypes.bool,
  user: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default UserForm;
