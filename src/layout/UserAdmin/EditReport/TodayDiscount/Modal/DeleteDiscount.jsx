import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmaciesExpensesDeleteAPI } from "../../../../../api/DirectorRequest";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteDiscount = (props) => {
  const { showModal, setShowModal, data } = props;
  const queryClient = useQueryClient();

  const mutationPharm = useMutation(
    async () => {
      return await pharmaciesExpensesDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_discount"); // Ma'lumotlarni yangilash
        setShowModal(false);
      },
    }
  );

  const handleSubmit = () => {
    mutationPharm.mutate();
  };
  return (
    <ModalDelete
      setShowModal={setShowModal}
      showModal={showModal}
      handleSubmit={handleSubmit}
      mutation={mutationPharm}
    />
  );
};

export default DeleteDiscount;
