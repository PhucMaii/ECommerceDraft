const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email:{
    type: String
  },
  address: {
    type: String
  },
  address2: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  postalCode: {
    type: String
  },
  creditCardNumber: {
    type: String
  },
  expirationMonth: {
    type: String
  },
  expirationYear: {
    type: Number
  },
  cvv: {
    type: String
  },
  itemList: [{
    clothesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothes"
    },
    color: {
      type: String
    },
    size: {
      type: String
    },
    quantity: {
      type: Number
    }
  }],
}, {
  timestamps: true

});

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [{
    clothesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothes"
    },
    color: {
      type: String
    },
    size: {
      type: String
    },
    quantity: {
      type: Number
    }
  }],
  orders: [OrderSchema]
}, {
  timestamps: true
});

const CustomerModel = mongoose.model('Customer', CustomerSchema);
module.exports = CustomerModel;
