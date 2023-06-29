import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmaciesToDebtsRePayDeleteAPI } from "../../../../../api/DirectorRequest";
import { toast } from "react-toastify";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteToDebtRepay = (props) => {
  const { showModal, setShowModal, data } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await pharmaciesToDebtsRePayDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("to_debts_repay"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("to_debts_list");
        queryClient.invalidateQueries("to_debts");
        setShowModal(false);
      },
      onError: () => {
        toast.error("Something error");
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

export default DeleteToDebtRepay;
