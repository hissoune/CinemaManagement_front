function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-row gap-4">
        <div className="w-12 h-12 rounded-full animate-spin border-y border-solid border-cyan-500 border-t-transparent shadow-md"></div>
        <div className="w-12 h-12 rounded-full animate-spin border-y-2 border-solid border-violet-500 border-t-transparent shadow-md"></div>
        <div className="w-12 h-12 rounded-full animate-spin border-y-4 border-solid border-pink-500 border-t-transparent shadow-md"></div>
        <div className="w-12 h-12 rounded-full animate-spin border-y-8 border-solid border-green-500 border-t-transparent shadow-md"></div>
      </div>
    </div>
  );
}

export default Loading;
