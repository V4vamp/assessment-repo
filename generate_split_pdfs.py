import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#2C3E50"))
        self.drawString(54, 755, "LOCALBUKA ENGINEERING INTERN ASSESSMENT")
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#7F8C8D"))
        self.drawString(54, 36, "Confidential - LocalBuka Recruiting")
        self.drawRightString(558, 36, f"Page {self._pageNumber} of {page_count}")
        
        self.setStrokeColor(colors.HexColor("#BDC3C7"))
        self.setLineWidth(0.5)
        self.line(54, 48, 558, 48)
        self.line(54, 747, 558, 747)
        self.restoreState()

def build_split_pdf(filename, track_title, description, phases, questions, rubric_rows):
    doc = SimpleDocTemplate(filename, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle('Title', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=colors.HexColor("#E67E22"), spaceAfter=5)
    subtitle_style = ParagraphStyle('Sub', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=colors.HexColor("#2C3E50"), spaceAfter=15)
    h1_style = ParagraphStyle('H1', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=13, leading=17, textColor=colors.HexColor("#2C3E50"), spaceBefore=10, spaceAfter=6, keepWithNext=True)
    h2_style = ParagraphStyle('H2', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=colors.HexColor("#E67E22"), spaceBefore=8, spaceAfter=4, keepWithNext=True)
    body_style = ParagraphStyle('Body', parent=styles['BodyText'], fontName='Helvetica', fontSize=9, leading=13, textColor=colors.HexColor("#34495E"), spaceAfter=5)
    bullet_style = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=12.5, textColor=colors.HexColor("#34495E"), leftIndent=15, firstLineIndent=-10, spaceAfter=3)
    code_style = ParagraphStyle('Code', parent=styles['Normal'], fontName='Courier', fontSize=7.5, leading=10, textColor=colors.HexColor("#2C3E50"), backColor=colors.HexColor("#F8F9F9"), borderColor=colors.HexColor("#BDC3C7"), borderWidth=0.5, borderPadding=4, spaceBefore=4, spaceAfter=4)
    meta_label = ParagraphStyle('ML', fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=colors.HexColor("#2C3E50"))
    meta_val = ParagraphStyle('MV', fontName='Helvetica', fontSize=9, leading=12, textColor=colors.HexColor("#34495E"))

    story = []
    story.append(Paragraph("LocalBuka Intern Case Study", title_style))
    story.append(Paragraph(f"Track: {track_title}", subtitle_style))
    
    info_data = [
        [Paragraph("Time Limit:", meta_label), Paragraph("3-5 Days (Take-Home)", meta_val)],
        [Paragraph("Starter Repo:", meta_label), Paragraph("https://github.com/TobiAkinkuotu/assessment-repo", meta_val)],
        [Paragraph("Submission:", meta_label), Paragraph("Email your public fork link & 2-min Loom to <b>hellohr@localbuka.com</b>", meta_val)]
    ]
    t_info = Table(info_data, colWidths=[90, 414])
    t_info.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor("#ECF0F1")),
    ]))
    story.append(t_info)
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("Context Overview", h1_style))
    story.append(Paragraph(description, body_style))
    story.append(Spacer(1, 5))

    story.append(Paragraph("Step-by-Step Engineering Flow", h1_style))
    for phase_num, phase_title, phase_steps in phases:
        story.append(Paragraph(f"Phase {phase_num}: {phase_title}", h2_style))
        for step in phase_steps:
            if step.startswith("•"):
                story.append(Paragraph(step, bullet_style))
            elif step.startswith("```"):
                story.append(Paragraph(step.replace("```json", "").replace("```typescript", "").replace("```sql", "").replace("```", "").strip(), code_style))
            else:
                story.append(Paragraph(step, body_style))
    
    story.append(PageBreak())
    story.append(Paragraph("Technical Assessment Questions", h1_style))
    for q_title, q_body in questions:
        story.append(Paragraph(q_title, h2_style))
        story.append(Paragraph(q_body, body_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("Grading & Evaluation Rubric", h1_style))
    story.append(Paragraph("Submissions are evaluated out of 100 points based on functional completeness and architecture:", body_style))
    
    rubric_rows.insert(0, [Paragraph("<b>Criteria</b>", meta_label), Paragraph("<b>Weight</b>", meta_label), Paragraph("<b>Description</b>", meta_label)])
    t_rubric = Table(rubric_rows, colWidths=[130, 60, 314])
    t_rubric.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#ECF0F1")),
        ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor("#BDC3C7")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#ECF0F1")),
    ]))
    story.append(t_rubric)
    
    doc.build(story, canvasmaker=NumberedCanvas)

# ==================== DATA DEFINITIONS ====================

# --- BACKEND TRACK ---
be_desc = (
    "In this backend track, you will build a clean, type-safe API matching LocalBuka's core restaurant discovery "
    "and points ecosystem. You will implement standard controllers, entities, services, and database migrations."
)
be_phases = [
    (1, "Database & Seeding Setup", [
        "Initialize your database schema using PostgreSQL. Utilize the provided mock_data.json to seed tables. Do not alter raw naming shapes. Design tables for:",
        "• <b>restaurants</b>: id (string), name (string), cuisine (string), price_range (int), latitude (double), longitude (double), address (text), tags (text array), avg_rating (decimal), is_open (int, 0/1).",
        "• <b>users</b>: id (string), name (string), email (string), referred_by (string, nullable reference).",
        "• <b>reviews</b>: id (string), restaurant_id (foreign key), user_id (foreign key), rating (int, 1-5), comment (text), tags (text array).",
        "• <b>points_ledger</b>: id (string), user_id (foreign key), action (string), restaurant_id (nullable foreign key), points (int)."
    ]),
    (2, "Core API Endpoints Implementation", [
        "Configure controllers and request handlers for the following specific paths:",
        "• <b>GET /restaurants</b>: Supports search/filters. Query parameters: <code>latitude</code> (float), <code>longitude</code> (float), <code>cuisine</code> (string), <code>priceRange</code> (number), <code>minRating</code> (float). Must return JSON payload sorted closest to user coordinates if location parameters are provided.",
        "• <b>GET /restaurants/:id</b>: Returns single profile object plus embedded <code>reviews</code> child relation list.",
        "• <b>POST /restaurants/:id/reviews</b>: Add review. Request body: <code>{ userId: string, rating: number, comment: string, tags: string[] }</code>. Validate rating input boundaries. Enforce a database/service block prohibiting users from leaving duplicate reviews."
    ]),
    (3, "Points Module & Business Logic Rules", [
        "Create logic handlers for transaction checks:",
        "• <b>POST /points/earn</b>: Awards points based on action. Request payload: <code>{ userId: string, action: 'check-in' | 'review' | 'referral', restaurantId?: string }</code>. Restrict check-in earnings to 1 check-in per user per restaurant per calendar day.",
        "• <b>GET /points/balance/:userId</b>: Return current aggregate sum of points along with ledger record logs of all transactions."
    ])
]
be_questions = [
    ("Q1. API Payload Parser & Types validation",
     "Write a custom TypeScript parser function <code>parseRestaurant(raw: unknown): Restaurant</code>. It should transform and cast raw incoming payload properties from snake_case strings/floats to typed values (camelCase, numbers). Detail how to hook this validation into NestJS using class-validator DTOs."),
    ("Q2. Race Condition Prevention",
     "Suppose a user runs a concurrent loop request calling points redemptions simultaneously. Explain one database-level lock strategy (e.g. SELECT FOR UPDATE or optimistic version checks) to guarantee safety from double redemptions.")
]
be_rubric = [
    [Paragraph("API Endpoint Functionality", ParagraphStyle('R1')), Paragraph("35 pts", ParagraphStyle('R2')), Paragraph("Correct routes mapping, search query filtering logic, and correct HTTP response codes.", ParagraphStyle('R3'))],
    [Paragraph("Business Logic Constraints", ParagraphStyle('R1')), Paragraph("25 pts", ParagraphStyle('R2')), Paragraph("Strictly blocks duplicate reviews and duplicate daily check-in points updates.", ParagraphStyle('R3'))],
    [Paragraph("Database & Geolocation Math", ParagraphStyle('R1')), Paragraph("20 pts", ParagraphStyle('R2')), Paragraph("Correct Postgres schema setup and Haversine formula calculation for coordinates.", ParagraphStyle('R3'))],
    [Paragraph("TypeScript Quality & DTOs", ParagraphStyle('R1')), Paragraph("20 pts", ParagraphStyle('R2')), Paragraph("Rigorous type casting, DTO validation usage, and absence of raw 'any' types.", ParagraphStyle('R3'))]
]

# --- FRONTEND TRACK ---
fe_desc = (
    "In this frontend track, you will build a clean React web application with TypeScript, implementing discovery search dashboard and "
    "optimistic state updates matching LocalBuka's branding aesthetic."
)
fe_phases = [
    (1, "Layout Structure & Design System", [
        "Initialize your styling architecture using Vanilla CSS or TailwindCSS. Construct a layout consisting of a Navigation Header and search filters. Avoid default browser elements. Focus on responsive padding and margins for layout container."
    ]),
    (2, "Restaurant Discovery Feed & Cards", [
        "Implement a list display of restaurant profiles. Integrate dynamic card elements showing name, cuisine, rating stars, and tags.",
        "• Render custom skeleton UI loading cards when fetching state is active.",
        "• Handle image load errors cleanly using custom fallback source images.",
        "• Integrate search/filtering components by matching user text input locally (or via mock service queries)."
    ]),
    (3, "Optimistic State Management & Vouchers", [
        "Construct interactive state handlers for UI events:",
        "• <b>Save to Favorites Toggle</b>: When clicked, update the UI color icon instantly. Send mock/real API network request. On success, retain state; on network failure, rollback UI state immediately and alert the user.",
        "• <b>Voucher Ledger Panel</b>: Create a separate view or sidebar ledger listing recent transactions and current balance points."
    ])
]
fe_questions = [
    ("Q1. Rollback Strategy & Component State",
     "Provide a clear React component code snippet demonstrating your implementation of the Favorite toggle. Walk through how you utilize the rollback logic in your catch block when mock api requests reject."),
    ("Q2. Virtualization & Large Lists Rendering",
     "If the restaurant feed is expanded to render 200+ list cards on a mobile browser, describe how you would use rendering optimizations (like list virtualization/windowing) to maintain 60FPS scrolling.")
]
fe_rubric = [
    [Paragraph("UI Completeness & Aesthetics", ParagraphStyle('R1')), Paragraph("35 pts", ParagraphStyle('R2')), Paragraph("Clean interface layout, responsive styling, brand identity, and intuitive feedback.", ParagraphStyle('R3'))],
    [Paragraph("Optimistic State Handlers", ParagraphStyle('R1')), Paragraph("25 pts", ParagraphStyle('R2')), Paragraph("Implements instantaneous toggling and robust state recovery on request errors.", ParagraphStyle('R3'))],
    [Paragraph("Skeleton Loaders & Fallbacks", ParagraphStyle('R1')), Paragraph("20 pts", ParagraphStyle('R2')), Paragraph("Polished visual transition states and solid handling of missing or broken assets.", ParagraphStyle('R3'))],
    [Paragraph("TypeScript & Reusability", ParagraphStyle('R1')), Paragraph("20 pts", ParagraphStyle('R2')), Paragraph("Strict props interfaces, functional component breakdown, and clean folder structures.", ParagraphStyle('R3'))]
]

if __name__ == "__main__":
    build_split_pdf("/Users/mac/Documents/assessment-repo/LocalBuka_Backend_Intern_Assessment.pdf", "Backend Engineering", be_desc, be_phases, be_questions, be_rubric)
    build_split_pdf("/Users/mac/Documents/assessment-repo/LocalBuka_Frontend_Intern_Assessment.pdf", "Frontend Engineering", fe_desc, fe_phases, fe_questions, fe_rubric)
    print("Regenerated split step-by-step PDFs successfully.")
