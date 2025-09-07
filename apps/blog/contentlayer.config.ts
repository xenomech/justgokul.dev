import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer2/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const computedFields: ComputedFields = {
  readingTime: {
    type: 'json',
    resolve: doc => {
      return readingTime(doc.body.raw);
    },
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: true },
    category: { type: 'string', required: true },
    language: { type: 'list', of: { type: 'string' }, required: true },
    draft: { type: 'boolean', required: true },
  },
  computedFields,
}));
export const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: `snippets/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: true },
    category: { type: 'string', required: true },
    language: { type: 'list', of: { type: 'string' }, required: true },
    draft: { type: 'boolean', required: true },
  },
  computedFields,
}));

export const Story = defineDocumentType(() => ({
  name: 'Story',
  filePathPattern: `stories/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: true },
    category: { type: 'string', required: true },
    language: { type: 'list', of: { type: 'string' }, required: true },
    lookupImages: { type: 'list', of: { type: 'string' }, required: true },
    cardType: { type: 'string', required: false },
    ticketColor: { type: 'string', required: false },
    departure: { type: 'json', required: false },
    arrival: { type: 'json', required: false },
    passenger: { type: 'json', required: false },
    draft: { type: 'boolean', required: true },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Snippet, Story],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypePrettyCode,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
