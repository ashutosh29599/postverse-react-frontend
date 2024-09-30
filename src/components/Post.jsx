import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import AuthContext from "../context/AuthContext";

// import { MdDeleteForever, MdEdit } from "react-icons/md";

const Post = ({ post }) => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                {/* dark:bg-gray-800 dark:border-gray-700 for dark mode? add to className above */}
                {/* <a href="#">
                    <img
                        className="rounded-t-lg"
                        src="/docs/images/blog/image-1.jpg"
                        alt=""
                    />=
                </a> */}
                <div className="p-5 flex flex-col">
                    <Link to={`/profile/${post.username}`}>
                        <h5 className="text-center rounded-md mb-2 text-2xl bg-orange-300 font-bold tracking-tight text-gray-900 dark:text-white">
                            {post.username}
                        </h5>
                    </Link>

                    {user && post.username == user && (
                        <div className=" self-end">
                            <Link to={`/edit-post/${post.id}`}>
                                <button>
                                    <FaEdit size={20} />
                                </button>
                            </Link>
                            <Link to={`/delete-post/${post.id}`}>
                                <button>
                                    <FaTrash size={20} color="red" />
                                </button>
                            </Link>
                        </div>
                    )}

                    <small>{post.created_at}</small>
                    <small>Post id {post.id}</small>

                    <p className="mt-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {post.text}
                    </p>
                    <img src={post.photo} alt="" />
                    {/* <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Read more
                    </a> */}
                </div>
            </div>
        </>
    );
};

export default Post;
