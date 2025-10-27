import React, { useState } from 'react';

export default function FAQPage() {
  const faqCategories = [
    {
      id: 'orders',
      title: 'Orders & Payments',
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Follow the steps to enter your shipping and payment information to complete your purchase.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment providers.'
        },
        {
          question: 'Can I modify or cancel my order after it\'s placed?',
          answer: 'You can modify or cancel your order within 1 hour of placing it. Please contact our customer service team immediately if you need to make changes to your order.'
        },
        {
          question: 'How can I check the status of my order?',
          answer: 'You can check the status of your order by logging into your account and visiting the "My Orders" section. You will also receive email updates as your order is processed, shipped, and delivered.'
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      faqs: [
        {
          question: 'How long will it take to receive my order?',
          answer: 'Standard shipping typically takes 3-5 business days within the continental US. Express shipping options (1-2 business days) are also available at checkout for an additional fee.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to most countries worldwide. International shipping times vary by location, typically ranging from 7-21 business days. Additional customs fees may apply depending on your country\'s import regulations.'
        },
        {
          question: 'How can I track my shipment?',
          answer: 'Once your order ships, you will receive a tracking number via email. You can use this tracking number on our website or the carrier\'s website to monitor the progress of your delivery.'
        },
        {
          question: 'What if my package is lost or damaged?',
          answer: 'If your package is lost or arrives damaged, please contact our customer service team within 48 hours of the delivery date. We will work with the shipping carrier to resolve the issue and arrange for a replacement if necessary.'
        }
      ]
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items in new, unused condition with original packaging and tags. Some products may have specific return restrictions, which will be noted on the product page.'
        },
        {
          question: 'How do I return an item?',
          answer: 'To initiate a return, log into your account, go to "My Orders," select the order containing the item you wish to return, and follow the return instructions. You\'ll receive a return shipping label and instructions for packaging your return.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Once we receive and inspect your return (usually within 3-5 business days), we will process your refund. It may take an additional 5-10 business days for the refund to appear in your account, depending on your payment method and financial institution.'
        },
        {
          question: 'Do I have to pay for return shipping?',
          answer: 'For standard returns, customers are responsible for return shipping costs unless the return is due to our error (wrong item shipped, defective product, etc.). Return shipping is free for exchanges and items covered under warranty.'
        }
      ]
    },
    {
      id: 'products',
      title: 'Products & Warranty',
      faqs: [
        {
          question: 'How can I find my product\'s warranty information?',
          answer: 'Warranty information is provided on each product page under the "Specifications" section. You can also find warranty details in the documentation included with your product or by contacting our customer service team.'
        },
        {
          question: 'What should I do if my product is defective?',
          answer: 'If you receive a defective product, please contact our customer service team within 14 days of delivery. We will arrange for a replacement or repair according to our warranty policy.'
        },
        {
          question: 'Are your products authentic/genuine?',
          answer: 'Yes, all products sold on our website are 100% authentic and sourced directly from manufacturers or authorized distributors. We do not sell counterfeit or knockoff products.'
        },
        {
          question: 'Do you provide product manuals and documentation?',
          answer: 'Yes, all products come with the necessary manuals and documentation. If you need additional information or have misplaced your documentation, many product manuals are available for download on our website under the "Support" section.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Privacy',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Sign Up" button in the top right corner of our website. You\'ll need to provide your name, email address, and create a password. You can also create an account during the checkout process.'
        },
        {
          question: 'How can I reset my password?',
          answer: 'To reset your password, click on "Sign In," then select "Forgot Password." Enter the email address associated with your account, and we\'ll send you instructions to create a new password.'
        },
        {
          question: 'How is my personal information protected?',
          answer: 'We take data security seriously. Your personal information is encrypted and stored securely. We do not sell your data to third parties. For more details, please refer to our Privacy Policy page.'
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can request to delete your account by contacting our customer service team. Please note that certain information may be retained for legal and business purposes even after account deletion.'
        }
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState('orders');
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (categoryId, index) => {
    setOpenFaqs(prev => {
      const key = `${categoryId}-${index}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  return (
    <div className="faq-page">
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to commonly asked questions about our products, services, and policies.</p>
      </div>

      <div className="faq-container">
        <div className="faq-sidebar">
          <h3>Categories</h3>
          <ul className="faq-categories">
            {faqCategories.map(category => (
              <li key={category.id}>
                <button 
                  className={activeCategory === category.id ? 'active' : ''}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.title}
                </button>
              </li>
            ))}
          </ul>

          <div className="faq-help">
            <h3>Need More Help?</h3>
            <p>Can't find what you're looking for? Our customer service team is here to help.</p>
            <a href="/contact" className="button">Contact Us</a>
          </div>
        </div>

        <div className="faq-content">
          {faqCategories.map(category => (
            <div 
              key={category.id} 
              className={`faq-category ${activeCategory === category.id ? 'active' : 'hidden'}`}
            >
              <h2>{category.title}</h2>
              
              <div className="faq-list">
                {category.faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${openFaqs[`${category.id}-${index}`] ? 'open' : ''}`}
                  >
                    <div 
                      className="faq-question"
                      onClick={() => toggleFaq(category.id, index)}
                    >
                      <h3>{faq.question}</h3>
                      <span className="faq-toggle">
                        {openFaqs[`${category.id}-${index}`] ? '−' : '+'}
                      </span>
                    </div>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}