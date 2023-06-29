import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { firmsInComesDeleteAPI } from "../../../../../../api/GlobalRequest";
import ModalDelete from "../../../../../../utils/ModalDelete";

const DeleteFirmIncome = (props) => {
  const { showModal, setShowModal, data } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await firmsInComesDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("firms_incomes"); // Ma'lumotlarni yangilash
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

export default DeleteFirmIncome;
