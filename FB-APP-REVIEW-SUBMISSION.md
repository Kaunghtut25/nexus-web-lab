# Facebook App Review Submission — Nexus App (ID: 1584385086375202)

> ဒီ document က Facebook App Review မှာ copy-paste လုပ်ဖို့ အဆင်သင့် ရေးထားတာ။
> အားလုံး ပြည့်စုံဖို့ — video demo + screenshot ၂ ခုပဲ မင်း ဖြည့်ဖို့လိုတယ်။

---

## 📋 Review တင်ရမယ့် Permission

**`pages_messaging`** — (Messenger chatbot အတွက်)

ဒါကို အတည်ပြုပြီးတာနဲ့ — **လူတိုင်း** page ကို message ပို့ရင် Nexus AI bot က ချက်ချင်း ပြန်ဖြေမယ်။

> 💡 `pages_manage_posts` / `pages_manage_engagement` ကို နောက်မှ သီးခြားတင်လို့ရတယ် — အခု ပထမဆုံး `pages_messaging` တင်ပြီး chatbot အရင်အလုပ်လုပ်အောင်လုပ်ရမယ်။

---

## ✍️ Permission: pages_messaging — Submission Text

### App Permissions Selected
- `pages_messaging`
- (optional: `pages_manage_engagement` — ဒါလည်း တစ်ခါတည်း tick ထားလို့ရတယ်)

### Business Use Case (ဒီအတိုင်း copy-paste)

```
Nexus AI is a customer support and engagement assistant for Nexus Web Lab, a web
design and development agency. Our Facebook Page (Nexus Web Lab) receives
inquiries from potential customers about web design services, e-commerce
development, UI/UX design, SEO, hosting, and website maintenance.

The pages_messaging permission allows our automated assistant (Nexus AI) to:
1. Receive messages sent by customers to our Facebook Page.
2. Reply instantly with helpful, accurate information about our services,
   pricing, portfolio, and how to get a quote — 24/7, in both Burmese and
   English.
3. Collect the customer's name and contact details only when the customer
   voluntarily provides them, so our team can follow up personally.
4. Escalate to a human team member when the customer asks for a detailed
   quote or complex technical help.

The assistant is built on our own website infrastructure (nexusweblab.com)
and does NOT access, store, or share any data outside our business. We never
post on behalf of users, never access user timelines, and never use the data
for advertising or targeting.

Messaging is the core function of our business: customers expect fast,
friendly responses when they message our page, and Nexus AI delivers that
while our human team focuses on project delivery.
```

### User Data Usage (copy-paste)

```
We use the messaging data ONLY to:
- Reply to the customer's question in real time.
- Remember the conversation context so the assistant can continue naturally.
- Log the lead (name, email/phone if voluntarily provided) in our private
  CRM so our sales team can follow up.

We do NOT:
- Sell, share, or transfer user data to any third party.
- Use message content for advertising, profiling, or targeting.
- Access any user data beyond the current Messenger conversation.

All data is stored securely on our own servers (Vercel + private database)
and is protected with access controls. Users can request deletion of their
conversation data at any time by contacting info@nexusweblab.com.
```

### Additional Information / Permissions Justification (copy-paste)

```
We are requesting pages_messaging because it is the only way for our
business to automatically respond to customer inquiries on Messenger.
Without it, customers who message our page outside business hours receive
no reply, which hurts our response quality and customer trust.

Nexus AI only sends messages in response to a customer's inbound message
(no unsolicited messages, no promotions, no spam). It simply answers
questions about the company's services and routes serious leads to a human
agent. This matches the standard, expected use of pages_messaging.
```

---

## 🎥 Video Demo — လိုအပ်ချက် (၂ မိနစ် အတွင်း)

ဖုန်းနဲ့ screen record လုပ်ရုံပဲ။ ဒီအတိုင်း လုပ်ပါ:

1. **Phone / Browser ကနေ** မင်းရဲ့ Page **Nexus Web Lab** ကို Messenger ကနေ message ပို့ပါ
2. Bot က **Burmese greeting** နဲ့ ပြန်ဖြေတာ ရိုက်ပါ (မင်္ဂလာပါ + services list)
3. **"How much for a website?"** လို့ ဆက်မေးပါ
4. Bot က pricing ရှင်းပြတာ ရိုက်ပါ
5. **"I want a quote"** ဆိုပြီး မေးပါ — bot က contact form / human handoff လမ်းညွှန်တာ ရိုက်ပါ
6. Video ကို **YouTube** (unlisted) တင်ပြီး link ပေးပါ — ဒါမှမဟုတ် file upload လုပ်ပါ

**Video အတွက် စာသား (ဖော်ပြချက်):**
```
Demonstration of Nexus AI chatbot responding to customer inquiries on the
Nexus Web Lab Facebook Page. The bot greets in Burmese, answers service
and pricing questions, and routes quote requests to a human agent.
```

---

## 🖼️ Screenshot ၂ ခု (optional ဒါပေမဲ့ ထည့်တာ ပိုကောင်း)

1. **Screenshot 1:** Bot က customer ရဲ့ "Hello" ကို Burmese နဲ့ ပြန်ဖြေနေတာ
2. **Screenshot 2:** Bot က services list + contact info ပြနေတာ

---

## 🔗 Review တင်ရမယ့် နေရာ

1. သွားပါ: **<https://developers.facebook.com/apps/1584385086375202/app-review/permissions/>**
2. `pages_messaging` ဘေးက **Request / Submit** နှိပ်ပါ
3. **Permission explanation** မှာ အပေါ်က "Business Use Case" ကို paste ပါ
4. **Video demo** link ထည့်ပါ
5. **Privacy Policy URL:** `https://nexusweblab.com/privacy`
6. **App Icon:** `https://nexusweblab.com/logo.png` (ရှိရင်)
7. Submit နှိပ်ပါ

---

## ⏱️ ဘာတွေ ဖြစ်လာမလဲ

- **တစ်ခါတရံ** pages_messaging က **ချက်ချင်း approved** ဖြစ်တယ် (standard access ဆိုရင်)
- **မကြာခဏ** ၃–၇ ရက် စောင့်ရတယ် (Meta team က review လုပ်တယ်)
- Approved ဖြစ်တာနဲ့ — App က **Live** ဖြစ်သွားမယ် → **လူတိုင်း Messenger မှာ bot နဲ့ စကားပြောလို့ရမယ်** 🎉

---

## ⚠️ အရေးကြီး Note

- Review မှာ **မမှန်တာ / ဖျောက်တာ** မလုပ်နဲ့ — ငြင်းခံရရင် ပြန်တင်ရခက်တယ်
- **အခု test ချင်ရင်:** Tester ထည့်တာ မလုပ်ချင်ဘူးဆိုရင် — App Review အတည်ပြုပြီးတဲ့အထိ မင်းနဲ့ မင်းအသင်းသားတွေကသာ test လို့ရမယ် (ဒါက Facebook ရဲ့ စည်းကမ်း)
