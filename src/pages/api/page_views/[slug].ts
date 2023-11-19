import {
  allDocuments,
  allPersonals,
  allSnippets,
  allTechnicals,
} from '.contentlayer/generated';
import { getAllSlugsAsList } from '@/lib/common/transforms';
import { SupabaseAdmin } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';


// use union types for responses
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const allSlugList = getAllSlugsAsList(
        allTechnicals,
        allPersonals,
        allSnippets
      );

      const contentType = allDocuments.find(
        (item) => item.slug === req.query.slug
      )?.contentType;

      if (allSlugList.includes(req.query.slug as string)) {
        await SupabaseAdmin.rpc('view_count_update_prod', {
          slug: req.query.slug,
          content_type: contentType,
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
      const { data, error } = await SupabaseAdmin.from('views_production')
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
