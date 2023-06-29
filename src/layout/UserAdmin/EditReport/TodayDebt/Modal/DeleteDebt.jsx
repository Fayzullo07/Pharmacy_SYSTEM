import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmaciesDebtsDeleteAPI } from "../../../../../api/DirectorRequest";
import { toast } from "react-toastify";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteDebt = (props) => {
  const { showModal, setShowModal, data } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await pharmaciesDebtsDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("debts"); // Ma'lumotlarni yangilash
        setShowModal(false);
      },
      onError: () => {
        toast.error("Something error!");
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

export default DeleteDebt;
