import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { profilePatchAction } from "../../../../functions/DirectorActions";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../redux/Actions/GlobalAction";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      return profilePatchAction(data.id, cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
        dispatch(getGlobalDeteilsAction());
      }
    }
  );
  return <div />;
};

export default UpdateProfile;
