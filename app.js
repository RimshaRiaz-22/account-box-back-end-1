const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
var bodyParser = require('body-parser')
const userRoutes = require('./api/api');
const globalErrHandler = require('./utils/errorController');
const AppError = require('./utils/appError');
const app = express();
var Publishable_Key = process.env.Publishable_Key
var Secret_Key = process.env.Secret_Key
const stripe = require('stripe')(Secret_Key)
app.use('/uploads', express.static('uploads'))
//multer
const upload = require('./utils/multer')
app.use('/upload-image', require('./api/upload-image'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API 
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/apis', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// //swaggerDocument
// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get('/', function(req, res){
    res.send('<h1>Working</h1>')
})
app.use("/api" , userRoutes);
app.use('/api', upload.single('image'), userRoutes);
app.post("/checkout", async (req, res) => {
    const { cardHolderName,cvv,cardNumber,expiry,amount,customername,customeremail } = req.body;
    console.log('cus here',customername,customeremail, cardHolderName,cvv,cardNumber,expiry,amount,expiry.substring(0, 2))
    const token = await stripe.tokens.create({
        card: {
          number:cardNumber,
          exp_month:expiry.substring(0,2),
          exp_year: expiry.substring(3),
          cvc: cvv,
          name:cardHolderName
        },
      });
      console.log("tokens here:",token)
    // Create or retrieve the Stripe Customer object associated with your user.
    //let customer = await stripe.customers.create(); // This example just creates a new Customer every time
    const customer = await stripe.customers.create({
    email:customeremail,
        source: token.id,
    name: customername,
    // address: {
    //  line1: 'TC 9/4 Old MES colony',
    //  postal_code: '110092',
    //  city: 'New Delhi',
    //  state: 'Delhi',
    //  country: 'India',
    // }
  })
    // Create an ephemeral key for the Customer; this allows the app to display saved payment methods and save new ones
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2020-08-27'}
    );
    // const { CardName } = req.body;
    // if (!CardName) return res.status(400).json({ message: "Please enter a name" });
    // Create a PaymentIntent with the payment amount, currency, and customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
     // name:name,
      customer: customer.id,
     payment_method_types: ['card'],
     payment_method: 'pm_card_visa',
     confirm:true,
    });
    console.log('response:',res)
    // Send the object keys to the client
    res.send({
      publishableKey: Publishable_Key, // https://stripe.com/docs/keys#obtain-api-keys
      paymentIntent: paymentIntent.Secret_Key,
      customer: customer.id,
      ephemeralKey: ephemeralKey.secret,
      client_secret:paymentIntent.client_secret,
      success: true,
    });
  });
// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;