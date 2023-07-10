import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { popularProductsPatchAction } from "../../../../../functions/GlobalActions";
import Modal from "../../../../../utils/Modal";
import TextInput from "../../../../../ui/TextInput";
import NumberInput from "../../../../../ui/NumberInput";
import SelectInput from "../../../../../ui/SelectInput";
import Textarea from "../../../../../ui/Textarea";
import { useTranslation } from "react-i18next";

const UpdatePopularProducts = ({ showModal, setShowModal, data, deteils }) => {
  const [formData, setFormData] = useState({
    name: data.name,
    price: data.price,
    pharmacy: data.pharmacy,
    desc: data.desc
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "name" && value.length > 50) {
      return;
    }

    if (name === "price" && value.length > 9) {
      return;
    }

    if (name === "desc" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return popularProductsPatchAction(
        data.id,
        cleanedData(formData),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("popular_products"); // Ma'lumotlarni yangilash
      }
    }
  );

   const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
   const { t: g } = useTranslation("translation", { keyPrefix: "Global" });

   const handleSubmit = () => {
     if (!formData.name) {
       toast.warning(m(19));
       return;
     }
     if (formData.price < 100) {
       toast.warning(g(33));
       return;
     }

     if (!formData.pharmacy) {
       toast.warning(m(12));
       return;
     }
     mutation.mutate();
   };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={"O'zgartirish"}
      mutation={mutation}
      handleSubmit={handleSubmit}
    >
      <div className="modal-body">
        {/* NAME */}
        <TextInput
          name={"name"}
          value={formData.name}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Mahsulot nomi"}
        />

        {/* PRICE*/}
        <NumberInput
          name={"price"}
          value={formData.price}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Mahsulot summasi"}
        />

        {/* PHARMACIES */}
        <SelectInput
          name={"pharmacy"}
          value={formData.pharmacy}
          handleInputChange={handleInputChange}
          isRequired={true}
          placeholder={"Filialni tanlang"}
          data={deteils.pharmacies}
        />

        {/* BIO */}
        <Textarea
          value={formData.bio}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default UpdatePopularProducts;
