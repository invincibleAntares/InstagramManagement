export function normalizeProfile(user) {
  return {
    name: user?.full_name || user?.username || "",
    handle: user?.username || "",
    profile_picture_url: user?.profile_pic_url_hd || user?.profile_pic_url || "",
    followers: user?.edge_followed_by?.count ?? 0,
    following: user?.edge_follow?.count ?? 0,
    posts: user?.edge_owner_to_timeline_media?.count ?? 0
  };
}

export function normalizePosts(edges, limit) {
  const arr = Array.isArray(edges) ? edges : [];
  return arr.slice(0, limit).map((e) => {
    const n = e?.node ?? {};
    const cap = n.edge_media_to_caption?.edges?.[0]?.node?.text || "";
    const t = n.__typename || "";
    return {
      shortcode: n.shortcode || "",
      permalink: n.shortcode ? `https://www.instagram.com/p/${n.shortcode}/` : "",
      media_type: n.is_video ? "video" : (t.includes("Sidecar") ? "carousel" : "image"),
      thumbnail_url: n.display_url || "",
      caption: cap,
      likes: n.edge_liked_by?.count || 0,
      comments: n.edge_media_to_comment?.count || 0,
      posted_at: n.taken_at_timestamp ? new Date(n.taken_at_timestamp * 1000).toISOString() : ""
    };
  });
}
