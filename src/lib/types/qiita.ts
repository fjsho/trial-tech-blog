export type QiitaTag = {
  name: string;
  versions: string[];
};

export type QiitaUser = {
  id: string;
  name: string;
  profile_image_url: string;
  github_login_name: string | null;
  twitter_screen_name: string | null;
  followers_count: number;
  followees_count: number;
  items_count: number;
};

export type QiitaArticle = {
  id: string;
  title: string;
  url: string;
  body: string;
  rendered_body: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  stocks_count: number;
  comments_count: number;
  reactions_count: number;
  private: boolean;
  coediting: boolean;
  tags: QiitaTag[];
  user: QiitaUser;
  page_views_count: number | null;
  team_membership: any | null;
  organization_url_name: string | null;
  slide: boolean;
};
