import { useMemo, useState } from "react"
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Code2,
  Database,
  Download,
  Eye,
  FileCheck2,
  FileClock,
  FileSpreadsheet,
  FileText,
  Filter,
  Fingerprint,
  GraduationCap,
  History,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  MoreHorizontal,
  PanelLeftClose,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UploadCloud,
  UserCheck,
  UserCog,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react"

type Page = "dashboard" | "institution" | "upload" | "anomaly" | "records" | "profile" | "verify" | "certificate" | "consent" | "reports" | "admin" | "api" | "design" | "login"

type IconType = React.ComponentType<{
  size?: number
  strokeWidth?: number
  className?: string
}>

const navItems: { page: Page; label: string; icon: IconType }[] = [
  { page: "dashboard", label: "Overview", icon: LayoutDashboard },
  { page: "institution", label: "Institutions", icon: Building2 },
  { page: "records", label: "Student Records", icon: Users },
  { page: "upload", label: "Data Upload", icon: UploadCloud },
  { page: "verify", label: "APAAR Verification", icon: ShieldCheck },
  { page: "anomaly", label: "Anomaly Center", icon: AlertTriangle },
  { page: "reports", label: "Reports & Analytics", icon: BarChart3 },
  { page: "consent", label: "Consent Management", icon: ClipboardCheck },
  { page: "api", label: "API Integration", icon: Code2 },
  { page: "admin", label: "Audit Logs", icon: History },
  { page: "design", label: "Settings", icon: Settings },
]

const records = [
  {
    name: "Aarav Sharma",
    id: "XXXX-XXXX-4821",
    reg: "VJTI/24/CS/0187",
    inst: "VJTI Mumbai",
    programme: "B.Tech CSE",
    year: "2024–25",
    status: "Verified",
    updated: "12 Jan 2026",
  },
  {
    name: "Diya Nair",
    id: "XXXX-XXXX-1164",
    reg: "COEP/24/EE/0092",
    inst: "COEP Tech Pune",
    programme: "B.Tech Electrical",
    year: "2024–25",
    status: "Pending",
    updated: "12 Jan 2026",
  },
  {
    name: "Mohammed Arif",
    id: "XXXX-XXXX-7033",
    reg: "JMI/24/ME/0264",
    inst: "Jamia Millia Islamia",
    programme: "B.Tech Mechanical",
    year: "2024–25",
    status: "Manual review",
    updated: "11 Jan 2026",
  },
  {
    name: "Ananya Iyer",
    id: "XXXX-XXXX-5590",
    reg: "MIT/24/AI/0145",
    inst: "MIT Manipal",
    programme: "B.Tech AI & ML",
    year: "2024–25",
    status: "Verified",
    updated: "10 Jan 2026",
  },
  {
    name: "Rohan Das",
    id: "XXXX-XXXX-9081",
    reg: "NITD/24/CE/0311",
    inst: "NIT Durgapur",
    programme: "B.Tech Civil",
    year: "2024–25",
    status: "Unable to verify",
    updated: "09 Jan 2026",
  },
]

function Button({
  children,
  variant = "primary",
  icon: Icon,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success"
  icon?: IconType
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={16} />}
      <span>{children}</span>
    </button>
  )
}

function IconButton({
  icon: Icon,
  label,
  onClick,
  badge,
}: {
  icon: IconType
  label: string
  onClick?: () => void
  badge?: boolean
}) {
  return (
    <button
      className="icon-btn"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <Icon size={19} />
      {badge && <span className="notification-dot" />}
    </button>
  )
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode
  tone?: "success" | "warning" | "danger" | "info" | "neutral" | "purple"
}) {
  return (
    <span className={`badge badge-${tone}`}>
      <span className="badge-dot" />
      {children}
    </span>
  )
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand">
      <div className="logo-mark">
        <BookOpen size={22} />
        <GraduationCap size={19} className="cap" />
        <Check size={11} className="logo-check" />
      </div>
      {!compact && (
        <div>
          <div className="brand-name">
            EDU<span>VÉRIFY</span>
          </div>
          <div className="brand-sub">Unified Record Intelligence</div>
        </div>
      )}
    </div>
  )
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={`card ${className}`}>{children}</section>
}

function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <div className="page-title">{title}</div>
        {description && <div className="page-description">{description}</div>}
      </div>
      {children && <div className="header-actions">{children}</div>}
    </div>
  )
}

function SelectBox({
  children,
  icon: Icon,
}: {
  children: React.ReactNode
  icon?: IconType
}) {
  return (
    <button className="select-box">
      {Icon && <Icon size={15} />}
      <span>{children}</span>
      <ChevronDown size={15} />
    </button>
  )
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Verified"
      ? "success"
      : status === "Pending"
        ? "warning"
        : status.includes("Unable")
          ? "danger"
          : "purple"
  return <Badge tone={tone}>{status}</Badge>
}

function KpiCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "blue",
}: {
  label: string
  value: string
  change: string
  icon: IconType
  tone?: string
}) {
  return (
    <Card className="kpi-card">
      <div className={`kpi-icon ${tone}`}>
        <Icon size={20} />
      </div>
      <div className="kpi-label">
        {label}
        <CircleHelp size={13} />
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-change">
        <span>{change}</span> vs. previous period
      </div>
    </Card>
  )
}

function Dashboard({ go }: { go: (page: Page) => void }) {
  return (
    <div>
      <div className="sample-banner">
        <Sparkles size={15} />
        <span>
          <strong>Demonstration environment</strong> — All metrics use synthetic
          sample data and are not official AICTE statistics.
        </span>
        <button>Learn more</button>
      </div>
      <PageHeader
        eyebrow="National Command Centre"
        title="Good morning, Dr. Mehta"
        description="Here’s the national student data overview for Academic Year 2025–26."
      >
        <SelectBox>AY 2025–26</SelectBox>
        <SelectBox>All states</SelectBox>
        <Button variant="secondary" icon={Download}>
          Export
        </Button>
      </PageHeader>
      <div className="kpi-grid">
        <KpiCard
          label="Approved Student Intake"
          value="18.42L"
          change="+4.8%"
          icon={GraduationCap}
        />
        <KpiCard
          label="Actual Enrolment"
          value="16.87L"
          change="+3.2%"
          icon={Users}
          tone="green"
        />
        <KpiCard
          label="Supernumerary Enrolment"
          value="82,460"
          change="+6.1%"
          icon={Plus}
          tone="orange"
        />
        <KpiCard
          label="NRI / OCI / Foreign"
          value="24,380"
          change="+2.4%"
          icon={Building2}
          tone="purple"
        />
        <KpiCard
          label="Institutions Reporting"
          value="8,214"
          change="94.7%"
          icon={FileCheck2}
          tone="teal"
        />
        <KpiCard
          label="Pending Verification"
          value="1.36L"
          change="-8.5%"
          icon={FileClock}
          tone="red"
        />
      </div>
      <div className="dashboard-main">
        <Card className="map-card">
          <div className="card-head">
            <div>
              <div className="card-title">State-wise enrolment coverage</div>
              <div className="card-subtitle">
                Verified student records across India
              </div>
            </div>
            <SelectBox>Enrolment</SelectBox>
          </div>
          <div className="map-area">
            <svg
              viewBox="0 0 360 330"
              className="india-map"
              aria-label="Stylised India enrolment map"
            >
              <path d="M142 15l30 10 13 22 28 3 8 21 26 12-8 27 23 14-17 23 16 26-19 17 3 29-23 8-9 26-21 12-11 38-20 27-14-21-2-35-24-13-12-29-23-8 2-31-20-19 11-27-13-20 20-27-4-28 30-13 10-29 25-8z" />
              <path
                className="map-line"
                d="M138 66l32 39 41-25M112 117l62-12 36 46M91 169l55-7 42 37 48-25M105 224l63-25 34 54M146 162l0 86M126 274l42-21"
              />
              <circle cx="112" cy="117" r="5" />
              <circle cx="188" cy="199" r="6" />
              <circle cx="168" cy="253" r="5" />
            </svg>
            <div className="map-legend">
              <div className="legend-title">Record coverage</div>
              <div className="legend-scale">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="legend-label">
                <span>62%</span>
                <span>98%</span>
              </div>
            </div>
            <div className="map-tooltip">
              <span>Maharashtra</span>
              <strong>2,18,450</strong>
              <small>96.4% reported</small>
            </div>
          </div>
        </Card>
        <Card className="trend-card">
          <div className="card-head">
            <div>
              <div className="card-title">Enrolment performance</div>
              <div className="card-subtitle">
                Approved intake vs. actual enrolment
              </div>
            </div>
            <button className="more-btn">
              <MoreHorizontal />
            </button>
          </div>
          <div className="chart-legend">
            <span>
              <i className="navy" />
              Approved intake
            </span>
            <span>
              <i className="orange" />
              Actual enrolment
            </span>
          </div>
          <div className="bar-chart">
            {[
              ["2021–22", 68, 57],
              ["2022–23", 74, 63],
              ["2023–24", 80, 70],
              ["2024–25", 88, 78],
              ["2025–26", 96, 87],
            ].map(([year, a, b]) => (
              <div className="bar-group" key={year as string}>
                <div className="bars">
                  <span className="bar approved" style={{ height: `${a}%` }} />
                  <span className="bar actual" style={{ height: `${b}%` }} />
                </div>
                <div>{year}</div>
              </div>
            ))}
          </div>
          <div className="chart-note">
            <Activity size={16} />
            <span>
              National enrolment is <strong>91.6%</strong> of approved intake
            </span>
          </div>
        </Card>
      </div>
      <div className="dashboard-lower">
        <Card>
          <div className="card-head">
            <div>
              <div className="card-title">Verification status</div>
              <div className="card-subtitle">16.87 lakh submitted records</div>
            </div>
            <button className="link-btn" onClick={() => go("records")}>
              View records <ArrowRight size={14} />
            </button>
          </div>
          <div className="donut-wrap">
            <div className="donut">
              <div>
                <strong>84.2%</strong>
                <span>verified</span>
              </div>
            </div>
            <div className="donut-list">
              <div>
                <i className="green" />
                <span>Verified</span>
                <strong>14.20L</strong>
              </div>
              <div>
                <i className="orange" />
                <span>Pending</span>
                <strong>1.36L</strong>
              </div>
              <div>
                <i className="purple" />
                <span>Manual review</span>
                <strong>82.4K</strong>
              </div>
              <div>
                <i className="red" />
                <span>Unable to verify</span>
                <strong>48.1K</strong>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="card-head">
            <div>
              <div className="card-title">Live intelligence alerts</div>
              <div className="card-subtitle">Requires authorized review</div>
            </div>
            <Badge tone="danger">12 new</Badge>
          </div>
          <div className="alert-list">
            <button onClick={() => go("anomaly")}>
              <div className="alert-icon critical">
                <Users size={17} />
              </div>
              <div>
                <strong>Cross-institution duplicates</strong>
                <span>482 possible record matches detected</span>
              </div>
              <ChevronRight size={17} />
            </button>
            <button onClick={() => go("anomaly")}>
              <div className="alert-icon warning">
                <AlertTriangle size={17} />
              </div>
              <div>
                <strong>Intake threshold exceeded</strong>
                <span>19 programmes require review</span>
              </div>
              <ChevronRight size={17} />
            </button>
            <button onClick={() => go("upload")}>
              <div className="alert-icon info">
                <Database size={17} />
              </div>
              <div>
                <strong>Submission inconsistency</strong>
                <span>3,104 records have incomplete fields</span>
              </div>
              <ChevronRight size={17} />
            </button>
          </div>
        </Card>
        <Card>
          <div className="card-head">
            <div>
              <div className="card-title">Recent activity</div>
              <div className="card-subtitle">Across institution network</div>
            </div>
            <button className="link-btn">View all</button>
          </div>
          <div className="timeline">
            <div>
              <i className="success">
                <Check size={12} />
              </i>
              <span>
                <strong>VJTI Mumbai</strong> submitted 1,248 records
                <small>8 min ago</small>
              </span>
            </div>
            <div>
              <i>
                <UploadCloud size={12} />
              </i>
              <span>
                <strong>COEP Tech</strong> uploaded AY 2025–26 batch
                <small>24 min ago</small>
              </span>
            </div>
            <div>
              <i className="warning">
                <AlertTriangle size={12} />
              </i>
              <span>
                Validation flagged <strong>42 records</strong>
                <small>51 min ago</small>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function InstitutionDashboard({ go }: { go: (page: Page) => void }) {
  return (
    <div>
      <PageHeader
        eyebrow="Institution workspace"
        title="Veermata Jijabai Technological Institute"
        description="AICTE Permanent ID: 1-4815731 • Mumbai, Maharashtra"
      >
        <Badge tone="success">AICTE approved</Badge>
        <SelectBox>AY 2025–26</SelectBox>
      </PageHeader>
      <div className="institution-hero">
        <Card className="gauge-card">
          <div className="card-title">Intake utilisation</div>
          <div className="gauge">
            <div className="gauge-inner">
              <strong>86.4%</strong>
              <span>1,244 of 1,440</span>
            </div>
          </div>
          <div className="gauge-meta">
            <span>
              Approved intake <strong>1,440</strong>
            </span>
            <span>
              Actual enrolment <strong>1,244</strong>
            </span>
          </div>
        </Card>
        <Card className="verification-progress">
          <div className="card-title">APAAR verification</div>
          <div className="big-percent">91.8%</div>
          <div className="progress">
            <i style={{ width: "91.8%" }} />
          </div>
          <div className="progress-split">
            <span>
              <b className="green-dot" />
              1,142 verified
            </span>
            <span>102 pending</span>
          </div>
          <Button icon={ShieldCheck} onClick={() => go("verify")}>
            Open verification centre
          </Button>
        </Card>
        <Card className="upload-cta">
          <div className="upload-graphic">
            <UploadCloud size={28} />
          </div>
          <div>
            <div className="card-title">Submit student data</div>
            <p>
              Upload and validate student records for the current academic year.
            </p>
          </div>
          <Button icon={Plus} onClick={() => go("upload")}>
            Upload new data
          </Button>
        </Card>
      </div>
      <div className="two-col">
        <Card>
          <div className="card-head">
            <div>
              <div className="card-title">Recent uploads</div>
              <div className="card-subtitle">
                Batch submissions and validation results
              </div>
            </div>
            <button className="link-btn" onClick={() => go("upload")}>
              View all
            </button>
          </div>
          <div className="file-list">
            {[
              [
                "CSE_Student_Data_Jan.xlsx",
                "1,248 records",
                "Completed",
                "12 Jan, 10:42",
              ],
              [
                "Lateral_Entry_2025.csv",
                "86 records",
                "Needs correction",
                "10 Jan, 16:18",
              ],
              [
                "NRI_Category_Update.xlsx",
                "24 records",
                "Processing",
                "09 Jan, 12:05",
              ],
            ].map((r) => (
              <div key={r[0]}>
                <div className="file-icon">
                  <FileSpreadsheet size={20} />
                </div>
                <span>
                  <strong>{r[0]}</strong>
                  <small>
                    {r[1]} • {r[3]}
                  </small>
                </span>
                <StatusBadge
                  status={
                    r[2] === "Completed"
                      ? "Verified"
                      : r[2] === "Processing"
                        ? "Pending"
                        : "Manual review"
                  }
                />
                <MoreHorizontal size={18} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="card-head">
            <div>
              <div className="card-title">Records requiring action</div>
              <div className="card-subtitle">
                Correct before the submission deadline
              </div>
            </div>
            <Badge tone="warning">58 records</Badge>
          </div>
          <div className="error-summary">
            <button onClick={() => go("upload")}>
              <span className="error-symbol red">
                <XCircle size={18} />
              </span>
              <span>
                <strong>Invalid or missing APAAR ID</strong>
                <small>23 records</small>
              </span>
              <ChevronRight size={17} />
            </button>
            <button onClick={() => go("anomaly")}>
              <span className="error-symbol orange">
                <Users size={18} />
              </span>
              <span>
                <strong>Possible duplicate records</strong>
                <small>19 records</small>
              </span>
              <ChevronRight size={17} />
            </button>
            <button onClick={() => go("upload")}>
              <span className="error-symbol purple">
                <FileText size={18} />
              </span>
              <span>
                <strong>Academic data inconsistency</strong>
                <small>16 records</small>
              </span>
              <ChevronRight size={17} />
            </button>
          </div>
        </Card>
      </div>
      <div className="quick-actions">
        {[
          { i: UserCheck, t: "Register student", p: "records" },
          { i: UploadCloud, t: "Bulk upload", p: "upload" },
          { i: BarChart3, t: "Generate report", p: "reports" },
          { i: ShieldCheck, t: "Verify records", p: "verify" },
        ].map(({ i: I, t, p }) => (
          <button key={t} onClick={() => go(p as Page)}>
            <I size={20} />
            <span>{t}</span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </div>
  )
}

function UploadWizard({
  go,
  notify,
}: {
  go: (page: Page) => void
  notify: (s: string) => void
}) {
  const [step, setStep] = useState(1)
  const [uploaded, setUploaded] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const steps = ["Upload", "Map columns", "Validate", "Review & submit"]
  const next = () => {
    if (step === 1 && !uploaded) return
    if (step < 4) setStep(step + 1)
    else {
      setSubmitted(true)
      notify("Batch submitted successfully — receipt generated")
    }
  }
  if (submitted)
    return (
      <div className="success-page">
        <div className="success-ring">
          <Check size={36} />
        </div>
        <div className="page-title">Submission received</div>
        <p>1,248 student records have been securely queued for processing.</p>
        <div className="receipt">
          <span>Reference number</span>
          <strong>EDV-2026-VJTI-004821</strong>
          <small>Submitted 12 January 2026 at 11:42 IST</small>
        </div>
        <div className="success-actions">
          <Button variant="secondary" icon={Download}>
            Download receipt
          </Button>
          <Button onClick={() => go("records")}>
            View verification status
          </Button>
        </div>
        <div className="prototype-note">
          <CircleHelp size={15} />
          This is a prototype receipt and not an official government
          acknowledgement.
        </div>
      </div>
    )
  return (
    <div>
      <PageHeader
        eyebrow="Institution submission"
        title="Upload student data"
        description="Create and validate a new academic record batch."
      >
        <Button variant="ghost" icon={CircleHelp}>
          Upload guide
        </Button>
      </PageHeader>
      <div className="wizard-steps">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => i + 1 <= step && setStep(i + 1)}
            className={`${step === i + 1 ? "active" : ""} ${
              step > i + 1 ? "done" : ""
            }`}
          >
            <span>{step > i + 1 ? <Check size={15} /> : i + 1}</span>
            <div>
              <strong>{s}</strong>
              <small>Step {i + 1}</small>
            </div>
          </button>
        ))}
      </div>
      {step === 1 && (
        <Card className="wizard-card">
          <div className="method-tabs">
            <button className="active">
              <UploadCloud size={17} />
              File upload
            </button>
            <button>
              <Plus size={17} />
              Single record
            </button>
            <button>
              <Code2 size={17} />
              API integration
            </button>
          </div>
          {!uploaded ? (
            <div className="dropzone" onClick={() => setUploaded(true)}>
              <div className="drop-icon">
                <UploadCloud size={26} />
              </div>
              <div className="drop-title">Drop your student data file here</div>
              <p>or select a CSV / Excel file from your computer</p>
              <Button variant="secondary">Browse files</Button>
              <small>
                CSV, XLS or XLSX • Maximum 25 MB • Up to 10,000 records
              </small>
            </div>
          ) : (
            <div className="uploaded-file">
              <div className="excel-icon">
                <FileSpreadsheet size={27} />
              </div>
              <span>
                <strong>VJTI_Student_Data_2025_26.xlsx</strong>
                <small>1.8 MB • 1,248 records detected</small>
                <i>
                  <CheckCircle2 size={14} /> Ready to map
                </i>
              </span>
              <button onClick={() => setUploaded(false)}>
                <X size={18} />
              </button>
            </div>
          )}
          <div className="template-row">
            <div>
              <FileText size={19} />
              <span>
                <strong>Need the approved format?</strong>
                <small>
                  Download the sample template with required column definitions.
                </small>
              </span>
            </div>
            <Button variant="ghost" icon={Download}>
              Download template
            </Button>
          </div>
        </Card>
      )}
      {step === 2 && (
        <Card className="wizard-card">
          <div className="wizard-section-head">
            <div>
              <div className="card-title">Map uploaded columns</div>
              <div className="card-subtitle">
                We automatically matched 8 of 9 required fields.
              </div>
            </div>
            <Badge tone="success">89% auto-matched</Badge>
          </div>
          <div className="mapping-table">
            <div className="mapping-head">
              <span>Uploaded column</span>
              <span>Maps to EDUVÉRIFY field</span>
              <span>Confidence</span>
            </div>
            {[
              ["Student Full Name", "Student name", "High"],
              ["APAAR Number", "APAAR ID", "High"],
              ["College Reg No", "Registration number", "High"],
              ["Branch Name", "Programme / branch", "High"],
              ["Admission Type", "Enrolment category", "Review"],
            ].map((m) => (
              <div key={m[0]}>
                <span>
                  <FileSpreadsheet size={16} />
                  {m[0]}
                </span>
                <ArrowRight size={15} />
                <SelectBox>{m[1]}</SelectBox>
                <Badge tone={m[2] === "High" ? "success" : "warning"}>
                  {m[2]}
                </Badge>
              </div>
            ))}
          </div>
          <div className="preview-table">
            <div className="section-label">DATA PREVIEW • FIRST 3 ROWS</div>
            <table>
              <thead>
                <tr>
                  <th>Student name</th>
                  <th>APAAR ID</th>
                  <th>Registration no.</th>
                  <th>Programme</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Aarav Sharma</td>
                  <td>2784 9310 4821</td>
                  <td>VJTI/24/CS/0187</td>
                  <td>B.Tech CSE</td>
                  <td>Regular</td>
                </tr>
                <tr>
                  <td>Diya Nair</td>
                  <td>7319 4402 1164</td>
                  <td>VJTI/24/EE/0092</td>
                  <td>B.Tech Electrical</td>
                  <td>Regular</td>
                </tr>
                <tr>
                  <td>Mohammed Arif</td>
                  <td>4201 8703 7033</td>
                  <td>VJTI/24/ME/0264</td>
                  <td>B.Tech Mechanical</td>
                  <td>Supernumerary</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
      {step === 3 && (
        <div className="validation-layout">
          <Card className="validation-main">
            <div className="wizard-section-head">
              <div>
                <div className="card-title">Validation results</div>
                <div className="card-subtitle">
                  1,248 rows checked against data and policy rules.
                </div>
              </div>
              <Button variant="secondary" icon={Download}>
                Error report
              </Button>
            </div>
            <div className="validation-tabs">
              <button className="active">
                All issues <b>58</b>
              </button>
              <button>
                Errors <b className="red-text">23</b>
              </button>
              <button>
                Warnings <b className="orange-text">35</b>
              </button>
              <button>
                Valid <b className="green-text">1,190</b>
              </button>
            </div>
            <div className="validation-toolbar">
              <div className="search-small">
                <Search size={15} />
                Search row or student
              </div>
              <Button variant="ghost" icon={Filter}>
                All issue types
              </Button>
            </div>
            <div className="issue-list">
              <div>
                <span className="row-number">Row 24</span>
                <span className="student-cell">
                  <strong>Tanvi Kulkarni</strong>
                  <small>VJTI/24/CS/0211</small>
                </span>
                <span className="issue-cell">
                  <Badge tone="danger">Invalid APAAR ID</Badge>
                  <small>
                    Expected a valid issued identifier, not format only
                  </small>
                </span>
                <Button variant="ghost">Correct</Button>
              </div>
              <div>
                <span className="row-number">Row 47</span>
                <span className="student-cell">
                  <strong>Rohan Mehta</strong>
                  <small>VJTI/24/IT/0182</small>
                </span>
                <span className="issue-cell">
                  <Badge tone="danger">Cross-institution duplicate</Badge>
                  <small>
                    Potential match at another reporting institution
                  </small>
                </span>
                <Button variant="ghost" onClick={() => go("anomaly")}>
                  Review
                </Button>
              </div>
              <div>
                <span className="row-number">Row 83</span>
                <span className="student-cell">
                  <strong>Sana Sheikh</strong>
                  <small>VJTI/24/EC/0088</small>
                </span>
                <span className="issue-cell">
                  <Badge tone="warning">Missing field</Badge>
                  <small>Admission category is required</small>
                </span>
                <Button variant="ghost">Correct</Button>
              </div>
              <div>
                <span className="row-number">Row 116</span>
                <span className="student-cell">
                  <strong>Arjun Reddy</strong>
                  <small>VJTI/24/ME/0116</small>
                </span>
                <span className="issue-cell">
                  <Badge tone="warning">Intake threshold</Badge>
                  <small>Programme count is above approved intake</small>
                </span>
                <Button variant="ghost">Review</Button>
              </div>
            </div>
          </Card>
          <Card className="validation-summary">
            <div className="card-title">Batch health</div>
            <div className="health-score">
              <strong>95.4</strong>
              <span>/ 100</span>
            </div>
            <div className="progress">
              <i style={{ width: "95.4%" }} />
            </div>
            <div className="summary-list">
              <div>
                <span>
                  <i className="green-dot" />
                  Valid records
                </span>
                <strong>1,190</strong>
              </div>
              <div>
                <span>
                  <i className="red-dot" />
                  Blocking errors
                </span>
                <strong>23</strong>
              </div>
              <div>
                <span>
                  <i className="orange-dot" />
                  Warnings
                </span>
                <strong>35</strong>
              </div>
            </div>
            <div className="validation-note">
              <AlertTriangle size={17} />
              <span>
                Blocking errors must be corrected or excluded before submission.
              </span>
            </div>
          </Card>
        </div>
      )}
      {step === 4 && (
        <div className="review-grid">
          <Card>
            <div className="card-title">Submission summary</div>
            <div className="review-file">
              <FileSpreadsheet size={24} />
              <span>
                <strong>VJTI_Student_Data_2025_26.xlsx</strong>
                <small>Academic Year 2025–26</small>
              </span>
            </div>
            <div className="review-stats">
              <div>
                <strong>1,225</strong>
                <span>Records ready</span>
              </div>
              <div>
                <strong>23</strong>
                <span>Excluded errors</span>
              </div>
              <div>
                <strong>35</strong>
                <span>Warnings accepted</span>
              </div>
            </div>
            <div className="review-detail">
              <span>
                Institution<strong>VJTI Mumbai</strong>
              </span>
              <span>
                Submitted by<strong>Priya Deshmukh</strong>
              </span>
              <span>
                Processing mode<strong>Validate & verify</strong>
              </span>
            </div>
          </Card>
          <Card>
            <div className="card-title">Consent & declaration</div>
            <label className="check-row">
              <input type="checkbox" defaultChecked />
              <span>
                <strong>Authorized submission</strong>
                <small>
                  I confirm that I am authorized to submit these records on
                  behalf of this institution.
                </small>
              </span>
            </label>
            <label className="check-row">
              <input type="checkbox" defaultChecked />
              <span>
                <strong>Lawful data processing</strong>
                <small>
                  Required consent and notices have been obtained under
                  applicable policies.
                </small>
              </span>
            </label>
            <label className="check-row">
              <input type="checkbox" defaultChecked />
              <span>
                <strong>Data accuracy</strong>
                <small>
                  I have reviewed the validation summary and confirm the data is
                  accurate to the best of my knowledge.
                </small>
              </span>
            </label>
            <div className="privacy-note">
              <LockKeyhole size={17} />
              Data is encrypted in transit. This prototype does not connect to
              external government systems.
            </div>
          </Card>
        </div>
      )}
      <div className="wizard-footer">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>
        <div>
          <span>Step {step} of 4</span>
          <Button onClick={next} disabled={step === 1 && !uploaded}>
            {step === 4 ? "Submit for processing" : "Continue"}
            {step < 4 && <ArrowRight size={16} />}
          </Button>
        </div>
      </div>
    </div>
  )
}

function AnomalyCenter({ notify }: { notify: (s: string) => void }) {
  const [resolved, setResolved] = useState(false)
  return (
    <div>
      <PageHeader
        eyebrow="AI-assisted review"
        title="Anomaly Center"
        description="Investigate potential data conflicts with explainable decision support."
      >
        <SelectBox>High risk first</SelectBox>
        <Button variant="secondary" icon={Download}>
          Export queue
        </Button>
      </PageHeader>
      <div className="decision-banner">
        <Sparkles size={17} />
        <span>
          <strong>Decision-support only.</strong> AI risk indicators help
          prioritize review; final verification decisions remain with authorized
          personnel.
        </span>
      </div>
      <div className="anomaly-layout">
        <Card className="case-list">
          <div className="case-head">
            <div>
              <div className="card-title">Review queue</div>
              <div className="card-subtitle">42 open cases</div>
            </div>
            <SlidersHorizontal size={18} />
          </div>
          {[
            [
              "AN-240184",
              "Rohan Mehta",
              "92",
              "Cross-institution duplicate",
              "High",
            ],
            [
              "AN-240179",
              "Nisha Gupta",
              "78",
              "Identity field mismatch",
              "High",
            ],
            [
              "AN-240162",
              "Aditya Rao",
              "64",
              "Academic year conflict",
              "Medium",
            ],
            ["AN-240151", "Kavya Menon", "38", "Category inconsistency", "Low"],
          ].map((c, i) => (
            <button key={c[0]} className={i === 0 ? "active" : ""}>
              <span className={`risk risk-${c[4].toLowerCase()}`}>{c[2]}</span>
              <span>
                <strong>{c[1]}</strong>
                <small>{c[3]}</small>
                <i>
                  {c[0]} • {c[4]} severity
                </i>
              </span>
              <ChevronRight size={16} />
            </button>
          ))}
        </Card>
        <div className="case-workspace">
          <Card className="case-summary">
            <div>
              <div className="case-id">CASE AN-240184</div>
              <div className="case-title">
                Possible cross-institution duplicate
              </div>
              <div className="reason-chips">
                <span>
                  <Sparkles size={13} />
                  Name similarity: 98%
                </span>
                <span>
                  <Sparkles size={13} />
                  Same date of birth
                </span>
                <span>
                  <Sparkles size={13} />
                  APAAR conflict
                </span>
              </div>
            </div>
            <div className="risk-score">
              <div>
                <strong>92</strong>
                <span>/100</span>
              </div>
              <Badge tone="danger">High risk</Badge>
            </div>
          </Card>
          <Card className="comparison-card">
            <div className="comparison-head">
              <div className="card-title">Side-by-side record comparison</div>
              <SelectBox>AY 2025–26</SelectBox>
            </div>
            <div className="compare-columns">
              <div className="compare-labels">
                <span>Source</span>
                <span>Student name</span>
                <span>Date of birth</span>
                <span>APAAR ID</span>
                <span>Registration no.</span>
                <span>Institution</span>
                <span>Programme</span>
                <span>Admission date</span>
              </div>
              <div className="compare-record current">
                <span>
                  <Badge tone="info">Current submission</Badge>
                </span>
                <strong>Rohan Rajesh Mehta</strong>
                <span>18 June 2007</span>
                <span className="mismatch">
                  XXXX-XXXX-9081 <AlertTriangle size={14} />
                </span>
                <span>VJTI/24/IT/0182</span>
                <span>VJTI Mumbai</span>
                <span>B.Tech Information Technology</span>
                <span>02 August 2025</span>
              </div>
              <div className="compare-record">
                <span>
                  <Badge tone="neutral">Existing record</Badge>
                </span>
                <strong>Rohan R. Mehta</strong>
                <span>18 June 2007</span>
                <span className="mismatch">
                  XXXX-XXXX-9081 <AlertTriangle size={14} />
                </span>
                <span>SPIT/24/CS/0141</span>
                <span>Sardar Patel Institute of Tech</span>
                <span>B.Tech Computer Science</span>
                <span>31 July 2025</span>
              </div>
            </div>
          </Card>
          <Card>
            <div className="card-head">
              <div>
                <div className="card-title">Reviewer decision</div>
                <div className="card-subtitle">
                  Add evidence-based comments before resolving.
                </div>
              </div>
              <Badge tone={resolved ? "success" : "warning"}>
                {resolved ? "Resolved" : "Awaiting decision"}
              </Badge>
            </div>
            <textarea
              className="comment-box"
              placeholder="Add reviewer comments or supporting context..."
              defaultValue={
                resolved
                  ? "Confirmed as transfer record after institution clarification. Existing enrolment marked inactive."
                  : ""
              }
            />
            <div className="decision-actions">
              <Button
                variant="secondary"
                onClick={() => notify("Case escalated to regional verifier")}
              >
                Escalate
              </Button>
              <Button variant="ghost">Mark for manual review</Button>
              <Button
                variant="success"
                icon={Check}
                onClick={() => {
                  setResolved(true)
                  notify("Case resolved and decision recorded")
                }}
              >
                Resolve case
              </Button>
            </div>
          </Card>
        </div>
        <Card className="decision-history">
          <div className="card-title">Decision history</div>
          <div className="timeline">
            <div>
              <i>
                <Sparkles size={12} />
              </i>
              <span>
                <strong>Risk assessment generated</strong>
                <small>12 Jan, 10:14 • System</small>
              </span>
            </div>
            <div>
              <i>
                <Eye size={12} />
              </i>
              <span>
                <strong>Case opened for review</strong>
                <small>12 Jan, 10:18 • P. Deshmukh</small>
              </span>
            </div>
            <div>
              <i className="warning">
                <FileText size={12} />
              </i>
              <span>
                <strong>Institution contacted</strong>
                <small>12 Jan, 10:26 • P. Deshmukh</small>
              </span>
            </div>
          </div>
          <div className="source-card">
            <Shield size={16} />
            <span>
              <strong>Why was this flagged?</strong>
              <small>Learn how the risk indicator was calculated.</small>
            </span>
            <ChevronRight size={15} />
          </div>
        </Card>
      </div>
    </div>
  )
}

function RecordsExplorer({ go }: { go: (p: Page) => void }) {
  const [query, setQuery] = useState("")
  const filtered = records.filter((r) =>
    `${r.name} ${r.reg} ${r.inst}`.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <div>
      <PageHeader
        eyebrow="Unified student registry"
        title="Student Records"
        description="Search, review and manage synthetic student records across participating institutions."
      >
        <Button variant="secondary" icon={Download}>
          Export
        </Button>
        <Button icon={Plus}>Add student</Button>
      </PageHeader>
      <Card className="table-card">
        <div className="table-toolbar">
          <label className="search-box">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, APAAR ID or registration no."
            />
          </label>
          <Button variant="secondary" icon={Filter}>
            Advanced filters
          </Button>
          <SelectBox>Verification status</SelectBox>
        </div>
        <div className="result-summary">
          <span>
            Showing <strong>{filtered.length}</strong> of 16,87,240 synthetic
            records
          </span>
          <span>Last synced 12 Jan 2026, 11:26 IST</span>
        </div>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Student</th>
                <th>APAAR ID</th>
                <th>Registration no.</th>
                <th>Institution</th>
                <th>Programme</th>
                <th>Academic year</th>
                <th>Status</th>
                <th>Last updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.reg} onClick={() => go("profile")}>
                  <td onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <div className="student-name">
                      <span>
                        {r.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <strong>{r.name}</strong>
                    </div>
                  </td>
                  <td className="mono">{r.id}</td>
                  <td>{r.reg}</td>
                  <td>{r.inst}</td>
                  <td>{r.programme}</td>
                  <td>{r.year}</td>
                  <td>
                    <StatusBadge status={r.status} />
                  </td>
                  <td>{r.updated}</td>
                  <td>
                    <MoreHorizontal size={17} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>
            Rows per page: <strong>10</strong>
          </span>
          <span>1–{filtered.length} of 16,87,240</span>
          <IconButton icon={ChevronLeft} label="Previous" />
          <IconButton icon={ChevronRight} label="Next" />
        </div>
      </Card>
    </div>
  )
}

function StudentProfile({ go }: { go: (p: Page) => void }) {
  return (
    <div>
      <button className="back-link" onClick={() => go("records")}>
        <ArrowLeft size={16} />
        Back to student records
      </button>
      <div className="profile-header">
        <div className="profile-avatar">AS</div>
        <div>
          <div className="page-title">Aarav Sharma</div>
          <div className="profile-meta">
            <span>VJTI/24/CS/0187</span>
            <span>•</span>
            <span>XXXX-XXXX-4821</span>
            <Badge tone="success">Verified</Badge>
          </div>
        </div>
        <div className="profile-actions">
          <Button
            variant="secondary"
            icon={FileText}
            onClick={() => go("certificate")}
          >
            View certificate
          </Button>
          <Button icon={MoreHorizontal}>Actions</Button>
        </div>
      </div>
      <div className="profile-tabs">
        <button className="active">Overview</button>
        <button>Enrolment history</button>
        <button>Verification</button>
        <button>Documents</button>
        <button>Consent & access</button>
        <button>Audit timeline</button>
      </div>
      <div className="profile-grid">
        <Card>
          <div className="card-title">Student information</div>
          <div className="detail-grid">
            <span>
              Full name<strong>Aarav Rajesh Sharma</strong>
            </span>
            <span>
              Date of birth<strong>14 September 2006</strong>
            </span>
            <span>
              Gender<strong>Male</strong>
            </span>
            <span>
              APAAR ID<strong>XXXX-XXXX-4821</strong>
            </span>
            <span>
              Mobile number<strong>+91 ••••• 48210</strong>
            </span>
            <span>
              Email address<strong>a••••@example.in</strong>
            </span>
          </div>
        </Card>
        <Card>
          <div className="card-title">Academic information</div>
          <div className="detail-grid">
            <span>
              Institution<strong>VJTI Mumbai</strong>
            </span>
            <span>
              Programme<strong>B.Tech Computer Engineering</strong>
            </span>
            <span>
              Academic year<strong>2024–25</strong>
            </span>
            <span>
              Current semester<strong>Semester IV</strong>
            </span>
            <span>
              Enrolment category<strong>Regular</strong>
            </span>
            <span>
              Admission status<strong>Active</strong>
            </span>
          </div>
        </Card>
        <Card>
          <div className="card-head">
            <div className="card-title">Verification history</div>
            <Badge tone="success">Current</Badge>
          </div>
          <div className="timeline">
            <div>
              <i className="success">
                <Check size={12} />
              </i>
              <span>
                <strong>Identity and enrolment verified</strong>
                <small>08 Jan 2026 • EDUVÉRIFY demo workflow</small>
              </span>
            </div>
            <div>
              <i>
                <UploadCloud size={12} />
              </i>
              <span>
                <strong>Record submitted by institution</strong>
                <small>05 Jan 2026 • VJTI Mumbai</small>
              </span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="card-head">
            <div className="card-title">Consent status</div>
            <Button variant="ghost" onClick={() => go("consent")}>
              View access history
            </Button>
          </div>
          <div className="consent-state">
            <ShieldCheck size={28} />
            <span>
              <strong>Active consent on file</strong>
              <small>
                Institution reporting and authorized academic verification
              </small>
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}

function VerificationPortal({
  go,
  notify,
}: {
  go: (p: Page) => void
  notify: (s: string) => void
}) {
  const [stage, setStage] = useState<"entry" | "consent" | "otp" | "result">(
    "entry",
  )
  const [id, setId] = useState("")
  return (
    <div className="verification-page">
      <div className="verify-shell">
        <div className="verify-brand">
          <Logo />
          <Badge tone="info">Secure student portal</Badge>
        </div>
        <div className="verify-progress">
          <span className={stage !== "entry" ? "done" : ""}>1</span>
          <i />
          <span className={stage === "otp" || stage === "result" ? "done" : ""}>
            2
          </span>
          <i />
          <span className={stage === "result" ? "done" : ""}>3</span>
        </div>
        {stage === "entry" && (
          <Card className="verify-card">
            <div className="verify-icon">
              <Fingerprint size={29} />
            </div>
            <div className="verify-title">Verify your academic record</div>
            <p>
              Enter your APAAR ID to begin a privacy-protected verification
              request.
            </p>
            <label className="field-label">APAAR ID</label>
            <div className="apaar-input">
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="XXXX XXXX XXXX"
                maxLength={14}
              />
              <QrCode size={21} />
            </div>
            <small className="field-help">
              Your ID will be used only to locate a possible record. Format
              validity does not mean official verification.
            </small>
            <Button
              className="full-btn"
              disabled={id.length < 4}
              onClick={() => setStage("consent")}
            >
              Continue securely <ArrowRight size={16} />
            </Button>
            <div className="or">
              <span>or</span>
            </div>
            <Button className="full-btn" variant="secondary" icon={QrCode}>
              Scan QR code
            </Button>
          </Card>
        )}
        {stage === "consent" && (
          <Card className="verify-card">
            <div className="verify-icon">
              <ShieldCheck size={29} />
            </div>
            <div className="verify-title">Review consent request</div>
            <p>You are in control of what information is shared.</p>
            <div className="requester">
              <div className="requester-logo">
                <Building2 />
              </div>
              <span>
                <small>REQUESTED BY</small>
                <strong>National Scholarship Portal</strong>
                <i>Education benefit eligibility</i>
              </span>
            </div>
            <div className="share-list">
              <div className="section-label">INFORMATION TO BE SHARED</div>
              {[
                "Full name and photograph",
                "Institution and programme",
                "Current enrolment status",
                "Verification timestamp",
              ].map((t) => (
                <div key={t}>
                  <Check size={15} />
                  {t}
                </div>
              ))}
            </div>
            <div className="not-shared">
              <LockKeyhole size={16} />
              <span>
                <strong>Not shared:</strong> contact details, marks, documents,
                or complete APAAR ID.
              </span>
            </div>
            <label className="check-row compact">
              <input type="checkbox" defaultChecked />
              <span>
                I consent to this one-time, purpose-limited verification.
              </span>
            </label>
            <Button className="full-btn" onClick={() => setStage("otp")}>
              Consent & send OTP
            </Button>
            <Button
              className="full-btn"
              variant="ghost"
              onClick={() => setStage("entry")}
            >
              Cancel request
            </Button>
          </Card>
        )}
        {stage === "otp" && (
          <Card className="verify-card">
            <div className="verify-icon">
              <LockKeyhole size={29} />
            </div>
            <div className="verify-title">Confirm it’s you</div>
            <p>
              Enter the 6-digit OTP sent to your registered mobile ending in{" "}
              <strong>•4821</strong>.
            </p>
            <div className="otp-row">
              {[4, 8, 2, 1, 7, 3].map((n, i) => (
                <input key={i} defaultValue={n} maxLength={1} />
              ))}
            </div>
            <div className="otp-meta">
              <span>
                <Clock3 size={14} />
                OTP valid for 01:42
              </span>
              <button>Resend OTP</button>
            </div>
            <Button
              className="full-btn"
              onClick={() => {
                setStage("result")
                notify("Identity confirmed for this demo request")
              }}
            >
              Verify & continue
            </Button>
            <Button
              className="full-btn"
              variant="ghost"
              onClick={() => setStage("consent")}
            >
              <ArrowLeft size={15} />
              Back
            </Button>
          </Card>
        )}
        {stage === "result" && (
          <Card className="verify-card result-card">
            <div className="verified-seal">
              <ShieldCheck size={34} />
            </div>
            <Badge tone="success">Mock verification result</Badge>
            <div className="verify-title">Enrolment record matched</div>
            <p>The authorized minimum information is shown below.</p>
            <div className="result-profile">
              <div className="result-avatar">AS</div>
              <span>
                <strong>Aarav Sharma</strong>
                <small>XXXX-XXXX-4821</small>
              </span>
            </div>
            <div className="result-fields">
              <span>
                Institution<strong>VJTI Mumbai</strong>
              </span>
              <span>
                Programme<strong>B.Tech Computer Engineering</strong>
              </span>
              <span>
                Enrolment status
                <strong className="success-text">Active • Verified</strong>
              </span>
              <span>
                Academic year<strong>2025–26</strong>
              </span>
            </div>
            <div className="verify-reference">
              <QrCode size={38} />
              <span>
                <small>VERIFICATION REFERENCE</small>
                <strong>EDV-VRF-260112-4821</strong>
                <i>12 Jan 2026, 11:42 IST</i>
              </span>
            </div>
            <Button
              className="full-btn"
              icon={FileCheck2}
              onClick={() => go("certificate")}
            >
              View demonstration certificate
            </Button>
            <Button
              className="full-btn"
              variant="ghost"
              onClick={() => go("consent")}
            >
              Check access history
            </Button>
          </Card>
        )}
        <div className="verify-footer">
          <LockKeyhole size={13} />
          Privacy protected • Purpose limited • Activity logged
          <div>Help & support · Privacy · Accessibility</div>
        </div>
      </div>
    </div>
  )
}

function Certificate({ go }: { go: (p: Page) => void }) {
  return (
    <div>
      <PageHeader
        eyebrow="Verifiable record"
        title="Digital Certificate Preview"
        description="Review the demonstration credential before download."
      >
        <Button variant="secondary" icon={ShieldCheck}>
          Verify certificate
        </Button>
        <Button icon={Download}>Download PDF</Button>
      </PageHeader>
      <div className="certificate-wrap">
        <div className="certificate">
          <div className="cert-border">
            <div className="cert-top">
              <Logo />
              <div>
                <span>DEMONSTRATION ONLY</span>
                <small>Not a government-issued document</small>
              </div>
            </div>
            <div className="cert-emblem">
              <ShieldCheck size={34} />
            </div>
            <div className="cert-kicker">ACADEMIC ENROLMENT VERIFICATION</div>
            <div className="cert-title">Record Verification Certificate</div>
            <p>
              This demonstration certificate confirms that the following
              academic record matched the synthetic EDUVÉRIFY prototype registry
              at the stated time.
            </p>
            <div className="cert-name">Aarav Rajesh Sharma</div>
            <div className="cert-details">
              <span>
                Student ID<strong>VJTI/24/CS/0187</strong>
              </span>
              <span>
                APAAR ID<strong>XXXX-XXXX-4821</strong>
              </span>
              <span>
                Institution<strong>VJTI Mumbai</strong>
              </span>
              <span>
                Programme<strong>B.Tech Computer Engineering</strong>
              </span>
              <span>
                Verification status
                <strong className="success-text">Record matched</strong>
              </span>
              <span>
                Verified at<strong>12 Jan 2026, 11:42 IST</strong>
              </span>
            </div>
            <div className="cert-bottom">
              <div className="qr-placeholder">
                <QrCode size={64} />
                <small>Scan to verify</small>
              </div>
              <div className="signature">
                <div className="signature-line">
                  Digital signature placeholder
                </div>
                <small>EDUVÉRIFY Authorized Workflow</small>
              </div>
              <div className="cert-ref">
                <small>CERTIFICATE REFERENCE</small>
                <strong>EDV-CERT-260112-4821</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="certificate-aside">
          <Card>
            <div className="card-title">About this preview</div>
            <p>
              This certificate is a presentation artifact using synthetic data.
              It is not an official AICTE, APAAR, DigiLocker, or
              government-issued credential.
            </p>
            <div className="safe-list">
              <span>
                <Check size={14} />
                Masked personal identifier
              </span>
              <span>
                <Check size={14} />
                Verification timestamp
              </span>
              <span>
                <Check size={14} />
                Tamper-evident reference placeholder
              </span>
            </div>
          </Card>
          <Button variant="ghost" icon={ArrowLeft} onClick={() => go("verify")}>
            Back to verification
          </Button>
        </div>
      </div>
    </div>
  )
}

function ConsentCenter({ notify }: { notify: (s: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <PageHeader
        eyebrow="Student privacy controls"
        title="Consent & Access Center"
        description="Understand, manage and review access to your academic record."
      >
        <Badge tone="success">Privacy controls active</Badge>
      </PageHeader>
      <div className="privacy-hero">
        <div className="privacy-icon">
          <ShieldCheck size={28} />
        </div>
        <div>
          <strong>Your record, your control</strong>
          <p>
            Organizations can access only the minimum information you approve,
            for a stated purpose and duration.
          </p>
        </div>
        <Button variant="secondary">Privacy guide</Button>
      </div>
      <div className="consent-layout">
        <div>
          <div className="section-title">
            Active permissions <span>3</span>
          </div>
          {[
            [
              "VJTI Mumbai",
              "Academic reporting & record maintenance",
              "Ongoing",
              "Institution",
            ],
            [
              "National Scholarship Portal",
              "Scholarship eligibility verification",
              "Expires 28 Feb 2026",
              "Verifier",
            ],
            [
              "Campus Placement Cell",
              "Enrolment and programme confirmation",
              "One-time access",
              "Verifier",
            ],
          ].map((c, i) => (
            <Card className="permission-card" key={c[0]}>
              <div className="org-icon">
                {i === 0 ? <Building2 /> : <Shield />}
              </div>
              <div className="permission-main">
                <div>
                  <strong>{c[0]}</strong>
                  <Badge tone="success">Granted</Badge>
                </div>
                <p>{c[1]}</p>
                <span>
                  <Clock3 size={14} />
                  {c[2]} • {c[3]}
                </span>
              </div>
              <button className="more-btn">
                <MoreHorizontal />
              </button>
              <Button variant="danger" onClick={() => setOpen(true)}>
                Revoke
              </Button>
            </Card>
          ))}
        </div>
        <Card className="access-history">
          <div className="card-head">
            <div>
              <div className="card-title">Who viewed my record?</div>
              <div className="card-subtitle">
                Access is logged for transparency.
              </div>
            </div>
            <Button variant="ghost" icon={Download}>
              Export
            </Button>
          </div>
          <div className="access-timeline">
            {[
              [
                "National Scholarship Portal",
                "Eligibility verification",
                "Today, 10:42",
              ],
              ["VJTI Mumbai", "Record maintenance", "10 Jan, 16:18"],
              [
                "Campus Placement Cell",
                "Enrolment confirmation",
                "08 Jan, 12:05",
              ],
              ["VJTI Mumbai", "Academic reporting", "05 Jan, 09:30"],
            ].map((a, i) => (
              <div key={a[2]}>
                <i className={i === 0 ? "current" : ""}>
                  <Eye size={14} />
                </i>
                <span>
                  <strong>{a[0]}</strong>
                  <small>{a[1]}</small>
                </span>
                <time>{a[2]}</time>
              </div>
            ))}
          </div>
        </Card>
      </div>
      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon danger">
              <Shield size={24} />
            </div>
            <div className="modal-title">Revoke this permission?</div>
            <p>
              National Scholarship Portal will no longer be able to request new
              access. Previous lawful access events remain in your history.
            </p>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Keep permission
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setOpen(false)
                  notify("Permission revoked successfully")
                }}
              >
                Revoke access
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Reports() {
  const [generated, setGenerated] = useState(false)
  return (
    <div>
      <PageHeader
        eyebrow="Decision intelligence"
        title="Reports & Analytics"
        description="Build purpose-specific reports from synthetic demonstration data."
      >
        <Button variant="secondary" icon={FileClock}>
          Saved reports
        </Button>
      </PageHeader>
      <div className="report-layout">
        <Card className="report-builder">
          <div className="card-title">Build a report</div>
          <div className="report-categories">
            <button className="active">
              <BarChart3 />
              Policy Monitoring
            </button>
            <button>
              <ShieldCheck />
              Accreditation
            </button>
            <button>
              <Building2 />
              Institutional Enrolment
            </button>
          </div>
          <div className="form-grid">
            <label>
              Academic year<SelectBox>2025–26</SelectBox>
            </label>
            <label>
              State / UT<SelectBox>All states</SelectBox>
            </label>
            <label>
              Institution<SelectBox>All institutions</SelectBox>
            </label>
            <label>
              Programme<SelectBox>All programmes</SelectBox>
            </label>
            <label>
              Verification status<SelectBox>All statuses</SelectBox>
            </label>
            <label>
              Enrolment category<SelectBox>All categories</SelectBox>
            </label>
          </div>
          <div className="date-row">
            <label>
              Date range<SelectBox>01 Apr 2025 — 31 Mar 2026</SelectBox>
            </label>
          </div>
          <Button
            className="full-btn"
            icon={Zap}
            onClick={() => setGenerated(true)}
          >
            Generate report preview
          </Button>
        </Card>
        <Card className={`report-preview ${generated ? "ready" : ""}`}>
          <div className="card-head">
            <div>
              <div className="card-title">National enrolment summary</div>
              <div className="card-subtitle">
                Policy monitoring • AY 2025–26
              </div>
            </div>
            <div>
              <IconButton icon={Download} label="PDF" />
              <IconButton icon={FileSpreadsheet} label="Excel" />
            </div>
          </div>
          {!generated ? (
            <div className="empty-preview">
              <BarChart3 size={32} />
              <strong>Your report preview will appear here</strong>
              <span>
                Select filters and generate a report to visualize sample data.
              </span>
            </div>
          ) : (
            <>
              <div className="mini-kpis">
                <div>
                  <span>Total enrolment</span>
                  <strong>16.87L</strong>
                  <small>+3.2% YoY</small>
                </div>
                <div>
                  <span>Verification rate</span>
                  <strong>84.2%</strong>
                  <small>+7.6% YoY</small>
                </div>
                <div>
                  <span>Reporting institutions</span>
                  <strong>8,214</strong>
                  <small>94.7% coverage</small>
                </div>
              </div>
              <div className="report-chart">
                <div className="section-label">
                  ENROLMENT BY PROGRAMME GROUP
                </div>
                {[
                  ["Engineering & Technology", 92],
                  ["Computer Applications", 74],
                  ["Management", 58],
                  ["Architecture & Planning", 31],
                  ["Applied Arts & Crafts", 18],
                ].map((x) => (
                  <div key={x[0]}>
                    <span>{x[0]}</span>
                    <i>
                      <b style={{ width: `${x[1]}%` }} />
                    </i>
                    <strong>{x[1]}%</strong>
                  </div>
                ))}
              </div>
              <div className="prototype-note">
                <CircleHelp size={15} />
                Preview uses synthetic data for demonstration only.
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

function AdminAudit() {
  return (
    <div>
      <PageHeader
        eyebrow="Administration & security"
        title="Access Control & Audit"
        description="Manage authorized users, permissions, sessions and reviewable security events."
      >
        <Button icon={Plus}>Invite user</Button>
      </PageHeader>
      <div className="security-strip">
        <div>
          <ShieldCheck size={22} />
          <span>
            <strong>Security posture</strong>
            <small>All prototype controls operational</small>
          </span>
        </div>
        <Badge tone="success">No critical alerts</Badge>
        <span>
          Active sessions <strong>214</strong>
        </span>
        <span>
          MFA coverage <strong>96.2%</strong>
        </span>
        <span>
          Last review <strong>12 Jan 2026</strong>
        </span>
      </div>
      <div className="admin-tabs">
        <button className="active">Audit log</button>
        <button>Users</button>
        <button>Roles & permissions</button>
        <button>Sessions</button>
        <button>Security alerts</button>
      </div>
      <Card className="table-card">
        <div className="table-toolbar">
          <label className="search-box">
            <Search size={17} />
            <input placeholder="Search event, user or resource" />
          </label>
          <SelectBox>All event types</SelectBox>
          <SelectBox>Last 7 days</SelectBox>
          <Button variant="secondary" icon={Download}>
            Export
          </Button>
        </div>
        <div className="data-table audit-table">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Event</th>
                <th>Resource</th>
                <th>IP / Session</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "12 Jan 2026, 11:42:18",
                  "Priya Deshmukh",
                  "Student batch submitted",
                  "EDV-BATCH-004821",
                  "103.21.••.184",
                  "Success",
                ],
                [
                  "12 Jan 2026, 11:38:04",
                  "Dr. R. Mehta",
                  "Report exported",
                  "National enrolment AY25",
                  "10.18.••.42",
                  "Success",
                ],
                [
                  "12 Jan 2026, 11:26:51",
                  "System validation",
                  "Anomaly case created",
                  "AN-240184",
                  "Internal workflow",
                  "Created",
                ],
                [
                  "12 Jan 2026, 10:58:33",
                  "Unknown session",
                  "Login attempt blocked",
                  "AICTE Admin Portal",
                  "49.36.••.218",
                  "Blocked",
                ],
                [
                  "12 Jan 2026, 10:42:07",
                  "Scholarship Portal",
                  "Student record accessed",
                  "XXXX-XXXX-4821",
                  "API session ••7192",
                  "Authorized",
                ],
              ].map((r) => (
                <tr key={r[0]}>
                  {r.slice(0, 5).map((x, i) => (
                    <td key={i}>
                      {i === 1 ? (
                        <div className="actor">
                          <span>{x[0]}</span>
                          <strong>{x}</strong>
                        </div>
                      ) : (
                        x
                      )}
                    </td>
                  ))}
                  <td>
                    <Badge
                      tone={
                        r[5] === "Blocked"
                          ? "danger"
                          : r[5] === "Created"
                            ? "info"
                            : "success"
                      }
                    >
                      {r[5]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="immutable-note">
        <LockKeyhole size={16} />
        <span>
          <strong>Audit integrity interface</strong> — This frontend prototype
          demonstrates an immutable-style audit trail; it does not implement
          production immutable storage.
        </span>
      </div>
    </div>
  )
}

function ApiConsole({ notify }: { notify: (s: string) => void }) {
  return (
    <div>
      <PageHeader
        eyebrow="Developer platform"
        title="API Integration Console"
        description="Connect approved institutional systems in a controlled sandbox."
      >
        <Badge tone="warning">Sandbox mode</Badge>
        <Button icon={Plus}>Create API key</Button>
      </PageHeader>
      <div className="integration-cards">
        {[
          ["College ERP API", "Connected", "12 Jan, 11:26", Database],
          [
            "APAAR Services",
            "Pending authorization",
            "Not connected",
            Fingerprint,
          ],
          ["DigiLocker", "Mock integration", "Sandbox only", FileCheck2],
        ].map((c, i) => {
          const I = c[3] as IconType
          return (
            <Card key={c[0] as string} className="integration-card">
              <div className={`integration-icon i${i}`}>
                <I size={22} />
              </div>
              <span>
                <strong>{c[0]}</strong>
                <small>{c[2]}</small>
              </span>
              <Badge tone={i === 0 ? "success" : i === 1 ? "warning" : "info"}>
                {c[1]}
              </Badge>
            </Card>
          )
        })}
      </div>
      <div className="api-layout">
        <Card className="endpoint-list">
          <div className="card-title">Endpoints</div>
          {[
            ["GET", "/v1/students/{id}"],
            ["POST", "/v1/records/verify"],
            ["POST", "/v1/batches"],
            ["GET", "/v1/batches/{ref}"],
            ["GET", "/v1/consent/status"],
          ].map((e, i) => (
            <button className={i === 1 ? "active" : ""} key={e[1]}>
              <b className={e[0].toLowerCase()}>{e[0]}</b>
              <span>{e[1]}</span>
            </button>
          ))}
        </Card>
        <Card className="code-panel">
          <div className="code-tabs">
            <button className="active">Request</button>
            <button>Response</button>
            <span>POST /v1/records/verify</span>
          </div>
          <pre>
            <code>{`curl --request POST \\
  --url https://sandbox.example/v1/records/verify \\
  --header 'Authorization: Bearer ••••••••' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "apaar_id": "XXXX-XXXX-4821",
    "purpose": "enrolment_check",
    "consent_reference": "CNS-260112-0192"
  }'`}</code>
          </pre>
          <div className="code-actions">
            <Button
              variant="secondary"
              icon={RefreshCw}
              onClick={() => notify("Sandbox connection successful • 184 ms")}
            >
              Test connection
            </Button>
            <span>
              Rate limit <strong>842 / 1,000</strong>
            </span>
          </div>
        </Card>
        <Card className="api-side">
          <div className="card-title">API health</div>
          <div className="api-health">
            <strong>99.94%</strong>
            <span>Sandbox uptime</span>
          </div>
          <div className="summary-list">
            <div>
              <span>Requests today</span>
              <strong>18,421</strong>
            </div>
            <div>
              <span>Average latency</span>
              <strong>184 ms</strong>
            </div>
            <div>
              <span>Error rate</span>
              <strong>0.18%</strong>
            </div>
          </div>
          <div className="rate-bar">
            <span>Rate limit usage</span>
            <div className="progress">
              <i style={{ width: "84.2%" }} />
            </div>
            <small>Resets in 18 minutes</small>
          </div>
        </Card>
      </div>
    </div>
  )
}

function DesignSystem() {
  return (
    <div>
      <PageHeader
        eyebrow="Product foundations"
        title="EDUVÉRIFY Design System"
        description="Accessible visual foundations and reusable patterns for a trusted national platform."
      >
        <Badge tone="info">Version 1.0</Badge>
      </PageHeader>
      <div className="design-grid">
        <Card>
          <div className="card-title">Brand identity</div>
          <div className="logo-showcase">
            <Logo />
            <p>AI-Education Data Verification & Unified Record Intelligence</p>
          </div>
        </Card>
        <Card>
          <div className="card-title">Core colours</div>
          <div className="swatches">
            <div className="navy">
              <span>#0B2A5B</span>
              <small>Trust Navy</small>
            </div>
            <div className="saffron">
              <span>#F58220</span>
              <small>Saffron Accent</small>
            </div>
            <div className="green">
              <span>#138808</span>
              <small>Success Green</small>
            </div>
            <div className="surface">
              <span>#F5F7FA</span>
              <small>Canvas</small>
            </div>
          </div>
        </Card>
        <Card>
          <div className="card-title">Typography</div>
          <div className="type-samples">
            <div className="display-sample">National Intelligence</div>
            <div className="title-sample">
              Student data, verified responsibly
            </div>
            <p>
              Inter is used for clear, accessible reading across dense
              operational interfaces.
            </p>
          </div>
        </Card>
        <Card>
          <div className="card-title">Interface components</div>
          <div className="component-samples">
            <div>
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Tertiary</Button>
            </div>
            <div>
              <Badge tone="success">Verified</Badge>
              <Badge tone="warning">Pending</Badge>
              <Badge tone="danger">Action required</Badge>
              <Badge tone="info">Information</Badge>
            </div>
          </div>
        </Card>
        <Card className="span-two">
          <div className="card-title">Principles</div>
          <div className="principles">
            <div>
              <ShieldCheck />
              <strong>Trust by design</strong>
              <span>Make verification state and provenance explicit.</span>
            </div>
            <div>
              <Eye />
              <strong>Explain every signal</strong>
              <span>AI supports decisions; people remain accountable.</span>
            </div>
            <div>
              <LockKeyhole />
              <strong>Privacy, minimized</strong>
              <span>Share only what is authorized and necessary.</span>
            </div>
            <div>
              <Activity />
              <strong>Clarity at scale</strong>
              <span>Turn complex national data into actionable insight.</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Login({ go }: { go: (p: Page) => void }) {
  const [role, setRole] = useState("Institution")
  const [loading, setLoading] = useState(false)
  return (
    <div className="login-page">
      <div className="login-brand-panel">
        <Logo />
        <div className="login-message">
          <Badge tone="info">Smart India Hackathon 2026 Prototype</Badge>
          <div>
            Trusted education data.
            <br />
            <span>Verified responsibly.</span>
          </div>
          <p>
            A unified intelligence layer for accurate, explainable and
            privacy-respecting student records.
          </p>
          <div className="benefits">
            <span>
              <ShieldCheck />
              Purpose-limited verification
            </span>
            <span>
              <Sparkles />
              Explainable anomaly detection
            </span>
            <span>
              <Activity />
              National data clarity
            </span>
          </div>
        </div>
        <div className="network-art">
          <div className="network-center">
            <ShieldCheck />
          </div>
          {[1, 2, 3, 4, 5].map((n) => (
            <i key={n} className={`node n${n}`}>
              <Building2 />
            </i>
          ))}
        </div>
        <small>
          All content uses synthetic demonstration data. No external government
          system is connected.
        </small>
      </div>
      <div className="login-form-panel">
        <div className="login-mobile-logo">
          <Logo />
        </div>
        <div className="login-card">
          <div className="login-title">Welcome to EDUVÉRIFY</div>
          <p>Choose your portal and sign in to continue.</p>
          <div className="role-tabs">
            {["AICTE Admin", "Institution", "Verifier", "Student"].map((r) => (
              <button
                className={role === r ? "active" : ""}
                onClick={() => setRole(r)}
                key={r}
              >
                {r}
              </button>
            ))}
          </div>
          <label className="field-label">
            {role === "Institution"
              ? "Institution ID / email"
              : "Email or user ID"}
          </label>
          <div className="text-input">
            <Building2 size={17} />
            <input defaultValue="admin@vjti.demo.in" />
          </div>
          <label className="field-label">Password</label>
          <div className="text-input">
            <LockKeyhole size={17} />
            <input type="password" defaultValue="prototype123" />
            <Eye size={17} />
          </div>
          <div className="login-options">
            <label>
              <input type="checkbox" defaultChecked />
              Remember me
            </label>
            <button>Forgot password?</button>
          </div>
          <Button
            className="full-btn"
            disabled={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(
                () => go(role === "Institution" ? "institution" : "dashboard"),
                700,
              )
            }}
          >
            {loading ? (
              <>
                <RefreshCw className="spin" />
                Signing in securely…
              </>
            ) : (
              "Sign in securely"
            )}
          </Button>
          <div className="or">
            <span>AUTHORIZED OPTIONS</span>
          </div>
          <Button className="full-btn" variant="secondary" icon={Fingerprint}>
            Continue with DigiLocker <small>Where authorized</small>
          </Button>
          <div className="login-links">
            Help & support <span>•</span> Privacy <span>•</span> Accessibility
          </div>
        </div>
      </div>
    </div>
  )
}

function AppShell({
  page,
  setPage,
  children,
}: {
  page: Page
  setPage: (p: Page) => void
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  return (
    <div className={`app-shell ${collapsed ? "collapsed" : ""}`}>
      <aside className={mobileOpen ? "mobile-open" : ""}>
        <div className="sidebar-brand">
          <Logo compact={collapsed} />
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <PanelLeftClose size={18} />
          </button>
        </div>
        <div className="portal-label">
          {!collapsed && (
            <>
              <span>AICTE</span>
              <small>National Portal</small>
            </>
          )}
        </div>
        <nav>
          {navItems.map(({ page: p, label, icon: I }) => (
            <button
              key={p}
              className={
                page === p || (p === "records" && page === "profile")
                  ? "active"
                  : ""
              }
              onClick={() => {
                setPage(p)
                setMobileOpen(false)
              }}
              title={label}
            >
              <I size={19} />
              {!collapsed && <span>{label}</span>}
              {label === "Anomaly Center" && !collapsed && <b>42</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={() => setPage("login")}>
            <LogOut size={18} />
            {!collapsed && <span>Exit demo</span>}
          </button>
          <div className="system-status">
            <i />
            {!collapsed && (
              <span>
                <strong>Systems operational</strong>
                <small>Prototype environment</small>
              </span>
            )}
          </div>
        </div>
      </aside>
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}
      <header>
        <button className="mobile-menu" onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>
        <div className="header-portal">
          <strong>AICTE / Institutional Portal</strong>
          <span>Sample data environment</span>
        </div>
        <div className="top-actions">
          <SelectBox>
            English <span className="lang-alt">हिन्दी · தமிழ்</span>
          </SelectBox>
          <IconButton icon={CircleHelp} label="Help and support" />
          <IconButton icon={Bell} label="Notifications" badge />
          <div className="user-menu-wrap">
            <button
              className="user-menu"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span>RM</span>
              <div>
                <strong>Dr. Rajiv Mehta</strong>
                <small>AICTE Administrator</small>
              </div>
              <ChevronDown size={15} />
            </button>
            {profileOpen && (
              <div className="profile-popover">
                <button>
                  <UserCog />
                  Profile & preferences
                </button>
                <button onClick={() => setPage("design")}>
                  <Settings />
                  Design system
                </button>
                <button onClick={() => setPage("login")}>
                  <LogOut />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("dashboard")
  const [toast, setToast] = useState("")
  const notify = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(""), 3200)
  }
  const content = useMemo(() => {
    switch (page) {
      case "dashboard":
        return <Dashboard go={setPage} />
      case "institution":
        return <InstitutionDashboard go={setPage} />
      case "upload":
        return <UploadWizard go={setPage} notify={notify} />
      case "anomaly":
        return <AnomalyCenter notify={notify} />
      case "records":
        return <RecordsExplorer go={setPage} />
      case "profile":
        return <StudentProfile go={setPage} />
      case "verify":
        return <VerificationPortal go={setPage} notify={notify} />
      case "certificate":
        return <Certificate go={setPage} />
      case "consent":
        return <ConsentCenter notify={notify} />
      case "reports":
        return <Reports />
      case "admin":
        return <AdminAudit />
      case "api":
        return <ApiConsole notify={notify} />
      case "design":
        return <DesignSystem />
      default:
        return null
    }
  }, [page])
  if (page === "login")
    return (
      <>
        <Login go={setPage} />
        {toast && (
          <div className="toast">
            <CheckCircle2 />
            {toast}
          </div>
        )}
      </>
    )
  return (
    <AppShell page={page} setPage={setPage}>
      {content}
      {toast && (
        <div className="toast">
          <CheckCircle2 />
          {toast}
        </div>
      )}
    </AppShell>
  )
}
