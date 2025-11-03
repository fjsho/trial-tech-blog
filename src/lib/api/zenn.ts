import type { ZennArticle, ZennApiResponse } from '../types/zenn';
import type { BlogPost } from '../types/blogPost';

const ZENN_API_BASE = 'https://zenn.dev/api';
const ZENN_USERNAME = import.meta.env.VITE_ZENN_USERNAME || 'zenn';

export async function fetchZennArticles(): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `${ZENN_API_BASE}/articles?username=${ZENN_USERNAME}`
    );

    if (!response.ok) {
      throw new Error(`Zenn API error: ${response.status}`);
    }

    const data: ZennApiResponse = await response.json();
    const articles: ZennArticle[] = data.articles || [];

    return articles.map((article) => {
      // Zenn API にはdescription がないため、emojiとタイトルを組み合わせたものを使用
      const description = `${article.emoji} ${article.title}`;

      return {
        id: article.id.toString(),
        title: article.title,
        slug: article.slug,
        description: description,
        content: '', // Zenn APIでは本文が取得できないため空文字
        external_url: `https://zenn.dev${article.path}`,
        platform: 'zenn',
        published_at: article.published_at,
        tags: [], // Zenn APIではtagsが取得できないため空配列
        created_at: article.published_at,
        updated_at: article.body_updated_at,
      };
    });
  } catch (error) {
    console.error('Failed to fetch Zenn articles:', error);
    return [];
  }
}

