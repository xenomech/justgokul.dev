import {
  ComputedFields,
  FieldDef,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const computedFields: ComputedFields = {
  readingTime: {
    type: 'json',
    resolve: (doc) => {
      return readingTime(doc.body.raw);
    },
  },
};

const fields: Record<string, FieldDef> = {
  title: { type: 'string', required: true },
  slug: { type: 'string', required: true },
  date: { type: 'date', required: true },
  excerpt: { type: 'string', required: true },
  category: { type: 'list', of: { type: 'string' }, required: true },
  contentType: { type: 'string', required: true },
  language: { type: 'list', of: { type: 'string' } },
  draft: { type: 'boolean', required: true },
};

export const TechnicalPost = defineDocumentType(() => ({
  name: 'Technical',
  filePathPattern: `posts/technical/*.mdx`,
  contentType: 'mdx',
  fields,
  computedFields,
}));

export const PersonalPost = defineDocumentType(() => ({
  name: 'Personal',
  filePathPattern: `posts/personal/*.mdx`,
  contentType: 'mdx',
  fields,
  computedFields,
}));
export const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: `snippets/*.mdx`,
  contentType: 'mdx',
  fields,
  computedFields,
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [TechnicalPost, PersonalPost, Snippet],
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
