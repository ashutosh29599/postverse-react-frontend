import React, { useState, useEffect } from "react";
import axios from "axios";

import Post from "../components/post";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("api/posts");
            setPosts(response.data.results);
            console.log(response.data);
            console.log(response.data.results[0]);
        } catch (error) {
            console.log("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default HomePage;
