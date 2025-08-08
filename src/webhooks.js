import crypto from 'crypto';
import { exec } from 'child_process';

export const handleGitHubWebhook = (req, res) => {
  // 1. Проверка метода запроса
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // 2. Проверка подписи
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) {
    res.status(403).send('Signature header missing');
    return;
  }

  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(req.rawBody).digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
    res.status(403).send('Invalid signature');
    return;
  }

  // 3. Обработка события
  try {
    const event = req.headers['x-github-event'];
    
    if (event === 'push') {
      // Автоматический деплой при пуше в main ветку
      exec('sh deploy.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          res.status(500).send('Deployment failed');
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.status(200).send('Deployment successful');
      });
    } else {
      res.status(200).send('Event received, no action taken');
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
};