'use client';

import { useState, useEffect } from 'react';
import { ContributionsGraph, ContributionData } from '@repo/ui';

interface GitHubContributionsSectionProps {
  username: string;
  year?: number;
}

export function GitHubContributionsSection({ username, year }: GitHubContributionsSectionProps) {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/github-contributions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            year,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username, year]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-8 pb-4">
            {Array.from({ length: 9 }).map((_, monthIndex) => (
              <div key={monthIndex} className="flex flex-col gap-2">
                <div className="text-center">
                  <div className="mx-auto h-4 w-8 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-0.5">
                      {Array.from({ length: 7 }).map((_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className="h-2.5 w-2.5 animate-pulse rounded-sm bg-gray-200"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm">
          <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-2.5 w-2.5 animate-pulse rounded-sm bg-gray-200" />
              ))}
            </div>
            <div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <div className="text-center text-red-800">
          <p className="font-medium">Failed to load GitHub contributions</p>
          <p className="mt-1 text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <div className="text-center text-gray-600">
          <p>No contribution data available for {username}</p>
        </div>
      </div>
    );
  }

  return (
    <ContributionsGraph
      data={data}
      username={username}
      showStats={true}
      theme="light"
      className="w-full"
    />
  );
}
