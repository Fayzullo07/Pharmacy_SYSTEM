import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { popularProductsDeleteAPI } from "../../../../../api/GlobalRequest";
import { toast } from "react-toastify";
import ModalDelete from "../../../../../utils/ModalDelete";

const DeletePopularProducts = (props) => {
  const { showModal, setShowModal, data } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await popularProductsDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("popular_products"); // Ma'lumotlarni yangilash
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

export default DeletePopularProducts;
