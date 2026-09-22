const https = require('https');
const fs = require('fs');
const content = fs.readFileSync('supabase-config.js', 'utf8');
const lines = content.split('\n');
const keyLine = lines.find(l => l.includes('supabaseAnonKey'));
const matches = keyLine.match(/"([^"]+)"/g);
const key = matches[1].replace(/"/g, '');

const sql = `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'applications' ORDER BY ordinal_position`;

const options = {
    hostname: 'wmcgccjkkxotkeoqgpwg.supabase.co',
    path: '/rest/v1/rpc/exec?sql=' + encodeURIComponent(sql),
    method: 'POST',
    headers: {
        'apikey': key,
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json',
        'Prefer': 'return=format=object'
    }
};

const req = https.request(options, (res) => {
    let d = '';
    res.on('data', chunk => d += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        try {
            const json = JSON.parse(d);
            console.log(JSON.stringify(json, null, 2));
        } catch(e) {
            console.log('Raw:', d.substring(0, 500));
        }
    });
});
req.on('error', e => console.error('Error:', e.message));
req.write(JSON.stringify({ query: sql }));
req.end();
