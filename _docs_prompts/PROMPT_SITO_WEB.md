# Prompt per la Generazione del Sito Web KineticMCP

Copia e incolla questo prompt quando aprirai il repository del sito web (quello con il template Jekyll già pronto).

---

**Role:** Expert Web Developer & Jekyll Theme Specialist.

**Context:**
I am providing you with a repository that contains a **fully configured Jekyll template**. Do NOT create a new project. Your task is to modify this existing template to transform it into the official website for **KineticMCP**.

**Technical Note:** The project uses **Tailwind CSS**.

**Input Resources:**
1.  **Current Codebase:** The Jekyll template files present in this repository.
2.  **UI Kit (`_ui-kit.html`):** A file containing pre-built HTML blocks styled with Tailwind. **You MUST use these existing blocks** for the layout components (Hero, Features, Pricing, etc.) instead of creating new HTML structures from scratch.
3.  **Content File:** Look for a file named `LANDING_COPY.md` (or similar) in this repository. It contains the exact text/copy to be used for the Home page, Features, and Documentation sections.

**Instructions:**
1.  **Analyze the Template:** Understand the existing structure (`_layouts`, `_includes`, `_config.yml`).
2.  **HTML/UI Construction:**
    *   Open `_ui-kit.html` and identify the relevant blocks for a SaaS/Tool landing page.
    *   Implement these blocks into the Jekyll layouts (e.g., `default.html` or `home.html`).
3.  **Apply Content:** Replace the placeholder text in those blocks with the content from the provided copy file.
4.  **Navigation & Branding:**
    *   **Menu & Footer:** Completely rewrite the navigation links and footer links. They must point to relevant KineticMCP sections (e.g., "Installation", "Docs", "GitHub") effectively replacing the template's original links.
    *   Update the `_config.yml` with KineticMCP metadata (Title, Description).
    *   Adjust the color palette if necessary to match a "Kinetic/AI" aesthetic (High-tech, speed, reliability).
5.  **Structure:** Ensure the following pages are correctly set up:
    *   **Home:** Hero section + Value Props + "How it works".
    *   **Docs/Guide:** A simple page or section explaining the installation.
    *   **GitHub Link:** Ensure there is a prominent CTA pointing to the GitHub Repo.

**Constraints:**
*   Preserve the Jekyll build structure (do not break the build).
*   **Strictly use Tailwind CSS** as defined in the project.
*   **Reuse code:** Prioritize using blocks from `_ui-kit.html`.

**Action:**
Start by analyzing the repository structure, the `_ui-kit.html`, and the content file, then propose the plan of changes.
