import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';
import template from './../template';

//  Comment out!!! Should be used only for development only, because the React code will compile and bundle in dist.
import devBundle from './devBundle';

const app = express();

//  Comment out!!! Should be used only for development only, because the React code will compile and bundle in dist
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
     res.status(200).send(template());
});

let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', port);
});

// Database connection
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSocialMedia';
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db)=>{
  console.log('Connected successfully to mongodb server');
  db.close();
})