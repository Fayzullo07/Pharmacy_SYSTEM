import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteWorker = (props) => {
  const { showModal, setShowModal, data } = props;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await xodimDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("workers"); // Ma'lumotlarni yangilash
        setShowModal(false);
        dispatch(getGlobalDeteilsAction());
      },
    }
  );

  const handleSubmit = () => {
    mutation.mutate();
  };
  return (
    <ModalDelete
      setShowModal={setShowModal}
      showModal={showModal}
      handleSubmit={handleSubmit}
      mutation={mutation}
    />
  );
};

export default DeleteWorker;
