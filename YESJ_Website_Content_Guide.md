__YES\-J__

__Youth Empowering Service – Jesuits__

__OFFICIAL WEBSITE REVAMP__

*Content File*

__*"YES – I have Dreams\. YES – I am capable of fulfilling my Dreams\. YES – I Can and I Will be the Dream I want to be if only given the opportunity\."*__

__PREPARED FOR: WEBSITE DEVELOPMENT__

Andhra Loyola College Campus, Vijayawada, Andhra Pradesh

# TABLE OF CONTENTS

__SECTION 1  __Project Overview & Tech Stack Requirements

__SECTION 2  __Global Design System & Brand Guidelines

__SECTION 3  __Global Navigation & Header

__SECTION 4  __Global Footer

__SECTION 5  __HOMEPAGE \(/\)

__SECTION 6  __ABOUT US \(/about\)

__SECTION 7  __PROGRAMS OVERVIEW \(/programs\)

__SECTION 8  __PEP – Personality Enhancement Programme

__SECTION 9  __MAGIC – Men & Women Aiming at Greater Initiatives for Change

__SECTION 10  __MuST – Multi\-Skill Training Programme

__SECTION 11  __Summer Shapes \(SS\)

__SECTION 12  __Scholar Support Programme \(SSP\)

__SECTION 13  __JoY Desk – Jobs for Youth

__SECTION 14  __VIP – Voluntary Immersion Programme

__SECTION 15  __Compassion Connect \(CC\)

__SECTION 16  __STHRI – Stand for Holistic Resilience & Independence

__SECTION 17  __O GOD – Organising God\-Oriented Days

__SECTION 18  __MAGIS – YES\-J Yuvotsavaalu \(Youth Festival\)

__SECTION 19  __Each One – Teach Ten \(EOTT\)

__SECTION 20  __Digital Media Wing \(Youth Blaze, PEP Pause, Social Consciousness\)

__SECTION 21  __IMPACT PAGE \(/impact\)

__SECTION 22  __GET INVOLVED \(/get\-involved\)

__SECTION 23  __VOLUNTEER / VIP Page \(/volunteer\)

__SECTION 24  __DONATE PAGE \(/donate\)

__SECTION 25  __ECHOES – Newsletter & Media \(/media\)

__SECTION 26  __CONTACT US \(/contact\)

__SECTION 27  __NOTIFICATIONS & ANNOUNCEMENTS SYSTEM

__SECTION 28  __MOBILE RESPONSIVENESS REQUIREMENTS

__SECTION 29  __SEO & PERFORMANCE REQUIREMENTS

__SECTION 30  __CENTRE FOR EXCELLENCE – Booking Sub\-Page

# SECTION 1: PROJECT OVERVIEW & TECH STACK REQUIREMENTS

## 1\.1 Project Brief

YES\-J \(Youth Empowering Service – Jesuits\) is a Jesuit ministry based at Andhra Loyola College Campus, Vijayawada, serving underprivileged youth aged 15–25 across Andhra Pradesh and Telangana\. This document is the complete content and design specification for the full website revamp\.

This guide is written so that the developer has zero ambiguity on any page, section, component, button, or copy\. Every line of text to be displayed, every button label, every interaction, and every design decision is documented here\. Do NOT deviate from specified content without written approval\.

## 1\.2 Website Goals

- Create a powerful, modern, emotionally engaging online presence that communicates YES\-J's mission clearly
- Drive volunteer registrations, donor contributions, program applications, and partnership inquiries
- Showcase 10\+ programs comprehensively with dedicated sub\-pages
- Establish YES\-J as a credible, professional Jesuit social organization
- Integrate a real\-time notification/announcement system for programs and events
- Provide a Centre for Excellence booking portal \(separate sub\-page\)
- Be fully mobile\-responsive and fast\-loading

## 1\.3 Recommended Tech Stack

__Component__

Recommendation

Frontend Framework

React\.js \(Next\.js preferred for SEO\) OR WordPress with custom theme

Styling

Tailwind CSS \+ custom CSS variables

CMS \(content\)

Sanity\.io OR WordPress CMS for programs, events, testimonials

Animations

Framer Motion \(React\) OR AOS \(Animate on Scroll\)

Notifications

Custom toast/banner system with admin panel entry OR Firebase Realtime DB

Forms

React Hook Form \+ Formspree OR EmailJS for contact/application forms

Image CDN

Cloudinary for all media assets

Analytics

Google Analytics 4 \+ Google Search Console

Hosting

Vercel \(Next\.js\) OR Hostinger/SiteGround \(WordPress\)

Domain

yesj\.org OR yesj\.in \(confirm with administration\)

SSL

Mandatory HTTPS

## 1\.4 Color Palette \(PRIMARY BRAND\)

*💻 DEV: Implement these as CSS variables at :root level\. Use ONLY these colors throughout the site\.*

__Variable Name__

Hex Code / Usage

\-\-primary \(Deep Blue\)

\#1E3A8A  — Main brand, nav background, headings, CTAs

\-\-secondary \(Sky Blue\)

\#0EA5E9  — Accents, hover states, links, highlights

\-\-accent \(Amber/Gold\)

\#F59E0B  — Buttons, badges, highlights, urgency elements

\-\-success \(Emerald\)

\#10B981  — Impact stats, success messages, positive indicators

\-\-danger \(Red\)

\#EF4444  — Alerts, urgent notifications

\-\-text\-dark

\#1F2937  — Body text

\-\-text\-light

\#6B7280  — Captions, placeholders, secondary text

\-\-bg\-light

\#F9FAFB  — Section backgrounds \(alternating\)

\-\-bg\-white

\#FFFFFF  — Card backgrounds, primary backgrounds

\-\-border

\#E5E7EB  — Dividers, card borders

## 1\.5 Typography

__Element__

Font / Weight / Size

Primary Heading \(H1\)

Playfair Display, Serif — Bold — 4rem–5rem

Section Headings \(H2\)

Poppins, Sans\-serif — Bold — 2\.5rem–3rem

Sub\-headings \(H3\)

Poppins, Sans\-serif — SemiBold — 1\.5rem–2rem

Body Text

Poppins, Sans\-serif — Regular — 1rem–1\.1rem

Navigation Links

Poppins, Sans\-serif — Medium — 0\.9rem–1rem

Button Text

Poppins, Sans\-serif — SemiBold — 0\.9rem–1rem

Captions / Labels

Poppins, Sans\-serif — Regular — 0\.8rem

Google Fonts Import

Playfair Display \(400,700\) \+ Poppins \(400,500,600,700\)

# SECTION 2: GLOBAL DESIGN SYSTEM & BRAND GUIDELINES

## 2\.1 Logo Placement

- Logo = YES\-J wordmark: Bold 'YES' in Deep Blue \+ '\-J' in Sky Blue OR official SVG/PNG logo if provided
- Always placed top\-left in the navigation bar
- Minimum logo height: 40px\. Never distort aspect ratio
- Tagline below logo: 'Youth Empowering Service – Jesuits' in small text \(0\.7rem\), color \-\-text\-light

## 2\.2 Button Styles

__Button Type__

Specs

Primary CTA

Background: gradient\(135deg, \#1E3A8A, \#0EA5E9\)\. White text\. Rounded\-full\. Padding: 0\.9rem 2\.5rem\. Hover: translateY\(\-2px\) \+ shadow

Secondary CTA

Border: 2px solid \-\-primary\. Text: \-\-primary\. Background: transparent\. Hover: fill with \-\-primary, white text

Accent CTA

Background: \-\-accent \(\#F59E0B\)\. White text\. Hover: darken to \#D97706

Ghost / Outline \(white\)

Border: 2px solid white\. Text: white\. Backdrop blur\. Hover: fill white, text \-\-primary

Disabled State

Opacity: 0\.5\. Cursor: not\-allowed\. No hover effect

Icon Buttons

Icon left of label\. Gap: 0\.5rem\. Icon size: 1rem \(inline\)

## 2\.3 Card Component

- Border\-radius: 16px
- Box\-shadow: 0 4px 24px rgba\(0,0,0,0\.08\)
- Hover: box\-shadow: 0 8px 40px rgba\(0,0,0,0\.14\) \+ translateY\(\-4px\) — smooth 0\.3s transition
- Background: white
- Overflow: hidden \(for image thumbnails to respect border\-radius\)

## 2\.4 Section Layout

- Max content width: 1300px, centered with auto margins
- Section padding \(desktop\): 6rem 5%
- Section padding \(mobile\): 3rem 1\.2rem
- Alternating section backgrounds: white → \-\-bg\-light \(\#F9FAFB\) → white

## 2\.5 Animations & Interactions

*💻 DEV: Use AOS \(Animate on Scroll\) library\. Add data\-aos attributes as specified per section\.*

- Hero elements: fadeInUp on load
- Cards: data\-aos='fade\-up' with data\-aos\-delay staggered by 100ms per card
- Stats counters: animate count from 0 to final value when scrolled into view \(use IntersectionObserver\)
- Images: lazy\-load with fade\-in
- Navigation: smooth scroll to anchor sections for same\-page links
- Hover transitions: all 0\.3s ease

# SECTION 3: GLOBAL NAVIGATION & HEADER

## 3\.1 Top Announcement Bar \(ABOVE the nav\)

*💻 DEV: This is a full\-width sticky bar at the very top, above the nav\. It is dismissible \(X button\)\. It cycles through current announcements stored in CMS/admin panel\. Background: \-\-accent \(\#F59E0B\)\. Text: Dark\.*

__  ANNOUNCEMENT BAR — EXACT STRUCTURE  __

Left side: Bell icon \(🔔\) \+ scrolling ticker text \(marquee or CSS scroll animation\)

Center/Right: CTA link — 'Apply Now →' or 'Know More →' linking to relevant program page

Far right: ✕ Close button to dismiss for session

Default announcement text examples \(rotate from CMS\):

- 🔔  Applications Open: English Proficiency Course \(EPC\) — Summer 2026 | Apply Now →
- 🔔  Summer Shapes 2026 Registrations Now Open — Free Residential Program\! | Register →
- 🔔  MAGIS Youth Festival Coming Soon — Vijayawada | Know More →
- 🔔  YES\-J is looking for Volunteers\! Join the VIP Program | Apply →

## 3\.2 Main Navigation Bar

*💻 DEV: Position: fixed, top: \(announcement bar height\)\. Width: 100%\. Background: rgba\(255,255,255,0\.98\)\. Backdrop\-filter: blur\(12px\)\. Box\-shadow: 0 2px 20px rgba\(0,0,0,0\.08\)\. Z\-index: 1000\. Height: ~80px\.*

__  NAV ITEMS — LEFT TO RIGHT  __

__Nav Item Label__

Link / Behavior

YES\-J \[Logo\]

/ \(Home\) — always top\-left

Home

/ — highlights when active

About

/about — dropdown on hover

Programs

/programs — MEGA DROPDOWN \(see 3\.3\)

Impact

/impact

Get Involved

/get\-involved — dropdown on hover

Media

/media

Contact

/contact

\[BUTTON\] Donate Now

/donate — Accent CTA button, top\-right\. Always visible

## 3\.3 About Dropdown

- Our Story
- Our Philosophy
- Leadership & Team
- Centre for Excellence
- Annual Reports

## 3\.4 Programs MEGA DROPDOWN \(Full\-width dropdown panel\)

*💻 DEV: When user hovers/clicks Programs, a full\-width mega menu appears with 3 columns\. Each program has its icon, name, and a 1\-line description\.*

__  MEGA MENU — COLUMN 1: SKILL & EDUCATION  __

- PEP — Personality Enhancement Programme
- MuST — Multi\-Skill Training Programme
- SSP — Scholar Support Programme
- Summer Shapes — English & Life Skills
- Each One Teach Ten — Community Learning

__  MEGA MENU — COLUMN 2: YOUTH & COMMUNITY  __

- MAGIC — Student Youth Wing
- JoY Desk — Jobs for Youth
- VIP — Voluntary Immersion Programme
- STHRI — Women Empowerment
- Compassion Connect — Direct Care

__  MEGA MENU — COLUMN 3: SPIRITUAL & CELEBRATION  __

- O GOD — God\-Oriented Days
- MAGIS / Yuvotsavaalu — Youth Festival
- Digital Media Wing
- \[VIEW ALL PROGRAMS →\] button at bottom of mega menu

## 3\.5 Get Involved Dropdown

- Volunteer with Us \(VIP\)
- Donate / Support
- Partner with YES\-J
- Intern with Us

## 3\.6 Mobile Navigation

*💻 DEV: Below 768px: Hide desktop nav\. Show hamburger menu icon \(top\-right\)\. On click: full\-screen slide\-in panel from right\. All nav items listed vertically\. Accordion for dropdowns\. Donate button always visible at bottom of mobile menu\.*

# SECTION 4: GLOBAL FOOTER

*💻 DEV: Footer background: \-\-primary \(\#1E3A8A\)\. Text: white\. Divided into 5 columns \(desktop\), stack to 2 on tablet, 1 on mobile\.*

## 4\.1 Footer Column 1 — Brand

Logo: YES\-J \(white version\)

Tagline: Youth Empowering Service – Jesuits

Paragraph copy:

Saying YES when the world says no\. A Jesuit ministry serving underprivileged youth aged 15–25 across Andhra Pradesh and Telangana since 2016\.

Social Media Icons \(with links\):

- Facebook — facebook\.com/yesj \(confirm URL\)
- Instagram — instagram\.com/yesj\.india \(confirm URL\)
- YouTube — YES\-J YouTube Channel \(confirm URL\)
- LinkedIn — YES\-J LinkedIn \(confirm URL\)
- WhatsApp — Community WhatsApp group link \(optional\)

## 4\.2 Footer Column 2 — Quick Links

Heading: QUICK LINKS

- Home
- About YES\-J
- Our Programs
- Impact
- Media & Echoes
- Contact Us

## 4\.3 Footer Column 3 — Programs

Heading: OUR PROGRAMS

- PEP
- MAGIC
- MuST
- Summer Shapes
- SSP
- JoY Desk
- VIP
- Compassion Connect
- STHRI
- O GOD
- MAGIS / Yuvotsavaalu
- Each One Teach Ten

## 4\.4 Footer Column 4 — Get Involved

Heading: GET INVOLVED

- Volunteer with YES\-J
- Donate / Support
- Partner with Us
- Intern with Us
- Apply for a Program

## 4\.5 Footer Column 5 — Contact & Address

Heading: CONTACT US

Address: YES\-J Centre for Excellence

Andhra Loyola College Campus, Vijayawada

Andhra Pradesh – 520 008, India

Phone: \[INSERT PHONE NUMBER\]

Email: \[INSERT EMAIL ADDRESS\]

WhatsApp: \[INSERT WHATSAPP NUMBER\]

## 4\.6 Footer Bottom Bar

*💻 DEV: Thin bottom strip\. Background slightly darker\. Full\-width divider line above\.*

Left: © 2026 Youth Empowering Service – Jesuits\. All Rights Reserved\.

Center: Andhra Jesuit Province | Society of Jesus | The Loyola College Society, Guntur–Vijayawada

Right: Privacy Policy  |  Terms of Use  |  Sitemap

## 4\.7 Footer Newsletter Signup \(above main footer columns\)

*💻 DEV: A full\-width pre\-footer strip\. Background: \-\-secondary \(\#0EA5E9\)\. White text\.*

Heading: Stay Connected with YES\-J

Sub: Get program updates, youth stories, and impact reports in your inbox\.

Email input field placeholder: 'Enter your email address'

__\[BUTTON\] Label: "Subscribe Now"  |  __Action: POST to email list \(Mailchimp or similar\)  |  *Style: Primary*

# SECTION 5: HOMEPAGE \( / \)

*💻 DEV: This is the most important page\. Every section must be visually stunning, emotional, and compelling\. The homepage tells YES\-J's entire story in one scroll\.*

## 5\.1 HERO SECTION

*💻 DEV: Full viewport height \(100vh\)\. Background: Full\-screen video or high\-quality slideshow of YES\-J program photos\. Overlay: gradient from rgba\(30,58,138,0\.75\) to rgba\(14,165,233,0\.55\)\. Content centered\. All content animates in on load\.*

__  HERO — ANNOUNCEMENT BADGE \(top of hero content\)  __

Pill badge\. Background: \-\-accent\. Text: '🔔 Summer Shapes 2026 — Applications Now Open\!'

This badge is clickable → links to /programs/summer\-shapes

__  HERO — MAIN HEADLINE  __

__We Say YES__

__When the World Says No\.__

__  HERO — SUBHEADLINE  __

Empowering underprivileged youth across Andhra Pradesh & Telangana through education, skills, faith, and dignity — since 2016\.

__  HERO — HERO BUTTONS \(side by side\)  __

__\[BUTTON\] Label: "Explore Our Programs"  |  __Action: /programs  |  *Style: Primary*

__\[BUTTON\] Label: "Support a Dream →"  |  __Action: /donate  |  *Style: Accent*

__\[BUTTON\] Label: "Watch Our Story"  |  __Action: Opens YouTube embed modal/lightbox  |  *Style: Ghost*

__  HERO — SCROLL INDICATOR  __

Animated bouncing down\-arrow icon at bottom of hero\. Text: 'Scroll to discover'

## 5\.2 IMPACT NUMBERS STRIP

*💻 DEV: This strip sits directly BELOW the hero with a negative top margin of \-50px to overlap slightly\. Background: white card with deep blue gradient\. Cards with counter animation on scroll\.*

__  STATS — 6 IMPACT NUMBERS \(ANIMATE FROM 0 ON SCROLL\)  __

__Stat Number__

__Stat Label__

__Icon__

50,000\+

Lives Touched

❤️

243\+

Events Conducted

📅

12

Active Programs

🎯

10\+

Years of Service

⭐

2 States

AP & Telangana

🗺️

Free

All Programs

🤝

*💻 DEV: Each stat: Number in 3rem bold white\. Label in 1rem white opacity\-90\. Counter animates from 0 using JavaScript IntersectionObserver\.*

## 5\.3 THE YES\-J STORY SECTION

*💻 DEV: Section background: \-\-bg\-light\. Two\-column layout: left = text, right = image \(YES\-J team photo or impactful program photo\)\.*

__  STORY — SECTION BADGE  __

Small pill: 'OUR STORY' — uppercase, \-\-accent colored

__  STORY — HEADLINE  __

MAIN HEADING: 'Born from a Belief That Every Dream Deserves a Chance'

__  STORY — BODY COPY \(3 paragraphs\)  __

Millions of young people in Andhra Pradesh and Telangana are born with dreams\. But poverty, inequality, and lack of opportunity silence those dreams before they begin\. YES\-J was founded to change that story\.

Since 2016, we have been walking alongside youth aged 15–25 — regardless of caste, class, religion, or circumstance — providing them with vocational training, English education, scholarships, employment support, and spiritual grounding\. We are a Jesuit ministry, rooted at Andhra Loyola College Campus, Vijayawada, and affiliated with the Andhra Jesuit Province of the Society of Jesus\.

We don't offer charity\. We offer transformation\. We are convinced that every young person — if given the right opportunity — can say YES to their dreams\. That's why we're called YES\-J\.

__\[BUTTON\] Label: "Read Our Full Story"  |  __Action: /about  |  *Style: Primary*

__\[BUTTON\] Label: "Our Philosophy →"  |  __Action: /about\#philosophy  |  *Style: Secondary*

## 5\.4 PROGRAMS SECTION

*💻 DEV: Section background: white\. Heading centered\. Cards in responsive grid: 4 columns desktop, 2 tablet, 1 mobile\. Each card is clickable → program sub\-page\.*

__  PROGRAMS — SECTION HEADING  __

PILL BADGE: '12 PROGRAMS'

HEADING: 'Everything a Young Person Needs to Thrive'

SUBHEADING: 'From English education to vocational skills, from faith formation to employment — YES\-J covers it all\.'

__  PROGRAMS — 12 PROGRAM CARDS  __

*💻 DEV: Each card has: Program icon \(emoji or SVG\), Program color accent strip at top, Short Name, 1\-line description, 'Learn More →' link button*

__Program Card__

Card Content

PEP

Icon: 🌟 | Desc: Personality & soft skills workshops in schools, colleges & parishes | Link: /programs/pep

MAGIC

Icon: ⚡ | Desc: Student youth wing turning campus communities into change\-makers | Link: /programs/magic

MuST

Icon: 🔧 | Desc: Free vocational training in tailoring, ICT, driving, welding & more | Link: /programs/must

Summer Shapes

Icon: ☀️ | Desc: Free 30\-day residential English communication & life skills program | Link: /programs/summer\-shapes

SSP

Icon: 🎓 | Desc: Scholarships for academically brilliant, financially struggling youth | Link: /programs/ssp

JoY Desk

Icon: 💼 | Desc: Job training, referrals & JoY Melas connecting youth to employment | Link: /programs/joy\-desk

VIP

Icon: 🌍 | Desc: Volunteer immersion in villages, slums & urban margins | Link: /programs/vip

Compassion Connect

Icon: 🤝 | Desc: Direct relief — food, destitute rescue & disaster response | Link: /programs/compassion\-connect

STHRI

Icon: 👩 | Desc: Holistic resilience & financial independence for women | Link: /programs/sthri

O GOD

Icon: ✝️ | Desc: Scripture, prayer, meditation & inter\-religious dialogue for youth | Link: /programs/ogod

MAGIS / Yuvotsavaalu

Icon: 🎉 | Desc: Annual youth festivals — Express, Experience, and Enrich | Link: /programs/magis

Each One Teach Ten

Icon: 📚 | Desc: Student\-run tutoring centers in slums and rural communities | Link: /programs/eott

__\[BUTTON\] Label: "View All 12 Programs"  |  __Action: /programs  |  *Style: Accent*

## 5\.5 THE YES\-J PHILOSOPHY SECTION

*💻 DEV: Background: Deep blue gradient\. White text\. Full\-width\. Text centered\. Very emotional and powerful section\.*

__  PHILOSOPHY — HEADLINE  __

HEADING \(white\): 'The Power of Three YESes'

__  PHILOSOPHY — THREE YES STATEMENTS \(large cards or text blocks\)  __

✅  YES — I have Dreams\.

✅  YES — I am capable of fulfilling my Dreams\.

✅  YES — I Can and I Will be the Dream I want to be — if only I am given the opportunity\.

__  PHILOSOPHY — SUPPORTING COPY  __

These are not just words\. They are the declaration of every young person who walks through YES\-J\. We believe that youth are not problems to be managed\. They are potential to be unleashed\.

__\[BUTTON\] Label: "Our Philosophy →"  |  __Action: /about\#philosophy  |  *Style: Ghost*

## 5\.6 VIDEO / DOCUMENTARY SECTION

*💻 DEV: Full\-width section\. Background: dark \(\#111\)\. A YouTube embed OR thumbnail with play button overlay\. When clicked → lightbox/modal with video\.*

SECTION HEADING: 'Watch How YES\-J Changes Lives'

SUBHEADING: 'Real stories\. Real transformation\. Real YES\.'

VIDEO PLACEHOLDER: Embed YES\-J promotional/documentary video from YouTube

*💻 DEV: If no video is ready yet, show a placeholder image with a 'Coming Soon' badge\. Use a high\-quality photo of YES\-J youth as background\.*

## 5\.7 TESTIMONIALS / VOICES OF CHANGE

*💻 DEV: Auto\-scrolling carousel \(Swiper\.js or similar\)\. 3 cards visible on desktop\. Each card: Photo, Name, Program attended, 2–3 line quote\.*

__  TESTIMONIALS — SECTION HEADING  __

HEADING: 'Voices of Change'

SUBHEADING: 'Every YES\-J journey is unique\. Every story is powerful\.'

__  TESTIMONIALS — SAMPLE CARDS \(to be filled with real testimonials\)  __

__Field__

Value

Photo

Circular headshot of beneficiary

Name

First name \+ Last initial \(e\.g\., 'Priya M\.'\)

Program

e\.g\., 'Summer Shapes 2023'

Location

e\.g\., 'Krishna District, AP'

Quote

2–3 line personal quote about YES\-J's impact on their life

*💻 DEV: Fetch testimonials from CMS\. Minimum 6 testimonials to start\. Admin can add more via CMS panel\.*

## 5\.8 DIGITAL MEDIA WING SECTION

*💻 DEV: Horizontal strip, light background\. Three content pillars showcased as mini\-cards\.*

HEADING: 'YES\-J Goes Digital'

SUBHEADING: 'Social consciousness\. Youth conversations\. Life skills — delivered where young people already are\.'

__Platform__

Description

Youth Blaze 🔥

Our youth media channel — igniting conversations that matter\. Bold, relevant, unapologetic\. | Link: /media

PEP Pause ⏸️

Bite\-sized life skills and personality content\. Watch one\. Grow a little\. | Link: /media

Social Consciousness 🪞

Videos that hold a mirror to society — challenging, questioning, and calling for change\. | Link: /media

YES\-J Echoes 📰

Our newsletter — stories of impact, program updates, and YES\-J's heartbeat\. | Link: /media\#echoes

## 5\.9 PARTNERS & COLLABORATORS

*💻 DEV: Logo strip / scrolling ticker of partner institutions\. Black & white logos that colorize on hover\.*

HEADING: 'Walking Alongside Us'

SUBHEADING: 'YES\-J partners with government, educational, and civil society institutions to maximize impact\.'

Include logos \(when provided\): Andhra Loyola College, Society of Jesus – Andhra Province, collaborating NGOs, government departments, corporate partners

*💻 DEV: Design as infinite horizontal logo scroll \(CSS animation\)\. Add logos as they are provided\.*

## 5\.10 CALL TO ACTION SECTION \(HOMEPAGE END\)

*💻 DEV: Full\-width section\. Background: gradient from \-\-primary to \-\-secondary\. White text\. Very powerful final CTA before footer\.*

HEADING: 'Ready to Say YES?'

SUBHEADING: 'Whether you want to volunteer, donate, apply for a program, or simply learn more — your YES matters to us\.'

__  CTA — THREE ACTION CARDS  __

__Card__

__Heading__

__CTA Button__

Volunteer

Give Your Time\. Change a Life\.

Join as Volunteer →

Donate

Your Money\. Their Dream\.

Donate Now →

Apply

A Program That Changes You\.

Apply for a Program →

# SECTION 6: ABOUT US PAGE \( /about \)

## 6\.1 Page Hero

*💻 DEV: Standard inner page hero\. Height: 50vh\. Background: program photo with blue overlay\. Breadcrumb: Home > About\.*

MAIN HEADING: 'About YES\-J'

SUBHEADING: 'A Jesuit Ministry\. A Movement\. A YES to every young person\.'

## 6\.2 Our Story

SECTION HEADING: 'Our Story'

The Telugu\-speaking states of Andhra Pradesh and Telangana are home to nearly 85 million people — the vast majority of whom are young\. In rural, semi\-urban, and slum areas, these young people face the harsh realities of poverty, lack of education, unemployment, casteism, gender discrimination, and social inequality\.

In these spaces, we often encounter poverty, dysfunctional families, and social inequality\. Youth drop out of school\. Girls are married young\. Boys are pushed into cheap labour\. The poverty is not self\-incurred — these communities have been pushed to the margins by unjust social structures\.

YES\-J was born from a conviction: that every young person, regardless of their educational, social, religious, or economic background, has the capacity to lead a meaningful and fulfilling life\. Since 2016, we have been striving to be that beacon of light — walking with the last, the lost, and the least\.

## 6\.3 Our Philosophy

*💻 DEV: Design this as a full\-width feature block with blue background and three YES statements prominently displayed\.*

SECTION HEADING: 'Our Philosophy — The Power of YES'

YES\-J is convinced that instilling hope and courage in young people, and creating a support system, will empower them to declare to the world:

YES – I have Dreams\.

YES – I am capable of fulfilling my Dreams\.

YES – I Can and I Will be the Dream I want to be — if only I am given the opportunity\.

This philosophy is not a slogan\. It is the lens through which we design every program, conduct every session, and accompany every young person\.

## 6\.4 Who We Are

__Field__

Content

Full Name

Youth Empowering Service – Jesuits \(YES\-J\)

Type

Ministry of the Andhra Jesuit Province, Society of Jesus

Legal Entity

Part of 'The Loyola College Society, Guntur–Vijayawada' \(non\-profit\)

Headquarters

YES\-J Centre for Excellence, Andhra Loyola College Campus, Vijayawada, AP – 520008

Founded

2016

Target Group

Youth aged 15–25 years across AP and Telangana

States Served

Andhra Pradesh and Telangana

Programs

12 active programs

Lives Touched

50,000\+ since 2016

## 6\.5 Leadership & Team

*💻 DEV: Card grid: 3–4 columns\. Each card: Photo, Name, Designation/Role, Short bio \(2 lines\), optional social links\. Fetch from CMS\.*

SECTION HEADING: 'The People Behind YES'

SUBHEADING: 'Dedicated Jesuits, staff, and volunteers who believe in the power of young people\.'

*💻 DEV: Add team photos and bios here\. Minimum sections: Provincial Superior \(Andhra Jesuit Province\), YES\-J Director, Program Coordinators, Volunteers\.*

## 6\.6 Timeline / Milestones

*💻 DEV: Visual horizontal timeline \(desktop\) or vertical \(mobile\)\. Each milestone = Year \+ Milestone text\.*

SECTION HEADING: 'Our Journey, Year by Year'

__Year__

Milestone

2016

YES\-J officially launched\. 44 events\. 16,450\+ beneficiaries in the first year\.

2017

37 programs conducted\. MAGIC student wing expanded to new colleges\.

2018

18 programs\. MuST vocational training launched formally\.

2019–2022

Navigated COVID\-19\. Pivoted to digital\. 17 events, 7,600 beneficiaries\.

2021

13 programs\. Compassion Connect initiated during pandemic relief\.

2022

18 programs\. 11,500 beneficiaries\. Post\-pandemic recovery and expansion\.

2023

19 programs\. STHRI women empowerment program added\. 10,200 beneficiaries\.

2024

Landmark year: 55 events, 34,700 beneficiaries\. Largest year in YES\-J history\.

2025

22 events so far \(ongoing\)\. 11,900 beneficiaries\. EPC launched\.

2026

Website revamp\. Digital expansion\. New programs planned\.

## 6\.7 Centre for Excellence

SECTION HEADING: 'YES\-J Centre for Excellence'

Our Centre for Excellence at Andhra Loyola College Campus, Vijayawada, is the operational and programmatic hub of YES\-J\. It is a one\-stop solution for all YES\-J programs — a space where young people come to learn, grow, be challenged, and be transformed\.

The Centre provides training halls, residential facilities, computer labs, and counseling spaces\. It is a space that belongs to the youth — open, welcoming, and empowering\.

__\[BUTTON\] Label: "Virtual Tour & Booking →"  |  __Action: /centre\-for\-excellence  |  *Style: Accent*

# SECTION 7: PROGRAMS OVERVIEW PAGE \( /programs \)

## 7\.1 Page Hero

HEADING: '12 Programs\. One Mission\. Infinite Possibilities\.'

SUBHEADING: 'YES\-J reaches young people wherever they are — in classrooms, slums, villages, parishes, and homes\. Every program is free\. Every program is transformative\.'

## 7\.2 Filter Bar

*💻 DEV: A horizontal filter/tag bar below the hero\. Pills that filter the program cards by category\. Default: All\.*

Filter Options \(pills\):

- All Programs
- Education & Skills
- Employment
- Spiritual Formation
- Community Service
- Women Empowerment
- Youth Leadership
- Volunteering

## 7\.3 Program Cards Grid

*💻 DEV: 3\-column grid \(desktop\), 2 \(tablet\), 1 \(mobile\)\. Each card links to dedicated program sub\-page\. Cards are filterable via the filter bar above\. Each card has a top color bar in the program's assigned color\.*

12 full program cards\. All linking to their respective sub\-pages as documented in Sections 8–19\.

## 7\.4 Bottom CTA

HEADING: 'Not Sure Which Program is Right for You?'

SUBHEADING: 'Reach out to us and we will guide you to the best fit\.'

__\[BUTTON\] Label: "Contact Us"  |  __Action: /contact  |  *Style: Primary*

__\[BUTTON\] Label: "WhatsApp Us"  |  __Action: wa\.me/\[number\]  |  *Style: Secondary*

# SECTION 8: PEP — PERSONALITY ENHANCEMENT PROGRAMME \( /programs/pep \)

## 8\.1 Page Hero

BADGE: 'Education & Youth Leadership'

ICON: 🌟

HEADING: 'Personality Enhancement Programme'

TAGLINE: 'Discover Yourself\. Build Your Confidence\. Lead Your World\.'

BREADCRUMB: Home > Programs > PEP

__\[BUTTON\] Label: "Apply for PEP →"  |  __Action: /contact?program=pep  |  *Style: Primary*

__\[BUTTON\] Label: "Download Brochure"  |  __Action: \#  |  *Style: Secondary*

## 8\.2 Program Overview

SECTION HEADING: 'What is PEP?'

Through PEP, YES\-J conducts tailor\-made orientations, courses, seminars, and workshops in the areas of soft skills, life skills, and personality development\. We go into schools, colleges, and parishes to help youth gain the confidence to face the complexities of life with joy, meaning, and purpose\.

PEP is more than a training program — it is a space of self\-discovery\. Thousands of students across Andhra Pradesh and Telangana have taken part in PEP and walked away saying YES to lead\.

## 8\.3 The Problem PEP Solves

- Many young people lack the confidence and skills to navigate societal and psychological complexities
- Limited access to tailored workshops and orientations for rural and semi\-urban youth
- Insufficient opportunities to interact with inspiring and motivational figures
- Poor soft skills limit socialization, adaptability, leadership, and problem\-solving

## 8\.4 What PEP Covers

__Workshop Area__

Topics Covered

Soft Skills

Communication, teamwork, adaptability, conflict resolution

Life Skills

Time management, goal\-setting, stress management, emotional intelligence

Leadership Development

Servant leadership, group dynamics, vision building

Career Guidance

Career planning, interview preparation, self\-presentation

Personal Development

Self\-awareness, values, purpose, identity formation

Social Skills

Relationship building, healthy boundaries, community engagement

Faith Formation

Inner compass, spiritual grounding \(inter\-denominational\)

## 8\.5 Program Formats

- Single\-day seminars \(in schools, colleges, parishes\)
- 2–3 day leadership camps \(residential or day camps\)
- Half\-day workshops \(for specific groups: teachers, parents, youth\)
- Special orientation sessions on request

## 8\.6 Reach & Track Record

Since 2016, YES\-J's PEP has conducted hundreds of sessions across Andhra Pradesh and Telangana\. Schools served include institutions in Vijayawada, Guntur, Vizag, Khammam, Machilipatnam, Eluru, and 40\+ other locations\.

## 8\.7 Who Can Attend

- Students: Class 8 and above, up to postgraduate level
- Teachers and educators \(teacher orientation format\)
- Parish youth groups
- Community organizations seeking youth development sessions
- All genders, religions, and social backgrounds welcome

## 8\.8 How to Invite YES\-J for PEP

Organizations, schools, colleges, and parishes can invite YES\-J to conduct PEP sessions\. Contact us with details of your institution, expected participants, and preferred dates\.

__\[BUTTON\] Label: "Invite YES\-J for a PEP Session"  |  __Action: /contact?program=pep&type=invite  |  *Style: Primary*

# SECTION 9: MAGIC — MEN & WOMEN AIMING AT GREATER INITIATIVES FOR CHANGE \( /programs/magic \)

## 9\.1 Page Hero

BADGE: 'Student Youth Wing'

ICON: ⚡

HEADING: 'MAGIC Youth'

TAGLINE: 'Men and Women Aiming at Greater Initiatives for Change'

SUBHEADING: 'Your campus\. Your community\. Your power to transform them\.'

__\[BUTTON\] Label: "Join MAGIC →"  |  __Action: /contact?program=magic  |  *Style: Primary*

## 9\.2 What is MAGIC?

MAGIC is YES\-J's Student Youth Wing — a formal organization established within educational institutions to provide young people with the opportunity to become individuals of conscience, competence, compassion, and commitment — and agents of change for themselves and their communities\.

MAGIC is not just a club\. It is a movement\. Run by student volunteers, supported by YES\-J staff, MAGIC chapters across campuses are designed to educate, empower, and raise social awareness through the ERIT framework: Experience – Reflection – Involvement – Transformation\.

## 9\.3 The ERIT Framework

*💻 DEV: Display as 4 circular icons or step\-by\-step visual flow on the page\.*

__Step__

Description

E — Experience

Students engage with real\-world realities through exposure visits, community immersion, and social encounters\.

R — Reflection

Structured personal and group reflection on experiences — What did I see? What does it mean? What must change?

I — Involvement

Taking action\. Designing and implementing programs, initiatives, and activities in their campus and community\.

T — Transformation

Long\-term sustainable change in self, campus, community — building individuals of conscience and leaders of tomorrow\.

## 9\.4 What MAGIC Chapters Do

- Organize social awareness campaigns on campus
- Conduct community service initiatives in surrounding areas
- Facilitate leadership and life skills sessions for fellow students
- Create awareness on social issues: caste, gender, environment, poverty
- Mobilize for YES\-J programs like Compassion Connect and Each One Teach Ten
- Represent YES\-J at district and state level youth forums

## 9\.5 How to Start a MAGIC Chapter

1. Institution expresses interest by contacting YES\-J
2. YES\-J conducts an orientation for interested students
3. Core leadership team is formed \(President, Secretary, Treasurer \+ core members\)
4. MOU signed between institution and YES\-J
5. Chapter inauguration and first program conducted
6. Quarterly review and annual MAGIS summit participation

__\[BUTTON\] Label: "Start a MAGIC Chapter at Your Institution"  |  __Action: /contact?program=magic&type=chapter  |  *Style: Accent*

# SECTION 10: MuST — MULTI\-SKILL TRAINING PROGRAMME \( /programs/must \)

## 10\.1 Page Hero

BADGE: 'Vocational Training'

ICON: 🔧

HEADING: 'Multi\-Skill Training Programme \(MuST\)'

TAGLINE: 'Your Hands\. Your Future\. Your Dignity\.'

SUBHEADING: 'Free residential vocational training that converts dropouts into skilled professionals\.'

__\[BUTTON\] Label: "Apply for MuST →"  |  __Action: /contact?program=must  |  *Style: Primary*

## 10\.2 What is MuST?

MuST is YES\-J's flagship vocational training program\. Through MuST, we enable, equip, and enhance the capacity of school dropouts and unorganized youth to take up self\-employment or access stable salaried employment\.

All MuST trainings are residential — participants are housed, fed, and trained at or near YES\-J facilities\. We actively collaborate with government agencies, NGOs, and corporate institutions to deliver recognized certifications\.

The ultimate goal: Converting dropouts into skilled professionals with a decent salary that can support a family\. Restoring dignity\. Rebuilding lives\.

## 10\.3 Trades Offered

*💻 DEV: Display as 5 cards, each with trade icon, name, duration, certification, and outcomes\.*

__Trade__

Details

Tailoring & Garment Making

Duration: 30–45 days residential | Certification: YES\-J \+ Collaborating institution | Outcome: Self\-employment or garment industry placement

Information & Communication Technology \(ICT\)

Duration: 30 days | Covers: MS Office, internet, email, basic troubleshooting | Certification: Recognized certificate | Outcome: Computer operator, data entry, office work

Driving & Basic Mechanics

Duration: Per motor vehicle department norms | Covers: Road safety, traffic rules, vehicle maintenance, basic repairs | Certification: Driving license \+ skill certificate | Outcome: Driver, mechanic apprentice

Industrial Welding

Duration: 45–60 days | Covers: MIG/TIG/Arc welding, blueprint reading, metallurgy, safety | Certification: Industry\-standard welding certificate | Outcome: Factory or fabrication shop employment

Additional Trades \(planned\)

YES\-J is working to expand into electrical work, plumbing, and mobile repair based on demand

## 10\.4 Selection Process

1. Outreach through NGOs, parishes, schools, and community contacts
2. Application submission \(age, socioeconomic background considered\)
3. Selection based on motivation, commitment, and eligibility
4. Residential training commences \(free food, accommodation, and travel\)
5. Certification on successful completion
6. Job referral and placement support through JoY Desk

## 10\.5 Who is Eligible

- Youth aged 15–25 from Andhra Pradesh and Telangana
- School dropouts and out\-of\-school youth
- Youth from economically disadvantaged or marginalized backgrounds
- All genders, religions, and castes welcome
- Priority to youth from rural, slum, and suburban areas

## 10\.6 Overall Outcomes

- Converting dropouts into skilled, dignified professionals
- Stable salary employment that can support a family
- Reduced reliance on daily wage or menial labour
- Pathway to self\-employment and small business
- Breaking the cycle of intergenerational poverty

__\[BUTTON\] Label: "Apply Now for MuST →"  |  __Action: /contact?program=must  |  *Style: Primary*

__\[BUTTON\] Label: "Support MuST — Sponsor a Trainee"  |  __Action: /donate?cause=must  |  *Style: Accent*

# SECTION 11: SUMMER SHAPES \( /programs/summer\-shapes \)

## 11\.1 Page Hero

BADGE: '⚡ Applications Open — Summer 2026'

*💻 DEV: This badge should be HIGHLY VISIBLE with a bright amber/green background if applications are currently open\.*

ICON: ☀️

HEADING: 'Summer Shapes'

TAGLINE: 'Speak English\. Speak Confidence\. Speak Your Future\.'

SUBHEADING: 'A free 30\-day residential program in English Communication and Life Skills for rural and disadvantaged youth\.'

__\[BUTTON\] Label: "Apply for Summer Shapes 2026 →"  |  __Action: /contact?program=summer\-shapes&type=apply  |  *Style: Accent*

__\[BUTTON\] Label: "Download Brochure"  |  __Action: \#  |  *Style: Secondary*

## 11\.2 The Problem Summer Shapes Solves

English is no longer just a language in India\. It is the gateway to employment, higher education, and social mobility\. For youth from marginalized communities, English education is a weapon to break their chains and become leaders of tomorrow\.

Sadly, millions of young people from rural communities have no access to quality English education\. Even when taught, the methodology is often so ineffective that youth cannot form simple sentences\. Poor soft skills further limit their socialization, adaptability, and confidence\.

## 11\.3 What Summer Shapes Offers

__Feature__

Details

Duration

30 days \(full residential program\)

Cost to Participant

FREE — food, accommodation, training all provided

Language Training

Spoken English communication skills — structured, interactive, practical

Soft Skills

Leadership, teamwork, public speaking, time management, goal setting

Life Skills

Self\-confidence, self\-esteem, emotional intelligence, problem\-solving

Method

Experiential learning, group activities, role plays, storytelling, debates

Trainers

Experienced English educators and personality development trainers

Certificate

YES\-J Certificate of Completion

Accommodation

On\-campus residential facility at YES\-J Centre, Vijayawada

## 11\.4 Program Outcomes

- Improved English communication \(spoken and written basics\)
- Significantly increased self\-confidence and self\-esteem
- Enhanced soft skills for employment and higher education
- Expanded social network and peer support
- Exposure to YES\-J's broader programs and opportunities

__*"I came to Summer Shapes not knowing a single full sentence in English\. I left confident enough to give a speech\. YES\-J changed my life\. — Summer Shapes 2023 Participant"*__

## 11\.5 Eligibility & Application

- Youth aged 16–25 from rural, semi\-urban, or slum areas of AP and Telangana
- Should have completed at least Class 8
- Economically disadvantaged background preferred
- Motivated and willing to commit to full 30\-day residential program
- Applications: Through YES\-J website form, WhatsApp, or local parish/NGO referral

__\[BUTTON\] Label: "Apply Now — Summer Shapes 2026"  |  __Action: /contact?program=summer\-shapes  |  *Style: Primary*

# SECTION 12: SCHOLAR SUPPORT PROGRAMME \(SSP\) \( /programs/ssp \)

## 12\.1 Page Hero

BADGE: 'Higher Education'

ICON: 🎓

HEADING: 'Scholar Support Programme'

TAGLINE: 'Brilliant Minds\. Limited Resources\. Unlimited Potential\.'

SUBHEADING: 'YES\-J identifies and funds academically outstanding youth from poor backgrounds to pursue their dreams in higher education\.'

__\[BUTTON\] Label: "Apply for SSP →"  |  __Action: /contact?program=ssp  |  *Style: Primary*

## 12\.2 What is SSP?

The Scholar Support Programme \(SSP\) provides comprehensive support — financial and mentoring — to economically disadvantaged yet academically brilliant students pursuing tertiary \(college/university\) education\. SSP bridges the gap between potential and opportunity\.

## 12\.3 Selection Process

__Stage__

Description

1\. Application

Eligible candidates submit applications \(academic records, family income proof, letter of motivation\)

2\. Written Test

Academic knowledge, critical thinking, and problem\-solving assessment

3\. Shortlisting

Top candidates shortlisted based on test performance

4\. Oral Interview

Communication skills, personal qualities, motivation, and alignment with YES\-J values assessed

5\. Final Selection

Combined score determines scholars\. Information on support package provided\.

6\. Ongoing Mentoring

Regular check\-ins, academic guidance, and pastoral accompaniment

## 12\.4 What SSP Provides

- Financial support for tuition, books, and academic expenses
- Mentoring and academic guidance from YES\-J staff and volunteers
- Life skills and personality development through PEP sessions
- Network of YES\-J scholars for peer support
- Regular follow\-up and pastoral care

## 12\.5 Eligibility

- Students pursuing tertiary/college education in AP or Telangana
- Academically outstanding \(strong academic record required\)
- From economically poor or underprivileged family background
- Motivated, committed, and aligned with YES\-J values

__\[BUTTON\] Label: "Support an SSP Scholar — Donate"  |  __Action: /donate?cause=ssp  |  *Style: Accent*

# SECTION 13: JoY DESK — JOBS FOR YOUTH \( /programs/joy\-desk \)

## 13\.1 Page Hero

BADGE: 'Employment'

ICON: 💼

HEADING: 'JoY Desk — Jobs for Youth'

TAGLINE: 'Your Potential Deserves the Right Opportunity\.'

SUBHEADING: 'YES\-J bridges the gap between talented youth and real employment through guidance, training, and JoY Melas\.'

__\[BUTTON\] Label: "Register for JoY Desk →"  |  __Action: /contact?program=joy\-desk  |  *Style: Primary*

## 13\.2 What is JoY Desk?

Having potential alone is not enough\. The job market is vast but crowded — most struggling youth do not know what opportunities exist or how to access them\. JoY Desk is YES\-J's employment facilitation program that identifies unemployed youth, provides them with training and guidance, and connects them to real job opportunities through referrals, recommendations, and JoY Melas \(job fairs\)\.

## 13\.3 What JoY Desk Does

- Identifies struggling unemployed youth through community outreach
- Conducts job readiness training: resume writing, interview skills, workplace etiquette
- Partners with local businesses, industries, and institutions for job openings
- Provides referrals and personal recommendations for suitable candidates
- Organizes JoY Melas — YES\-J's own employment fairs connecting youth with employers
- Follow\-up support after placement for the first 3 months

## 13\.4 JoY Mela — YES\-J Job Fair

*💻 DEV: Highlight this as a prominent event feature\. Showcase it as a badge/callout card on the page\.*

JoY Mela is YES\-J's annual/bi\-annual youth employment fair\. Employers from multiple sectors are brought together with skilled, trained youth in one place\. Every JoY Mela aims to place as many youth as possible in meaningful, dignified employment\.

To partner as an employer at the next JoY Mela:

__\[BUTTON\] Label: "Register as Employer for JoY Mela →"  |  __Action: /contact?program=joy\-desk&type=employer  |  *Style: Accent*

# SECTION 14: VIP — VOLUNTARY IMMERSION PROGRAMME \( /programs/vip \)

## 14\.1 Page Hero

BADGE: 'Volunteering'

ICON: 🌍

HEADING: 'Voluntary Immersion Programme'

TAGLINE: 'Immerse Yourself\. Serve\. Be Transformed\.'

SUBHEADING: 'Volunteer with YES\-J in villages, slums, and urban margins\. See reality\. Grow in gratitude\. Make a difference\.'

__\[BUTTON\] Label: "Apply as a Volunteer →"  |  __Action: /contact?program=vip  |  *Style: Primary*

## 14\.2 What is VIP?

VIP offers volunteer placement to individuals from local and international communities — from rural villages to bustling metropolises\. Whether you're a student, a professional, or someone seeking a meaningful experience, VIP invites you to step out of your comfort zone, serve those who have less, and cultivate a deep attitude of gratitude\.

## 14\.3 Types of VIP Placements

__Placement Type__

Description

Local Volunteers

Students and professionals from AP/Telangana serving in YES\-J programs part\-time or full\-time

National Volunteers

Indian volunteers from outside AP/Telangana for short or long\-term placements

International Volunteers

Volunteers from abroad seeking cross\-cultural service and immersion experiences

Online/Remote Volunteers

Contributing skills in content creation, design, social media, research, and administration

## 14\.4 Where Volunteers Serve

- YES\-J Centre for Excellence — Vijayawada \(program support\)
- Rural village outreach programs
- Slum community tutoring centers \(EOTT\)
- Compassion Connect relief operations
- Digital media and communications support
- MAGIC campus chapters

__\[BUTTON\] Label: "Volunteer Now →"  |  __Action: /contact?program=vip  |  *Style: Primary*

# SECTION 15: COMPASSION CONNECT \( /programs/compassion\-connect \)

## 15\.1 Page Hero

BADGE: 'Direct Community Care'

ICON: 🤝

HEADING: 'Compassion Connect'

TAGLINE: 'It Does Not Wait to Be Asked\. It Shows Up\.'

SUBHEADING: 'YES\-J's direct response to human suffering — food distribution, destitute rescue, disaster relief, and more\.'

## 15\.2 What is Compassion Connect?

Compassion Connect is YES\-J's direct humanitarian response arm\. While other programs build long\-term capacity, Compassion Connect responds immediately to urgent human need — on the streets, in disaster zones, and in communities left behind\.

It operates on the principle that no one who is suffering should wait\. When we see need, we respond\. When calamity strikes, we show up\. When a destitute person is found on the street, we act\.

## 15\.3 What Compassion Connect Does

__Activity__

Description

Food Distribution

Regular distribution of cooked meals and dry ration kits to destitutes, migrant workers, and families in crisis

Destitute Rescue

Street rescue operations — identifying, rescuing, and rehabilitating destitutes found on streets of Vijayawada and surrounding areas

Disaster Relief

Rapid response during floods, cyclones \(e\.g\., Cyclone Montha\), and other natural disasters

Medical Aid

Emergency medical support and referrals to government hospitals for those in need

Awareness & Advocacy

RTI\-based advocacy to expose gaps in government destitute care systems

## 15\.4 How to Support Compassion Connect

__\[BUTTON\] Label: "Donate to Compassion Connect →"  |  __Action: /donate?cause=compassion\-connect  |  *Style: Accent*

__\[BUTTON\] Label: "Volunteer in Relief Ops →"  |  __Action: /contact?program=vip&area=compassion\-connect  |  *Style: Primary*

# SECTION 16: STHRI — STAND FOR HOLISTIC RESILIENCE & INDEPENDENCE \( /programs/sthri \)

## 16\.1 Page Hero

BADGE: 'Women Empowerment'

ICON: 👩‍🦰

HEADING: 'STHRI'

TAGLINE: 'Stand for Holistic Resilience and Independence'

SUBHEADING: 'Empowering women not just as beneficiaries — but as leaders, decision\-makers, and agents of change\.'

## 16\.2 What is STHRI?

STHRI is YES\-J's dedicated women empowerment program\. It goes beyond basic welfare support to build financial independence, leadership capacity, and social resilience in women\. STHRI recognizes that when women are empowered, families are transformed and communities follow\.

## 16\.3 STHRI Focus Areas

- Financial literacy and income generation skills
- Leadership and self\-advocacy training
- Legal rights awareness \(property rights, domestic violence, workplace rights\)
- Health and hygiene awareness
- Community organizing and collective action
- Linking women to government schemes and entitlements

__\[BUTTON\] Label: "Contact STHRI Program →"  |  __Action: /contact?program=sthri  |  *Style: Primary*

# SECTION 17: O GOD — ORGANISING GOD\-ORIENTED DAYS \( /programs/ogod \)

## 17\.1 Page Hero

BADGE: 'Spiritual Formation'

ICON: ✝️

HEADING: 'O GOD — Organising God\-Oriented Days'

TAGLINE: 'Transformation Begins in the Soul\.'

SUBHEADING: 'Helping young people build a personal relationship with God and an inner compass for life — through Scripture, prayer, meditation, and inter\-religious dialogue\.'

## 17\.2 What is O GOD?

O GOD is YES\-J's spiritual formation program\. It creates spaces for young people to encounter God, reflect on their lives, and strengthen their faith\. Through Scripture study, prayer, meditation, inter\-religious dialogues, and inspiring messages, O GOD helps youth build an inner compass rooted in faith, values, and love\.

## 17\.3 What O GOD Includes

- Scripture study and reflection sessions
- Prayer and meditation experiences
- Inter\-religious dialogue \(open to all faiths\)
- Inspirational talks by spiritual leaders
- Retreat and recollection experiences
- Faith formation days in parishes and institutions

Open to youth of all religions and backgrounds\. YES\-J's spiritual formation is rooted in Christian\-Jesuit tradition but is inclusive and respectful of all faith paths\.

# SECTION 18: MAGIS — YES\-J YUVOTSAVAALU \( /programs/magis \)

## 18\.1 Page Hero

BADGE: 'Youth Festival'

ICON: 🎉

HEADING: 'MAGIS — YES\-J Yuvotsavaalu'

TAGLINE: 'Express\. Experience\. Enrich\.'

SUBHEADING: 'YES\-J's annual youth festival — bringing thousands together to celebrate, compete, reflect, and collectively say YES to a better world\.'

## 18\.2 What is MAGIS?

MAGIS – YES\-J Yuvotsavaalu is YES\-J's annual or biannual Youth Festival\. Thousands of young people from across Andhra Pradesh and Telangana gather to express their talents, experience community solidarity, and enrich their collective vision for a just and vibrant world\.

The name MAGIS \(Latin for 'more'\) reflects the Jesuit call to always seek greater good\. Yuvotsavaalu \(Telugu for Youth Festival\) grounds the celebration in the local culture and language of our people\.

## 18\.3 MAGIS Event Features

- Cultural competitions: drama, music, dance, art, poetry
- Social awareness campaigns and flash mobs
- Inspirational keynote speakers
- Youth declarations and shared vision sessions
- Awards and recognition for outstanding YES\-J youth
- MAGIC chapter showcases
- Open to all youth — free entry

__\[BUTTON\] Label: "Register for MAGIS 2026 →"  |  __Action: /contact?program=magis  |  *Style: Accent*

SECTION: Past MAGIS Highlights — Photo gallery from past events

*💻 DEV: Implement photo gallery with lightbox\. Fetch from CMS/Cloudinary\.*

# SECTION 19: EACH ONE — TEACH TEN \( /programs/eott \)

## 19\.1 Page Hero

BADGE: 'Community Education'

ICON: 📚

HEADING: 'Each One — Teach Ten'

TAGLINE: 'Read\. Lead\. Succeed\. Generation by Generation\.'

SUBHEADING: 'YES\-J's social enterprise — setting up learning centers in slums and rural communities, staffed by student volunteers\.'

## 19\.2 What is Each One Teach Ten?

Each One – Teach Ten is YES\-J's community learning social enterprise\. We set up centers of learning and tutoring in slums, rural areas, and suburban communities — in partnership with local parishes, schools, colleges, and government bodies\.

These centers are run by final\-year undergraduate and postgraduate students who serve as interns/tutors, giving back to society \('Pay It Forward'\) while gaining invaluable teaching experience\. Children in the community learn to read and write\. Communities learn to succeed\. One generation pays it forward to the next\.

## 19\.3 How It Works

__Who__

What They Do

YES\-J

Identifies locations, sets up centers, trains tutors, monitors progress

Partner Institutions

Local parishes, schools, colleges, and government bodies provide space and support

Student Interns/Tutors

Final year UG/PG students volunteer as tutors — given modest remuneration

Community Children

Children in slums/rural areas receive free tutoring in literacy, numeracy, and more

## 19\.4 Outcomes

- Improved literacy and numeracy among underprivileged children
- Increased access to quality education in hard\-to\-reach communities
- Teaching experience for student interns preparing for education careers
- Stronger bonds between campuses and surrounding communities
- A sustainable model for community education powered by student volunteerism

__\[BUTTON\] Label: "Volunteer as a Tutor →"  |  __Action: /contact?program=eott&type=tutor  |  *Style: Primary*

__\[BUTTON\] Label: "Host a Center at Your Parish/School →"  |  __Action: /contact?program=eott&type=host  |  *Style: Secondary*

# SECTION 20: DIGITAL MEDIA WING \( /media \)

## 20\.1 Page Hero

HEADING: 'YES\-J Goes Digital'

SUBHEADING: 'Social consciousness\. Youth conversations\. Life skills\. Delivered where young people already are\.'

## 20\.2 Digital Platforms Overview

__Platform__

Details

Youth Blaze 🔥

YES\-J's youth\-focused media platform\. Covers topics that matter to young people: social issues, career guidance, mental health, relationships, identity, and more\. Bold\. Relevant\. Unapologetic\.

PEP Pause ⏸️

Bite\-sized video/audio content delivering YES\-J's PEP content in short formats\. Watch one PEP Pause\. Grow a little\. Designed for social media \(Reels, Shorts, YouTube\)\.

Social Consciousness Videos 🪞

Long\-form and short\-form social commentary content\. Holds a mirror to society\. Challenges norms, questions injustice, calls for action\. For Facebook, YouTube, Instagram\.

YES\-J Echoes 📰

YES\-J's flagship newsletter and annual print publication\. Stories of impact, program highlights, team features, and youth voices\. Distributed digitally and physically\.

## 20\.3 Media Archive / Gallery

*💻 DEV: Implement as a filterable media gallery\. Tabs: Videos | Photo Gallery | Echoes Issues | Publications\. Fetch from YouTube API \(videos\) and Cloudinary \(photos\)\.*

Tab 1 — Videos: Embedded YouTube playlist

Tab 2 — Photo Gallery: Masonry/grid gallery of program photos with lightbox

Tab 3 — Echoes: PDF issues of YES\-J Echoes newsletter \(available for download\)

Tab 4 — Publications: Annual reports and program brochures

# SECTION 21: IMPACT PAGE \( /impact \)

## 21\.1 Page Hero

HEADING: '9 Years\. 243 Events\. 50,000\+ Lives\. Counting\.'

SUBHEADING: 'Numbers don't tell the full story — but they tell part of it\. Every number represents a real young person whose life was changed\.'

## 21\.2 Year\-Wise Impact Dashboard

*💻 DEV: Display as interactive bar chart OR visual timeline cards\. Fetch from CMS or hardcode initially\.*

__Year__

__Events Conducted__

__Direct Beneficiaries__

2016

44

16,450\+

2017

37

16,450\+

2018

18

8,250\+

2019–2022

17

7,600\+

2021

13

7,500\+

2022

18

11,500\+

2023

19

10,200\+

2024

55 \(landmark year\)

34,700\+

2025

22 \(ongoing\)

11,900\+

TOTAL

243\+

50,000\+ Lives Touched

## 21\.3 Program\-Wise Impact

Display program\-wise stat cards: PEP | MAGIC | MuST | Summer Shapes | SSP | JoY Desk | VIP | CC | STHRI | O GOD | MAGIS | EOTT

*💻 DEV: Each card shows: Program name, Icon, Key stat \(e\.g\., '500\+ trained' or '12 centers set up'\), Link to program page\.*

## 21\.4 Geographic Reach Map

*💻 DEV: Embed an interactive map \(Google Maps API or Leaflet\.js\) showing all districts/cities where YES\-J has conducted programs\. Hoverable pins with event summaries\.*

Districts covered include: Vijayawada, Guntur, Vizag, Machilipatnam, Eluru, Khammam, Karimnagar, Nalgonda, and 40\+ other locations\.

## 21\.5 Stories of Change

*💻 DEV: 3–4 featured story cards\. Each: Photo, Name, Brief impact story \(3–4 lines\), Program tag\. Fetch from CMS\.*

HEADING: 'Meet the YES — Real People, Real Change'

## 21\.6 Annual Reports

HEADING: 'Transparency & Accountability'

Download links for YES\-J Annual Reports \(PDFs from CMS\)

__\[BUTTON\] Label: "Download Annual Report 2024–25 →"  |  __Action: \#  |  *Style: Secondary*

# SECTION 22: GET INVOLVED \( /get\-involved \)

## 22\.1 Page Hero

HEADING: 'Your YES Makes All the Difference'

SUBHEADING: 'There are many ways to walk with YES\-J\. Find the one that fits you\.'

## 22\.2 Four Ways to Get Involved

*💻 DEV: Display as 4 large, visually distinct cards\. Each with icon, heading, description, and CTA button\.*

__Way to Help__

Content

🙋 VOLUNTEER

Give your time and talent\. Whether for a day, a week, or a year — your presence matters\. Programs: VIP, MAGIC, EOTT, Compassion Connect | Button: Apply as Volunteer →

💛 DONATE

Your contribution directly funds a young person's training, scholarship, or relief aid\. Every rupee counts\. | Button: Donate Now →

🤝 PARTNER

Is your institution, company, or organization looking to partner for social impact? Let's co\-create programs\. | Button: Partner with Us →

🎓 INTERN

Are you a student looking for a meaningful internship? Join YES\-J for 1–6 months and grow while giving\. | Button: Apply for Internship →

## 22\.3 Internship Details

__Field__

Details

Duration

1 month to 6 months

Who Can Apply

Students of any discipline — social work, management, communications, education, psychology preferred

What You Do

Support program delivery, content creation, field visits, administrative tasks

What You Gain

Real\-world exposure, mentoring, certificate, reference letter

Stipend

As per YES\-J capacity — confirm at time of application

Apply

Via /contact form with subject: Internship Application

# SECTION 23: DONATE PAGE \( /donate \)

## 23\.1 Page Hero

HEADING: 'Your Money\. Their Dream\.'

SUBHEADING: 'Every rupee you give goes directly to a young person's future\. No dream should die for lack of funding\.'

## 23\.2 Donation Tiers \(suggested amounts\)

*💻 DEV: Display as clickable donation amount cards\. On click, pre\-fill the donation form with that amount\.*

__Amount__

Impact Described

₹500

Pays for one month of study materials for an EOTT student

₹1,000

Supports one week of Summer Shapes residential accommodation

₹2,500

Covers one week of MuST vocational training for one participant

₹5,000

Funds an SSP scholar's one month of education costs

₹10,000

Supports one full Summer Shapes or MuST training module

₹25,000\+

Full sponsorship of one beneficiary through a complete program

Custom Amount

Enter any amount you wish to contribute

## 23\.3 Cause\-Specific Donation

*💻 DEV: Dropdown or radio\-button selector for specific program/cause to donate to\.*

Options: General Fund | PEP | MuST | Summer Shapes | SSP | Compassion Connect | STHRI | Each One Teach Ten | Other

## 23\.4 Donation Form Fields

- Full Name \(required\)
- Email Address \(required\)
- Phone Number \(required\)
- Amount \(required — preselected from tier or custom\)
- Cause / Program \(dropdown\)
- PAN Card Number \(for 80G tax exemption — if applicable\)
- Message / Dedication \(optional\)

__\[BUTTON\] Label: "Proceed to Secure Payment →"  |  __Action: Payment gateway \(Razorpay/PayU\)  |  *Style: Accent*

## 23\.5 Trust Indicators

- Legal entity: The Loyola College Society, Guntur\-Vijayawada — a registered non\-profit
- Donations eligible for 80G tax exemption \(confirm with administration\)
- Secure payment gateway \(SSL encrypted\)
- 100% transparency — annual reports published
- Every donor receives an acknowledgment and impact update

*💻 DEV: Display trust badges: 80G logo, SSL badge, NGO registration number, Razorpay/PayU badge*

# SECTION 24: CONTACT US \( /contact \)

## 24\.1 Page Hero

HEADING: 'Let's Talk\. We're Listening\.'

SUBHEADING: 'Whether you want to apply, volunteer, partner, or just learn more — reach out\. We respond to every message\.'

## 24\.2 Contact Information Block

__Contact Type__

Details

Address

YES\-J Centre for Excellence, Andhra Loyola College Campus, Vijayawada, AP – 520008

Phone / WhatsApp

\[INSERT NUMBER — mandatory\]

Email

\[INSERT EMAIL — mandatory\]

Office Hours

Monday–Saturday: 9:00 AM – 6:00 PM \(IST\)

Google Maps

Embed interactive Google Map of YES\-J Centre location

## 24\.3 Contact Form

*💻 DEV: Display form in 2\-column layout \(desktop\), single\-column \(mobile\)\. Form submits via Formspree or EmailJS\. Show success/error states\.*

- Full Name \(required\)
- Email Address \(required\)
- Phone Number \(required\)
- Subject / Reason for Contact \(dropdown: General Inquiry | Program Application | Volunteering | Donation | Partnership | Media Inquiry | Other\)
- Program of Interest \(dropdown of all 12 programs — visible only when Program Application or Volunteering is selected\)
- Message \(required — textarea\)
- How did you hear about YES\-J? \(optional dropdown\)

__\[BUTTON\] Label: "Send Message →"  |  __Action: Form submission  |  *Style: Primary*

*💻 DEV: After submission: Show confirmation message 'Thank you\! We will respond within 2 business days\.' Send auto\-email confirmation to user\.*

## 24\.4 Social Media Links

Facebook: \[Link\]

Instagram: \[Link\]

YouTube: \[Link\]

LinkedIn: \[Link\]

WhatsApp: \[Direct chat link\]

# SECTION 25: NOTIFICATIONS & ANNOUNCEMENTS SYSTEM

*💻 DEV: This section is CRITICAL\. YES\-J runs time\-sensitive programs \(Summer Shapes applications, JoY Melas, MAGIS events, etc\.\)\. The notifications system must be easy to manage from the admin panel and highly visible to users\.*

## 25\.1 Notification Components

__Component__

Behavior & Specs

Announcement Bar

Sticky top bar above nav\. Rotates through 1–5 announcements \(set in CMS\)\. Dismissible per session\. Background: \-\-accent \(\#F59E0B\)\. Marquee scrolling text on mobile\.

Homepage Floating Badge

Small floating badge bottom\-right\. Shows latest urgent announcement\. Expandable on click\. Includes CTA button\. Dismiss with X\.

Program Page Banners

On individual program pages, if that program has an active announcement \(e\.g\., applications open\), show a prominent full\-width colored banner at top of program page content\.

Toast Notifications

Pop\-up in top\-right \(desktop\) or bottom\-center \(mobile\) for time\-sensitive flash announcements\. Auto\-dismiss after 8 seconds\. Clickable\.

Dedicated /announcements page

Full list of all current and past announcements, categorized by program and type\.

## 25\.2 Admin Panel for Notifications

*💻 DEV: Must be manageable without code\. If using WordPress, use a custom ACF \(Advanced Custom Fields\) block or custom post type\. If using custom CMS, build a simple admin form\.*

Admin fields for each announcement:

- Title / Short Label \(shown in announcement bar\)
- Full Description \(shown in expanded view or announcements page\)
- Program / Category \(dropdown of 12 programs \+ General\)
- Link / CTA URL
- CTA Button Label \(e\.g\., 'Apply Now', 'Register', 'Learn More'\)
- Type: Urgent \(red\) | Important \(amber\) | Info \(blue\) | Success \(green\)
- Start Date \(when to start showing\)
- End Date \(auto\-hide after this date\)
- Show On: Announcement Bar | Homepage Badge | Program Page | All

## 25\.3 Sample Announcements to Pre\-load

- Summer Shapes 2026 — Applications Now Open\! | Apply Now → /programs/summer\-shapes | Type: Urgent
- YES\-J English Proficiency Course \(EPC\) Launching Soon in Vijayawada | Register Interest → /contact | Type: Important
- JoY Mela 2026 — Employers can register now | Partner With Us → /contact?program=joy\-desk&type=employer | Type: Info
- MAGIS 2026 — YES\-J Youth Festival | Coming Soon | Know More → /programs/magis | Type: Info
- Compassion Connect — Volunteers Needed for Weekend Relief Operations | Join → /contact?program=vip | Type: Urgent

# SECTION 26: MOBILE RESPONSIVENESS REQUIREMENTS

*💻 DEV: MANDATORY\. Over 80% of YES\-J's target audience accesses the internet via mobile phones\. Every page must be pixel\-perfect on mobile\.*

## 26\.1 Breakpoints

__Breakpoint__

Specs

Mobile \(default\)

< 640px — single column layouts, stacked nav, smaller typography

Tablet \(sm/md\)

640px–1024px — 2\-column grids, compact nav

Desktop \(lg\)

> 1024px — full desktop layout

Large Desktop \(xl\)

> 1280px — max\-width containers, wider padding

## 26\.2 Mobile\-Specific Requirements

- Navigation: Hamburger menu → full\-screen slide panel
- Hero headings: Reduce from 4\.5rem to 2\.5rem on mobile
- Stats strip: 2 columns instead of 6 \(scroll horizontally or wrap\)
- Program cards: 1 column on mobile
- Footer: Single column stacked
- Announcement bar text: Scrolling marquee
- Forms: Full\-width single column, large tap targets \(min 48px height\)
- Images: All responsive \(width: 100%, object\-fit: cover\)
- Buttons: Full\-width on mobile if in CTA sections
- Touch targets: Minimum 48x48px for all interactive elements
- Fonts: Never below 14px on mobile

# SECTION 27: SEO & PERFORMANCE REQUIREMENTS

## 27\.1 Meta Tags for Key Pages

__Page__

Meta Title | Meta Description

Homepage

YES\-J — Youth Empowering Service Jesuits | We Say YES to Every Young Dream | Andhra Pradesh & Telangana Jesuit Youth Ministry

About

About YES\-J | Jesuit Youth Ministry Since 2016 | Andhra Pradesh

Programs

All YES\-J Programs | Free Youth Programs AP & Telangana

PEP

Personality Enhancement Programme \(PEP\) | YES\-J | Free Youth Workshops

MuST

Multi\-Skill Training \(MuST\) | Free Vocational Training for Youth | YES\-J

Summer Shapes

Summer Shapes | Free 30\-Day English Program for Rural Youth | YES\-J

Donate

Donate to YES\-J | Support Underprivileged Youth in Andhra Pradesh

Contact

Contact YES\-J | Vijayawada, Andhra Pradesh

## 27\.2 Performance Requirements

- PageSpeed score: Target 90\+ on Google PageSpeed \(mobile and desktop\)
- Core Web Vitals: LCP < 2\.5s, CLS < 0\.1, FID < 100ms
- Image optimization: WebP format, lazy loading, proper srcset
- Font loading: preconnect to Google Fonts, font\-display: swap
- Minimize JS bundle: code splitting, tree shaking
- CDN for assets: Cloudinary or similar
- No unused CSS/JS in production

## 27\.3 Structured Data \(Schema\.org\)

- Organization schema: YES\-J with contact, location, social profiles
- Event schema: For MAGIS, JoY Mela, Summer Shapes events
- WebSite schema: with SearchAction for site search

# SECTION 28: CENTRE FOR EXCELLENCE SUB\-PAGE \( /centre\-for\-excellence \)

*💻 DEV: This is a standalone page inspired by the old centre\-for\-excellence\.html but completely redesigned\. It doubles as a Virtual Tour \+ Facility Booking portal\.*

## 28\.1 Page Hero

BADGE: 'Andhra Loyola College Campus, Vijayawada'

HEADING: 'YES\-J Centre for Excellence'

TAGLINE: 'A Space Where Potential Becomes Purpose\.'

SUBHEADING: 'Our hub for all YES\-J programs — a one\-stop facility for training, learning, and transformation in the heart of Vijayawada\.'

__\[BUTTON\] Label: "Book the Centre"  |  __Action: \#booking  |  *Style: Accent*

__\[BUTTON\] Label: "Take a Virtual Tour"  |  __Action: \#virtual\-tour  |  *Style: Secondary*

## 28\.2 About the Centre

The YES\-J Centre for Excellence at Andhra Loyola College Campus, Vijayawada, is the operational and programmatic heartbeat of our organization\. It is legally part of The Loyola College Society, Guntur\-Vijayawada, and belongs to the ministry of the Andhra Jesuit Province\.

Here, young people come to learn English, develop vocational skills, receive scholarships, grow in faith, and find their YES\. It is open, welcoming, and entirely dedicated to youth aged 15–25\.

## 28\.3 Facilities Available

*💻 DEV: Use card grid with facility photo, name, capacity, and features\.*

__Facility__

Details

Seminar Hall 1

Capacity: 90–105 participants | Features: AV equipment, projector, AC, whiteboard | Suitable for: Seminars, workshops, PEP sessions

Seminar Hall 2

Capacity: 90–105 participants | Features: AV equipment, projector, AC, whiteboard | Suitable for: Seminars, workshops, PEP sessions

Computer Lab

Capacity: 25 computers | Features: High\-speed internet, printers, UPS | Suitable for: ICT training, EOTT sessions

Residential Dormitories \- 6

Capacity: 10 residents per room | Features: Beds, storage, bathrooms 

Dining Hall 

Capacity: 60 persons | Features: Dining tables 

Counseling Room

Capacity: 1\-on\-1 or small group \(up to 6\) | Features: Private, comfortable | For: SSP scholars, individual counseling

Chapel / Prayer Space

Capacity: 30 persons | For: O GOD sessions, prayer, meditation, inter\-religious dialogue

Outdoor Courtyard

Open space for activities, team building, cultural events | Capacity: 800\+

Rooms \(28\)

Airconditioned | WiFi Provided | No Food Facility

## 28\.4 Booking Form

*💻 DEV: Anchor ID: \#booking\. Implement as a multi\-step form or single\-page form\.*

Form heading: 'Book the Centre for Excellence'

- Name of Organization / Individual
- Contact Person Name
- Contact Email
- Contact Phone
- Purpose of Booking \(dropdown: Workshop/Seminar | Training | Retreat | Youth Event | Meeting | Other\)
- Expected Number of Participants
- Facilities Required \(checkboxes: Training Hall | Computer Lab | Dormitory | Dining | Chapel | Courtyard\)
- Date Required \(date picker — From / To\)
- Time Required \(time picker — Start / End\)
- Additional Requirements \(textarea\)
- Are you a YES\-J partner organization? \(Yes/No\)

__\[BUTTON\] Label: "Submit Booking Request →"  |  __Action: Form submission to admin email  |  *Style: Primary*

*💻 DEV: After submission: Auto\-email to admin with all details\. Confirmation email to requester\. Admin reviews and responds within 48 hours\.*

## 28\.5 Virtual Tour

*💻 DEV: Anchor ID: \#virtual\-tour\. If 360\-degree photos are available, use Pannellum\.js or similar\. Alternatively, use a photo gallery with room categories as tabs\.*

Tabs: Overview | Training Hall | Computer Lab | Dormitory | Dining | Chapel | Campus

Each tab: 3–5 high\-quality photos of the facility area with descriptive captions\.

# SECTION 29: DEVELOPER FINAL CHECKLIST

*💻 DEV: Go through this checklist before handing over the website for review\.*

## 29\.1 Pages Completed

- Homepage \(/\)
- About \(/about\)
- Programs Overview \(/programs\)
- PEP \(/programs/pep\)
- MAGIC \(/programs/magic\)
- MuST \(/programs/must\)
- Summer Shapes \(/programs/summer\-shapes\)
- SSP \(/programs/ssp\)
- JoY Desk \(/programs/joy\-desk\)
- VIP \(/programs/vip\)
- Compassion Connect \(/programs/compassion\-connect\)
- STHRI \(/programs/sthri\)
- O GOD \(/programs/ogod\)
- MAGIS / Yuvotsavaalu \(/programs/magis\)
- Each One Teach Ten \(/programs/eott\)
- Digital Media \(/media\)
- Impact \(/impact\)
- Get Involved \(/get\-involved\)
- Donate \(/donate\)
- Contact \(/contact\)
- Centre for Excellence \(/centre\-for\-excellence\)
- Announcements \(/announcements\)

## 29\.2 Global Components

- Announcement bar \(dismissible, CMS\-managed, with ticker\)
- Navigation \(desktop \+ mobile hamburger\) with mega menu for Programs
- Global footer \(5\-column, newsletter signup strip, bottom bar\)
- Toast notification system
- Program page banner system
- AOS animations initialized globally
- Counter animation for stats
- Swiper\.js for testimonial carousel
- Lightbox for photo gallery
- Lazy loading for all images

## 29\.3 Functional Testing

- All forms submit correctly and send emails
- All links \(internal and external\) work
- Announcement bar dismisses and re\-shows correctly
- Mobile navigation opens/closes smoothly
- Mega menu works on hover \(desktop\) and tap \(mobile\)
- Google Map loads correctly on Contact page
- Virtual tour gallery works on all screen sizes
- Booking form submits and sends notification email to admin
- Donation amount pre\-selection works
- Filter bar on Programs page filters cards correctly
- Video embed loads and plays correctly
- PDF downloads work \(Annual Reports, Echoes\)

## 29\.4 Content Population Pending \(Admin to provide\)

- Logo file \(SVG or PNG, white version \+ colored version\)
- All program photos \(minimum 5 per program\)
- Team photos and bios \(for About > Leadership section\)
- Testimonials \(minimum 6, with photos and quotes\)
- Phone number\(s\) and email address\(es\)
- Social media profile URLs \(Facebook, Instagram, YouTube, LinkedIn\)
- YouTube video URL for homepage video embed
- Partner logos for Partners section
- YES\-J Echoes PDF issues
- Annual Report PDFs
- Payment gateway credentials \(Razorpay/PayU\)
- Google Maps API key
- 80G Certificate copy \(for Donate page trust section\)
- Exact legal/registration details for footer
- Domain name confirmed

__END OF DOCUMENT__

*YES\-J Website Revamp — Developer Content & Design Specification*

__*"Your dreams are valid\. Your potential is real\. You will not walk alone\. — YES\-J"*__

__Youth Empowering Service – Jesuits \(YES\-J\)__

Andhra Loyola College Campus, Vijayawada, Andhra Pradesh – 520008

