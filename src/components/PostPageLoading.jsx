export function PostPageLoading(slug) {
  return (
    <>
      <header className="flex flex-col items-center sm:items-start">
        <div className="w-80 h-80 bg-gray-600/20 animate-pulse"></div>
        <h1
          style={{ viewTransitionName: `post-title-${slug}` }}
          className="bg-pink-600 text-5xl sm:text-6xl font-bold text-black mix-blend-screen px-10 py-15 mb-6 animate-pulse w-full"
        ></h1>
        <div className="text-gray-300 flex items-center text-lg  mr-auto mb-4">
          <div className="w-15 h-15 mr-2 rounded-full bg-gray-600/20 animate-pulse"></div>
          <span className="bg-gray-600/20 animate-pulse w-30 py-2 rounded"></span>
        </div>
        <div className="flex flex-col gap-2 p-2 rounded mb-8">
          <time className="w-40 py-2 bg-gray-600/20 animate-pulse"></time>
          <time className="w-40 py-2 bg-gray-600/20 animate-pulse"></time>
        </div>
      </header>
      <article className="mb-8 w-full h-[50vh] bg-gray-600/20 animate-pulse rounded"></article>
    </>
  );
}
