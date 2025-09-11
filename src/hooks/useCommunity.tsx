import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export const useCommunity = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const user = getAuth().currentUser;
    if (!user) return null;
    return await user.getIdToken();
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;

      const res = await axios.get(`${API_URL}/posts/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string) => {
    try {
      const token = await getToken();
      if (!token) return false;

      await axios.post(
        `${API_URL}/posts/`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Post created successfully");
      fetchPosts();
      return true;
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post");
      return false;
    }
  };

  const toggleLike = async (postId: string) => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await axios.post(
        `${API_URL}/posts/${postId}/like/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, ...res.data } : p
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
      toast.error("Failed to update like");
    }
  };

  const followUser = async (userId: string) => {
    try {
      const token = await getToken();
      if (!token) return;

      await axios.post(
        `${API_URL}/users/${userId}/follow/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFollowedUsers((prev) => [...prev, userId]);
      toast.success("User followed successfully");
    } catch (err) {
      console.error("Error following user:", err);
      toast.error("Failed to follow user");
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      const token = await getToken();
      if (!token) return;

      await axios.delete(`${API_URL}/users/${userId}/unfollow/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFollowedUsers((prev) => prev.filter((id) => id !== userId));
      toast.success("User unfollowed successfully");
    } catch (err) {
      console.error("Error unfollowing user:", err);
      toast.error("Failed to unfollow user");
    }
  };

  useEffect(() => {
    fetchPosts();
    // TODO: fetch users & followed users from backend
  }, []);

  return {
    posts,
    users,
    followedUsers,
    loading,
    createPost,
    toggleLike,
    followUser,
    unfollowUser,
    refetch: fetchPosts,
  };
};
