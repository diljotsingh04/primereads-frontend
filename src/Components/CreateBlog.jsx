import {useState} from 'react';
import { Button, TextInput, Label } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
    const [value, setValue] = useState('');

    return (
        <div className="flex flex-col m-5 w-full h-[80vh]">
            <div className="text-3xl font-bold text-center">Create Blog</div>
            <div className="ml-20 mt-4">
                <form>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Your title" />
                        </div>
                        <TextInput id="title" type="text" placeholder="Enter the title of blog" required />
                    </div>
                    <div>
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="hashtag" value="Your Hashtags" />
                        </div>
                        <TextInput id="hashtag" type="text" placeholder="Enter the title of blog" required />
                    </div>
                    <div>
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="image" value="Choose your image" />
                        </div>
                        <input type="file" id="image" />
                    </div>
                    <div>
                        <div className="mb-2 block mt-3">
                            <Label htmlFor="content" value="Your content" />
                        </div>
                        <ReactQuill className="h-72" theme="snow" id="content" value={value} onChange={setValue} placeholder="Write Something..."/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog
