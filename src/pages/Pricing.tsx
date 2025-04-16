import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/ui/footer';
import { Navbar } from '@/components/ui/navbar';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Check, DollarSign, HelpCircle, Rocket, Zap } from 'lucide-react';
import { useState } from 'react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return "$0";
    const annual = monthlyPrice * 12 * 0.8; // 20% discount for annual
    return isAnnual ? `$${Math.floor(annual / 12)}` : `$${monthlyPrice}`;
  };

  const plans = [
    {
      name: "Free",
      description: "Perfect for personal projects and experimentation",
      price: getPrice(0),
      period: "forever",
      color: "from-blue-500/20 to-blue-600/20",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
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
      price: getPrice(19),
      period: isAnnual ? "per month, billed annually" : "per month",
      color: "from-indigo-500/20 to-violet-500/20",
      buttonColor: "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600",
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
      description: "For large organizations with custom needs",
      price: getPrice(49),
      period: isAnnual ? "per month, billed annually" : "per month",
      color: "from-purple-500/20 to-pink-500/20",
      buttonColor: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      features: [
        "Unlimited everything",
        "24/7 premium support",
        "Custom integrations",
        "Enterprise analytics",
        "Advanced security",
        "SLA guarantee",
        "Dedicated account manager",
        "Custom contracts",
        "On-premise deployment",
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
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Choose the plan that fits your needs. All plans include core features to get you started.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
                <button
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                    isAnnual ? 'bg-gradient-to-r from-indigo-500 to-violet-500' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transform transition-transform duration-300 ${
                      isAnnual ? 'translate-x-8' : 'translate-x-0'
                    }`}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>Annual</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-emerald-400">
                    Save 20%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: plan.delay }}
                  className="relative group h-full"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative bg-black/40 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors duration-300 h-full flex flex-col">
                    <div className="mb-auto">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-gray-400 mb-6 min-h-[48px]">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-400 ml-2">{plan.period}</span>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <Button 
                        className={`w-full ${plan.buttonColor} group relative`}
                      >
                        {plan.name === "Enterprise" ? (
                          <>
                            <HelpCircle className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                            Contact Sales
                          </>
                        ) : (
                          <>
                            <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                            Get Started
                          </>
                        )}
                        <div className="absolute inset-0 rounded-lg bg-white/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                      <ul className="space-y-3 min-h-[320px]">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center text-gray-300">
                            <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

            {/* Enterprise CTA */}
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
                <Button 
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Contact Sales
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                <Button 
                  variant="outline" 
                  className="group relative border-white/20 bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-6 backdrop-blur-sm"
                >
                  Schedule Demo
                </Button>
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
