import React, { useState } from 'react'
import { firmIncomePatchAction } from '../../../../../functions/GlobalActions';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { today } from '../../../../../api';
import { cleanedData } from '../../../../../functions/hodimActions';

const UpdateFirmIncome = (props) => {
    const { showModal, setShowModal, deteils, data } = props;
    const [formData, setFormData] = useState({
        price: data.price,
        desc: data.desc,
        second_name: data.second_name,
        deadline_date: data.deadline_date,
        is_transfer_return: data.is_transfer_return,
        from_firm: data.from_firm,
    });

    const queryClient = useQueryClient();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const mutation = useMutation(async () => {
        return firmIncomePatchAction(
            data.id,
            cleanedData(formData),
            setShowModal,
        )
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("firms_incomes")
        }
    });

    const handleSubmit = () => {
        if (!formData.second_name) {
            toast.warning("Nomini kiritin !");
            return
        }

        if (formData.price < 100) {
            toast.warning("Eng kam summa 100 so'm !");
            return
        }


        if (!formData.from_firm) {
            toast.warning("Firmani tanlang !")
            return
        }

        mutation.mutate();
    };

    return (
        <div
            className="modal d-flex justify-content-center align-items-center"
            style={{ position: "absolute", zIndex: 555 }}
            onClick={() => setShowModal(false)}
        >
            {/* <!-- Modal content --> */}

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">O'zgartirish</h5>

                    <span className="close">
                        <i
                            className="fa fa-xmark"
                            onClick={() => setShowModal(!showModal)}
                        ></i>
                    </span>
                </div>

                <div className="modal-body">
                    <div className='row'>

                        {/* NAME */}
                        <div className='col-md-6'>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    placeholder="Nomi"
                                    className="form-control"
                                    name='second_name'
                                    value={formData.second_name}
                                    onChange={handleInputChange}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <label>Nomi <b className='text-danger'>*</b></label>
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className='col-md-6'>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    placeholder="Miqdor"
                                    className="form-control"
                                    name='price'
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <label>Miqdor <b className='text-danger'>*</b> </label>
                            </div>
                        </div>

                        {/* DEADLINE DATE */}
                        <div className='col-md-4'>
                            <div className="form-floating mb-3">
                                <input
                                    type="date"
                                    placeholder="Qayatarish muddati"
                                    className="form-control"
                                    name='deadline_date'
                                    min={today}
                                    value={formData.deadline_date}
                                    onChange={handleInputChange}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <label>Qayatarish muddati</label>
                            </div>
                        </div>

                        {/* FIRMS */}
                        <div className='col-md-4'>
                            <div className="form-floating">
                                <select
                                    className="form-select mb-3 cursor_not"
                                    id="from_firm"
                                    name="from_firm"
                                    value={formData.from_firm}
                                    onChange={handleInputChange}
                                    disabled
                                >
                                    <option value="">Firmani tanlang . . .</option>
                                    {deteils.data.firms.map((type) => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}

                                </select>
                                <label htmlFor="from_firm">
                                    Firmani tanlang <b className="text-danger">*</b>
                                </label>
                            </div>
                        </div>


                        {/* HOW TO RETERN TRANSFER TYPE WITH MONEY OR WITHOUT MONEY */}
                        <div className='col-md-4'>
                            <div className="form-floating">
                                <select
                                    className="form-select mb-3"
                                    id="is_transfer_return"
                                    name="is_transfer_return"
                                    value={formData.is_transfer_return}
                                    onChange={handleInputChange}
                                >
                                    <option value={false}>NAXT</option>
                                    <option value={true}>NAXT PULSIZ</option>


                                </select>
                                <label htmlFor="is_transfer_return">
                                    Pulni qanday qaytarasiz <b className="text-danger">*</b>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* IZOH */}
                    <div className="form-floating mb-3">
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Izoh"
                                name="desc"
                                value={formData.desc}
                                onChange={handleInputChange}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        handleSubmit();
                                    }
                                }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <div className="d-grid col-12">
                        <button
                            className="btn btn-primary rounded-3"
                            style={{ background: "#2A80B9" }}
                            onClick={handleSubmit}
                            disabled={mutation.isLoading}

                        >
                            {mutation.isLoading
                                ? <i className="fa fa-spinner fa-spin" />
                                : "O'zgartirish"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateFirmIncome
