import React, { useState, useEffect } from "react";
import axios from "axios";

import Post from "../components/Post";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
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

    if (loading && posts.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col gap-3 flex-1 items-center">
            <p>Posts available: {posts.length}</p>
            <div>
                <Link to={"/create-post"}>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Create Post
                    </button>
                </Link>
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
