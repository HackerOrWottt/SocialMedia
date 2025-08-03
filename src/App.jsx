import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import PostListProvider from "./store/Post-list-store";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //hooks to render Posts or Create post component
  const [selectedTab, setSelectedTab] = useState("Home");

  const onCreatePost = () => {
    setSelectedTab("Create Post");
  };

  const onShowPost = () => {
    setSelectedTab("Home");
  };

  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar
          selectedTab={selectedTab}
          handleCreatePost={onCreatePost}
          handleShowPost={onShowPost}
        />
        <div className="content">
          <Header />
          {selectedTab === "Home" ? <PostList /> : <CreatePost />}
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
