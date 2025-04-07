const languageCache = new Map();

export const fetchRepoLanguages = async (repoUrl) => {
  try {
    // Vérifier si les données sont dans le cache
    if (languageCache.has(repoUrl)) {
      console.log('Using cached data for:', repoUrl);
      return languageCache.get(repoUrl);
    }

    console.log('Making request to:', repoUrl);
    
    const response = await fetch(repoUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`GitHub API request failed: ${errorData.message}`);
    }

    const data = await response.json();
    console.log('Languages data received:', data);
    
    // Stocker dans le cache avec une expiration de 24h
    const cacheEntry = {
      data,
      timestamp: Date.now()
    };
    languageCache.set(repoUrl, cacheEntry);

    // Nettoyer le cache pour les entrées expirées
    const now = Date.now();
    for (const [key, entry] of languageCache.entries()) {
      if (now - entry.timestamp > 24 * 60 * 60 * 1000) {
        languageCache.delete(key);
      }
    }

    return data;
  } catch (error) {
    console.error('Request failed:', error);
    return { error: error.message };
  }
};