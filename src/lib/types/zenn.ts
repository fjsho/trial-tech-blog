export type ZennUser = {
  id: number;
  username: string;
  name: string;
  avatar_small_url: string;
};

export type ZennArticle = {
  id: number;
  post_type: string;
  title: string;
  slug: string;
  comments_count: number;
  liked_count: number;
  bookmarked_count: number;
  body_letters_count: number;
  article_type: string;
  emoji: string;
  is_suspending_private: boolean;
  published_at: string;
  body_updated_at: string;
  source_repo_updated_at: string;
  pinned: boolean;
  path: string;
  principal_type: string;
  user: ZennUser;
  publication: any | null;
  publication_article_override: any | null;
};

export type ZennApiResponse = {
  articles: ZennArticle[];
  next_page: number | null;
  total_count: number | null;
};

