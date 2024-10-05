import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import { Card, Dropdown, DropdownItem } from "flowbite-react";

import AuthContext, { AuthProvider } from "../../context/AuthContext";

// import { MdDeleteForever, MdEdit } from "react-icons/md";

const Post = ({ post }) => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <div className="min-w-96 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {/* dark:bg-gray-800 dark:border-gray-700 for dark mode? add to className above */}
                {/* <a href="#">
                    <img
                        className="rounded-t-lg"
                        src="/docs/images/blog/image-1.jpg"
                        alt=""
                    />=
                </a> */}
                <div className="p-5 flex flex-col">
                    <div className="relative flex items-center rounded-lg bg-purple-300 p-4 dark:bg-slate-500">
                        <Link
                            to={`/profile/${post.username}`}
                            className="flex-1"
                        >
                            <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                                {post.username}
                            </h5>
                        </Link>
                        {user && post.username == user && (
                            <div>
                                <div className="absolute right-2 top-2">
                                    <Dropdown inline label="">
                                        <DropdownItem>
                                            <Link
                                                to={`/edit-post/`}
                                                state={{ post: post }}
                                            >
                                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                                                    Edit
                                                </div>
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link
                                                to={`/delete-post/`}
                                                state={{ post: post }}
                                            >
                                                <div className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-red-500">
                                                    Delete
                                                </div>
                                            </Link>
                                        </DropdownItem>
                                    </Dropdown>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* {user && post.username == user && (
                        <div className="self-end">
                            <Link
                                to={`/edit-post/${post.id}`}
                                state={{ post: post }}
                            >
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
                    )} */}

                    <div className="mt-2 flex flex-col font-normal text-gray-700 dark:text-gray-600">
                        <small>{post.created_at}</small>
                        <small>Post id {post.id}</small>
                    </div>

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
