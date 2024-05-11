
import React from 'react';

const SplashScreen = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gradient-to-r from-sky-300 via-green-300 to-fuchsia-300'>    
        <div className="border-hidden animate-ping">
            <span className="text-6xl font-bold dark:text-black">Prime<span className="text-6xl font-bold text-blue-600">Reads</span></span>
        </div>
    </div> 
  );
}

export default SplashScreen;
