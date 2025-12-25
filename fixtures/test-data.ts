// Test Data and Constants for Sauce Demo Tests

export const Users = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  PERFORMANCE_GLITCH: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  },
  ERROR: {
    username: 'error_user',
    password: 'secret_sauce'
  },
  VISUAL: {
    username: 'visual_user',
    password: 'secret_sauce'
  }
} as const;

export const Products = {
  BACKPACK: {
    name: 'Sauce Labs Backpack',
    price: 29.99,
    id: 4
  },
  BIKE_LIGHT: {
    name: 'Sauce Labs Bike Light',
    price: 9.99,
    id: 0
  },
  BOLT_TSHIRT: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
    id: 1
  },
  FLEECE_JACKET: {
    name: 'Sauce Labs Fleece Jacket',
    price: 49.99,
    id: 5
  },
  ONESIE: {
    name: 'Sauce Labs Onesie',
    price: 7.99,
    id: 2
  },
  RED_TSHIRT: {
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: 15.99,
    id: 3
  }
} as const;

export const CustomerInfo = {
  VALID: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  MISSING_FIRST_NAME: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345'
  },
  MISSING_LAST_NAME: {
    firstName: 'John',
    lastName: '',
    postalCode: '12345'
  },
  MISSING_POSTAL: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: ''
  }
} as const;

export const ErrorMessages = {
  FIRST_NAME_REQUIRED: 'Error: First Name is required',
  LAST_NAME_REQUIRED: 'Error: Last Name is required',
  POSTAL_CODE_REQUIRED: 'Error: Postal Code is required',
  INVALID_LOGIN: 'Epic sadface: Username and password do not match any user in this service',
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.'
} as const;

export const URLs = {
  BASE: 'https://www.saucedemo.com',
  INVENTORY: '/inventory.html',
  CART: '/cart.html',
  CHECKOUT_STEP_ONE: '/checkout-step-one.html',
  CHECKOUT_STEP_TWO: '/checkout-step-two.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html',
  ITEM_DETAIL: '/inventory-item.html'
} as const;

export const SortOptions = {
  NAME_ASC: 'az',
  NAME_DESC: 'za',
  PRICE_ASC: 'lohi',
  PRICE_DESC: 'hilo'
} as const;

export const TAX_RATE = 0.08; // 8% tax rate