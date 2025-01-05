import React, { useState, useEffect } from "react";

const AdminStories = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/stories")
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  const handleAddStory = () => {
    fetch("http://localhost:5000/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStory),
    })
      .then((response) => response.json())
      .then((data) => {
        setStories([...stories, data]);
        setNewStory({ title: "", content: "" });
      })
      .catch((error) => console.error("Error adding story:", error));
  };

  return (
    <div>
      <h2>Admin Panel: Manage Success Stories</h2>
      <div>
        <input
          type="text"
          placeholder="Story Title"
          value={newStory.title}
          onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newStory.content}
          onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
        ></textarea>
        <button onClick={handleAddStory}>Add Story</button>
      </div>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            {story.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminStories;
