import React, { useEffect, useState } from "react";
import { Link, useNavigate,  useSearchParams } from "react-router-dom";
import BoxComponent from "../../components/Box/BoxComponent";


import Post from "../../components/Post/Post";

import { Button } from "flowbite-react";
import axios from "axios";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");


    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                `api/posts?username=${searchQuery}`
            );
            setPosts(response.data.results);
            console.log(response.data);
            console.log(`posts -> ${posts}`);
        } catch (error) {
            console.log("Unable to fetch posts, ", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(searchParams);
    console.log(searchQuery);

    return (
        <BoxComponent>
            <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
                <Link to={'/home'}>
                    Back
                </Link>
            </button>

            <div className="flex flex-col justify-center gap-2">
                <div className="flex justify-center font-bold text-2xl my-3 dark:text-slate-500">
                    You searched for posts by {searchQuery}.
                </div>
                {/* <Button.Group outline>
                    <Button color="gray">Posts by Matching Users</Button>
                </Button.Group> */}
                <div className="flex flex-col gap-3 justify-center">
                    
                {posts.length > 0 ? (
                    posts.map((post) => <Post key={post.id} post={post} />)
                ) : (
                    <p>No posts available.</p>
                )}
                </div>
            </div>
        </BoxComponent>
    );
};

export default SearchPage;
