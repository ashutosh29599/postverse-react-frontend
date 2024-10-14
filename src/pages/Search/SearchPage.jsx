import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import BoxComponent from "../../components/Box/BoxComponent";
import Post from "../../components/Post/Post";
import UserCard from "../../components/User/UserCard";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");
    const searchCriteria = searchParams.get("search-criteria");

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchPosts = async () => {
        let url;

        if (searchCriteria === "search-posts-by-username") {
            url = `api/posts?username=${searchQuery}`;
        } else if (searchCriteria === "search-users") {
            url = `/api/accounts/?username=${searchQuery}&all=true`;
        } else if (searchCriteria === "search-posts") {
            url = `api/posts?text=${searchQuery}`;
        }

        try {
            const response = await axios.get(url);
            if (
                searchCriteria === "search-posts-by-username" ||
                searchCriteria === "search-posts"
            ) {
                setPosts(response.data.results);
            } else if (searchCriteria === "search-users") {
                setUsers(response.data);
            }
        } catch (error) {
            console.log("Unable to fetch posts, ", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <BoxComponent>
            <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
                <Link to={"/home"}>Back</Link>
            </button>

            {(searchCriteria === "search-posts-by-username" ||
                searchCriteria === "search-posts") && (
                <div className="flex flex-col justify-center gap-2">
                    {searchCriteria === "search-posts-by-username" && (
                        <div className="flex justify-center font-bold text-2xl my-3 dark:text-slate-500">
                            You searched for posts by {searchQuery}.
                        </div>
                    )}
                    <div className="flex flex-col gap-3 justify-center">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))
                        ) : (
                            <p className="flex justify-center font-bold text-2xl my-3 dark:text-slate-500">
                                No posts available.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {searchCriteria === "search-users" && (
                <div className="flex flex-col justify-center gap-2">
                    {searchCriteria === "search-posts-by-username" && (
                        <div className="flex justify-center font-bold text-2xl my-3 dark:text-slate-500">
                            You searched for the user {searchQuery}.
                        </div>
                    )}
                    <div className="flex flex-col gap-3 justify-center">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <UserCard key={user.username} user={user} />
                            ))
                        ) : (
                            <p className="flex justify-center font-bold text-2xl my-3 dark:text-slate-500">
                                No user available by that username.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </BoxComponent>
    );
};

export default SearchPage;
