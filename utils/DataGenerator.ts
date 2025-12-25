/**
 * DataGenerator - Utilities for generating random test data
 * Useful for creating unique test inputs and avoiding data conflicts
 */
export class DataGenerator {
  
  /**
   * Generate random string of specified length
   * @param length - Length of string (default: 10)
   * @param charset - Character set to use (default: alphanumeric)
   */
  static randomString(length: number = 10, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Generate random number within range
   * @param min - Minimum value (inclusive)
   * @param max - Maximum value (inclusive)
   */
  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random email address
   * @param domain - Email domain (default: test.com)
   */
  static randomEmail(domain: string = 'test.com'): string {
    const username = this.randomString(8).toLowerCase();
    const timestamp = Date.now();
    return `${username}${timestamp}@${domain}`;
  }

  /**
   * Generate random first name from preset list
   */
  static randomFirstName(): string {
    const names = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Chris', 'Amanda', 'Robert', 'Lisa'];
    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Generate random last name from preset list
   */
  static randomLastName(): string {
    const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Generate random full name
   */
  static randomFullName(): { firstName: string; lastName: string; fullName: string } {
    const firstName = this.randomFirstName();
    const lastName = this.randomLastName();
    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`
    };
  }

  /**
   * Generate random US postal code (5 digits)
   */
  static randomPostalCode(): string {
    return this.randomNumber(10000, 99999).toString();
  }

  /**
   * Generate random phone number (US format)
   */
  static randomPhoneNumber(): string {
    const areaCode = this.randomNumber(200, 999);
    const prefix = this.randomNumber(200, 999);
    const lineNumber = this.randomNumber(1000, 9999);
    return `${areaCode}-${prefix}-${lineNumber}`;
  }

  /**
   * Generate random address
   */
  static randomAddress(): { street: string; city: string; state: string; zip: string } {
    const streetNumbers = this.randomNumber(100, 9999);
    const streets = ['Main St', 'Oak Ave', 'Elm St', 'Park Rd', 'Cedar Ln', 'Maple Dr', 'Pine St', 'Lake Blvd'];
    const cities = ['Springfield', 'Franklin', 'Clinton', 'Madison', 'Georgetown', 'Salem', 'Bristol', 'Fairview'];
    const states = ['CA', 'TX', 'NY', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];

    return {
      street: `${streetNumbers} ${streets[Math.floor(Math.random() * streets.length)]}`,
      city: cities[Math.floor(Math.random() * cities.length)],
      state: states[Math.floor(Math.random() * states.length)],
      zip: this.randomPostalCode()
    };
  }

  /**
   * Generate unique ID with timestamp
   * @param prefix - Optional prefix for the ID
   */
  static uniqueId(prefix: string = ''): string {
    const timestamp = Date.now();
    const random = this.randomString(6);
    return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
  }

  /**
   * Generate customer info for checkout
   */
  static generateCustomerInfo(): { firstName: string; lastName: string; postalCode: string } {
    return {
      firstName: this.randomFirstName(),
      lastName: this.randomLastName(),
      postalCode: this.randomPostalCode()
    };
  }

  /**
   * Pick random item from array
   * @param array - Array to pick from
   */
  static pickRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Pick multiple random items from array (no duplicates)
   * @param array - Array to pick from
   * @param count - Number of items to pick
   */
  static pickMultipleRandom<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
  }

  /**
   * Generate timestamp string for unique naming
   */
  static timestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
}