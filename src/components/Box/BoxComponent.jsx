const BoxComponent = ({ children }) => {
    return (
        <div className="min-h-screen dark:bg-gray-900">
            <div className="flex flex-col justify-center items-center min-h-screen">
                {/* The div below is for the box. */}
                <div className="flex justify-center w-2/5 border border-2 border-slate-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-slate-500">
                    {/* The div below is for the contents in the box */}
                    <div className="flex flex-col justify-center items-center my-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxComponent;
