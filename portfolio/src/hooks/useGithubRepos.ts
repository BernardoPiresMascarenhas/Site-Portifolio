import { useState, useEffect } from 'react';

export function useGithubRepos(username: string) {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
      .then(res => res.json())
      .then(data => setRepos(data))
      .catch(err => console.error(err));
  }, [username]);

  return repos;
}