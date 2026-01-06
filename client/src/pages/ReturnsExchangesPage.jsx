import React from 'react';

export default function ReturnsExchangesPage() {
  return (
    <div className="policy-page returns-policy">
      <div className="page-header">
        <h1>Returns & Exchanges Policy</h1>
        <p>Last updated: October 27, 2025</p>
      </div>

      <div className="policy-container">
        <div className="policy-section">
          <h2>Return Policy Overview</h2>
          <p>
            We want you to be completely satisfied with your purchase. If you're not entirely happy with your order, 
            we're here to help. This policy outlines how to return or exchange items, eligibility requirements, 
            and what to expect during the process.
          </p>
        </div>

        <div className="policy-section">
          <h2>Return Eligibility</h2>
          
          <h3>Eligible Items</h3>
          <p>
            To be eligible for a return, your item must be:
          </p>
          <ul>
            <li>Returned within 30 days of delivery</li>
            <li>In new, unused condition</li>
            <li>In the original packaging with all tags attached</li>
            <li>Accompanied by the original receipt or proof of purchase</li>
          </ul>
          
          <h3>Non-Returnable Items</h3>
          <p>
            The following items cannot be returned:
          </p>
          <ul>
            <li>Items marked as "Final Sale" or "Non-Returnable"</li>
            <li>Personalized or custom-made products</li>
            <li>Intimate apparel, swimwear, and undergarments for hygiene reasons</li>
            <li>Digital products and downloadable software</li>
            <li>Gift cards</li>
            <li>Items damaged due to customer misuse</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>Return Process</h2>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Initiate Your Return</h3>
                <p>
                  Log into your account, go to "My Orders," select the order containing the item you wish to return, 
                  and click "Return Items." Alternatively, contact our customer service team for assistance.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Receive Return Authorization</h3>
                <p>
                  After submitting your return request, you'll receive a Return Merchandise Authorization (RMA) 
                  number and a prepaid shipping label via email (if applicable).
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Package Your Return</h3>
                <p>
                  Securely pack the item(s) in the original packaging if possible. Include the RMA number and 
                  original packing slip or a printed copy of your return confirmation.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Ship Your Return</h3>
                <p>
                  Attach the provided shipping label to your package and drop it off at the designated carrier 
                  location. We recommend keeping the tracking number for your records.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Return Processing</h3>
                <p>
                  Once we receive your return, our team will inspect the item(s) to ensure they meet our return 
                  eligibility requirements. This process typically takes 3-5 business days.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h3>Refund Issued</h3>
                <p>
                  After approval, your refund will be processed to the original payment method. Please allow 
                  5-10 business days for the refund to appear in your account, depending on your financial institution.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="policy-section">
          <h2>Exchanges</h2>
          <p>
            If you'd like to exchange an item for a different size, color, or product, please follow these steps:
          </p>
          <ol>
            <li>Initiate a return as described above</li>
            <li>In the "Reason for Return" section, select "Exchange"</li>
            <li>Specify the item you'd like in exchange (size, color, model, etc.)</li>
            <li>If the exchange item is of equal value, no additional payment is needed</li>
            <li>If the exchange item costs more, you'll be prompted to pay the difference</li>
            <li>If the exchange item costs less, we'll refund the difference to your original payment method</li>
          </ol>
          <p>
            Please note that exchanges are subject to product availability. If your requested exchange item is out of stock, 
            we'll issue a refund for your original purchase.
          </p>
        </div>

        <div className="policy-section">
          <h2>Return Shipping Costs</h2>
          <p>
            For standard returns, customers are responsible for return shipping costs unless the return is due to our error 
            (wrong item shipped, defective product, etc.).
          </p>
          <p>
            Free return shipping is provided for:
          </p>
          <ul>
            <li>Defective items</li>
            <li>Incorrect items shipped</li>
            <li>Damaged items (if reported within 48 hours of delivery)</li>
            <li>Exchanges</li>
            <li>Premium members (as part of membership benefits)</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>Refund Methods</h2>
          <div className="refund-methods">
            <div className="refund-method">
              <h3>Original Payment Method</h3>
              <p>
                Refunds are typically issued to the original payment method used for the purchase. 
                This includes credit/debit cards, PayPal, and other electronic payment methods.
              </p>
            </div>
            
            <div className="refund-method">
              <h3>Store Credit</h3>
              <p>
                You may choose to receive your refund as store credit, which will be added to your account 
                and can be used for future purchases. Store credit refunds are often processed more quickly 
                than other refund methods.
              </p>
            </div>
            
            <div className="refund-method">
              <h3>Gift Returns</h3>
              <p>
                Returns of items received as gifts will be refunded as store credit to the recipient, 
                unless proof of purchase is provided by the original buyer.
              </p>
            </div>
          </div>
        </div>

        <div className="policy-section">
          <h2>Damaged or Defective Items</h2>
          <p>
            If you receive a damaged or defective item, please contact our customer service team within 48 hours of delivery. 
            Please provide photos of the damaged item and packaging to expedite the process. We will arrange for a replacement 
            or refund at no additional cost to you.
          </p>
        </div>

        <div className="policy-section">
          <h2>Late or Missing Refunds</h2>
          <p>
            If you haven't received your refund within the timeframe specified above, please check the following:
          </p>
          <ul>
            <li>Check your bank account or credit card statement again</li>
            <li>Contact your credit card company or bank, as it may take some time for the refund to be officially posted</li>
            <li>Contact our customer service team with your order number and return tracking information</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our returns and exchanges policy, please contact our customer service team:
          </p>
          <ul className="contact-info-list">
            <li>Email: returns@mernstore.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Hours: Monday-Friday, 9:00 AM - 5:00 PM EST</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
