import React from 'react'

export default function TermsPage() {
  return (
    <div className="terms-page">
      {/* Hero Section */}
      <section className="terms-hero">
        <div className="terms-hero-content">
          <h1 className="terms-title">Terms of Service</h1>
          <p className="terms-subtitle">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="terms-content">
        <div className="container">
          <div className="terms-text">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using MERN Webstore ("the Service"), you accept and agree to be bound 
              by the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on MERN Webstore 
              for personal, non-commercial transitory viewing only. This is the grant of a license, 
              not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, 
              complete, and current at all times. You are responsible for safeguarding the password 
              and for all activities that occur under your account.
            </p>

            <h2>4. Product Information</h2>
            <p>
              We strive to provide accurate product information, including descriptions, images, 
              and pricing. However, we do not warrant that product descriptions or other content 
              is accurate, complete, reliable, current, or error-free.
            </p>

            <h2>5. Pricing and Payment</h2>
            <p>
              All prices are subject to change without notice. We reserve the right to modify or 
              discontinue the Service (or any part thereof) temporarily or permanently with or 
              without notice. You agree to pay all charges incurred by you or any users of your 
              account and credit card (or other applicable payment mechanism).
            </p>

            <h2>6. Shipping and Delivery</h2>
            <p>
              We will make every effort to deliver products within the estimated timeframe. However, 
              delivery times are estimates and not guaranteed. We are not responsible for delays 
              caused by shipping carriers or other factors beyond our control.
            </p>

            <h2>7. Returns and Refunds</h2>
            <p>
              Our return policy is detailed in our Returns section. Returns must be initiated within 
              30 days of delivery and items must be in original condition. Refunds will be processed 
              to the original payment method within 5-7 business days after we receive the returned item.
            </p>

            <h2>8. Prohibited Uses</h2>
            <p>You may not use our Service:</p>
            <ul>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>

            <h2>9. Intellectual Property Rights</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain 
              the exclusive property of MERN Webstore and its licensors. The Service is protected 
              by copyright, trademark, and other laws.
            </p>

            <h2>10. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs 
              your use of the Service, to understand our practices.
            </p>

            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, 
              without prior notice or liability, under our sole discretion, for any reason whatsoever 
              and without limitation, including but not limited to a breach of the Terms.
            </p>

            <h2>12. Disclaimer</h2>
            <p>
              The information on this website is provided on an "as is" basis. To the fullest extent 
              permitted by law, this Company excludes all representations, warranties, conditions 
              and terms relating to our website and the use of this website.
            </p>

            <h2>13. Limitation of Liability</h2>
            <p>
              In no event shall MERN Webstore, nor its directors, employees, partners, agents, 
              suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses, resulting from your use of the Service.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the State of New York, 
              without regard to its conflict of law provisions. Our failure to enforce any right 
              or provision of these Terms will not be considered a waiver of those rights.
            </p>

            <h2>15. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any 
              time. If a revision is material, we will provide at least 30 days notice prior to any 
              new terms taking effect.
            </p>

            <h2>16. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> legal@mernwebstore.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Commerce Street, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}








