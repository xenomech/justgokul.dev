import { allPosts, allSnippets, allStories } from '.contentlayer/generated';
import { SupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: { slug: string };
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const postSlugList = allPosts.map(post => post.slug);
    const snippetSlugList = allSnippets.map(snippet => snippet.slug);
    const storySlugList = allStories.map(story => story.slug);

    // Allow tracking for all pages (including home, about, blog, snippets, stories)
    const validSlugs = [
      'home',
      'about',
      'blog',
      'snippets',
      'stories',
      ...postSlugList,
      ...snippetSlugList,
      ...storySlugList,
    ];

    if (validSlugs.includes(params.slug)) {
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
    console.error('Error updating page views:', error);
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

    if (data && data.length > 0) {
      return NextResponse.json({
        views: data[0]?.views || 0,
      });
    } else if (error) {
      throw error;
    } else {
      // If no data found, return 0 views
      return NextResponse.json({
        views: 0,
      });
    }
  } catch (error) {
    console.error('Error fetching page views:', error);
    return NextResponse.json(
      {
        error: 'An Error has occurred',
      },
      { status: 500 }
    );
  }
}
