# Google Form Structure: KineticMCP Founding Partners (EN)

**Goal:** Disqualify small/unprepared leads and prioritize Enterprise-ready organizations for the "Founding Partner" program (30 slots).

## 1. Header Image & Settings
*   **Header Image:** Use a clean, dark-themed image with the KineticMCP logo.
*   **Title:** KineticMCP - Founding Partners Application
*   **Description:**
    > "We are accepting 30 visionary organizations to shape the roadmap of KineticMCP Enterprise in Q2 2025.
    >
    > **The Offer:**
    > - 50% Lifetime Discount on Enterprise Licensing
    > - White-glove installation support
    > - Direct roadmap influence via monthly board calls
    >
    > *Please fill this out only if you are ready to deploy a Docker-based agentic middleware in your own infrastructure (AWS/Azure/On-Prem) within the next 90 days.*"

## 2. Section: About You (Contact Info)
*   **Email** (Auto-collected)
*   **First Name & Last Name** (Short Answer)
*   **Job Title** (Short Answer)
    *   *Note: We are looking for CTOs, VPs of Engineering, or Salesforce Architects.*
*   **Company Name** (Short Answer)
*   **LinkedIn Profile URL** (Short Answer)
    *   *Validation: Must be a URL.*

## 3. Section: Technical Qualification (Kill Switch)
*   **Which CRM is your 'System of Record'?** (Multiple Choice)
    *   [ ] Salesforce (Qualified)
    *   [ ] HubSpot (Waitlist)
    *   [ ] Zoho / Dynamics / Other (Disqualified/Waitlist)
*   **How do you plan to host KineticMCP?** (Multiple Choice)
    *   *Remember: We do not host it for you.*
    *   [ ] AWS VPC
    *   [ ] Azure Private Cloud
    *   [ ] Google Cloud Platform
    *   [ ] On-Premise / Data Center (Linux/Kubernetes)
    *   [ ] On-Premise (Windows Server + Docker Desktop)
    *   [ ] We prefer a SaaS solution (Waitlist for Managed Cloud)

## 4. Section: Use Case & Urgency
*   **What is the primary Agentic workflow you want to build?** (Paragraph)
    *   *Prompt: "e.g., An agent that reads support emails, checks Salesforce Service Cloud for SLA status, and drafts a reply."*
*   **What is your target deployment timeline?** (Multiple Choice)
    *   [ ] Immediately / Q2 2025 (High Priority)
    *   [ ] Q2 2025
    *   [ ] Just researching / No active project (Low Priority)

## 5. Section: Enterprise Fit
*   **What comes closest to your Company Size?** (Multiple Choice)
    *   [ ] 1-10 employees (Low Priority - likely cannot afford Enterprise)
    *   [ ] 11-50 employees
    *   [ ] 51-200 employees
    *   [ ] 201-1000 employees
    *   [ ] 1000+ employees
*   **Do you have an internal technical team (DevOps/Developers)?** (Yes/No)
    *   *Context: KineticMCP is a developer tool. You need someone to run `docker compose` or manage K8s clusters.*
*   **What is your expected deployment scale?** (Multiple Choice)
    *   [ ] Single Instance (Standard)
    *   [ ] Multi-node / Kubernetes Cluster (High Availability/High Load)
    *   [ ] Multi-tenant (Different instances for different departments/permissions)

## 6. Confirmation Message (Thank You Page)
> "Thank you for applying. We are reviewing applications on a rolling basis.
>
> If your profile matches our Founding Partner criteria, you will receive a calendar invite for a **Technical Onboarding Call** within 48 hours.
>
> In the meantime, you can read our [Documentation](https://kineticmcp.github.io/en/how-it-works/)."
