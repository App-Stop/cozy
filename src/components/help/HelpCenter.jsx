import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Coins, Minimize2, Send, X } from 'lucide-react'
import {
  HelpAccordion,
  HelpChatFooter,
  HelpFeedback,
  HelpField,
  HelpHeader,
  HelpImageUpload,
  HelpListItem,
  HelpOrderCard,
  HelpOrderSummary,
  HelpSearch,
} from './HelpParts'
import { useDialog } from '../../hooks/useDialog'
import {
  ARTICLE_SCREENS,
  CHAT_GREETING,
  CHAT_SUGGESTIONS,
  HELP_MENU,
  HELP_ORDERS,
  ORDER_SCREENS,
  ORDER_TOPICS,
} from '../../data/help'
import './help.css'

const findOrder = (id) => HELP_ORDERS.find((order) => order.id === id) ?? HELP_ORDERS[0]

/* ---------- Screens ---------- */

const HomeScreen = ({ onOpen }) => {
  const [query, setQuery] = useState('')
  const term = query.trim().toLowerCase()

  const groups = HELP_MENU.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.label.toLowerCase().includes(term)),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="help-section">
      <h2 className="help-heading">Help Center</h2>
      <HelpSearch placeholder="Search help..." value={query} onChange={setQuery} />

      {groups.length === 0 && <p className="help-empty">No help topics match “{query}”.</p>}

      {groups.map((group, index) => (
        <React.Fragment key={group.title}>
          {index > 0 && <hr className="help-divider" />}
          <div className="help-group">
            <h3 className="help-group-title">{group.title}</h3>
            {group.items.map((item) => (
              <HelpListItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                onClick={() => onOpen({ screen: item.screen })}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

const OrdersScreen = ({ onOpen }) => {
  const [query, setQuery] = useState('')
  const term = query.trim().toLowerCase()
  const orders = HELP_ORDERS.filter((order) => order.id.toLowerCase().includes(term))

  return (
    <div className="help-section">
      <h2 className="help-heading">Get help with your order</h2>
      <HelpSearch placeholder="Search order by ID" value={query} onChange={setQuery} />

      {orders.length === 0 && <p className="help-empty">No order matches “{query}”.</p>}

      <div className="help-orders">
        {orders.map((order) => (
          <HelpOrderCard
            key={order.id}
            order={order}
            onClick={() => onOpen({ screen: 'order-topics', orderId: order.id })}
          />
        ))}
      </div>
    </div>
  )
}

const OrderTopicsScreen = ({ order, onOpen }) => (
  <div className="help-section">
    <HelpOrderSummary order={order} />
    <div className="help-group">
      {ORDER_TOPICS.map((topic) => (
        <HelpListItem
          key={topic.id}
          label={topic.label}
          onClick={() => onOpen({ screen: topic.screen, orderId: order.id })}
        />
      ))}
    </div>
  </div>
)

// Read-only answer for one order, followed by the "Was this helpful?" block.
const OrderAnswerScreen = ({ order, screen }) => (
  <>
    <div className="help-section">
      <HelpOrderSummary order={order} />
      <p className="help-text">{screen.body}</p>
    </div>
    <div className="flex-1" />
    <HelpFeedback />
  </>
)

// Dispute form — "Check my refund status", "I did not receive cozy points"
// and "Feedback on order" all share it; only the fields differ.
const OrderDisputeScreen = ({ order, screen }) => {
  const [orderId, setOrderId] = useState('')
  const [issue, setIssue] = useState('')
  const [image, setImage] = useState(null)
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="help-section">
        <HelpOrderSummary order={order} />
        <p className="help-text">
          Thanks — your dispute is with our support team. We’ll reply by email within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form
      className="help-section"
      onSubmit={(event) => {
        event.preventDefault()
        // TODO: post the dispute once the support API exists.
        setSent(true)
      }}
    >
      <HelpOrderSummary order={order} />

      {screen.lines.map((line) => (
        <p className="help-text" key={line}>
          {line}
        </p>
      ))}

      <div className="flex flex-col gap-[10px]">
        {screen.form.orderId && (
          <HelpField label="Order ID" placeholder="ORD-213213" value={orderId} onChange={setOrderId} />
        )}
        <HelpField
          label="Explain the issue"
          placeholder={screen.form.issuePlaceholder}
          value={issue}
          textarea
          onChange={setIssue}
        />
        <HelpImageUpload file={image} onChange={setImage} />
      </div>

      <button type="submit" className="help-btn help-btn-primary" disabled={!issue.trim()}>
        Submit dispute
      </button>
    </form>
  )
}

const ArticleScreen = ({ screen, onStartChat }) => (
  <>
    {screen.points !== undefined && (
      <>
        <div className="help-section">
          <h2 className="help-heading">Your points</h2>
          <div className="help-points">
            <div className="flex flex-col gap-1">
              <p className="help-points-value">
                <span className="help-points-coin">
                  <Coins strokeWidth={1.5} />
                </span>
                {screen.points}
              </p>
              <p className="help-points-label">Cozy Points</p>
            </div>
            {/* TODO: link to the rewards wallet once it exists. */}
            <button type="button" className="help-points-view">
              View
            </button>
          </div>
        </div>
        <hr className="help-divider" />
      </>
    )}

    <div className="help-section">
      {screen.points !== undefined && <h2 className="help-heading">Get help</h2>}
      <HelpAccordion faqs={screen.faqs} />
    </div>

    <HelpFeedback />
    <div className="flex-1" />
    <HelpChatFooter onStartChat={onStartChat} />
  </>
)

const ChatScreen = () => {
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')

  const send = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    // TODO: hand off to the live support socket once it exists.
    setMessages((list) => [...list, trimmed])
    setDraft('')
  }

  return (
    <div className="help-chat">
      <div className="help-chat-thread">
        {CHAT_GREETING.messages.map((message) => (
          <p className="help-chat-bubble" key={message}>
            {message}
          </p>
        ))}
        <p className="help-chat-byline">
          <span className="help-chat-author">{CHAT_GREETING.author}</span>
          <span className="help-chat-time">{CHAT_GREETING.time}</span>
        </p>
      </div>

      <div className="help-chat-replies">
        {messages.length === 0 && (
          <>
            <p className="help-chat-replies-title">Suggestions</p>
            {CHAT_SUGGESTIONS.map((suggestion) => (
              <button
                type="button"
                className="help-chat-reply"
                key={suggestion}
                onClick={() => send(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </>
        )}
        {messages.map((message, index) => (
          <p className="help-chat-sent" key={`${message}-${index}`}>
            {message}
          </p>
        ))}
      </div>

      <form
        className="help-chat-compose"
        onSubmit={(event) => {
          event.preventDefault()
          send(draft)
        }}
      >
        <input
          type="text"
          placeholder="Type message..."
          aria-label="Message support"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="help-chat-send" aria-label="Send" disabled={!draft.trim()}>
          <Send strokeWidth={1.5} />
        </button>
      </form>
    </div>
  )
}

/* ---------- Drawer ---------- */

// `initialScreen` lets callers open straight into the support chat.
const HelpCenter = ({ initialScreen = 'home', onClose }) => {
  const [stack, setStack] = useState([{ screen: initialScreen }])
  const dialogRef = useDialog(onClose)

  const current = stack[stack.length - 1]
  const order = current.orderId ? findOrder(current.orderId) : null
  const push = (entry) => setStack((list) => [...list, entry])
  const back = () => setStack((list) => list.slice(0, -1))
  const startChat = () => push({ screen: 'chat' })

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  const article = ARTICLE_SCREENS[current.screen]
  const orderScreen = ORDER_SCREENS[current.screen]

  let title = null
  let content

  if (current.screen === 'home') {
    content = <HomeScreen onOpen={push} />
  } else if (current.screen === 'orders' || current.screen === 'order-topics') {
    title = 'Orders'
    content =
      current.screen === 'orders' ? (
        <OrdersScreen onOpen={push} />
      ) : (
        <OrderTopicsScreen order={order} onOpen={push} />
      )
  } else if (orderScreen) {
    title = orderScreen.title
    content = orderScreen.form ? (
      <OrderDisputeScreen order={order} screen={orderScreen} />
    ) : (
      <OrderAnswerScreen order={order} screen={orderScreen} />
    )
  } else if (article) {
    title = article.title
    content = <ArticleScreen screen={article} onStartChat={startChat} />
  } else {
    title = 'Cozy Support Chat'
    content = <ChatScreen />
  }

  const isChat = current.screen === 'chat'

  return createPortal(
    <div className="help-backdrop" onMouseDown={handleBackdropMouseDown}>
      <div
        ref={dialogRef}
        className="help-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Help Center'}
        tabIndex={-1}
      >
        <HelpHeader
          title={title}
          onBack={stack.length > 1 ? back : undefined}
          onClose={onClose}
          closeIcon={isChat ? Minimize2 : X}
          closeLabel={isChat ? 'Minimise chat' : 'Close help centre'}
        />

        {isChat ? content : <div className="help-body">{content}</div>}
      </div>
    </div>,
    document.body,
  )
}

export default HelpCenter
