import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import {RouterProvider , createBrowserRouter} from "react-router-dom";
import PostList from './components/PostList.jsx';
import CreatePost from './components/CreatePost.jsx';
import PostListProvider from "./store/Post-list-store";

//creating routing 
const router =  createBrowserRouter([
  {
    path : "/" ,
    element : <App />, 
    children : [
      {
        path : "/" , element: <PostList />
      },
      {
        path : "/create-post" , element : <CreatePost />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostListProvider>
      <RouterProvider router={router}/>
    </PostListProvider>
  </StrictMode>,
)
