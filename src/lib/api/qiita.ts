import type { QiitaArticle } from '../types/qiita';
import type { BlogPost } from '../types/blogPost';

const QIITA_API_BASE = 'https://qiita.com/api/v2';
const QIITA_USERNAME = import.meta.env.VITE_QIITA_USERNAME || 'qiita';

export async function fetchQiitaArticles(): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `${QIITA_API_BASE}/users/${QIITA_USERNAME}/items?per_page=100&page=1`
    );

    if (!response.ok) {
      throw new Error(`Qiita API error: ${response.status}`);
    }

    const articles: QiitaArticle[] = await response.json();

    return articles.map((article) => {
      // 記事本文から冒頭100文字程度をdescriptionとして使用
      const description = article.body
        .replace(/[#*`\[\]]/g, '') // Markdown記号を除去
        .replace(/\n/g, ' ') // 改行をスペースに変換
        .trim()
        .substring(0, 100) + (article.body.length > 100 ? '...' : '');

      return {
        id: article.id,
        title: article.title,
        slug: article.id, // slugは記事IDを使用
        description,
        content: article.body,
        external_url: article.url,
        platform: 'qiita',
        published_at: article.created_at,
        tags: article.tags.map((tag) => tag.name),
        created_at: article.created_at,
        updated_at: article.updated_at,
      };
    });
  } catch (error) {
    console.error('Failed to fetch Qiita articles:', error);
    return [];
  }
}
