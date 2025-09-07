import { NextRequest, NextResponse } from 'next/server';
import { getDayOfWeek, dateToTimestamp } from '@repo/utils';
import * as cheerio from 'cheerio';

interface ScrapedContribution {
  date: string;
  count: number;
  level: number;
}

async function fetchYears(username: string) {
  const data = await fetch(`https://github.com/${username}?tab=contributions`, {
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (compatible; justgokul-blog)',
    },
  });

  if (!data.ok) {
    throw new Error(`Failed to fetch GitHub profile: ${data.status}`);
  }

  const body = await data.text();
  const $ = cheerio.load(body);

  return $('.js-year-link.filter-item')
    .get()
    .map((a: any) => {
      const $a = $(a);
      const href = $a.attr('href');
      if (!href) return null;

      const githubUrl = new URL(`https://github.com${href}`);
      githubUrl.searchParams.set('tab', 'contributions');
      const formattedHref = `${githubUrl.pathname}${githubUrl.search}`;

      return {
        href: formattedHref,
        text: $a.text().trim(),
      };
    })
    .filter(Boolean);
}

async function fetchDataForYear(url: string, year: string) {
  const contributions: ScrapedContribution[] = [];

  const data = await fetch(`https://github.com${url}`, {
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (compatible; justgokul-blog)',
    },
  });

  if (!data.ok) {
    throw new Error(`Failed to fetch contributions for year ${year}: ${data.status}`);
  }

  const $ = cheerio.load(await data.text());
  const $days = $('table.ContributionCalendar-grid td.ContributionCalendar-day');

  const contribText = $('.js-yearly-contributions h2')
    .text()
    .trim()
    .match(/^([0-9,]+)\s/);

  let totalContributions = 0;
  if (contribText) {
    const [countStr] = contribText;
    totalContributions = parseInt(countStr.replace(/,/g, ''), 10) || 0;
  }

  $days.each((_index: number, day: any) => {
    const $day = $(day);
    const date = $day.attr('data-date');
    const level = parseInt($day.attr('data-level') || '0', 10);

    let count = 0;
    const tooltip = $day.attr('title') || $day.attr('aria-label') || '';
    const countMatch = tooltip.match(/(\d+)\s+contribution/);
    if (countMatch && countMatch[1]) {
      count = parseInt(countMatch[1], 10) || 0;
    } else if (level > 0) {
      count = level;
    }

    if (date) {
      contributions.push({
        date,
        count,
        level: Math.min(Math.max(level, 0), 4),
      });
    }
  });

  contributions.sort((a, b) => dateToTimestamp(a.date) - dateToTimestamp(b.date));

  const weeks: { days: ScrapedContribution[] }[] = [];
  let currentWeek: ScrapedContribution[] = [];

  contributions.forEach(contrib => {
    const dayOfWeek = getDayOfWeek(contrib.date);

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push({ days: currentWeek });
      currentWeek = [];
    }

    currentWeek.push(contrib);
  });

  if (currentWeek.length > 0) {
    weeks.push({ days: currentWeek });
  }

  const startDate = contributions[0]?.date || '';
  const endDate = contributions[contributions.length - 1]?.date || '';

  return {
    totalContributions,
    weeks,
    range: {
      start: startDate,
      end: endDate,
    },
    year: parseInt(year, 10),
  };
}

export async function POST(request: NextRequest) {
  try {
    const { username, year } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const targetYear = (year || new Date().getFullYear()).toString();

    try {
      const years = await fetchYears(username);

      if (years.length === 0) {
        return NextResponse.json(
          { error: `No contribution data found for user '${username}'` },
          { status: 404 }
        );
      }

      let yearData = years.find((y: any) => y.text === targetYear);
      if (!yearData) {
        yearData = years[0];
      }

      if (!yearData) {
        return NextResponse.json({ error: 'No valid year data found' }, { status: 500 });
      }

      const contributionData = await fetchDataForYear(yearData.href, yearData.text);

      return NextResponse.json({
        username,
        year: contributionData.year,
        data: {
          totalContributions: contributionData.totalContributions,
          weeks: contributionData.weeks,
          range: contributionData.range,
        },
        availableYears: years.map((y: any) => y.text),
        success: true,
      });
    } catch (fetchError: any) {
      console.error('GitHub scraping error:', fetchError);

      if (fetchError.message.includes('404')) {
        return NextResponse.json(
          { error: `User '${username}' not found on GitHub` },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          error: 'Failed to fetch contribution data from GitHub',
          details: fetchError.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in GitHub contributions API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST request with username and optional year.' },
    { status: 405 }
  );
}
