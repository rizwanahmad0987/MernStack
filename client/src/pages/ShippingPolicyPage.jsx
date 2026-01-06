import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="policy-page shipping-policy">
      <div className="page-header">
        <h1>Shipping Policy</h1>
        <p>Last updated: October 27, 2025</p>
      </div>

      <div className="policy-container">
        <div className="policy-section">
          <h2>Shipping Methods and Timeframes</h2>
          
          <h3>Domestic Shipping (United States)</h3>
          <div className="shipping-table">
            <div className="shipping-table-header">
              <div>Shipping Method</div>
              <div>Estimated Delivery Time</div>
              <div>Cost</div>
            </div>
            <div className="shipping-table-row">
              <div>Standard Shipping</div>
              <div>3-5 business days</div>
              <div>Free on orders over $50<br />$5.99 for orders under $50</div>
            </div>
            <div className="shipping-table-row">
              <div>Express Shipping</div>
              <div>2 business days</div>
              <div>$12.99</div>
            </div>
            <div className="shipping-table-row">
              <div>Next Day Delivery</div>
              <div>1 business day</div>
              <div>$24.99</div>
            </div>
          </div>
          
          <p className="note">
            <strong>Note:</strong> Business days are Monday through Friday, excluding federal holidays. 
            Orders placed after 1:00 PM EST may not be processed until the following business day.
          </p>

          <h3>International Shipping</h3>
          <div className="shipping-table">
            <div className="shipping-table-header">
              <div>Region</div>
              <div>Estimated Delivery Time</div>
              <div>Cost</div>
            </div>
            <div className="shipping-table-row">
              <div>Canada & Mexico</div>
              <div>7-10 business days</div>
              <div>$14.99</div>
            </div>
            <div className="shipping-table-row">
              <div>Europe & UK</div>
              <div>10-15 business days</div>
              <div>$19.99</div>
            </div>
            <div className="shipping-table-row">
              <div>Asia Pacific</div>
              <div>12-18 business days</div>
              <div>$24.99</div>
            </div>
            <div className="shipping-table-row">
              <div>Rest of World</div>
              <div>15-21 business days</div>
              <div>$29.99</div>
            </div>
          </div>
          
          <p className="note">
            <strong>Important:</strong> International customers may be subject to customs fees, 
            import duties, and taxes, which are the responsibility of the recipient and are not 
            included in the shipping cost.
          </p>
        </div>

        <div className="policy-section">
          <h2>Order Processing</h2>
          <p>
            All orders are processed within 1-2 business days (Monday through Friday, excluding holidays) 
            after receiving your order confirmation email. You will receive another notification when your 
            order has shipped.
          </p>
          <p>
            During peak seasons (holidays, special sales events), processing times may be extended by 
            an additional 1-2 business days. We will notify you of any known delays affecting your order.
          </p>
        </div>

        <div className="policy-section">
          <h2>Tracking Information</h2>
          <p>
            Once your order ships, you will receive a shipping confirmation email with a tracking number. 
            You can track your package by:
          </p>
          <ul>
            <li>Clicking the tracking link in your shipping confirmation email</li>
            <li>Logging into your account on our website and viewing your order history</li>
            <li>Contacting our customer service team with your order number</li>
          </ul>
          <p>
            Please allow up to 48 hours for tracking information to update after receiving your shipping 
            confirmation.
          </p>
        </div>

        <div className="policy-section">
          <h2>Shipping Restrictions</h2>
          <p>
            We currently do not ship to P.O. boxes, APO/FPO addresses, or certain remote locations. 
            If you have concerns about shipping to your location, please contact our customer service 
            team before placing your order.
          </p>
          <p>
            Due to regulations and logistical constraints, some products may not be available for 
            international shipping. These restrictions will be noted on the product page.
          </p>
        </div>

        <div className="policy-section">
          <h2>Delivery Issues</h2>
          <h3>Lost or Damaged Packages</h3>
          <p>
            If your package is lost, damaged, or significantly delayed, please contact our customer 
            service team within 14 days of the expected delivery date. We will work with the shipping 
            carrier to resolve the issue and may require you to file a claim with the carrier.
          </p>
          
          <h3>Address Changes</h3>
          <p>
            If you need to change your shipping address after placing your order, please contact us 
            immediately. We can only accommodate address changes if the order has not yet been processed. 
            Once an order has shipped, we cannot change the delivery address.
          </p>
        </div>

        <div className="policy-section">
          <h2>Free Shipping Promotions</h2>
          <p>
            Free shipping promotions are applied to standard shipping only and may have minimum purchase 
            requirements. These promotions cannot be combined with other shipping offers and may exclude 
            oversized items, international destinations, or expedited shipping methods.
          </p>
        </div>

        <div className="policy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our shipping policy, please contact our customer service team:
          </p>
          <ul className="contact-info-list">
            <li>Email: shipping@mernstore.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Hours: Monday-Friday, 9:00 AM - 5:00 PM EST</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
