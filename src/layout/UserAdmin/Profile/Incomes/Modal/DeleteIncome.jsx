import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { transfersTypesDeleteAPI } from "../../../../../api/DirectorRequest";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteIncome = (props) => {
  const { showModal, setShowModal, data } = props;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await transfersTypesDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transfer"); // Ma'lumotlarni yangilash
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

export default DeleteIncome;
