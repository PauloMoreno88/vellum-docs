// Servidor local do site gerado: npm run serve → http://localhost:4173
import {createServer} from 'node:http';
import {existsSync, readFileSync, statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '_site');
const types = {'.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml'};
const port = Number(process.env.PORT) || 4173;

createServer((request, response) => {
  const url = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  let file = path.join(site, url);
  if (!file.startsWith(site)) file = site;
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!existsSync(file)) {
    response.writeHead(404, {'content-type': 'text/plain; charset=utf-8'}).end('Página não encontrada');
    return;
  }
  response.writeHead(200, {'content-type': types[path.extname(file)] ?? 'application/octet-stream'}).end(readFileSync(file));
}).listen(port, () => console.log(`http://localhost:${port}`));
