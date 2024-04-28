import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCopy, FaRegCopy } from "react-icons/fa";

const AddBalance = () => {
    const curBalance = useSelector(state => state.balance);
    const curUser = useSelector(state => state.user);

    const [copied, setCopied] = useState(false);
    const [value, setvalue] = useState("http://localhost:5173" + "/refer/" + curUser.id)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
    };

    return (
        <div className="mt-[5rem] flex justify-center flex-col items-center h-[60vh]">
            <div className="text-center">
                <div className="text-xl">Your current balance is:</div>
            </div>
            <div className="border border-black rounded-md w-48 h-24 flex justify-center items-center mt-4">
                <div className="font-bold text-xl">Tokens:</div>
                <div className="text-xl">{curBalance.amount}</div>
            </div>
            <div className="my-4 border border-gray w-[80%]"></div>
            <div>
                <div className=" text-xl">Refer to Earn 10 tokens</div>
            </div>
            {/* copyt to clipboard functionality */}
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
    )
}

export default AddBalance
