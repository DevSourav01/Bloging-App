import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./Firebase";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  // ✅ Real-time listener — onSnapshot
  // Removed fetchBlogs entirely!
  useEffect(() => {
    setFetching(true);

    const q = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];
        setBlogs(data);
        setFetching(false);
      },
      (err) => {
        console.log(err);
        setFetching(false);
      }
    );

    // cleanup on unmount
    return () => unsubscribe();
  }, []);

  // ✅ Add blog — no fetchBlogs needed!
  async function addBlog() {
    if (title.trim() === "" || content.trim() === "") return;
    setLoading(true);
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        createdAt: Timestamp.now(),
      });
      setTitle("");
      setContent("");
      // onSnapshot auto updates! No fetchBlogs needed ✅
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Delete blog — no fetchBlogs needed!
  async function deleteBlog(id: string) {
    try {
      await deleteDoc(doc(db, "blogs", id));
      // onSnapshot auto updates! No fetchBlogs needed ✅
    } catch (err) {
      console.log(err);
    }
  }

  // ✅ Format timestamp
  function formatDate(timestamp: Timestamp) {
    return timestamp?.toDate().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 md:p-8">

      <div className="fixed -top-25 -left-25 w-87.5 h-87.5
                      bg-violet-700 rounded-full opacity-10
                      blur-3xl pointer-events-none" />
      <div className="fixed -bottom-25 -right-25 w-87.5 h-87.5
                      bg-pink-600 rounded-full opacity-10
                      blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2
                          bg-white/5 border border-white/10
                          rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs text-gray-400
                             tracking-widest uppercase">
              personal space
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white
                         tracking-tight leading-tight">
            My{" "}
            <span className="bg-gradient-to-r from-violet-400
                             to-pink-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            write your thoughts, ideas and learnings ✨
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10
                        rounded-3xl p-6 md:p-8 mb-8">

          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-violet-400" />
            <h2 className="text-sm font-semibold text-gray-300
                           tracking-wide uppercase">
              New Post
            </h2>
          </div>

          <input
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10
                       text-white placeholder-gray-600
                       rounded-2xl px-5 py-3.5 text-sm
                       outline-none focus:border-violet-500/50
                       transition-all mb-3"
          />

          <textarea
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full bg-white/5 border border-white/10
                       text-white placeholder-gray-600
                       rounded-2xl px-5 py-3.5 text-sm
                       outline-none focus:border-violet-500/50
                       transition-all resize-none mb-5"
          />

          <div className="flex items-center justify-between
                          flex-wrap gap-3">
            <p className="text-gray-600 text-xs">
              {content.length} characters
            </p>
            <button
              onClick={addBlog}
              disabled={loading || !title.trim() || !content.trim()}
              className="bg-gradient-to-r from-violet-600 to-pink-600
                         hover:from-violet-500 hover:to-pink-500
                         disabled:opacity-40 disabled:cursor-not-allowed
                         active:scale-95 text-white font-semibold
                         px-6 py-2.5 rounded-2xl text-sm
                         transition-all shadow-lg shadow-violet-900/30"
            >
              {loading ? "Publishing..." : "Publish Post ✨"}
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-gray-600 text-xs tracking-widest uppercase">
            {blogs.length} posts
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* BLOG LIST */}
        <div className="flex flex-col gap-4">

          {fetching && (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-violet-500
                             border-t-transparent rounded-full
                             animate-spin mx-auto mb-4" />
              <p className="text-gray-600 text-sm">loading posts...</p>
            </div>
          )}

          {!fetching && blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🌱</p>
              <p className="text-gray-500 text-sm">
                no posts yet — write something above!
              </p>
            </div>
          )}

          {!fetching && blogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white/5 border border-white/10
                         hover:border-white/20 hover:bg-white/8
                         rounded-3xl p-6 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 mr-4">
                  <h3 className="text-lg font-bold text-white
                                 mb-1 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {formatDate(blog.createdAt)}
                  </p>
                </div>

                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="text-red-400 hover:text-red-500
                             hover:bg-red-500/10 transition-all
                             w-8 h-8 rounded-lg flex items-center
                             justify-center border border-red-500/20"
                >
                  🗑️
                </button>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed
                            mb-4 line-clamp-3">
                {blog.content}
              </p>

              <div className="flex items-center gap-3
                              pt-4 border-t border-white/5">
                <span className="text-gray-600 text-xs">
                  {Math.ceil(blog.content.trim()
                    .split(/\s+/).length / 200)} min read
                </span>
                <span className="text-gray-700">·</span>
                <span className="text-gray-600 text-xs">
                  {blog.content.trim().split(/\s+/).length} words
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 mb-4">
          <p className="text-gray-700 text-xs">
            built with React + Firebase 🔥
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;