import crypto from 'crypto';

interface PayFastConfig {
  merchantId: string;
  merchantKey: string;
  passPhrase: string;
  sandbox: boolean;
}

interface PaymentData {
  amount: number;
  itemName: string;
  customStr1?: string;
  email: string;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
}

export class PayFast {
  private config: PayFastConfig;
  private baseUrl: string;

  constructor(config: PayFastConfig) {
    this.config = config;
    this.baseUrl = config.sandbox
      ? 'https://sandbox.payfast.co.za'
      : 'https://www.payfast.co.za';
  }

  private generateSignature(data: Record<string, string>): string {
    // Sort the object by key
    const sortedData = Object.keys(data)
      .sort()
      .reduce((acc: Record<string, string>, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

    // Create the signature string
    const signatureString = Object.entries(sortedData)
      .map(([key, value]) => `${key}=${encodeURIComponent(value.trim())}`)
      .join('&');

    // Generate signature
    return crypto
      .createHash('md5')
      .update(signatureString + this.config.passPhrase)
      .digest('hex');
  }

  public generatePaymentForm(data: PaymentData): string {
    const timestamp = new Date().toISOString();
    const paymentData = {
      merchant_id: this.config.merchantId,
      merchant_key: this.config.merchantKey,
      return_url: data.returnUrl,
      cancel_url: data.cancelUrl,
      notify_url: data.notifyUrl,
      name_first: '', // Will be filled by customer
      name_last: '', // Will be filled by customer
      email_address: data.email,
      m_payment_id: `${timestamp}-${crypto.randomBytes(4).toString('hex')}`,
      amount: data.amount.toFixed(2),
      item_name: data.itemName,
      custom_str1: data.customStr1 || '',
    };

    const signature = this.generateSignature(paymentData);
    paymentData['signature'] = signature;

    return `${this.baseUrl}/eng/process?${new URLSearchParams(paymentData).toString()}`;
  }

  public validateCallback(data: Record<string, string>): boolean {
    const signature = data.signature;
    delete data.signature;
    return this.generateSignature(data) === signature;
  }
}
