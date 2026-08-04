# mcp-xkcd

XKCD MCP — wraps xkcd.com JSON API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `get_latest` | Fetch the most recently published XKCD comic. Returns comic number, title, image URL, alt/hover text, publication date, transcript (if available), and permalink. |
| `get_comic` | Fetch a specific XKCD comic by its number (e.g., 353 for 'Python'). Returns title, image URL, alt text, publication date, transcript, and permalink. |
| `random_comic` | Fetch a randomly selected XKCD comic from the full archive (skips #404). Returns comic number, title, image URL, alt text, publication date, and transcript. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "xkcd": {
      "url": "https://gateway.pipeworx.io/xkcd/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Xkcd data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
