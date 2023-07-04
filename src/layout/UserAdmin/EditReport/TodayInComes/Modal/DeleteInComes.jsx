import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmaciesInComesDeleteAPI } from "../../../../../api/DirectorRequest";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteInComes = (props) => {
  const { showModal, setShowModal, data } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await pharmaciesInComesDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("incomes"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("remeinder"); // Ma'lumotlarni yangilash
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

export default DeleteInComes;
