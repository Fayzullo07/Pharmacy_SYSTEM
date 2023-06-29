import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { managerDeleteAPI } from "../../../../../api/DirectorRequest";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteManager = (props) => {
  const { showModal, setShowModal, data } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await managerDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("managers"); // Ma'lumotlarni yangilash
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

export default DeleteManager;
