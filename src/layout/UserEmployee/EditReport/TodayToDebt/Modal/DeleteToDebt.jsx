import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmaciesToDebtsDeleteAPI } from "../../../../../api/DirectorRequest";
import { toast } from "react-toastify";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteToDebt = (props) => {
  const { showModal, setShowModal, data } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await pharmaciesToDebtsDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("to_debts"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("to_debts_list");
        setShowModal(false);
      },
      onError: () => {
        toast.error("Qarz qaytarilyabdi ochirolmaysiz !");
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

export default DeleteToDebt;
