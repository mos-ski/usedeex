from fpdf import FPDF
from datetime import datetime

class PDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        
        self.set_fill_color(30, 41, 59)
        self.rect(0, 0, 210, 25, 'F')
        
        self.set_font('Helvetica', 'B', 16)
        self.set_text_color(255, 255, 255)
        self.set_xy(10, 8)
        self.cell(0, 10, 'DeeX', new_x='LMARGIN', new_y='TOP')
        
        self.set_font('Helvetica', '', 10)
        self.set_xy(10, 14)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, 'TikTok Ads Strategy', new_x='LMARGIN', new_y='TOP')
        
        self.set_xy(0, 8)
        self.set_text_color(148, 163, 184)
        self.cell(210, 10, f'Page {self.page_no() - 1}', align='R', new_x='RIGHT', new_y='TOP')
        
        self.ln(20)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-15)
        self.set_font('Helvetica', '', 8)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, 'Confidential - DeeX Marketing Strategy', align='C')

    def cover_page(self):
        self.set_fill_color(15, 23, 42)
        self.rect(0, 0, 210, 297, 'F')
        
        self.set_fill_color(59, 130, 246)
        self.ellipse(140, 20, 80, 80, 'F')
        
        self.set_fill_color(139, 92, 246)
        self.ellipse(-20, 200, 100, 100, 'F')
        
        self.set_y(80)
        self.set_font('Helvetica', 'B', 42)
        self.set_text_color(255, 255, 255)
        self.cell(0, 20, 'TikTok Ads Strategy', align='C', new_x='LMARGIN', new_y='NEXT')
        
        self.set_font('Helvetica', '', 18)
        self.set_text_color(148, 163, 184)
        self.cell(0, 15, 'App Installs & User Acquisition Campaign', align='C', new_x='LMARGIN', new_y='NEXT')
        
        self.set_y(140)
        self.set_font('Helvetica', 'B', 28)
        self.set_text_color(59, 130, 246)
        self.cell(0, 15, 'DeeX', align='C', new_x='LMARGIN', new_y='NEXT')
        
        self.set_font('Helvetica', '', 12)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, 'Nigeria\'s All-in-One Digital Finance Platform', align='C', new_x='LMARGIN', new_y='NEXT')
        
        self.set_y(190)
        self.set_fill_color(30, 41, 59)
        self.rect(35, 190, 140, 60, 'F')
        self.set_draw_color(59, 130, 246)
        self.set_line_width(0.5)
        self.rect(35, 190, 140, 60)
        
        self.set_xy(45, 200)
        self.set_font('Helvetica', 'B', 11)
        self.set_text_color(255, 255, 255)
        self.cell(0, 8, 'Campaign Overview', new_x='LMARGIN', new_y='NEXT')
        
        details = [
            ('Objective:', 'App Installs + Signups'),
            ('Target Market:', 'Nigeria (Ages 18-45)'),
            ('Primary Platforms:', 'Android & iOS'),
            ('Date:', 'April 2026')
        ]
        
        for label, value in details:
            self.set_x(45)
            self.set_font('Helvetica', 'B', 9)
            self.set_text_color(59, 130, 246)
            self.cell(40, 7, label, new_x='RIGHT', new_y='TOP')
            self.set_font('Helvetica', '', 9)
            self.set_text_color(203, 213, 225)
            self.cell(0, 7, value, new_x='LMARGIN', new_y='NEXT')
        
        self.add_page()

    def chapter_title(self, title, icon=''):
        self.set_font('Helvetica', 'B', 18)
        self.set_text_color(30, 41, 59)
        self.cell(0, 12, f'{icon} {title}', new_x='LMARGIN', new_y='NEXT')
        
        self.set_fill_color(59, 130, 246)
        self.rect(10, self.get_y(), 40, 2, 'F')
        self.ln(8)

    def body_text(self, text, is_bold=False):
        self.set_font('Helvetica', 'B' if is_bold else '', 10)
        self.set_text_color(51, 65, 85)
        self.multi_cell(0, 6, text)
        self.ln(3)

    def table_row(self, cells, widths, is_header=False, aligns=None):
        if aligns is None:
            aligns = ['L'] * len(cells)
        
        if is_header:
            self.set_fill_color(59, 130, 246)
            self.set_text_color(255, 255, 255)
            self.set_font('Helvetica', 'B', 9)
        else:
            self.set_fill_color(248, 250, 252)
            self.set_text_color(51, 65, 85)
            self.set_font('Helvetica', '', 9)
        
        max_height = 6
        for i, cell in enumerate(cells):
            lines = len(cell) // int(widths[i] // 2.5) + 1
            max_height = max(max_height, lines * 5)
        
        start_y = self.get_y()
        
        for i, (cell, width, align) in enumerate(zip(cells, widths, aligns)):
            x = sum(widths[:i]) + 10
            self.set_xy(x, start_y)
            if is_header:
                self.set_fill_color(59, 130, 246)
                self.cell(width, max_height, '', new_x='RIGHT', new_y='TOP', fill=True)
                self.set_xy(x, start_y)
                self.set_text_color(255, 255, 255)
            else:
                self.set_fill_color(248, 250, 252) if i % 2 == 0 else self.set_fill_color(255, 255, 255)
                self.cell(width, max_height, '', new_x='RIGHT', new_y='TOP', fill=True)
                self.set_xy(x, start_y)
                self.set_text_color(51, 65, 85)
            
            self.cell(width, max_height, cell, align=align, new_x='RIGHT', new_y='TOP')
        
        self.ln(max_height)

    def info_box(self, title, content, color=(59, 130, 246)):
        self.set_fill_color(color[0], color[1], color[2])
        self.set_text_color(255, 255, 255)
        self.set_font('Helvetica', 'B', 10)
        self.cell(0, 8, f'  {title}', new_x='LMARGIN', new_y='NEXT', fill=True)
        
        self.set_fill_color(239, 246, 255)
        self.set_text_color(51, 65, 85)
        self.set_font('Helvetica', '', 9)
        self.multi_cell(0, 5, content, align='L', fill=True)
        self.ln(5)

    def bullet_point(self, text):
        self.set_font('Helvetica', '', 10)
        self.set_text_color(51, 65, 85)
        self.cell(5, 6, '', new_x='RIGHT', new_y='TOP')
        self.set_text_color(59, 130, 246)
        self.cell(5, 6, '*', new_x='RIGHT', new_y='TOP')
        self.set_text_color(51, 65, 85)
        self.cell(0, 6, text, new_x='LMARGIN', new_y='NEXT')

    def check_item(self, text):
        self.set_font('Helvetica', '', 10)
        self.set_text_color(51, 65, 85)
        self.cell(5, 6, '', new_x='RIGHT', new_y='TOP')
        self.set_text_color(34, 197, 94)
        self.cell(5, 6, 'Y', new_x='RIGHT', new_y='TOP')
        self.set_text_color(51, 65, 85)
        self.cell(0, 6, text, new_x='LMARGIN', new_y='NEXT')

pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=20)
pdf.add_page()
pdf.cover_page()

pdf.chapter_title('Executive Summary')
pdf.body_text('DeeX is launching a targeted TikTok advertising campaign to drive app installs and user signups in Nigeria. This strategy leverages TikTok\'s massive Nigerian user base with creative, mobile-first content that resonates with our target demographic.')
pdf.info_box('Campaign Goal', 'Acquire 10,000+ new app installs within the first month, with a target Cost Per Install (CPI) of less than N200 and a signup conversion rate above 30%.')
pdf.ln(5)

pdf.chapter_title('1. Campaign Setup')
headers = ['Setting', 'Recommendation']
data = [
    ['Campaign Objective', 'App Promotion > App Install'],
    ['Buying Type', 'Auction (lowest cost)'],
    ['Daily Budget', 'N100,000 - N300,000'],
    ['Bid Strategy', 'Lowest Cost with Cap'],
    ['Optimization Event', 'App Install (Primary)'],
]

pdf.table_row(headers, [50, 140], is_header=True)
for row in data:
    pdf.table_row(row, [50, 140])
pdf.ln(5)

pdf.chapter_title('2. Targeting Strategy')
pdf.body_text('Our primary audience consists of digitally-savvy Nigerians aged 18-45 who are actively engaged with fintech, crypto, and mobile payment solutions.', True)

pdf.set_font('Helvetica', 'B', 11)
pdf.cell(0, 8, 'Demographics', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

targeting_data = [
    ['Location', 'Nigeria (All states, prioritize Lagos, Abuja, PH, Kano)'],
    ['Age Range', '18 - 45 years'],
    ['Gender', 'All'],
    ['Device', 'Android (Primary), iOS'],
]

for label, value in targeting_data:
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(35, 6, label, new_x='RIGHT', new_y='TOP')
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(0, 6, value, new_x='LMARGIN', new_y='NEXT')

pdf.ln(5)
pdf.set_font('Helvetica', 'B', 11)
pdf.cell(0, 8, 'Interest Targeting', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

interests = ['Cryptocurrency', 'Bitcoin', 'Investing', 'Gift Cards', 'Online Shopping', 
             'Mobile Banking', 'Sports Betting', 'Fintech Apps', 'E-commerce']

for interest in interests:
    pdf.bullet_point(interest)

pdf.add_page()

pdf.chapter_title('3. Ad Group Structure')
pdf.body_text('We will create 4 distinct ad groups, each targeting a specific use case and value proposition:', True)
pdf.ln(3)

ad_groups = [
    ('Crypto Traders', 'Beat bank rates', 'Sell your Bitcoin at the best Naira rate'),
    ('Gift Card Sellers', 'Instant cash', 'Turn unused gift cards to Naira in 2 minutes'),
    ('Bill Payments', 'No more delays', 'Pay PHCN, buy airtime, fund betting - all in one app'),
    ('Virtual Cards', 'Shop globally', 'Get a USD virtual Visa card - no domiciliary needed'),
]

for name, angle, hook in ad_groups:
    pdf.set_fill_color(59, 130, 246)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Helvetica', 'B', 11)
    pdf.cell(0, 8, f'  {name}', new_x='LMARGIN', new_y='NEXT', fill=True)
    
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(51, 65, 85)
    pdf.cell(25, 6, 'Angle:', new_x='RIGHT', new_y='TOP')
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(0, 6, angle, new_x='LMARGIN', new_y='NEXT')
    
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(25, 6, 'Hook:', new_x='RIGHT', new_y='TOP')
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(0, 6, hook, new_x='LMARGIN', new_y='NEXT')
    pdf.ln(4)

pdf.add_page()
pdf.chapter_title('4. Creative Strategy')
pdf.body_text('TikTok requires native, authentic content. Our creatives will follow proven formats that resonate with Nigerian users.', True)

pdf.info_box('The 3-Second Hook Rule', 'Your first 3 seconds determine whether users keep watching. Start with bold text overlays, unexpected statements, or relatable pain points.')

pdf.set_font('Helvetica', 'B', 11)
pdf.cell(0, 8, 'High-Performing Hooks', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

hooks = [
    '"Stop selling your crypto to scammers!"',
    '"I just got N50,000 for my Apple gift card instantly"',
    '"This app pays your Nepa bill in 10 seconds"',
    '"How I made N20,000 sharing my referral link"',
]

for hook in hooks:
    pdf.bullet_point(hook)

pdf.ln(5)
pdf.set_font('Helvetica', 'B', 11)
pdf.cell(0, 8, 'Content Formats', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

content_types = [
    'UGC-Style Testimonials: Nigerian creators showing real app usage',
    'Before/After: Contrast old methods vs DeeX experience',
    'Speed Demos: Timed challenges (e.g., pay electricity under 30 sec)',
    'Referral Showcases: Real users sharing earnings',
    'Trending Audio: Nigerian sounds + finance meme formats',
]

for content in content_types:
    pdf.bullet_point(content)

pdf.add_page()
pdf.chapter_title('5. Ad Formats')

headers = ['Format', 'Best For', 'Expected Performance']
data = [
    ['Spark Ads', 'Boosting organic creator content', 'High trust, best for conversions'],
    ['In-Feed Ads', 'Primary conversion driver', 'Scale and volume'],
    ['Collection Ads', 'Showcasing multiple features', 'Feature discovery'],
    ['Playable Ads', 'Interactive app demo', 'Engagement & install quality'],
]

pdf.table_row(headers, [35, 55, 100], is_header=True)
for row in data:
    pdf.table_row(row, [35, 55, 100])

pdf.ln(8)
pdf.info_box('Recommended Approach', 'Start with Spark Ads featuring authentic Nigerian creators to build trust and social proof. Scale winning organic content before testing polished In-Feed ads.')

pdf.add_page()
pdf.chapter_title('6. Tracking & Attribution')
pdf.body_text('Accurate tracking is essential for optimizing campaigns and measuring true ROI.', True)

pdf.set_font('Helvetica', 'B', 11)
pdf.cell(0, 8, 'TikTok App Events SDK', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

pdf.body_text('Install the TikTok SDK in both Android and iOS apps to track user actions post-install.')

pdf.ln(3)
pdf.set_font('Helvetica', 'B', 11)
pdf.cell(0, 8, 'Event Mapping', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

event_headers = ['Event Name', 'Description', 'Priority']
event_data = [
    ['App Install', 'User installs DeeX app', 'High'],
    ['App Launch', 'User opens the app', 'Medium'],
    ['Registration', 'User completes signup', 'Primary KPI'],
    ['Complete KYC', 'User finishes KYC verification', 'High'],
    ['First Trade', 'User makes first crypto trade', 'Primary KPI'],
    ['Purchase', 'Any bill payment or trade', 'Track'],
]

pdf.table_row(event_headers, [45, 95, 50], is_header=True)
for row in event_data:
    pdf.table_row(row, [45, 95, 50])

pdf.ln(5)
pdf.info_box('Deep Linking', 'Configure deferred deep links to send users directly to specific onboarding flows (e.g., crypto trading screen, referral bonus page) based on the ad they clicked.')

pdf.add_page()
pdf.chapter_title('7. Landing Experience')
pdf.body_text('The post-click experience significantly impacts conversion rates.', True)

pdf.set_font('Helvetica', 'B', 12)
pdf.set_text_color(59, 130, 246)
pdf.cell(0, 10, 'Option A: Pre-Landing Page (Recommended)', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

pdf.set_font('Helvetica', '', 10)
pdf.set_text_color(51, 65, 85)
pdf.multi_cell(0, 6, 'Create a mobile-optimized landing page that educates users before sending them to app stores.')
pdf.ln(3)

landing_elements = [
    'Headline: "Nigeria\'s All-in-One Crypto & Payment App"',
    'Social Proof: "Join 2,800+ Nigerians trading on DeeX"',
    'Promo Offer: "Get 100 DeeXPoints (N1,000) when you sign up"',
    'Clear CTAs: Dual buttons for Play Store & App Store',
    'Trust Badges: Security certifications, user count',
]

for element in landing_elements:
    pdf.bullet_point(element)

pdf.ln(8)
pdf.set_font('Helvetica', 'B', 12)
pdf.set_text_color(139, 92, 246)
pdf.cell(0, 10, 'Option B: Direct App Install', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

pdf.set_font('Helvetica', '', 10)
pdf.set_text_color(51, 65, 85)
pdf.multi_cell(0, 6, 'Send users directly to app stores. Optimize your store listings with screenshots showing crypto rates, gift card rates, bill payment UI, and rewards dashboard.')

pdf.add_page()
pdf.chapter_title('8. Budget Allocation')
pdf.body_text('Phase-based budgeting allows for testing, learning, and scaling what works.', True)

pdf.ln(3)

budget_headers = ['Phase', 'Duration', 'Budget', 'Focus']
budget_data = [
    ['Testing', 'Week 1-2', 'N200K - N500K', 'Test 4-6 creative variations'],
    ['Scaling', 'Week 3-4', 'N500K - N1M', 'Scale 2-3 winning ads'],
    ['Retention', 'Ongoing', 'N300K/week', 'Retargeting funnel optimization'],
]

pdf.table_row(budget_headers, [35, 35, 50, 70], is_header=True)
for row in budget_data:
    pdf.table_row(row, [35, 35, 50, 70])

pdf.ln(8)
pdf.info_box('Budget Tip', 'Reserve 20% of your budget for retargeting campaigns targeting users who installed but haven\'t signed up or completed KYC.')

pdf.chapter_title('9. Key Performance Metrics')

headers = ['Metric', 'Target', 'Tracking Method']
metrics_data = [
    ['Install Rate', '> 2%', 'TikTok Ads Manager'],
    ['Cost Per Install (CPI)', '< N200', 'TikTok + App Analytics'],
    ['Signup Rate', '> 30%', 'App Events SDK'],
    ['Cost Per Signup', '< N600', 'Calculated from CPI'],
    ['KYC Completion', '> 20%', 'App Events SDK'],
    ['First Trade Rate', '> 10%', 'App Events SDK'],
]

pdf.table_row(headers, [55, 35, 100], is_header=True)
for row in metrics_data:
    pdf.table_row(row, [55, 35, 100])

pdf.add_page()
pdf.chapter_title('10. Compliance & Trust')
pdf.body_text('As a fintech company, building trust through transparency is crucial.', True)

pdf.info_box('Required Disclaimers', 'All ad creatives must include appropriate disclaimers about crypto volatility, KYC requirements, and fee transparency. Avoid guarantees of returns.')

pdf.ln(5)
pdf.set_font('Helvetica', 'B', 11)
pdf.cell(0, 8, 'Trust Signals to Include', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

trust_signals = [
    '"Licensed by CBN" (if applicable)',
    '"Your BVN is secure - encrypted & verified"',
    'Security badges in ad visuals',
    '"3-tier KYC for your protection"',
    'Customer support availability (WhatsApp, Email)',
]

for signal in trust_signals:
    pdf.bullet_point(signal)

pdf.add_page()
pdf.chapter_title('11. Sample Ad Script')
pdf.ln(3)

pdf.set_fill_color(248, 250, 252)
pdf.rect(10, pdf.get_y(), 190, 140, 'F')

pdf.set_xy(15, pdf.get_y() + 5)
pdf.set_font('Helvetica', 'B', 11)
pdf.set_text_color(59, 130, 246)
pdf.cell(0, 8, 'Hook:', new_x='LMARGIN', new_y='NEXT')

pdf.set_x(15)
pdf.set_font('Helvetica', 'I', 10)
pdf.set_text_color(51, 65, 85)
pdf.cell(0, 6, '"POV: You finally found a legit app to sell your Bitcoin in Nigeria"', new_x='LMARGIN', new_y='NEXT')

pdf.set_x(15)
pdf.set_font('Helvetica', 'B', 11)
pdf.set_text_color(59, 130, 246)
pdf.cell(0, 10, 'Script:', new_x='LMARGIN', new_y='NEXT')

script_lines = [
    ('0-3s', 'Text overlay: "No more WhatsApp traders"'),
    ('3-8s', 'Screen recording: Open app > Sell BTC > Get N rate'),
    ('8-15s', '"I sold $500 BTC and got N750,000 in 5 minutes"'),
    ('15-20s', '"Plus gift cards, bill payments, virtual dollar cards"'),
    ('CTA', '"Download DeeX now - link in bio"'),
]

for timestamp, action in script_lines:
    pdf.set_x(15)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(139, 92, 246)
    pdf.cell(20, 6, timestamp, new_x='RIGHT', new_y='TOP')
    pdf.set_font('Helvetica', '', 9)
    pdf.set_text_color(51, 65, 85)
    pdf.cell(0, 6, action, new_x='LMARGIN', new_y='NEXT')

pdf.ln(10)

pdf.chapter_title('Launch Checklist')

checklist_items = [
    'Set up TikTok Business Account',
    'Install TikTok SDK in Android app',
    'Install TikTok SDK in iOS app',
    'Configure app events (Install, Signup, KYC, First Trade)',
    'Create 4-6 video creatives for testing',
    'Set up 4 ad groups with different angles',
    'Build landing page OR optimize app store listings',
    'Set daily budget and bidding strategy',
    'Configure retargeting audiences',
    'Set up tracking dashboard (TikTok + Analytics)',
    'Prepare compliance disclaimers',
    'Test deep links across devices',
]

for item in checklist_items:
    pdf.check_item(item)

pdf.add_page()
pdf.set_y(100)
pdf.set_font('Helvetica', 'B', 24)
pdf.set_text_color(30, 41, 59)
pdf.cell(0, 20, 'Ready to Launch', align='C', new_x='LMARGIN', new_y='NEXT')

pdf.set_font('Helvetica', '', 12)
pdf.set_text_color(100, 116, 139)
pdf.cell(0, 10, 'Questions? Contact the DeeX Marketing Team', align='C', new_x='LMARGIN', new_y='NEXT')

pdf.set_y(150)
pdf.set_font('Helvetica', '', 10)
pdf.set_text_color(148, 163, 184)
pdf.cell(0, 10, f'Generated: {datetime.now().strftime("%B %d, %Y")}', align='C', new_x='LMARGIN', new_y='NEXT')

pdf.output('/Users/theoneglobal/Documents/Projects/DeeXoptions/docs/marketing/tiktok_ads_strategy.pdf')
print("PDF generated successfully!")
