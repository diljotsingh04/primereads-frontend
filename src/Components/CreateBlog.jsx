import { useState } from 'react';
import { Button, TextInput, Label, Alert } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../Firebase/firebase";
import { TagsInput } from "react-tag-input-component";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const CreateBlog = () => {

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

    const [blogData, setblogData] = useState({ title: null, hashtag: [], image: null, content: "" });
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
        setblogData({ ...blogData, [e.target.id]: e.target.value });
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
                        setblogData({ ...blogData, image: downloadUrl })
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
        if (blogData.hashtag.length === 0) {
            return setFormSubmitionError("Please enter your hashtags");
        }
        if (blogData.image === null) {
            return setFormSubmitionError("Please select and image");
        }
        if (blogData.content.length < 20) {
            return setFormSubmitionError("Content should be of minimum 20 words");
        }

        try {
            const createBlog = await axios.post('http://localhost:3000/posts/addblog',
                blogData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );


            if (!createBlog.data.success) {
                setFormSubmitionError(createBlog.data.message);
            }
            else {
                setFormSubmitionError(null);
                setsucessMessge("Blog published successfully");
            }

        }
        catch (e) {
            setFormSubmitionError(`Failed to publish blog`)
        }

    }


    return (
        <div className="flex flex-col m-5 w-full h-[120vh]">
            <div className="text-3xl font-bold text-center">Create Blog</div>
            <div className="ml-20 mt-4">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Your title" />
                        </div>
                        <TextInput id="title" type="text" onChange={handleChange} placeholder="Enter the title of blog" required />
                    </div>
                    <div>
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="hashtag" value="Your Hashtags" />
                        </div>
                        <TagsInput
                            onChange={(value) => { setblogData({ ...blogData, hashtag: value }) }}
                            name="fruits"
                            placeHolder="Enter your hashtags"
                            id="hashtag"
                        />
                        {/* <TextInput id="hashtag" type="text" onChange={handleChange} placeholder="Enter the title of blog" required /> */}
                    </div>
                    <div className=" mt-3">
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="image" value="Choose your image" />
                        </div>
                        <div className="flex border px-3 py-3 border-black flex-col">
                            <div className="flex justify-between">
                                <input type="file" accept="image/*" onChange={(e) => setfile(e.target.files[0])} />
                                <Button className=" bg-blue-600 enabled:hover:bg-blue-700 w-[8rem]" onClick={handleUploadImage} disabled={imageFile === null}>{uploadingStart ? `${imageFileUploadingProgress} %` : "Upload Image"}</Button>
                            </div>
                            {imageFileUrl && <img className="border border-black mt-4 h-80 w-full object-cover " src={imageFileUrl} alt="" />}
                        </div>
                    </div>
                    {imageFileUploadingError && <Alert className="mt-3" color="failure">
                        <span className="font-medium">Alert!</span> {imageFileUploadingError}
                    </Alert>}
                    <div>
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="content" value="Your content" />
                        </div>
                        <ReactQuill className="h-72" modules={module} theme="snow" id="content" onChange={(value) => { setblogData({ ...blogData, content: value })}} placeholder="Write Something..." />
                    </div>
                    <div className=" my-[5rem]">
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
                                        <Link className="" to="/blogs">See Blog</Link>
                                    </div>
                                </div>
                            </Alert>
                        )}

                        <Button className="bg-blue-600 enabled:hover:bg-blue-700 w-[100%]" type="submit" >Publish Blog</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog
