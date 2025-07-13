const questionMap = {
  "majority-element": "majority-element",
  "palindrome-string": "valid-palindrome",
  "maximum-unsorted-subarray": "shortest-unsorted-continuous-subarray",
  "two-sum": "two-sum",
  "3-sum": "3sum",
  "4-sum": "4sum",
  "subset": "subsets",
  "subsets-ii": "subsets-ii",
  "next-permutation": "next-permutation",
  "merge-intervals": "merge-intervals",
  "insert-interval": "insert-interval",
  "search-in-rotated-sorted-array": "search-in-rotated-sorted-array",
  "longest-palindromic-substring": "longest-palindromic-substring",
  "valid-sudoku": "valid-sudoku",
  "spiral-order-matrix": "spiral-matrix",
  "rotate-image": "rotate-image",
  "word-ladder": "word-ladder",
  "minimum-window-substring": "minimum-window-substring",
  "combination-sum": "combination-sum",
  "distinct-subsequences": "distinct-subsequences"
};

const GOOGLE_API_KEY = "__GOOGLE_API_KEY__"; 
const CSE_ID = "__CSE_ID__"; 

(function () {
  const pathSlug = window.location.pathname.split("/")[2];
  const title = document.querySelector("h1.p-tile__title")?.innerText.trim();
  const container = document.querySelector("h1.p-tile__title");

  if (!container || !title || document.getElementById("leetcode-btn")) return;

  if (questionMap[pathSlug]) {
    const leetLink = `https://leetcode.com/problems/${questionMap[pathSlug]}`;
    addButton(leetLink, true);
  } else {
    const query = encodeURIComponent(`${title} site:leetcode.com/problems`);
    fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&key=${GOOGLE_API_KEY}&cx=${CSE_ID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items || data.items.length === 0) {
          addButton("https://www.google.com/search?q=" + query, false);
          return;
        }
        addDropdown(data.items.slice(0, 3));
      })
      .catch((err) => {
        console.error("CSE Fetch Failed:", err);
        addButton("https://www.google.com/search?q=" + query, false);
      });
  }

  function addButton(link, isExact) {
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
    `;

    container.appendChild(btn);
  }

  function addDropdown(items) {
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
    `;

    const label = document.createElement("strong");
    label.textContent = "Possible LeetCode Matches:";
    dropdown.appendChild(label);

    items.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.link;
      link.target = "_blank";
      link.innerText = item.title;
      link.style.display = "block";
      link.style.marginTop = "8px";
      link.style.color = "#0645AD";
      dropdown.appendChild(link);
    });

    container.parentElement.appendChild(dropdown);
  }
})();
