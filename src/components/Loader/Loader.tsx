function Loader() {
  return (
    <div className='fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50'>
      {/* Animated spinning loader */}
      <div className='w-24 h-24 border-4 border-t-blue-500 border-b-blue-300 border-gray-300 rounded-full animate-spin mb-6'></div>

      {/* Loading text */}
      <p className='text-white text-xl font-semibold animate-pulse'>
        Loading...
      </p>

      {/* Optional subtle wave animation */}
      <div className='flex space-x-2 mt-4'>
        <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-75'></span>
        <span className='w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150'></span>
        <span className='w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-200'></span>
      </div>
    </div>
  );
}

export default Loader;
