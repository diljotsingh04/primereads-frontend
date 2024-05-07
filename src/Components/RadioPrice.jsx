import React from 'react';

const RadioPrice = ({ radioPriceButtons, price, setPrice }) => {
    return (
        <label htmlFor={`${radioPriceButtons.name}-${radioPriceButtons.price}`} className="block cursor-pointer border border-gray-500 rounded-lg">
            <input
                type="radio"
                id={`${radioPriceButtons.name}-${radioPriceButtons.price}`}
                name={radioPriceButtons.name}
                className="hidden"
                value={radioPriceButtons.name}
                onChange={() => setPrice(radioPriceButtons)}
                checked={price.name === radioPriceButtons.name} // Ensure the correct radio button is checked
            />
            <div className={`p-4 rounded-lg border-2 ${price.name === radioPriceButtons.name && "border-blue-500 bg-blue-100 dark:bg-gray-800"} cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-gray-800`}>
                <div className="flex justify-between items-center">
                    <div className="flex">
                        {/* <div className="h-6 w-6 rounded-full border-2 border-gray-400 mr-2"></div> */}
                        <div className={`h-6 w-6 rounded-full ${price.name === radioPriceButtons.name ? "border-blue-500 bg-blue-400" : "border-2 border-gray-400"}  mr-2`}></div>
                        <div className="font-semibold">{radioPriceButtons.name}</div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">₹{radioPriceButtons.price}</span>
                </div>
            </div>
        </label>
    );
};

export default RadioPrice;
