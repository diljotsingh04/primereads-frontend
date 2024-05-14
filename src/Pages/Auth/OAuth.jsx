import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../../Firebase/firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createuser } from '../../Redux/Slices/userSlice';
import { useNavigate } from "react-router-dom";
import { setBalance } from '../../Redux/Slices/balanceSlice';

const OAuth = ({setFailureMessage, refer, prevUserId}) => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/google`,
                {
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    userImage: resultFromGoogle.user.photoURL
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if (!res.data.success) {
                setFailureMessage(res.data.message);
            }
            else {
                setFailureMessage(null);
                dispatch(createuser(res.data));
                // add bonus logic starts
                if(refer && res.data.newUser){
                    try {
                        const addBonus = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/auth/refer`,
                            {
                                prevuserid: prevUserId,
                                curuserid: res.data._id
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                withCredentials: true
                            }
                        );
                
                        if (!addBonus.data.success) {
                            console.log("declined")
                            setFailureMessage(addBonus.data.message);
                        }
                        else{
                            console.log("token added")
                            dispatch(setBalance(20));
                            navigate('/blogs');
                        }
                    }
                    catch (e) {
                        console.log(e)
                        setFailureMessage("Failed to add bonus")
                    }
                }
                else{
                    navigate('/blogs');
                }
                // add bonus logic ends
            }

        } catch (e) {
            setFailureMessage(`Failed to Signup ${e}`)
        }
    }
    return (
        <div className="flex items-center justify-center dark:bg-gray-800 mt-2">
            <button onClick={handleGoogleClick} className="w-full px-4 py-[0.4rem] border flex gap-2 justify-center border-slate-400 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <span>Continue with Google</span>
            </button>
        </div>
    )
}

export default OAuth
