export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const success = searchParams.success === 'true';

  return (
    <div className="max-w-xl mx-auto text-center mt-12">
      {success ? (
        <div className="card bg-green-50">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="h2 mb-4">Payment Successful!</h1>
          <p className="text-text mb-6">
            Your payment has been processed successfully. Your plan will be updated shortly.
          </p>
          <a href="/dashboard/billing" className="btn btn-primary">
            Return to Billing
          </a>
        </div>
      ) : (
        <div className="card bg-red-50">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h1 className="h2 mb-4">Payment Failed</h1>
          <p className="text-text mb-6">
            There was an issue processing your payment. Please try again or contact support.
          </p>
          <a href="/dashboard/billing" className="btn btn-primary">
            Try Again
          </a>
        </div>
      )}
    </div>
  );
}
