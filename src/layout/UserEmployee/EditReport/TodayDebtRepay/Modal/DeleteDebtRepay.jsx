import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmaciesDebtsRePayDeleteAPI } from "../../../../../api/DirectorRequest";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteDebtRepay = (props) => {
  const { showModal, setShowModal, data } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await pharmaciesDebtsRePayDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("debts_repay"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("debts_list");
        setShowModal(false);
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

export default DeleteDebtRepay;
