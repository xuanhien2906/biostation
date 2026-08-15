const https = require('https');
const fs = require('fs');

const url = 'https://xztvsvptgnyqemqojyqp.supabase.co/storage/v1/object/public/biostation_images/config/site_config.json';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('src/data/site_config.json', data);
    console.log('Successfully synced site_config.json locally');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
