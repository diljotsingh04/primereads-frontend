import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom'
import PaymentProcessing from '../assets/images/PaymentProcessing.gif';

const Failure = () => {

    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const transaction_id = params.get('transaction_id');
    const [loading, setloading] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const validateTrans = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/validate-transaction`,
                    {
                        transId: transaction_id,
                        isFail: true
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );

                if (validateTrans.data.success) {
                    Swal.fire({
                        title: "Transaction Failed",
                        text: `Please try again`,
                        icon: "error",
                        confirmButtonColor: "#b80707",
                        confirmButtonText: "Back to Home"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            navigate("/blogs");
                        }
                    });
                    setSuccess(true);
                    setloading(false);
                } else {
                    setloading(false);
                }
            } catch (e) {
                setloading(false);
            }
        };

        fetchData();
    }, [transaction_id]);


    return (
        <div className="flex justify-center items-center h-[100vh]">

            {loading === true ? (
                <div className="height-[24vh]">
                    <img src={PaymentProcessing} alt="Loading.." />
                    <div>Verifying transaction...</div>
                </div>
            ) : success ? (
                <Link className="bg-blue-500 text-white p-2 border border-black rounded-lg shadow-xl" to="/tokens/addbalance">Back to Home</Link>
            ) : (
                <div>You do not have any active transaction</div>
            )}

        </div>
    )

}

export default Failure
