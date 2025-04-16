
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { motion } from 'framer-motion';
import { Check, HelpCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      description: "Perfect for personal projects and experimentation",
      price: "$0",
      period: "forever",
      color: "from-blue-500 to-blue-600",
      buttonColor: "bg-white text-blue-600",
      features: [
        "3 projects",
        "1GB bandwidth per month",
        "Community support",
        "Basic analytics",
        "GitHub integration",
      ],
      delay: 0.1
    },
    {
      name: "Pro",
      description: "For professionals and growing teams",
      price: "$19",
      period: "per month",
      color: "from-indigo-500 to-violet-500",
      buttonColor: "bg-gradient-button",
      popular: true,
      features: [
        "Unlimited projects",
        "100GB bandwidth per month",
        "Priority support",
        "Advanced analytics",
        "GitHub integration",
        "Custom domains",
        "Serverless functions",
        "Team collaboration",
      ],
      delay: 0.2
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      price: "Custom",
      period: "contact sales",
      color: "from-violet-500 to-purple-600",
      buttonColor: "bg-white/10 backdrop-blur-md border border-white/20",
      features: [
        "Everything in Pro",
        "Unlimited bandwidth",
        "24/7 dedicated support",
        "Enterprise SLA",
        "Advanced security features",
        "Single sign-on",
        "Custom integrations",
        "Dedicated infrastructure",
        "Compliance assistance"
      ],
      delay: 0.3
    }
  ];

  const faqs = [
    {
      question: "How does billing work?",
      answer: "We bill monthly or annually depending on your preference. All plans include all features for the price shown."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will take effect on your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "We offer a 14-day free trial for our Pro plan. No credit card required to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and for enterprise customers, we can arrange wire transfers or invoicing."
    },
    {
      question: "Are there any refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans if you're not satisfied."
    },
    {
      question: "Do you offer discounts?",
      answer: "We offer discounts for educational institutions, non-profits, and startups. Contact our sales team for more information."
    }
  ];

  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1 container mx-auto px-6 pt-24 pb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-block rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 p-2 mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full p-2">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Choose the plan that fits your needs. All plans include core features to get you started.
              </p>
              
              <div className="flex items-center justify-center mt-6 space-x-4">
                <span className="text-white font-medium">Monthly</span>
                <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none bg-indigo-600">
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
                <span className="text-white font-medium flex items-center">
                  Annual
                  <span className="ml-2 text-xs bg-gradient-button px-2 py-1 rounded-full text-white">Save 20%</span>
                </span>
              </div>
            </motion.div>

            {/* Pricing Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: plan.delay }}
                  viewport={{ once: true }}
                  className={`relative bg-black/40 backdrop-blur-sm border rounded-xl overflow-hidden ${
                    plan.popular ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/20 scale-105' : 'border-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-button text-white text-sm font-medium py-1 text-center">
                      Most Popular
                    </div>
                  )}
                  <div className={`h-1 bg-gradient-to-r ${plan.color}`}></div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                    
                    <Button 
                      className={`w-full mb-8 ${plan.buttonColor}`}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </Button>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-400">Everything you need to know about our pricing and products.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex items-start">
                      <HelpCircle className="w-5 h-5 text-indigo-400 mr-3 mt-1 shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                        <p className="text-gray-400">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-white/10 rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Our enterprise plan can be tailored to your organization's specific needs. Let's discuss how we can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-button px-8 py-3 rounded-lg text-white font-medium"
                >
                  Contact Sales
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-white/20 bg-white/10 px-8 py-3 rounded-lg text-white font-medium"
                >
                  Schedule Demo
                </motion.button>
              </div>
            </motion.div>
          </main>
          <Footer />
          <AiChatAssistant />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Pricing;
