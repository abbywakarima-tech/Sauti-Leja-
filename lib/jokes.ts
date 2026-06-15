// Joke-related utility functions

export const jokeCategories = [
  { value: 'any', label: 'Any' },
  { value: 'general', label: 'General' },
  { value: 'knock-knock', label: 'Knock-Knock' },
  { value: 'programming', label: 'Programming' },
  { value: 'spooky', label: 'Spooky' },
];

export const shareJoke = (joke: string, platform: 'twitter' | 'facebook' = 'twitter') => {
  const text = encodeURIComponent(joke);
  if (platform === 'twitter') {
    return `https://twitter.com/intent/tweet?text=${text}&hashtags=joke,humor`;
  } else {
    return `https://www.facebook.com/sharer/sharer.php?quote=${text}`;
  }
};

export const formatJoke = (joke: any): string => {
  if (joke.type === 'single') {
    return joke.joke;
  } else {
    return `${joke.setup}\n\n${joke.delivery}`;
  }
};

export const getJokeEmoji = (category: string): string => {
  const emojis: { [key: string]: string } = {
    'general': '😄',
    'knock-knock': '🚪',
    'programming': '💻',
    'spooky': '👻',
    'any': '🎭',
  };
  return emojis[category] || '😂';
};
