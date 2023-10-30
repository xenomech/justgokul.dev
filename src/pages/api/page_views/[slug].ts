import { allPosts, allSnippets } from '.contentlayer/generated';
import { returnSelectedFields } from '@/lib/common';
import { SupabaseAdmin } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const postSlugList = returnSelectedFields(allPosts).map((_) => {
        return _.slug;
      });
      const snippetSlugList = returnSelectedFields(allSnippets).map((_) => {
        return _.slug;
      });

      if (
        postSlugList.includes(req.query.slug as string) ||
        snippetSlugList.includes(req.query.slug as string)
      ) {
        await SupabaseAdmin.rpc('updateViews_production', {
          slug: req.query.slug,
        });
        return res.status(200).json({
          message: `viewCountUpdated`,
        });
      }
    } catch (error) {
      return res.json({
        error: 'An Error has occurred',
      });
    }
  }
  if (req.method === 'GET') {
    try {
      const { data, error } = await SupabaseAdmin.from('page_views_production')
        .select('views')
        .filter('post', 'eq', req.query.slug);
      if (data) {
        return res.status(200).json({
          views: data[0]?.views || null,
        });
      } else if (error) {
        throw error;
      }
    } catch (error) {
      return res.json({
        error: 'An Error has occurred',
      });
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request',
  });
}
