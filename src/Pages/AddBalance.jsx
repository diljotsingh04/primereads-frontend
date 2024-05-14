import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCopy, FaRegCopy } from "react-icons/fa";
import { Footer } from '../Components/Footer';
import RadioPrice from '../Components/RadioPrice';
import { Button } from "flowbite-react";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'

const AddBalance = () => {
    const curBalance = useSelector(state => state.balance);
    const curUser = useSelector(state => state.user);

    const [copied, setCopied] = useState(false);
    const [value, setvalue] = useState("http://localhost:5173" + "/refer/" + curUser.id)
    const [price, setPrice] = useState({ name: null, price: null });
    const [radioPriceButtons, setradioPriceButtons] = useState([
        {
            name: "10 Token",
            price: 10,
        },
        {
            name: "20 Token",
            price: 20,
        },
        {
            name: "50 Token",
            price: 50,
        },
        {
            name: "100 Token",
            price: 100,
        }
    ])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBuyNow = async() => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

        const body = {
            products: [price]
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/stripe-checkout-session`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            const session = await response.data;

            const result = stripe.redirectToCheckout({
                sessionId: session.id
            })
    
            if (result.error) {
                console.log(result.error)
            }

        }
        catch (e) {
            console.log(e)
            console.log('Error in opening checkout page');
        }
    }

    return (
        <>
            <div className="pt-[5rem] flex justify-center flex-col items-center">
                <div className="text-center">
                    <div className="text-xl">Your current balance is:</div>
                </div>
                <div className="border border-black dark:border-gray-400 rounded-md w-48 h-24 flex justify-center items-center mt-4">
                    <pre className="font-bold text-xl">Tokens: </pre>
                    <div className="text-xl">{curBalance.amount}</div>
                </div>
                <div className="my-4 border border-gray w-[80%]"></div>
                {/* price radio box */}
                <div>
                    <div className="p-6 w-[35rem]">
                        <div>
                            <div className="text-xl mb-2 text-center">Select your price</div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {radioPriceButtons.map(button =>
                                <RadioPrice key={button.name} radioPriceButtons={button} price={price} setPrice={setPrice} />
                            )}
                        </div>
                        <Button onClick={handleBuyNow} className="bg-blue-600 mt-4 enabled:hover:bg-blue-700 w-[100%] dark:bg-blue-600 dark:enabled:hover:bg-blue-700" type="button" disabled={!price.name}>Buy Now</Button>
                    </div>
                </div>
                <div className="my-4 border border-gray w-[80%]"></div>
                {/* copy to clipboard functionality */}
                <div>
                    <div className="text-xl mb-2">Refer to earn 10 Tokens</div>
                </div>
                <div className="w-full max-w-[35rem]">
                    <div className="relative mx-7">
                        <input
                            type="text"
                            className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={value}
                            disabled
                            readOnly
                        />
                        <button
                            onClick={copyToClipboard}
                            className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
                        >
                            <span className={copied ? "hidden" : "inline-flex items-center"}>
                                <FaCopy />
                                <span className="ml-1 text-xs font-semibold">Copy</span>
                            </span>
                            <span className={copied ? 'inline-flex items-center' : 'hidden'}>
                                <FaRegCopy />
                                <span className="ml-1 text-xs font-semibold text-blue-700 dark:text-blue-500">
                                    Copied
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddBalance
