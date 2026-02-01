import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { CreateBlog } from './pages/CreateBlog'
import { EditBlog } from './pages/EditBlog'
import { AuthorBlogs } from './pages/AuthorBlogs'
import { Header } from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blog/:id/edit" element={<EditBlog />} />
        <Route path="/author/:authorId/blogs" element={<AuthorBlogs />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App