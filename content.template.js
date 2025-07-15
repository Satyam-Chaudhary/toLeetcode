const questionMap = {
  "majority-element": "majority-element",
  "palindrome-string": "valid-palindrome",
  "maximum-unsorted-subarray": "shortest-unsorted-continuous-subarray",
  "kth-row-of-pascals-triangle": "pascals-triangle-ii",
  // Add more mappings here
};

const GOOGLE_API_KEY = "__GOOGLE_API_KEY__";
const CSE_ID = "__CSE_ID__";

(async function () {
  console.log("✅ Extension loaded");

  const pathSlug = window.location.pathname.split("/")[2];
  const titleElement = await waitForTitleElement();
  if (!titleElement) return;

  const title = titleElement.innerText.trim();
  console.log("🧠 Title found:", title);

  if (document.getElementById("leetcode-btn")) return;

  if (questionMap[pathSlug]) {
    const leetLink = `https://leetcode.com/problems/${questionMap[pathSlug]}`;
    addLeetCodeButton(leetLink, true, titleElement);
  } else {
    const query = encodeURIComponent(`${title} site:leetcode.com/problems`);
    const fallbackLink = `https://www.google.com/search?q=${query}`;
    try {
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${query}&key=${GOOGLE_API_KEY}&cx=${CSE_ID}`
      );
      const data = await res.json();
      if (data.items?.length > 0) {
        addDropdown(data.items.slice(0, 3), titleElement);
      } else {
        addLeetCodeButton(fallbackLink, false, titleElement);
      }
    } catch (err) {
      console.error("CSE Fetch Error:", err);
      addLeetCodeButton(fallbackLink, false, titleElement);
    }
  }

  async function waitForTitleElement(timeout = 5000) {
    const interval = 100;
    const maxTries = timeout / interval;
    let tries = 0;
    while (tries++ < maxTries) {
      const el = document.querySelector("h1.p-tile__title") || document.querySelector("h1");
      if (el) return el;
      await new Promise((res) => setTimeout(res, interval));
    }
    console.warn("❌ Title element not found.");
    return null;
  }

  function addLeetCodeButton(link, isExact, container) {
    const btn = document.createElement("a");
    btn.href = link;
    btn.target = "_blank";
    btn.id = "leetcode-btn";
    btn.title = isExact ? "Go to LeetCode" : "Search on LeetCode";

    const icon = document.createElement("img");
    icon.src = "https://leetcode.com/favicon.ico";
    icon.alt = "LeetCode";
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.verticalAlign = "middle";

    btn.appendChild(icon);
    btn.style.cssText = `
      margin-left: 12px;
      padding: 6px;
      background: ${isExact ? "#e0ffe0" : "#f0f0f0"};
      border: 1px solid #ccc;
      border-radius: 6px;
      display: inline-block;
      text-decoration: none;
      cursor: pointer;
      z-index: 99999;
    `;
    container.appendChild(btn);
  }

  function addDropdown(items, container) {
    const dropdown = document.createElement("div");
    dropdown.id = "leetcode-dropdown";
    dropdown.style.cssText = `
      margin-top: 10px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      max-width: 500px;
      z-index: 99999;
    `;

    const label = document.createElement("strong");
    label.textContent = "Possible LeetCode Matches:";
    dropdown.appendChild(label);

    items.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.link;
      link.target = "_blank";
      link.innerText = item.title;
      link.style.cssText = `
        display: block;
        margin-top: 8px;
        color: #0645AD;
      `;
      dropdown.appendChild(link);
    });

    container.parentElement.appendChild(dropdown);
  }
})();
