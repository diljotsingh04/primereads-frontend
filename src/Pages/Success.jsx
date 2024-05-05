import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBalance } from '../Redux/Slices/balanceSlice';

const Success = () => {

    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.search);
    const transaction_id = params.get('transaction_id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const validateTrans = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/validate-transaction`,
                    {
                        transId: transaction_id
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );

                if (validateTrans.data.success) {
                    dispatch(setBalance(validateTrans.data.amount));
                }
                else {
                    console.log('Failed to validate transaction')
                }

            }
            catch (e) {
                console.log('Failed to fetch data')
            }
        }
        fetchData();
    }, [transaction_id]);

    return (
        <div className="mt-[5rem]">
            Success
        </div>
    )
}

export default Success
