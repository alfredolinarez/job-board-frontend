const Button = ({ text, ...props }) => {
  return (
    <div className="mt-1 flex rounded-md">
      <button
        type="button"
        className="h-10 w-28 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        {...props}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
