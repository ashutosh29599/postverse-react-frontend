import axios from "axios";
import React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import BoxComponent from "../Box/BoxComponent";

const PostForm = ({ title, post_form_method }) => {
    const post = useLocation().state?.post; // gets from Post.jsx

    const [postText, setPostText] = useState({
        text: post?.text || "",
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(post?.photo || null);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const handleTextChange = (e) => {
        setPostText({
            ...postText,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
            setPhotoPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleReset = () => {
        setPostText({
            text: post?.text || "",
        });
        setPhoto(null);
        setPhotoPreview(post?.photo || null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            if (postText.text) {
                formData.append("text", postText.text);
            }
            if (photo) {
                formData.append("photo", photo);
            }

            if (post_form_method == "create_post") {
                await axios.post(`/api/posts/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                });
                toast.success("Post posted!");
            } else if (post_form_method == "edit_post") {
                await axios.patch(`/api/posts/${post.id}/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                });
                toast.success("Post updated!");
            }
        } catch (error) {
            if (post_form_method == "create_post") {
                toast.error(
                    "Failed to post your post. Please try again later."
                );
            } else if (post_form_method == "edit_post") {
                toast.error(
                    "Failed to update your post. Please try again later."
                );
            }
            console.log("Error updating the post, ", error);
        }
        navigate("/home");
    };

    return (
        <BoxComponent>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                {/* Title */}
                <h1 className="font-bold text-4xl text-center my-2 dark:text-slate-500">
                    {title}
                </h1>

                {/* Post Text */}
                <div className="mb-5">
                    <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-500"
                    >
                        Post Text
                    </label>
                    <textarea
                        type="text"
                        name="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your post text..."
                        value={postText.text}
                        onChange={handleTextChange}
                    />
                </div>

                {/* Photo Preview */}
                <div>
                    {photoPreview && (
                        <div className="relative z-0 w-full mb-5 group">
                            <img
                                src={photoPreview}
                                alt="photo preview"
                                className="w-64 object-cover mx-auto"
                            />
                        </div>
                    )}
                </div>

                {/* Photo Input */}
                <div className="mb-2">
                    <label
                        className="block  text-sm font-medium text-gray-900 dark:text-slate-500"
                        htmlFor="photo"
                    >
                        Upload file
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-slate-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby=""
                        id="photo"
                        type="file"
                        onChange={handlePhotoChange}
                        ref={fileInputRef}
                    />
                    <div
                        className="mt-1 text-sm text-gray-500 dark:text-slate-500"
                        id="photo_help"
                    >
                        You may upload one image.
                    </div>
                </div>

                {/* Buttons */}
                <div>
                    <button
                        type="submit"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Post
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="ms-2 text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-slate-300 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-400 dark:focus:ring-slate-900"
                    >
                        Reset
                    </button>

                    <Link to={"/home"}>
                        <button
                            type="cancel"
                            className="ms-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                            Cancel
                        </button>
                    </Link>
                </div>
            </form>
        </BoxComponent>
    );
};

export default PostForm;
