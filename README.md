# @pipeworx/mcp-xkcd

MCP server for xkcd comics

## Tools

| Tool | Description |
|------|-------------|
| `get_latest` | Get the latest published XKCD comic |
| `get_comic` | Get a specific XKCD comic by number |
| `random_comic` | Get a random XKCD comic from the full archive |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "get_comic",
      "arguments": { "number": 353 }
    }
  }'
```

## License

MIT
