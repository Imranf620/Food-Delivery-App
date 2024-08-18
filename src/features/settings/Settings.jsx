import { MdDeleteForever, MdOutlineAddCircleOutline } from 'react-icons/md';
import Button from '../../Components/UI/Button';
import Modal from '../../Components/UI/Modal';
import UserForm from './UserForm';
import IconButton from '../../Components/UI/IconButton';
import { ImPen } from 'react-icons/im';
import ConfirmDelete from '../../Components/UI/ConfirmDelete';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../../services/apiUsers';
import DataTable from '../../Components/UI/DataTable';

const Settings = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting, isSuccess, reset }] =
    useDeleteUserMutation();

  return (
    <>
      <section className="flex flex-col gap-8 py-10">
        <div className="flex-between flex-wrap gap-3 border-b-2 border-primary-100 pb-5">
          <h1 className="text-[2rem] font-[600]">Settings</h1>
          <Modal>
            <Modal.Open id="newUser">
              <Button variant="dark" className="flex items-center gap-3">
                <MdOutlineAddCircleOutline className="text-[1.3rem]" />
                <span>Add New User</span>
              </Button>
            </Modal.Open>
            <Modal.Window id="newUser" zIndex="z-50" closeOnOverlay>
              <UserForm />
            </Modal.Window>
          </Modal>
        </div>
      </section>
      <DataTable
        head={['User Name', 'Email', 'Role']}
        width={[20, 40, 20, 10, 10]}
        textCenter
        edit
        del
        data={data}
        isLoading={isLoading}
        errorMessage="No Users were found!"
        render={user => (
          <Modal>
            <td className="px-4 py-2 text-start">{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>

            {/* Edit Button */}
            {user.role !== 'admin' && (
              <td className="w-[10%] px-3 py-2">
                <Modal.Open id="edit">
                  <IconButton className="text-[1.2rem] text-primary-500">
                    <ImPen />
                  </IconButton>
                </Modal.Open>
                <Modal.Window id="edit" closeOnOverlay zIndex="z-50">
                  <UserForm edit user={user} />
                </Modal.Window>
              </td>
            )}
            {/* Delete Button */}
            {user.role !== 'admin' && (
              <td className="w-[10%] px-3 py-2">
                <Modal.Open id="delete">
                  <IconButton className="text-[1.3rem] text-red-500 hover:bg-red-200">
                    <MdDeleteForever />
                  </IconButton>
                </Modal.Open>
                <Modal.Window id="delete" center closeOnOverlay zIndex="z-50">
                  <ConfirmDelete
                    onConfirm={() => deleteUser(user.id)}
                    message="Are you sure you want to delete this User?"
                    successMessage={`User "${user.name}" successfully Deleted!`}
                    isLoading={isDeleting}
                    isSuccess={isSuccess}
                    reset={reset}
                  />
                </Modal.Window>
              </td>
            )}
          </Modal>
        )}
      />
    </>
  );
};

export default Settings;
