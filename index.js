// Importing required modules
const express = require('express');
const axios = require('axios');
const AWS = require('aws-sdk');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure AWS DynamoDB
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'FavoritePokemon';

// Route: Get Pokémon info from PokéAPI
app.get('/pokemon/:name', async (req, res) => {
  const name = req.params.name.toLowerCase();
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const { id, sprites, types, stats } = response.data;
    res.json({ id, name, sprite: sprites.front_default, types, stats });
  } catch (error) {
    res.status(404).json({ message: 'Pokémon not found' });
  }
});

// Route: Save favorite Pokémon to DynamoDB
app.post('/favorite', async (req, res) => {
  const { user, name } = req.body;
  const params = {
    TableName: TABLE_NAME,
    Item: {
      user,
      name,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    res.json({ message: 'Favorite saved' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving favorite' });
  }
});

// Route: Get user's favorite Pokémon
app.get('/favorites/:user', async (req, res) => {
  const user = req.params.user;
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'user = :u',
    ExpressionAttributeValues: {
      ':u': user,
    },
  };

  try {
    const data = await dynamoDB.query(params).promise();
    res.json(data.Items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching favorites' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
