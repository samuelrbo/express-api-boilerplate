
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

const port = process.env.PORT;
const app = express();

const VERSIONS = process.env.API_VERSIONS;

app.set('port', port);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicDir));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Expose-Headers', 'Content-Range');
  next();
});

app.get('/', (req, res) => {
  return res.json(VERSIONS);
});

for (let key in VERSIONS) {
  require(`./api/${VERSIONS[key]}/router`)(app, express);
}

module.exports = app  ;
