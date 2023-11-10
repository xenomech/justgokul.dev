import { GH_USERNAME } from '@/assets/store';

const BASE_URL = 'https://api.github.com/users/';

export const GH_URL = BASE_URL + GH_USERNAME;

export async function GetGitProfile(url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  return res.json();
}
