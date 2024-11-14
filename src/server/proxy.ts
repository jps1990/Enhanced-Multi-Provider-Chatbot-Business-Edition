import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { IncomingMessage, ServerResponse } from 'http';
import * as http from 'http';

const app = express();
const port = 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'anthropic-version']
}));

app.use(express.json());

const loggingMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

app.use(loggingMiddleware);

app.use('/anthropic', createProxyMiddleware({
  target: 'https://api.anthropic.com',
  changeOrigin: true,
  pathRewrite: {
    '^/anthropic': '/v1/messages'
  },
  onProxyReq(proxyReq: http.ClientRequest, req: IncomingMessage & { body?: any }) {
    proxyReq.setHeader('anthropic-version', '2024-10-22');
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
  onError(err: Error, _req: IncomingMessage, res: ServerResponse) {
    console.error('Erreur Proxy:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { message: 'Erreur de proxy: ' + err.message } }));
  }
}));

app.use('/cohere', createProxyMiddleware({
  target: 'https://api.cohere.ai',
  changeOrigin: true,
  pathRewrite: {
    '^/cohere': '/v1/generate'
  },
  onProxyReq(proxyReq: http.ClientRequest, req: IncomingMessage & { body?: any }) {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
}));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export const server = app.listen(port, () => {
  console.log(`Serveur proxy démarré sur le port ${port}`);
});

export default app; 