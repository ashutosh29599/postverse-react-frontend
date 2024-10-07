import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowsRotate } from "react-icons/fa6";

import { Dropdown, DropdownItem } from "flowbite-react";

import LoadingComponent from "../components/Loading/LoadingComponent";

import Post from "../components/Post/Post";

// TODO: add pagination to fetchPosts.

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [nextPageURL, setNextPageURL] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchPosts = async (url = "/api/posts") => {
        try {
            if (url != "/api/posts") {
                setLoadingMore(true);
            }

            const response = await axios.get(url);

            const newPosts = response.data.results.filter(
                (newPosts) => !posts.some((post) => post.id === newPosts.id)
            );

            setPosts((prevPosts) => [...newPosts, ...prevPosts]);
            setNextPageURL(response.data.next);
            // console.log(response.data);
            // console.log(response.data.results[0]);
        } catch (error) {
            toast.error("Unable to fetch posts. Please try again later.");
            console.log("Error fetching posts:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const loadMorePosts = async (e) => {
        e.preventDefault();
        if (nextPageURL) {
            await fetchPosts(nextPageURL);
        }
    };

    const refreshPosts = () => {
        // setPosts([]);
        setLoading(true);
        fetchPosts();
    };

    if (loading && posts.length === 0) {
        return <LoadingComponent />;
    }

    return (
        <div className="flex flex-col gap-3 flex-1 items-center dark:bg-gray-900">
            <p className="dark:text-white">Posts available: {posts.length}</p>
            <div className="flex flex-row">
                <Link to={"/create-post"}>
                    <button
                        type="button"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                        Create Post
                    </button>
                </Link>
                <button
                    type="button"
                    className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 flex items-center justify-center space-x-2" // for focus ring:  focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-900
                    onClick={refreshPosts}
                >
                    <FaArrowsRotate /> <span>Refresh</span>
                </button>

                {/* Sort by */}
                {/* <div>
                    <Dropdown label="Sort by" dismissOnClick={false} size="md">
                        <DropdownItem>Latest First</DropdownItem>
                        <DropdownItem>Oldest First</DropdownItem>
                        <DropdownItem>Username Ascending</DropdownItem>
                        <DropdownItem>Username Descending</DropdownItem>
                    </Dropdown>
                </div> */}
            </div>

            {posts.length > 0 ? (
                posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
                <p>No posts available.</p>
            )}
            {nextPageURL && (
                <button
                    onClick={loadMorePosts}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loadingMore}
                >
                    {loadingMore ? "Loading more..." : "Load more..."}
                </button>
            )}
        </div>
    );
};

export default HomePage;
