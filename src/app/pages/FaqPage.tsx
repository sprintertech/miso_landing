import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import misoLogo from '../../assets/logo.svg';

type FaqEntry = {
  question: string;
  answer: React.ReactNode;
};

type FaqCategory = {
  category: string;
  items: FaqEntry[];
};

const FAQ_DATA: FaqCategory[] = [
  {
    category: 'What is Miso',
    items: [
      {
        question: 'What is Miso?',
        answer:
          'Miso is a consumer card management platform that lets you spend your crypto without selling it. Connect your existing cards, deposit crypto as collateral, and we\u2019ll automatically top up your card\u2019s credit while your assets keep earning yield.',
      },
      {
        question: 'How can I spend without selling my crypto?',
        answer:
          'Instead of selling your assets, Miso lets you borrow against them. Your assets stay yours, keep earning yield, and you repay the borrowed amount on your own terms. Interest charges apply after the interest free period each month.',
      },
      {
        question: 'What makes Miso different from other crypto cards?',
        answer:
          'Most crypto cards require you to sell your assets and deposit USDC to fund your card. Miso works with cards you already have and you don\u2019t have to sell your crypto to draw on your credit line. You keep your rewards, your credit history, and your exposure to crypto upside.',
      },
      {
        question: 'Is this a credit card or debit card?',
        answer:
          'Neither! Miso works with your existing cards. We\u2019re the layer that enables credit lines backed by your crypto. Think of it as a personal credit facility across all your crypto cards!',
      },
    ],
  },
  {
    category: 'Earning and Yields',
    items: [
      {
        question: 'How do I earn while I spend?',
        answer:
          'Your deposited crypto is put to work in Miso curated, battle-tested DeFi vaults (like Morpho and Aave). You earn yield 24/7, even while you\u2019re borrowing against it. Curated vault strategies take into account: liquidity, risk profile, historical performance and safety parameters. You also have the option to select your own vaults based on your risk appetite.',
      },
      {
        question: 'What kind of returns can I expect?',
        answer:
          'Yields vary by asset and market conditions, typically ranging from 3-15% APY across stablecoins and other supported assets. You can see live rates in the app before you deposit.',
      },
    ],
  },
  {
    category: 'Funding Card Spend',
    items: [
      {
        question: 'What does "borrow against collateral" mean?',
        answer:
          'You deposit crypto as a guarantee. Based on that deposit, you can borrow up to a certain percentage as a credit line to spend across your crypto cards. Your crypto is held as security until you repay. You can also elect to use your crypto to automatically repay the loan.',
      },
      {
        question: "What's the Health Factor?",
        answer: (
          <>
            <p>
              Miso uses a Health Factor that indicates how safe your position is. It
              compares:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>the value of your collateral</li>
              <li>to how much you have borrowed</li>
              <li>adjusted by Miso's risk limits (e.g. 85% MLTV)</li>
            </ul>
            <p className="mt-2">If your Health Factor:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                is <strong>above 1.0</strong> — your position is safe
              </li>
              <li>
                is <strong>close to 1.0</strong> — you will need to take action to protect
                your position
              </li>
              <li>
                is <strong>below 1.0</strong> — your position is at risk
              </li>
            </ul>
            <p className="mt-2">You can improve your Health Factor by:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>repaying part of your balance</li>
              <li>adding more collateral</li>
              <li>
                having Miso automatically reduce your position to keep the system safe
              </li>
            </ul>
            <p className="mt-2">
              You can view your position health and the liquidation threshold comfortably
              in the Miso dashboard.
            </p>
          </>
        ),
      },
      {
        question: 'What are the borrowing rates/fees?',
        answer:
          'Miso charges a simple, transparent fee structure. On each monthly statement, we charge a one-time fee of 0.50% (50 bps) on the statement balance due at the end of the month. If the balance is not repaid by the due date, we\u2019ll apply a late payment fee of 15% p.a. (accrued on the outstanding amount).',
      },
      {
        question: 'How is my credit limit determined?',
        answer:
          'Your credit limit is based on how much collateral you deposit and the health ratio for those assets. Depositing more collateral, or depositing more stable assets, and your limit increases.',
      },
      {
        question: 'Is there a minimum or maximum I can borrow?',
        answer:
          'There is no minimum or maximum borrow amount. The maximum depends on your collateral - there\u2019s no hard cap on our side.',
      },
      {
        question: "What happens if I don't pay back my statement balance?",
        answer:
          'If you don\u2019t repay the statement balance and the value of your collateral drops significantly, Miso may automatically reduce a small portion of your collateral to bring your Health Factor back to a safe level. We\u2019ll also apply a late payment fee of 15% p.a. (accrued on the outstanding amount). We\u2019ll always warn you before this happens. However, unlike traditional credit, there\u2019s no collections or credit score damage.',
      },
    ],
  },
  {
    category: 'Getting Started',
    items: [
      {
        question: 'How do I sign up?',
        answer:
          'Join the waitlist at from the homepage. You\u2019ll be the first to get the alpha when Miso launches. Early users will get access to the beta and all the new features first.',
      },
      {
        question: 'Do I need to KYC?',
        answer:
          'There is no need to KYC to use Miso. However, to use our partners fiat on-ramp features directly within app, you will need to register and complete KYC.',
      },
      {
        question: 'How does linking my cards work?',
        answer:
          'You can link any supported crypto cards to Miso. Miso provides you credit, backed by your deposited assets and available for you to use across any of your connected cards.',
      },
      {
        question: 'What crypto can I deposit?',
        answer:
          'At launch we are supporting USDC, and will be adding support for other major stablecoins, ETH, stETH, WBTC, and other assets soon.',
      },
      {
        question: 'Can I deposit fiat?',
        answer:
          'Yes! You can use your credit or debit card, as well as SEPA and Faster Payment deposits to fund your account, directly within app through our partner Moonpay. Fees and charges apply.',
      },
      {
        question: 'What chains are supported?',
        answer:
          'On launch we will support the Base chain, with the provision of credit on other chains coming soon.',
      },
      {
        question: 'Which cards can I connect?',
        answer:
          'Miso works with any card programs that support at least one of the chains Miso can issue credit on. This includes Ether.Fi, Metamask Card, Cypher Card, TUYO and various other card programs. Please reach out to us if you have questions or want to request support for a specific card.',
      },
    ],
  },
  {
    category: 'Using Miso',
    items: [
      {
        question: "How do I pay off what I've borrowed?",
        answer:
          'Repay anytime from your wallet - stablecoins, crypto, credit cards or via bank deposits or elect for the auto repayment function. You\u2019ll always see your balance, interest, and repayment options in the dashboard.',
      },
      {
        question: 'Can I withdraw my crypto anytime?',
        answer:
          'Yes, as long as you have enough collateral to cover your outstanding balance. If you\u2019ve borrowed against your assets, you may need to repay part of your balance before withdrawing.',
      },
      {
        question: 'What crypto assets can I top up in?',
        answer:
          'At launch we are supporting USDC, and will be adding support for other major stablecoins, ETH, stETH, WBTC, and other assets soon.',
      },
    ],
  },
  {
    category: 'Safety and Trust',
    items: [
      {
        question: 'Is my crypto safe?',
        answer:
          'Yes, your collateral is always in smart contracts you control. Miso never has unilateral access to your funds. If Miso ends its services, you can withdraw directly from the contract. We\u2019re building for longevity, but your assets are never lost.',
      },
      {
        question: 'Is Miso audited?',
        answer: (
          <>
            Yes. Our smart contracts are audited by Cantina and Veridise. Audit reports
            are available in our{' '}
            <a
              href="https://github.com/sprintertech/sprinter-stash-contracts/tree/main/audits"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f17928] hover:underline"
            >
              public GitHub repo
            </a>{' '}
            and linked in the app.
          </>
        ),
      },
      {
        question: 'What data do you collect?',
        answer:
          'We collect only what\u2019s needed to operate: your wallet address, deposited collateral, and card connection details. Miso does not have access to your card details. We will never sell, share, or monetize your personal data.',
      },
      {
        question: "Who's behind Miso?",
        answer:
          'Miso is built by Sprinter, a credit-based liquidity protocol that connects LPs seeking yield with cross-chain solvers requiring capital, providing zero-collateral, on-demand liquidity access while LPs earn from solver fees and protocol incentives. We are backed by the likes of Robot, Topology, Round13, Uniswap Labs and more.',
      },
    ],
  },
];

type FaqItemProps = {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-[#f2f2f2]">
      <button
        className="flex w-full items-center justify-between min-h-[84px] py-5 text-left cursor-pointer bg-transparent border-0 outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`text-[18px] font-bold leading-[27px] font-['Plus_Jakarta_Sans',sans-serif] transition-colors pr-4 ${
            isOpen ? 'text-[#f17928]' : 'text-[#0f1419]'
          }`}
        >
          {question}
        </span>
        <div
          className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-[#f2f2f2]' : ''
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="minus"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                <Minus size={20} strokeWidth={2} color="#0f1419" />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                <Plus size={20} strokeWidth={2} color="#0f1419" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-6 text-[16px] leading-[26px] text-[#536471] font-['Plus_Jakarta_Sans',sans-serif]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set());

  function handleToggle(key: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="w-full min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden">
      <div className="w-full flex justify-center pt-6 px-5">
        <div className="bg-[#f2f2f2] rounded-full pl-6 pr-[6px] py-[6px] flex items-center gap-8 max-md:hidden">
          <Link to="/">
            <img src={misoLogo} alt="miso" className="h-[20px] shrink-0" />
          </Link>
          <div className="flex gap-6 text-sm font-semibold text-[#313131]">
            <a href="/#features" className="cursor-pointer transition-colors hover:text-[#ff7416]">Features</a>
            <a href="/#how-it-works" className="cursor-pointer transition-colors hover:text-[#ff7416]">How It Works</a>
            <a href="/#about" className="cursor-pointer transition-colors hover:text-[#ff7416]">About</a>
            <Link to="/faq" className="cursor-pointer transition-colors text-[#ff7416]">FAQ</Link>
          </div>
          <Link
            to="/"
            className="group bg-[#313131] text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer flex items-center gap-1 no-underline"
          >
            Get Early Access
            <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-[20px] group-hover:opacity-100">→</span>
          </Link>
        </div>

        <div className="md:hidden w-full flex items-center justify-between">
          <Link to="/">
            <img src={misoLogo} alt="miso" className="h-[18px]" />
          </Link>
          <Link
            to="/"
            className="bg-[#313131] text-white px-4 py-2 rounded-full text-sm font-bold no-underline"
          >
            Get Early Access
          </Link>
        </div>
      </div>

      <main className="max-w-[800px] mx-auto px-5 pt-16 pb-24">
        <div className="text-center mb-12">
          <h1 className="text-[48px] font-bold leading-[1.167] text-[#0f1419] mb-6 max-md:text-[32px]">
            Frequently Asked Questions
          </h1>
          <p className="text-[18px] leading-[28px] text-[#536471]">
            Everything you need to know about Miso
          </p>
        </div>

        {FAQ_DATA.map((section) => (
          <div key={section.category} className="mb-10">
            <h2 className="text-[13px] font-bold text-[#536471] uppercase tracking-wider mb-2">
              {section.category}
            </h2>
            {section.items.map((item) => {
              const key = `${section.category}-${item.question}`;
              return (
                <FaqItem
                  key={key}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems.has(key)}
                  onToggle={() => handleToggle(key)}
                />
              );
            })}
          </div>
        ))}
      </main>
    </div>
  );
}
