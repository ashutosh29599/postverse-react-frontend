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

    const fetchPosts = async (sortBy = "latest_first") => {
        let url;

        if (searchCriteria === "search-posts-by-username") {
            url = `api/posts?username=${searchQuery}&sort-by=${sortBy}`;
        } else if (searchCriteria === "search-users") {
            url = `/api/accounts/?username=${searchQuery}&all=true`;
        } else if (searchCriteria === "search-posts") {
            url = `api/posts?text=${searchQuery}&sort-by=${sortBy}`;
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

    const handleSorting = (e) => {
        e.preventDefault();
        const selectedSortingCriteria = e.target.value;
        let sortingCriteria;

        if (selectedSortingCriteria === "latest-first") {
            sortingCriteria = "latest_first";
        } else if (selectedSortingCriteria === "oldest-first") {
            sortingCriteria = "oldest_first";
        } else if (selectedSortingCriteria === "username-ascending") {
            sortingCriteria = "username_ascending";
        } else if (selectedSortingCriteria === "username-descending") {
            sortingCriteria = "username_descending";
        }

        fetchPosts(sortingCriteria);
    };

    return (
        <BoxComponent>
            <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
                <Link to={"/home"}>Back</Link>
            </button>

            {/* Sort by -- Search posts by username */}
            {searchCriteria === "search-posts-by-username" && (
                <div>
                    <select
                        id="sort-by"
                        className="my-2 w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleSorting}
                    >
                        <option selected>Sort By</option>
                        <option value="latest-first">Latest First</option>
                        <option value="oldest-first">Oldest First</option>
                    </select>
                </div>
            )}

            {/* Sort by -- Search posts */}
            {searchCriteria === "search-posts" && (
                <div>
                    <select
                        id="sort-by"
                        className="my-2 w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleSorting}
                    >
                        <option selected>Sort By</option>
                        <option value="latest-first">Latest First</option>
                        <option value="oldest-first">Oldest First</option>
                        <option value="username-ascending">
                            Username Ascending
                        </option>
                        <option value="username-descending">
                            Username Descending
                        </option>
                    </select>
                </div>
            )}
            

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
