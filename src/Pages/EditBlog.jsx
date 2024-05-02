import { useState, useEffect, useMemo } from 'react';
import { Button, TextInput, Label, Alert } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../Firebase/firebase";
import { TagsInput } from "react-tag-input-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux'
import { Footer } from '../Components/Footer';

const EditBlog = () => {

    const { postId } = useParams();
    const [blogData, setBlogData] = useState(null);
    const curUser = useSelector(state => state.user);
    const [unAuthorized, setUnAuthorized] = useState(false);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

    const module = {
        toolbar: toolbarOptions,
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getResult = await axios.post(`http://localhost:3000/posts/getpost?postId=${postId}`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );
                if (getResult.data.success) {
                    const getData = getResult.data.postData[0];
                    if(curUser.id !== getData.refTo){
                        setUnAuthorized(true);
                    }
                    else{
                        setBlogData(getData);
                    }
                }
                else {
                    setFormSubmitionError("Signin or login to see blogs")
                }
            }
            catch (e) {
                setFormSubmitionError("Error fetching the data")
            }
        }
        fetchData();
    }, [postId]);

    const [formValid, setFormValid] = useState(false);
    const [formSubmitionError, setFormSubmitionError] = useState(null);
    const [sucessMessge, setsucessMessge] = useState(null)
    // states for image
    const [imageFile, setfile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
    const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
    const [uploadingStart, setUploadingStart] = useState(false)

    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.id]: e.target.value });
    }

    const handleUploadImage = async () => {
        setImageFileUploadingError(null);
        setUploadingStart(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;

        const storageRef = ref(storage, `Blog_Thumbnail/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadingProgress(progress.toFixed(0));
                if (progress === 100) {
                    setTimeout(() => {
                        setImageFileUploadingProgress(null);
                    }, 1000);
                }
            },
            (error) => {
                setImageFileUploadingError('File should be less than 2MB');
                setImageFileUrl(null);
                setImageFileUploadingProgress(null);
                setUploadingStart(false);
                setfile(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadUrl) => {
                        setImageFileUrl(downloadUrl);
                        setBlogData({ ...blogData, image: downloadUrl })
                        setfile(null);
                        setUploadingStart(false);
                    }
                );
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitionError(null);

        if (blogData.title === "") {
            return setFormSubmitionError("Please enter your title");
        }
        if (blogData.hashtags.length === 0) {
            return setFormSubmitionError("Please enter your hashtags");
        }
        if (blogData.image === null) {
            return setFormSubmitionError("Please select and image");
        }
        if (blogData.content.length < 20) {
            return setFormSubmitionError("Content should be of minimum 20 words");
        }

        try {
            const editBlog = await axios.post('http://localhost:3000/posts/editblog',
                blogData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
            

            if (!editBlog.data.success) {
                setFormSubmitionError(editBlog.data.message);
            }
            else {
                setFormSubmitionError(null);
                setsucessMessge("Blog published successfully");
            }

        }
        catch (e) {
            setFormSubmitionError(`Failed to publish blog ${e}`)
        }
    }

    if (unAuthorized) {
        return (
            <div className="flex justify-center items-center h-[100vh]">You are not allowed to edit this blog</div>
        )
    }

    if (!blogData) {
        return (
            <div className="flex justify-center items-center h-[100vh]">Loading...</div>
        )
    }

    return (
        <>
        <div className="flex flex-col m-5 w-full h-[120vh] mt-[5rem] pb-10">
            <div className="text-3xl font-bold text-center">Create Blog</div>
            <div className="mx-14 px-5">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Your title" />
                        </div>
                        <TextInput id="title" defaultValue={blogData.title} type="text" onChange={handleChange} placeholder="Enter the title of blog" required />
                    </div>
                    <div>
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="hashtags" value="Your Hashtags" />
                        </div>
                        <TagsInput
                            onChange={(value) => { setBlogData({ ...blogData, hashtags: value }) }}
                            name="hashtag"
                            placeHolder="Enter your hashtags"
                            id="hashtags"
                            value={blogData.hashtags}
                        />
                    </div>
                    <div className="mt-3">
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="image" value="Choose your image" />
                        </div>
                        <div className="flex border px-3 py-3 border-black flex-col">
                            <div className="flex justify-between">
                                <input type="file" accept="image/*" onChange={(e) => setfile(e.target.files[0])} />
                                <Button className=" bg-blue-600 enabled:hover:bg-blue-700 w-[8rem]" onClick={handleUploadImage} disabled={imageFile === null}>{uploadingStart ? `${imageFileUploadingProgress} %` : "Upload Image"}</Button>
                            </div>
                            {(blogData.image || imageFileUrl) && <img className="border border-black mt-4 h-80 w-full object-cover " src={blogData.image || imageFileUrl} alt="" />}
                        </div>
                    </div>
                    {imageFileUploadingError && <Alert className="mt-3" color="failure">
                        <span className="font-medium">Alert!</span> {imageFileUploadingError}
                    </Alert>}
                    <div>
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="content" value="Your content" />
                        </div>
                        <ReactQuill className="h-72" value={blogData.content} modules={module} theme="snow" id="content" onChange={(value) => { setBlogData({ ...blogData, content: value }) }} placeholder="Write Something..." />
                    </div>
                    <div className="my-[5rem]">
                        {formSubmitionError && <Alert className="my-3" color="failure">
                            <span className="font-medium">Alert!</span> {formSubmitionError}
                        </Alert>}
                        {sucessMessge && (
                            <Alert className="my-3 " color="success">
                                <div className="flex">
                                    <div>
                                        <span className="font-medium">Success!</span> Blog Published Successfully
                                    </div>
                                    <div className="ml-8 border p-[2px] border-black bg-blue-600 text-white rounded-md">
                                        <Link className="px-2 py-1" to="/blogs">See Blog</Link>
                                    </div>
                                </div>
                            </Alert>
                        )}
                        <Button className="bg-blue-600 enabled:hover:bg-blue-700 w-[100%]" type="submit">Update Blog</Button>
                        <div className='h-10'></div>
                    </div>
                </form>
            </div>
        </div>
        <div className='h-10'></div>

        <Footer />
        </>
    )
}

export default EditBlog
