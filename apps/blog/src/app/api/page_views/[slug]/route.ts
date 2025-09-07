import { allPosts, allSnippets } from '.contentlayer/generated';
import { SupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: { slug: string };
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const postSlugList = allPosts.map(post => post.slug);
    const snippetSlugList = allSnippets.map(snippet => snippet.slug);

    if (postSlugList.includes(params.slug) || snippetSlugList.includes(params.slug)) {
      await SupabaseAdmin.rpc('updateViews_production', {
        slug: params.slug,
      });
      return NextResponse.json({
        message: `viewCountUpdated`,
      });
    }

    return NextResponse.json(
      {
        error: 'Invalid slug',
      },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'An Error has occurred',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { data, error } = await SupabaseAdmin.from('page_views_production')
      .select('views')
      .filter('post', 'eq', params.slug);

    if (data) {
      return NextResponse.json({
        views: data[0]?.views || null,
      });
    } else if (error) {
      throw error;
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: 'An Error has occurred',
      },
      { status: 500 }
    );
  }
}
