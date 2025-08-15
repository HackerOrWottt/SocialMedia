import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";

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
      <div className="app-container">
        <Sidebar
          selectedTab={selectedTab}
          handleCreatePost={onCreatePost}
          handleShowPost={onShowPost}
        />
        <div className="content">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
  );
}

export default App;
