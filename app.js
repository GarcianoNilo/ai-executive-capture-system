// ============================================
// AI Executive Capture — app.js
// Handles: mobile nav, the hero's live capture
// feed demo, and form submission to the
// Make.com webhook.
// ============================================

// ---- Configuration ----
// Replace this with your own Make.com webhook URL if you rebuild the scenario.
const webhookUrl = "https://hook.us2.make.com/bsr9hv7txb8j0o82fbaj23ztsfli12nr";

// ---- Mobile navigation toggle ----
(function initMobileNav() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close the mobile menu once a link is tapped
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

// ---- Live capture feed (hero demo) ----
// Cycles through example inputs and their AI classification
// to show the pipeline in action before a visitor reads a word.
(function initCaptureFeed() {
  const inputEl = document.getElementById("capture-input");
  const outputEl = document.getElementById("capture-output");
  if (!inputEl || !outputEl) return;

  const examples = [
    {
      input: "note to self: call the vendor about the invoice discrepancy tomorrow morning",
      output: "Type: Task · Priority: High · Due: Tomorrow",
    },
    {
      input: "sarah mentioned she wants a follow-up on the Q3 proposal by friday",
      output: "Type: Follow-up · Contact: Sarah · Due: Friday",
    },
    {
      input: "[voice note, 0:42] idea for simplifying the onboarding flow",
      output: "Type: Idea · Tag: Product · Priority: Medium",
    },
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;

  function render(i) {
    inputEl.textContent = `> ${examples[i].input}`;
    outputEl.textContent = examples[i].output;
  }

  render(0);

  // Keep the panel static for visitors who prefer reduced motion
  if (prefersReducedMotion) return;

  setInterval(() => {
    inputEl.classList.add("is-hidden");
    outputEl.classList.add("is-hidden");

    setTimeout(() => {
      index = (index + 1) % examples.length;
      render(index);
      inputEl.classList.remove("is-hidden");
      outputEl.classList.remove("is-hidden");
    }, 500);
  }, 4000);
})();

// ---- Capture form submission ----
(function initCaptureForm() {
  const form = document.getElementById("capture-form");
  const submitBtn = document.getElementById("submit-btn");
  const errorEl = document.getElementById("form-error");
  const successEl = document.getElementById("success-message");
  const sendAnotherBtn = document.getElementById("send-another-btn");
  if (!form || !submitBtn || !errorEl || !successEl || !sendAnotherBtn) return;

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  }

  function clearError() {
    errorEl.classList.add("hidden");
    errorEl.textContent = "";
  }

  function showSuccess() {
    form.classList.add("hidden");
    successEl.classList.remove("hidden");
  }

  function resetToForm() {
    form.reset();
    clearError();
    successEl.classList.add("hidden");
    form.classList.remove("hidden");
    document.getElementById("message").focus();
  }

  // Let people send another message without reloading the page
  sendAnotherBtn.addEventListener("click", resetToForm);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError();

    const messageField = document.getElementById("message");
    const audioField = document.getElementById("audio");

    if (!messageField.value.trim()) {
      showError("Add a message before submitting.");
      messageField.focus();
      return;
    }

    if (webhookUrl.includes("PASTE_WEBHOOK_URL_HERE")) {
      showError("Webhook URL is not configured yet.");
      return;
    }

    const formData = new FormData();
    formData.append("message", messageField.value.trim());
    formData.append("timestamp", new Date().toISOString());
    formData.append("source", "Web Landing Page");

    if (audioField.files && audioField.files[0]) {
      formData.append("audio", audioField.files[0]);
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Capturing...";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      showSuccess();
    } catch (error) {
      showError("Something went wrong. Please try again in a moment.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
})();
