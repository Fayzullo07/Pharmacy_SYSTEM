import React from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  accountsExpensesDeleteAPI,
  pharmaciesExpensesDeleteAPI,
} from "../../../../../api/DirectorRequest";
import ModalSimple from "../../../../../utils/ModalSimple";

const DeleteExpenses = ({ showModal, setShowModal, data }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return await accountsExpensesDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_A"); // Ma'lumotlarni yangilash
        setShowModal(false);
      },
    }
  );

  const mutationFarm = useMutation(
    async () => {
      return await pharmaciesExpensesDeleteAPI(data.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_F"); // Ma'lumotlarni yangilash
        setShowModal(false);
      },
    }
  );

  const handleSubmit = () => {
    if (data?.from_user == undefined) {
      mutationFarm.mutate();
    } else {
      mutation.mutate();
    }
  };
  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={"O'chirish"}
    >
      <div className="modal-body">
        <h2 className="text-muted text-center">
          Siz haqiqatdan o'chirmoqchimisiz?
        </h2>
      </div>

      <div className="modal-footer">
        <div className="d-grid d-flex justify-content-evenly col-12 ">
          <button
            className="btn btn-primary rounded-3 col-3"
            style={{ background: "red" }}
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading || mutationFarm.isLoading ? (
              <i className="fa fa-spinner fa-spin" />
            ) : (
              "Ha"
            )}
          </button>
          <button
            className="btn btn-primary rounded-3 col-3"
            style={{ background: "var(--blue)", color: "#fff" }}
            onClick={() => setShowModal(false)}
          >
            Yo'q
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default DeleteExpenses;
