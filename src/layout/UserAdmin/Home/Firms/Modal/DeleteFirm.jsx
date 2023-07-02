import React from "react";
import { useMutation, useQueryClient } from "react-query";
import ModalDelete from "../../../../../utils/ModalDelete";
import { firmsDeleteAPI } from "../../../../../api/DirectorRequest";

const DeleteFirm = ({ showModal, setShowModal, data }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await firmsDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("firms"); // Ma'lumotlarni yangilash
        setShowModal(false);
      }
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

export default DeleteFirm;
