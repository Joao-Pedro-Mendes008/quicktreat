const express = require('express');
const app = express();
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

app.get('/pacientes', (req, res) => {
res.send('Hello World!');
});

app.get('/pacientes', async (req, res) => {
  const { data, error } = await supabase
    .from('pacientes')
    .select('*');
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      res.send(data);
    }
});

module.exports = app;


