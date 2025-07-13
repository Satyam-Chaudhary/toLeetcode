# 🔗 InterviewBit → LeetCode Extension

This Chrome Extension adds a **LeetCode redirect/search button** next to every InterviewBit problem.  
If a direct mapping exists, it links directly to the LeetCode version. Otherwise, it fetches the **top 3 relevant LeetCode problems using Google Programmable Search**.

---

Preview

- Site -> [InterviewBit Site](https://www.interviewbit.com/problems/majority-element/?study_plan=study-plan-3-months&/)

- ![Main](pictures/main.png)

---

## 🚀 Features

- ✅ **Smart mapping** of InterviewBit → LeetCode questions  
- 🔍 **Fallback using Google Programmable Search** (top 3 results)  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Fallback](pictures/fallback.png)  
- 🎯 **Clean UI** with a LeetCode logo icon button  
- 📎 Works directly on **InterviewBit problem pages**

---

## 🛠️ Installation (Developer Mode)

1. **Clone or download** this repo  
2. Create a .env folder and add your api keys
   ```js
   const GOOGLE_API_KEY = "your-api-key";
   const CSE_ID = "your-cse-id";

## ▶️ How to Run

```bash
npm install
npm run build