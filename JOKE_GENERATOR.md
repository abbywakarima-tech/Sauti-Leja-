# Joke Generator Integration

## Overview

This integration uses the **JokeAPI** (v2.jokeapi.dev) to fetch random jokes with multiple categories and content filters.

## Features

✅ **Multiple Categories**
- Any (All categories)
- General
- Knock-Knock
- Programming
- Spooky

✅ **Content Filters**
- NSFW
- Religious
- Political
- Racist
- Sexist
- Explicit

✅ **Two Joke Types**
- Single-part jokes
- Two-part jokes (setup + delivery)

✅ **User Features**
- Copy jokes to clipboard
- Share on Twitter
- Joke history (last 10)
- Statistics tracking
- Both simple and advanced modes

## API Endpoints

### JokeAPI
- Base: `https://v2.jokeapi.dev/joke/`
- Categories: `Any`, `General`, `Knock-Knock`, `Programming`, `Spooky`
- Safe Mode: `?safe-mode`
- Custom Filters: `?contains=nsfw,religious,political`

### SautiLeja API
- `GET /api/jokes` - Fetch a random joke
- Query params:
  - `category`: Joke category (default: Any)
  - `safe`: Safe mode enabled (default: false)

## Usage Examples

### Basic Fetch
```bash
curl https://v2.jokeapi.dev/joke/Any
```

### Safe Mode
```bash
curl https://v2.jokeapi.dev/joke/Programming?safe-mode
```

### With Filters
```bash
curl https://v2.jokeapi.dev/joke/General?contains=nsfw,religious
```

## Response Format

### Single-part Joke
```json
{
  "error": false,
  "category": "General",
  "type": "single",
  "joke": "Why don't scientists trust atoms? Because they make up everything!",
  "flags": {
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false,
    "explicit": false
  },
  "id": 45,
  "safe": true,
  "lang": "en"
}
```

### Two-part Joke
```json
{
  "error": false,
  "category": "Knock-Knock",
  "type": "twopart",
  "setup": "Knock knock.",
  "delivery": "Who's there?",
  "flags": { ... },
  "id": 1,
  "safe": true,
  "lang": "en"
}
```

## Implementation

### Simple Mode
- Path: `/joke-generator-simple`
- Basic one-click joke fetching
- Perfect for quick laughs

### Advanced Mode
- Path: `/joke-generator`
- Category selection
- Content filtering
- Joke history
- Share functionality
- Statistics

## Error Handling

The API will return:
- `error: false` - Success
- `error: true` - Joke not found (usually due to too restrictive filters)

If no joke matches your filters, try:
- Removing some filters
- Changing the category
- Using safe mode

## Rate Limiting

- JokeAPI: No official rate limit (very generous)
- Recommended: 1-2 requests per second per user
- Cache results when possible

## Best Practices

1. **Always handle errors gracefully** - Show user-friendly messages
2. **Cache frequently accessed jokes** - Reduce API calls
3. **Respect user preferences** - Save filter selections
4. **Track sharing metrics** - Know what jokes are popular
5. **Rotate through categories** - Keep jokes fresh and varied

## Future Enhancements

- [ ] Save favorite jokes
- [ ] Add joke ratings (like/dislike)
- [ ] Daily joke email
- [ ] Joke search functionality
- [ ] Custom joke submission
- [ ] Multilingual support
- [ ] Joke recommendations based on history
- [ ] Integration with social media

## Related Files

- `app/joke-generator/page.tsx` - Advanced UI
- `app/joke-generator-simple/page.tsx` - Simple UI
- `app/api/jokes/route.ts` - Backend API
- `lib/jokes.ts` - Utility functions

