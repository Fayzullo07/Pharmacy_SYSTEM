import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmacyExpensesTypesDeleteAPI } from "../../../../../api/DirectorRequest";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import { useDispatch } from "react-redux";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteExpense = (props) => {
  const { showModal, setShowModal, data } = props;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await pharmacyExpensesTypesDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses"); // Ma'lumotlarni yangilash
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

export default DeleteExpense;
