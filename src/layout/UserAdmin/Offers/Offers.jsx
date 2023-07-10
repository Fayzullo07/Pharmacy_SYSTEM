import React, { useState } from "react";
import "./Offers.css";

import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { offersPostAction } from "../../../functions/GlobalActions";
import { offersDeleteAPI, offersGetAPI } from "../../../api/GlobalRequest";
import { cleanedData } from "../../../functions/NecessaryFunctions";
import SkeletLoading from "../../../utils/SkeletLoading";
import { useTranslation } from "react-i18next";

const One = ({ item, mutationDelete }) => {
  return (
    <div className="msg right-msg" key={item.id}>
      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">
            {item.creator_name}
          </div>
          <div className="msg-info-time">
            {item.created_at}
          </div>
        </div>

        <div className="msg-text">
          {item.text}
        </div>

        <div className="w-100 text-end ">
          <i
            className="fa fa-trash text-danger cursor_pointer"
            onClick={() => mutationDelete.mutate(item.id)}
          />
        </div>
      </div>
    </div>
  );
};
const Offers = () => {
  const [formData, setFormData] = useState({
    title: "Offers",
    text: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name == "text" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("offers", async () => {
    return await offersGetAPI();
  });

  const mutationDelete = useMutation(
    async id => {
      return await offersDeleteAPI(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("offers"); // Ma'lumotlarni yangilash
      }
    }
  );
  const mutation = useMutation(
    async () => {
      return await offersPostAction(cleanedData(formData));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("offers");
      }
    }
  );

  const { t } = useTranslation("translation", { keyPrefix: "Offers" });
  const handleSubmit = () => {
    if (!formData.text) {
      toast.warning(t(3));
      return;
    }
    mutation.mutate();
    setFormData({ ...formData, text: "" });
  };

  return (
    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt" /> {t(0)}
        </div>
        <div>
          {mutation.isLoading || mutationDelete.isLoading
            ? <i className="fa fa-spinner fa-spin" />
            : null}
        </div>
      </header>

      <main className="msger-chat">
        <div className="msg left-msg">
          <div className="msg-bubble">
            <div className="msg-text">
              {t(1)} 😊
            </div>
          </div>
        </div>
        {data &&
          data.data.results
            .map(item => <One item={item} mutationDelete={mutationDelete} />)
            .reverse()}

        {isLoading &&
          <SkeletLoading height={100} count={6} rodius={20} gap={15} />}
      </main>

      <div className="msger-inputarea">
        <input
          type="text"
          className="msger-input"
          placeholder={`${t(2)}...`}
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <button
          className="msger-send-btn"
          disabled={mutation.isLoading}
          onClick={handleSubmit}
        >
          {mutation.isLoading
            ? <i className="fa fa-spinner fa-spin py-0" />
            : <i className="fa fa-paper-plane py-0" />}
        </button>
      </div>
    </section>
  );
};

export default Offers;
