/**
 * XKCD MCP — wraps xkcd.com JSON API (free, no auth)
 *
 * Tools:
 * - get_latest: Get the latest XKCD comic
 * - get_comic: Get a specific XKCD comic by number
 * - random_comic: Get a random XKCD comic
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://xkcd.com';

type RawComic = {
  num: number;
  title: string;
  safe_title: string;
  alt: string;
  img: string;
  year: string;
  month: string;
  day: string;
  transcript: string;
  link: string;
  news: string;
};

function formatComic(comic: RawComic) {
  return {
    number: comic.num,
    title: comic.title,
    safe_title: comic.safe_title,
    alt: comic.alt,
    img: comic.img,
    date: `${comic.year}-${comic.month.padStart(2, '0')}-${comic.day.padStart(2, '0')}`,
    transcript: comic.transcript || null,
    link: comic.link || null,
    url: `https://xkcd.com/${comic.num}/`,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'get_latest',
    description: 'Get the latest published XKCD comic with its title, image, and alt text.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_comic',
    description: 'Get a specific XKCD comic by its number.',
    inputSchema: {
      type: 'object',
      properties: {
        number: {
          type: 'number',
          description: 'The XKCD comic number (e.g. 1, 353, 2867).',
        },
      },
      required: ['number'],
    },
  },
  {
    name: 'random_comic',
    description: 'Get a random XKCD comic from the full archive.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'get_latest':
      return getLatest();
    case 'get_comic':
      return getComic(args.number as number);
    case 'random_comic':
      return randomComic();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function getLatest() {
  const res = await fetch(`${BASE_URL}/info.0.json`);
  if (!res.ok) throw new Error(`XKCD API error: ${res.status}`);

  const data = (await res.json()) as RawComic;
  return formatComic(data);
}

async function getComic(number: number) {
  const res = await fetch(`${BASE_URL}/${number}/info.0.json`);
  if (!res.ok) throw new Error(`XKCD API error: ${res.status}`);

  const data = (await res.json()) as RawComic;
  return formatComic(data);
}

async function randomComic() {
  // Fetch latest to determine the max comic number
  const latestRes = await fetch(`${BASE_URL}/info.0.json`);
  if (!latestRes.ok) throw new Error(`XKCD API error: ${latestRes.status}`);

  const latest = (await latestRes.json()) as RawComic;
  const maxNum = latest.num;

  // Comic 404 doesn't exist (intentional joke), so skip it
  let randomNum: number;
  do {
    randomNum = Math.floor(Math.random() * maxNum) + 1;
  } while (randomNum === 404);

  const res = await fetch(`${BASE_URL}/${randomNum}/info.0.json`);
  if (!res.ok) throw new Error(`XKCD API error: ${res.status}`);

  const data = (await res.json()) as RawComic;
  return formatComic(data);
}

export default { tools, callTool } satisfies McpToolExport;
