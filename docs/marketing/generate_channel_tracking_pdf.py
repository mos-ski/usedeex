from fpdf import FPDF
from datetime import datetime

class PDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        
        self.set_fill_color(15, 23, 42)
        self.rect(0, 0, 210, 25, 'F')
        
        self.set_font('Helvetica', 'B', 16)
        self.set_text_color(255, 255, 255)
        self.set_xy(10, 8)
        self.cell(0, 10, 'DeeX', new_x='LMARGIN', new_y='TOP')
        
        self.set_font('Helvetica', '', 10)
        self.set_xy(10, 14)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, 'Channel Tracking Plan', new_x='LMARGIN', new_y='TOP')
        
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
        self.cell(0, 10, 'Confidential - DeeX Marketing', align='C')

    def cover_page(self):
        self.set_fill_color(15, 23, 42)
        self.rect(0, 0, 210, 297, 'F')
        
        self.set_fill_color(59, 130, 246)
        self.ellipse(140, 20, 80, 80, 'F')
        
        self.set_fill_color(139, 92, 246)
        self.ellipse(-20, 200, 100, 100, 'F')
        
        self.set_y(80)
        self.set_font('Helvetica', 'B', 36)
        self.set_text_color(255, 255, 255)
        self.cell(0, 20, 'Channel Tracking Plan', align='C', new_x='LMARGIN', new_y='NEXT')
        
        self.set_font('Helvetica', '', 16)
        self.set_text_color(148, 163, 184)
        self.cell(0, 12, 'UTM Links, Invite Codes & Referral Tracking', align='C', new_x='LMARGIN', new_y='NEXT')
        
        self.set_y(140)
        self.set_font('Helvetica', 'B', 28)
        self.set_text_color(59, 130, 246)
        self.cell(0, 15, 'DeeX', align='C', new_x='LMARGIN', new_y='NEXT')
        
        self.set_font('Helvetica', '', 12)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, "Nigeria's All-in-One Digital Finance Platform", align='C', new_x='LMARGIN', new_y='NEXT')
        
        self.set_y(190)
        self.set_fill_color(30, 41, 59)
        self.rect(35, 190, 140, 60, 'F')
        self.set_draw_color(59, 130, 246)
        self.set_line_width(0.5)
        self.rect(35, 190, 140, 60)
        
        self.set_xy(45, 200)
        self.set_font('Helvetica', 'B', 11)
        self.set_text_color(255, 255, 255)
        self.cell(0, 8, 'Document Overview', new_x='LMARGIN', new_y='NEXT')
        
        details = [
            ('Website:', 'deexoptions.com'),
            ('Target Market:', 'Nigeria'),
            ('Tracking Method:', 'UTM + Invite Codes'),
            ('Date:', 'July 2026')
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
        self.set_font('Helvetica', 'B', 16)
        self.set_text_color(30, 41, 59)
        self.cell(0, 12, f'{icon} {title}', new_x='LMARGIN', new_y='NEXT')
        
        self.set_fill_color(59, 130, 246)
        self.rect(10, self.get_y(), 40, 2, 'F')
        self.ln(6)

    def body_text(self, text, is_bold=False):
        self.set_font('Helvetica', 'B' if is_bold else '', 10)
        self.set_text_color(51, 65, 85)
        self.multi_cell(0, 5, text)
        self.ln(3)

    def table_row(self, cells, widths, is_header=False, aligns=None):
        if aligns is None:
            aligns = ['L'] * len(cells)
        
        if is_header:
            self.set_fill_color(59, 130, 246)
            self.set_text_color(255, 255, 255)
            self.set_font('Helvetica', 'B', 8)
        else:
            self.set_fill_color(248, 250, 252)
            self.set_text_color(51, 65, 85)
            self.set_font('Helvetica', '', 8)
        
        max_height = 7
        for i, cell in enumerate(cells):
            char_width = 2.0 if is_header else 1.8
            lines = max(1, len(cell) // int(widths[i] / char_width) + 1)
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
        self.set_font('Helvetica', 'B', 9)
        self.cell(0, 7, f'  {title}', new_x='LMARGIN', new_y='NEXT', fill=True)
        
        self.set_fill_color(239, 246, 255)
        self.set_text_color(51, 65, 85)
        self.set_font('Helvetica', '', 8)
        self.multi_cell(0, 4, content, align='L', fill=True)
        self.ln(4)

    def bullet_point(self, text):
        self.set_font('Helvetica', '', 9)
        self.set_text_color(51, 65, 85)
        self.cell(5, 5, '', new_x='RIGHT', new_y='TOP')
        self.set_text_color(59, 130, 246)
        self.cell(5, 5, '>', new_x='RIGHT', new_y='TOP')
        self.set_text_color(51, 65, 85)
        self.cell(0, 5, text, new_x='LMARGIN', new_y='NEXT')

    def channel_header(self, number, name):
        self.set_fill_color(30, 41, 59)
        self.set_text_color(255, 255, 255)
        self.set_font('Helvetica', 'B', 11)
        self.cell(0, 8, f'  {number}. {name}', new_x='LMARGIN', new_y='NEXT', fill=True)
        self.ln(3)


pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=20)
pdf.add_page()
pdf.cover_page()

# Overview Table
pdf.chapter_title('Channels Overview')
headers = ['#', 'Channel', 'Tracking', 'Owner']
widths = [10, 60, 60, 60]
data = [
    ['1', 'DIVINE-Led', 'Invite Code', 'DIVINE'],
    ['2', 'Digital Marketing (Ads)', 'UTM + Invite Code', 'Marketing'],
    ['3', 'SEO', 'UTM + Invite Code', 'Marketing'],
    ['4', 'Organic Signups', 'Default / None', '-'],
    ['5', 'Social Media (Bio + CTAs)', 'UTM + Invite Code', 'Social Media'],
    ['6', 'UGC (User Generated Content)', 'Invite Code', 'Creator/Influencer'],
    ['7', 'Motion Videos', 'Invite Code', 'Video Team'],
    ['8', 'Special Campaigns (Monthly)', 'UTM + Invite Code', 'Marketing'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(5)

# Channel 1
pdf.add_page()
pdf.channel_header('1', 'DIVINE (WhatsApp Status / Contacts)')
pdf.body_text('Tracking: Invite code only (no UTM needed - WhatsApp does not support UTMs natively)')
pdf.info_box('Setup', 'DIVINE gets one master code or individual codes per contact. Each code tracks signups, deposits, and trades.')
pdf.ln(2)

headers = ['Field', 'Value']
widths = [50, 140]
data = [
    ['Code Format', 'DIVINE_XX'],
    ['Example', 'DIVINE_01'],
    ['Link', 'deexoptions.com/download?invite=DIVINE_01'],
    ['Tracking', 'Which contacts signed up under DIVINE code'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(5)

# Channel 2
pdf.add_page()
pdf.channel_header('2', 'Digital Marketing (All Ad Platforms)')
pdf.body_text('Platforms: TikTok, Meta (Facebook + Instagram), Google Ads, Twitter/X, Snapchat')
pdf.body_text('Tracking: UTM parameters + invite code per campaign', True)

pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(30, 41, 59)
pdf.cell(0, 7, 'UTM Structure', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

pdf.set_fill_color(248, 250, 252)
pdf.set_text_color(51, 65, 85)
pdf.set_font('Courier', '', 8)
pdf.multi_cell(0, 4, 'utm_source   = platform (tiktok, meta, google, twitter, snapchat)\nutm_medium   = ad\ncampaign = campaign_name (crypto_traders, gift_cards, etc.)\nutm_content  = creative_id (optional)')
pdf.ln(4)

headers = ['Campaign', 'Platform', 'Link']
widths = [40, 30, 120]
data = [
    ['Crypto Traders', 'TikTok', 'deexoptions.com/download?utm_source=tiktok&utm_medium=ad&utm_campaign=crypto_traders'],
    ['Gift Cards', 'Meta', 'deexoptions.com/download?utm_source=meta&utm_medium=ad&utm_campaign=gift_cards'],
    ['Bill Payments', 'Google', 'deexoptions.com/download?utm_source=google&utm_medium=ad&utm_campaign=bill_payments'],
    ['Virtual Cards', 'Twitter', 'deexoptions.com/download?utm_source=twitter&utm_medium=ad&utm_campaign=virtual_cards'],
    ['General', 'Snapchat', 'deexoptions.com/download?utm_source=snapchat&utm_medium=ad&utm_campaign=general'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(5)

pdf.info_box('Optional Invite Codes for Ads', 'If you want to tie invite codes to specific ad sets, use format: ADS_PLATFORM_XX (e.g., ADS_TIKTOK_01). Append &invite=ADS_TIKTOK_01 to the link.')

# Channel 3
pdf.add_page()
pdf.channel_header('3', 'SEO Search')
pdf.body_text('Tracking: UTM on CTA links in blog/content')

pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(30, 41, 59)
pdf.cell(0, 7, 'UTM Structure', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

pdf.set_fill_color(248, 250, 252)
pdf.set_text_color(51, 65, 85)
pdf.set_font('Courier', '', 8)
pdf.multi_cell(0, 4, 'utm_source   = google (or bing, etc.)\nutm_medium   = organic\ncampaign = article_slug')
pdf.ln(4)

headers = ['Content', 'Link']
widths = [60, 130]
data = [
    ['How to Sell Bitcoin', 'deexoptions.com/download?utm_source=google&utm_medium=organic&utm_campaign=sell_bitcoin'],
    ['Best Gift Card Rates', 'deexoptions.com/download?utm_source=google&utm_medium=organic&utm_campaign=gift_card_rates'],
    ['Pay PHCN Bill Online', 'deexoptions.com/download?utm_source=google&utm_medium=organic&utm_campaign=pay_electricity'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(5)

# Channel 4
pdf.channel_header('4', 'Organic Signups')
pdf.body_text('Tracking: None / Default')
pdf.info_box('Definition', 'Direct app store search, word of mouth without code. No tracking needed unless you want a default code like ORGANIC for analytics.')
pdf.ln(5)

# Channel 5
pdf.add_page()
pdf.channel_header('5', 'Social Media (Bio + CTAs)')
pdf.body_text('Platforms: TikTok, Facebook, X (Twitter), Snapchat, Instagram')

headers = ['Platform', 'Bio Link']
widths = [40, 150]
data = [
    ['TikTok', 'deexoptions.com/download?utm_source=tiktok&utm_medium=bio'],
    ['Facebook', 'deexoptions.com/download?utm_source=facebook&utm_medium=bio'],
    ['X (Twitter)', 'deexoptions.com/download?utm_source=twitter&utm_medium=bio'],
    ['Snapchat', 'deexoptions.com/download?utm_source=snapchat&utm_medium=bio'],
    ['Instagram', 'deexoptions.com/download?utm_source=instagram&utm_medium=bio'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(5)

pdf.info_box('Post CTA Links', 'For individual posts, add utm_campaign parameter:\ndexoptions.com/download?utm_source=instagram&utm_medium=post&utm_campaign=july_giveaway')
pdf.ln(3)

# Channel 6
pdf.channel_header('6', 'UGC (User Generated Content)')
pdf.body_text('Tracking: Invite code per creator')

headers = ['Field', 'Value']
widths = [50, 140]
data = [
    ['Code Format', 'UGC_CREATORNAME'],
    ['Example', 'UGC_JOHNNY'],
    ['Link', 'deexoptions.com/download?invite=UGC_JOHNNY'],
    ['CTA', 'App Store / Play Store (direct install with invite code)'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(5)

# Channel 7
pdf.add_page()
pdf.channel_header('7', 'Motion Videos')
pdf.body_text('Tracking: Invite code per video')

headers = ['Field', 'Value']
widths = [50, 140]
data = [
    ['Code Format', 'VID_VIDEOTITLE'],
    ['Example', 'VID_CRYPTO_EXPLAINER'],
    ['Link', 'deexoptions.com/download?invite=VID_CRYPTO_EXPLAINER'],
    ['CTA', 'App Store / Play Store or Landing Page'],
    ['Platforms', 'TikTok, YouTube, Instagram Reels, Facebook'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(5)

# Channel 8
pdf.channel_header('8', 'Special Campaigns (Monthly)')
pdf.body_text('Tracking: UTM + unique invite code per campaign')

headers = ['Field', 'Value']
widths = [50, 140]
data = [
    ['Frequency', 'Once a month'],
    ['Code Format', 'PROMO_MONYY'],
    ['Example', 'PROMO_JUL26, PROMO_AUG26'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(5)

pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(30, 41, 59)
pdf.cell(0, 7, 'Campaign Links', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

headers = ['Month', 'Campaign', 'Link']
widths = [30, 40, 120]
data = [
    ['Jul 2026', 'July Promo', 'deexoptions.com/download?utm_source=campaign&utm_campaign=july2026&invite=PROMO_JUL26'],
    ['Aug 2026', 'August Promo', 'deexoptions.com/download?utm_source=campaign&utm_campaign=august2026&invite=PROMO_AUG26'],
    ['Sep 2026', 'September Promo', 'deexoptions.com/download?utm_source=campaign&utm_campaign=september2026&invite=PROMO_SEP26'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)

# Master Reference
pdf.add_page()
pdf.chapter_title('Master UTM Reference')

headers = ['Parameter', 'Values']
widths = [40, 150]
data = [
    ['utm_source', 'tiktok, meta, google, twitter, snapchat, instagram, facebook, campaign'],
    ['utm_medium', 'ad, bio, post, organic, status, video'],
    ['utm_campaign', 'crypto_traders, gift_cards, bill_payments, virtual_cards, july2026, sell_bitcoin'],
    ['utm_content', 'creative ID or post identifier (optional)'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(8)

pdf.chapter_title('Master Invite Code Reference')

headers = ['Channel', 'Format', 'Example']
widths = [50, 60, 80]
data = [
    ['DIVINE', 'DIVINE_XX', 'DIVINE_01'],
    ['Ads', 'ADS_PLATFORM_XX', 'ADS_TIKTOK_01'],
    ['SEO', 'SEO_BLOG_XX', 'SEO_BLOG_01'],
    ['Social Media', 'PLATFORM_HANDLE', 'IG_DEEXOFFICIAL'],
    ['UGC', 'UGC_CREATORNAME', 'UGC_JOHNNY'],
    ['Motion Videos', 'VID_VIDEOTITLE', 'VID_CRYPTO_EXPLAINER'],
    ['Campaigns', 'PROMO_MONYY', 'PROMO_JUL26'],
]
pdf.table_row(headers, widths, is_header=True)
for row in data:
    pdf.table_row(row, widths)
pdf.ln(8)

# Checklist
pdf.chapter_title('Implementation Checklist')

checklist_items = [
    'Set up UTM builder template (spreadsheet or tool)',
    'Generate invite codes for each channel (use existing admin panel)',
    'Set up landing page redirects on deexoptions.com',
    'Configure analytics dashboard to capture UTM + invite code on signup',
    'Map events: Install > Signup > KYC > First Trade',
    'Create tracking spreadsheet for monthly campaign codes',
    'Brief DIVINE on how to share his invite code',
    'Set up social media bio links with UTMs',
    'Create UGC creator code assignment process',
    'Document motion video invite code workflow',
]

for item in checklist_items:
    pdf.set_font('Helvetica', '', 9)
    pdf.set_text_color(51, 65, 85)
    pdf.cell(5, 5, '', new_x='RIGHT', new_y='TOP')
    pdf.set_text_color(34, 197, 94)
    pdf.cell(5, 5, '[ ]', new_x='RIGHT', new_y='TOP')
    pdf.set_text_color(51, 65, 85)
    pdf.cell(0, 5, item, new_x='LMARGIN', new_y='NEXT')

# End page
pdf.add_page()
pdf.set_y(100)
pdf.set_font('Helvetica', 'B', 24)
pdf.set_text_color(30, 41, 59)
pdf.cell(0, 20, 'Ready to Track', align='C', new_x='LMARGIN', new_y='NEXT')

pdf.set_font('Helvetica', '', 12)
pdf.set_text_color(100, 116, 139)
pdf.cell(0, 10, 'Questions? Contact the DeeX Marketing Team', align='C', new_x='LMARGIN', new_y='NEXT')

pdf.set_y(150)
pdf.set_font('Helvetica', '', 10)
pdf.set_text_color(148, 163, 184)
pdf.cell(0, 10, f'Generated: {datetime.now().strftime("%B %d, %Y")}', align='C', new_x='LMARGIN', new_y='NEXT')

output_path = '/Users/theoneglobal/Documents/Projects/DeeXoptions/docs/marketing/channel_tracking_plan.pdf'
pdf.output(output_path)
print(f"PDF generated successfully at: {output_path}")
