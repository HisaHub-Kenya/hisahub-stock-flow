import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiHelpers, handleApiError } from "@/lib/api";

export const useCommunity = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await apiHelpers.getPosts();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      const { message } = handleApiError(err);
      toast.error(`Failed to load posts: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string) => {
    try {
      await apiHelpers.createPost(content);
      toast.success("Post created successfully");
      fetchPosts();
      return true;
    } catch (err) {
      console.error("Error creating post:", err);
      const { message } = handleApiError(err);
      toast.error(`Failed to create post: ${message}`);
      return false;
    }
  };

  const toggleLike = async (postId: string) => {
    try {
      const data = await apiHelpers.likePost(postId);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, ...data } : p
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
      const { message } = handleApiError(err);
      toast.error(`Failed to update like: ${message}`);
    }
  };

  const followUser = async (userId: string) => {
    try {
      await apiHelpers.followUser(userId);
      setFollowedUsers((prev) => [...prev, userId]);
      toast.success("User followed successfully");
    } catch (err) {
      console.error("Error following user:", err);
      const { message } = handleApiError(err);
      toast.error(`Failed to follow user: ${message}`);
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      await apiHelpers.unfollowUser(userId);
      setFollowedUsers((prev) => prev.filter((id) => id !== userId));
      toast.success("User unfollowed successfully");
    } catch (err) {
      console.error("Error unfollowing user:", err);
      const { message } = handleApiError(err);
      toast.error(`Failed to unfollow user: ${message}`);
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
    getUserPosts: fetchPosts,
    refetch: fetchPosts,
  };
};
