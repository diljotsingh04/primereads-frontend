import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Label, TextInput, Button } from "flowbite-react";
import { MdEditSquare } from "react-icons/md";
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../Firebase/firebase";
import { useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateUser } from '../Redux/Slices/userSlice';
import axios from 'axios'

const Profile = () => {

    const dispatch = useDispatch();

    const curUser = useSelector(state => state.user);
    const [imageFile, setimageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
    const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
    const filePickerRef = useRef();
    const [updatedData, setupdatedData] = useState({name: curUser.name, userImage: curUser.userImage, password: null});
    const [formSubmissionError, setFormSubmissionError] = useState(null);
    const [formSubmissionSuccess, setFormSubmissionSuccess] = useState(null);
    const [hasChange, setHasChange] = useState(true);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFileUrl(URL.createObjectURL(file));
            setimageFile(file);
        }
    }

    useEffect(()=>{
        // console.log(curUser, updatedData)
        if(curUser.name !== updatedData.name || (updatedData.password !== null && updatedData.password !== '') || curUser.userImage !== updatedData.userImage){
            setHasChange(false);
        }
        else{
            setHasChange(true);
        }
    }, [updatedData])

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);


    const uploadImage = async () => {
        setImageFileUploadingError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;

        const storageRef = ref(storage, `Profile_Image/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadingProgress(progress.toFixed(0));
                if(progress === 100){
                    setTimeout(() => {
                        setImageFileUploadingProgress(null);
                    }, 1000);
                }
            },
            (error) => {
                setImageFileUploadingError('File should be less than 2MB');
                setImageFileUrl(null);
                setImageFileUploadingProgress(null);
                setimageFile(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadUrl) => {
                        setImageFileUrl(downloadUrl);
                        setupdatedData({...updatedData, userImage: downloadUrl});
                    }
                );
            }
        )
    }

    const handleChange = (e) => {
        setupdatedData({...updatedData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setFormSubmissionError(null);
        setFormSubmissionSuccess(null);

        try {
            const updateProfile = await axios.put(`http://localhost:3000/auth/update`,
                updatedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if (updateProfile.data.success) {
                dispatch(updateUser(updateProfile.data));
                setFormSubmissionSuccess("Profile Updated Successfully");
            }
            else {
                setFormSubmissionError(updateProfile.data.message);
            }

        }
        catch (e) {
            setFormSubmissionError("Failed to update profile")
        }
    }

    return (
        <form className="mb-16" onSubmit={handleSubmit}>
            <div className="flex justify-center flex-col items-center">
                <div className="text-3xl font-bold">Profile</div>
                <input className="hidden" type="file" accept="image/*" onChange={handleFileChange} ref={filePickerRef} />

                <div className="relative mt-6 cursor-pointer" onClick={() => filePickerRef.current.click()}>
                    {
                        imageFileUploadingProgress && (
                            <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}%`} strokeWidth={5}
                                styles={{
                                    root: {
                                        marginTop: '-13px',
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                    },
                                    path:{
                                        stroke: `rgb(62, 152, 199)`,
                                    }
                                }
                            }
                                
                            />
                        )
                    }
                    <img className={`border-4 border-gray-400 rounded-full h-36 w-36 object-cover ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'} `} 
                    src={imageFileUrl || curUser.userImage} alt="user image" />

                    <div className="text-center text-blue-500 underline mt-2">Edit Profile Image</div>
                </div>
                <div className="mt-3">
                    {imageFileUploadingError && <Alert color="failure">
                        <span className="font-medium">Alert!</span> {imageFileUploadingError}
                    </Alert>}
                    <div className="w-96">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Your name" />
                        </div>
                        <TextInput id="name" type="text" onChange={handleChange} placeholder="Enter your name" defaultValue={curUser.name} />
                    </div>
                    <div className="w-96 mt-1">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput id="email" type="email" defaultValue={curUser.email} disabled />
                    </div>
                    <div className="w-96 mt-1">
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput id="password" onChange={handleChange} type="password" placeholder="************" />
                    </div>
                    {formSubmissionSuccess && <Alert className="mt-2" color="success">
                        <span className="font-medium">Success!</span> {formSubmissionSuccess}
                    </Alert>}
                    {formSubmissionError && <Alert className="mt-2" color="failure">
                        <span className="font-medium">Alert!</span> {formSubmissionError}
                    </Alert>}
                </div>
                <Button className="bg-blue-600 mt-4 enabled:hover:bg-blue-700 w-[100%]" type="submit" disabled={hasChange}>Update Profile</Button>
            </div>
        </form>
    )
}

export default Profile
