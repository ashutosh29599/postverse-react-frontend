import axios from "axios";
import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmDeletePostPage = () => {
    const post = useLocation().state.post; // gets from Post.jsx
    // const post = useParams();
    const navigate = useNavigate();

    const deletePost = async () => {
        try {
            await axios.delete(`/api/posts/${post.id}/`, {
                withCredentials: true,
            });
            toast.success("Successfully deleted your post.");
        } catch (error) {
            toast.error("Failed to delete your post. Please try again later.");
            console.log("Failed to delete the post: ", error);
        }
        navigate("/home");
    };

    return (
        <div className="h-screen dark:bg-gray-900">
            <div className="flex justify-center">
                <div className="my-5 flex justify-center w-2/5 border border-2 border-slate-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-slate-500">
                    <div className="flex flex-col items-center">
                        <div className="my-4 text-4xl font-bold dark:text-slate-500">Delete Post?</div>
                        <p className="mt-2 dark:text-slate-500">
                            Are you sure you want to delete this post? This
                            cannot be undone.
                        </p>
                        <div className="my-5 flex flex-row gap-2">
                            <button
                                type="button"
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={deletePost}
                            >
                                Delete Post
                            </button>
                            <Link to={"/home"}>
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeletePostPage;
