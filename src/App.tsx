import { usePosts, useAddPost } from './hooks/usePosts';
import { useDemoStore } from './store/demoStore';

function App() {
  const { data: posts, isLoading, isError } = usePosts();
  const { mutate: addPost, isPending } = useAddPost();
  const { isModelOpen, toggleModel } = useDemoStore();

  const handleAddPost = () => {
    addPost({
      title: 'New Post',
      body: 'Hello from react-query-zustand-demo!',
    });
    toggleModel();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📰 Blog Feed</h1>

      <button
        onClick={toggleModel}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isModelOpen ? 'Cancel' : 'Add New Post'}
      </button>

      {isModelOpen && (
        <div className="my-4">
          <button
            onClick={handleAddPost}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {isPending ? 'Adding...' : 'Submit New Post'}
          </button>
        </div>
      )}

      {isLoading && <p className="mt-6 text-gray-500">Loading posts...</p>}
      {isError && <p className="mt-6 text-red-500">Failed to load posts.</p>}

      <ul className="mt-6 space-y-4">
        {posts?.slice(0, 5).map((post: any) => (
          <li key={post.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
