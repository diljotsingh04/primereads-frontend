import React from 'react';

const Failure = () => {

  const params = new URLSearchParams(window.location.search);
  const transaction_id = params.get('transaction_id');

  console.log(transaction_id)
  return (
    <div className="mt-[5rem]">
      Failure
    </div>
  )
}

export default Failure
