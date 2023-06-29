import React, { useState } from 'react'
import SkeletLoading from '../../../../utils/SkeletLoading';
import AddFirmIncome from './Modal/AddFirmIncome';
import DeleteFirmIncome from './Modal/DeleteFirmIncome';
import UpdateFirmIncome from './Modal/UpdateFirmIncome';
import { firmsInComesGetAPI } from '../../../../api/GlobalRequest';
import { useQuery } from 'react-query';
import { formatNumber, totalMoney } from '../../../../functions/hodimActions';

const ProfileFirmIncome = (props) => {
    const { deteils, getData } = props;
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const [curData, setCurData] = useState();

    const { data, isLoading, error } = useQuery('firms_incomes', async () => {
        return await firmsInComesGetAPI({
            report_date: getData.report_date,
            shift: getData.shift,
            to_pharmacy: getData.to_pharmacy
        })
    })

    if (error) return `Error: ${error.message}`

    let total = 0
    if (data && data.data.results) {
        total = totalMoney(data.data.results)
    }
    return (
        <>

            {showModal && (
                <AddFirmIncome
                    showModal={showModal}
                    setShowModal={setShowModal}
                    deteils={deteils}
                    getData={getData}
                />
            )}

            {deleteModal && (
                <DeleteFirmIncome
                    showModal={deleteModal}
                    setShowModal={setDeleteModal}
                    data={curData}
                />
            )}

            {updateModal && (
                <UpdateFirmIncome
                    showModal={updateModal}
                    setShowModal={setUpdateModal}
                    data={curData}
                    deteils={deteils}
                />
            )}

            <div className="bg_head mb-2">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        {/* <h5>Qarz olish</h5> */}
                        <p className="bg_c">
                            Umumiy: <span><b>{formatNumber(total)}</b>.0</span> UZS
                        </p>
                    </div>
                    <button
                        className="btn btn-success btn_c"
                        onClick={() => setShowModal(!showModal)}
                    >
                        Add <i className="fa-regular fa-square-plus ms-2" />
                    </button>
                </div>

                {/* VALUE */}
                <table id='table' className="my-2">
                    <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
                        <tr>
                            <th>Firma</th>
                            <th>Olingan mahsulot nomi</th>
                            <th>Pul</th>
                            <th>Qanday qaytariladi</th>
                            <th>Qaytarish muddati</th>
                            <th scope="col" className="text-center" style={{ width: "5px" }}>
                                <i className="fa fa-edit text-success p-1"></i>
                            </th>
                            <th scope="col" className="text-center" style={{ width: '5px' }} >
                                <i className="fa fa-trash-can text-danger p-1"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.data.results.map((item) => (
                            <tr key={item.id} className='scaleY'>
                                <td data-label="Firma" className='text-capitalize'>{item.from_firm_name}</td>
                                <td data-label="Olingan mahsulot nomi"><b>{item.second_name}</b></td>
                                <td data-label="Pul"><b>{formatNumber(item.price)}</b></td>
                                <td data-label="Qanday qaytariladi"><b className='text-success'>{item.is_transfer_return ? "NAXT PULSIZ" : "NAXT"}</b></td>
                                <td data-label="Qaytarish muddati">{item.deadline_date ? item.deadline_date : '~'}</td>
                                <td data-label="O'zgartirish" onClick={() => {
                                    setCurData(item)
                                    setUpdateModal(!updateModal)
                                }}>
                                    <i className="fa fa-edit text-info fs-4 p-1 cursor_pointer"></i>
                                </td>
                                <td data-label="O'chirish" onClick={() => {
                                    setCurData(item)
                                    setDeleteModal(!deleteModal);
                                }}>
                                    <i className="fa fa-trash-can text-danger fs-4 p-1 cursor_pointer"></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
            </div>
        </>
    );
}

export default ProfileFirmIncome
