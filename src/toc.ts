import { getCollection } from 'astro:content';
const PART_NUMBER: Record<string, number> = { i: 1, ii: 2 };

function parseFileSlug(fileSlug: string) {
  const match = fileSlug.match(/^(ii|i)(\d+)?-(.+)$/);
  if (!match) throw new Error(`Unexpected file slug: ${fileSlug}`);
  const [, roman, orderStr] = match;
  return {
    partNumber: PART_NUMBER[roman],
    order: orderStr ? parseInt(orderStr, 10) : 0,
    isPartIntro: orderStr === undefined,
  };
}

export async function getPartsToc() {
  const articles = await getCollection('articles');

  const parts = new Map<string, {
    partNumber: number;
    title: string;
    introSlug?: string;
    articles: typeof articles;
  }>();

  for (const article of articles) {
    const [folderSlug, fileSlug] = article.id.split('/');
    const parsed = parseFileSlug(fileSlug);

    if (!parts.has(folderSlug)) {
      parts.set(folderSlug, { partNumber: parsed.partNumber, title: '', articles: [] });
    }
    const part = parts.get(folderSlug)!;

    if (parsed.isPartIntro) {
      part.title = article.data.title;
    } else {
      part.articles.push(article);
    }
  }

  return [...parts.values()]
    .sort((a, b) => a.partNumber - b.partNumber)
    .map(part => ({
      ...part,
      articles: part.articles.sort((a, b) => {
        const [, fa] = a.id.split('/');
        const [, fb] = b.id.split('/');
        return parseFileSlug(fa).order - parseFileSlug(fb).order;
      }),
    }));
}