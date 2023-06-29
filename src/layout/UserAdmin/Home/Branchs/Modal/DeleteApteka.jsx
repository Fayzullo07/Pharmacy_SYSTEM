import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { aptekaDeleteAPI } from "../../../../../api/DirectorRequest";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeleteApteka = (props) => {
  const { showModal, setShowModal, data } = props;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await aptekaDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("apteka"); // Ma'lumotlarni yangilash
        dispatch(getGlobalDeteilsAction());
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

export default DeleteApteka;
