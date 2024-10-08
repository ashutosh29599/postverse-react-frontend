import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";

import { DarkThemeToggle, Flowbite } from "flowbite-react";

const NavbarLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [searchCriteria, setSearchCriteria] = useState("");

    const handleLogout = async () => {
        console.log("clicked logout button");
        try {
            await logout();

            navigate("/login");
        } catch (error) {
            console.log("Error logging out, error: ", error);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery && searchCriteria) {
            navigate(
                `/search?query=${searchQuery}&search-criteria=${searchCriteria}`
            );
        } else if (searchQuery) {
            navigate(`/search?query=${searchQuery}`);
        } else {
            console.log("Unable to search...");
        }
    };

    const currentPageHighlight = ({ isActive }) =>
        isActive
            ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
            : "block py-2 px-3 text-black rounded md:p-0 hover:bg-gray-100 dark:text-gray-400 hover:text-blue-700 ";

    return (
        <Flowbite>
            {/* Source: https://flowbite.com/docs/components/navbar/#navbar-with-search  */}
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* Left */}
                    <Link to={"/home"}>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            <h1>PostVerse</h1>
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div className="w-1/2 flex justify-center items-center">
                        <form
                            className="w-full flex items-center max-w-sm mx-auto"
                            // onSubmit={handleSearchSubmit}
                        >
                            <label htmlFor="simple-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full">
                                {/* Search logo LEFT */}
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search..."
                                    // value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            
                            {/* Select Criteria */}
                            <select
                                id=""
                                className="ms-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => {
                                    setSearchCriteria(e.target.value);
                                }}
                            >
                                <option selected>Search By</option>
                                <option value="search-posts-by-username">
                                    Search Posts by Username
                                </option>
                            </select>

                            <button
                                type="submit"
                                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleSearchSubmit}
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>

                    {/* Right */}
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink
                                    to={"/home"}
                                    // className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    className={currentPageHighlight}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="dark:text-gray-400">
                                <Dropdown label={user} inline>
                                    <DropdownItem>
                                        <NavLink
                                            to={`/profile/${user}`}
                                            // className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                            className={currentPageHighlight}
                                        >
                                            Profile
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink
                                            to={"/settings"}
                                            className={currentPageHighlight}
                                        >
                                            Settings
                                        </NavLink>
                                    </DropdownItem>

                                    <DropdownDivider />
                                    <DropdownItem
                                        onClick={handleLogout}
                                        // className={currentPageHighlight}
                                        className="text-gray-900 hover:bg-gray-100 md:hover:text-red-700 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Logout 
                                    </DropdownItem>
                                </Dropdown>
                            </li>
                            <li>
                                <DarkThemeToggle />
                            </li>

                            {/* <li>
                                <NavLink
                                    to={`/profile/${user}`}
                                    // className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    className={currentPageHighlight}
                                >
                                    Profile ({user})
                                </NavLink>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Logout
                                </button>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
            <ToastContainer />
        </Flowbite>
    );
};

export default NavbarLayout;
