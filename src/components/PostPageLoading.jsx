export function PostPageLoading(slug) {
  return (
    <>
      <header className="flex flex-col items-center sm:items-start">
        <h1
          style={{ viewTransitionName: `post-title-${slug}` }}
          className="bg-pink-600 px-10 py-10 mb-6 animate-pulse w-80"
        ></h1>
        <div className="w-80 h-40 bg-gray-600/20 animate-pulse"></div>
        <div className="text-gray-300 flex items-center text-lg  mr-auto mb-4 mt-4">
          <div className="w-15 h-15 mr-2 rounded-full bg-gray-600/20 animate-pulse"></div>
          <span className="bg-gray-600/20 animate-pulse w-30 py-2 rounded"></span>
        </div>
      </header>
      <hr class="w-1/2 border-t-2 border-pink-600 mx-auto" />
      <article className="mb-8 w-full h-[50vh] bg-gray-600/5 animate-pulse rounded mt-8"></article>
      <div className="flex flex-col pl-4 py-2 pr-2 bg-gray-500/10 rounded mb-8 text-sm text-gray-400 border-l-5 border-pink-600 gap-2">
        <time className="w-50 py-2 bg-gray-600/20 animate-pulse"></time>
        <time className="w-50 py-2 bg-gray-600/20 animate-pulse"></time>
      </div>
    </>
  );
}
