// import dotenv from "dotenv";
// dotenv.config();

// console.log("API KEY:", process.env.GEMINI_API_KEY);

// import express from "express";
// import path from "path";
// import multer from "multer";
// import os from "os";
// import fs from "fs";
// import { createServer as createViteServer } from "vite";
// import { GoogleGenAI } from "@google/genai";

// async function startServer() {
//   const app = express();
//   const PORT = 3000;

//   const upload = multer({ dest: os.tmpdir() });

//   // Initialize Gemini
//   let ai: GoogleGenAI | null = null;
//   try {
//     if (process.env.GEMINI_API_KEY) {
//       ai = new GoogleGenAI({
//         apiKey: process.env.GEMINI_API_KEY,
//         httpOptions: {
//           headers: {
//             'User-Agent': 'aistudio-build',
//           }
//         }
//       });
//     }
//   } catch (err) {
//     console.error("Gemini failed to initialize", err);
//   }

//   app.use(express.json());

//   app.post("/api/analyze", upload.single("video"), async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ error: "No video file provided" });
//       }

//       const file = req.file;

//       if (!ai) {
//         return res.status(500).json({ error: "Gemini AI not initialized. Check API key." });
//       }

//       console.log(`Uploading file ${file.path} to Gemini...`);
//       const uploadResult = await ai.files.upload({
//         file: file.path,
//         config: {
//           mimeType: file.mimetype,
//         }
//       });
//       console.log(`Uploaded as ${uploadResult.name}. Waiting for processing...`);

//       let uploadedFile = await ai.files.get({ name: uploadResult.name });
//       while (uploadedFile.state === 'PROCESSING') {
//         console.log(`File state: PROCESSING. Waiting...`);
//         await new Promise((r) => setTimeout(r, 3000));
//         uploadedFile = await ai.files.get({ name: uploadResult.name });
//       }
//       if (uploadedFile.state === 'FAILED') {
//         throw new Error('Video processing failed on Gemini server.');
//       }

//       console.log("File is ready. Generating analysis...");

//       const systemPrompt = `You are an elite world-class AI football performance analyst and tactical coach.
// Your job is to analyze football player videos with extreme depth, realism, and professional coaching intelligence.
// You do NOT give generic motivational advice.
// You analyze the player like a real elite academy scout from clubs like Real Madrid, Barcelona, Manchester City, Bayern Munich, or PSG.

// You must output valid JSON matching the following structure exactly (no markdown formatting outside the JSON, just pure JSON):
// {
//   "overallRating": 88,
//   "archetype": "The Deep-Lying Catalyst",
//   "position": "CF/F9",
//   "weakFoot": 4, 
//   "confidence": 90,
//   "aggression": 75,
//   "flair": 85,
//   "radar": {
//     "dribbling": 85,
//     "pace": 80,
//     "agility": 82,
//     "tacticalIQ": 92,
//     "passing": 88,
//     "finishing": 84,
//     "composure": 86,
//     "creativity": 90
//   },
//   "threatAnalysis": {
//     "dangerous": ["Strengths/weapons"],
//     "exploitable": ["Weaknesses/flaws"]
//   },
//   "comparison": {
//     "player": "Karim Benzema",
//     "reason": "Matches Benzema's drop-deep efficiency with De Jong's ability to drive through midfields.",
//     "similarity": 85
//   },
//   "footballDNA": ["Fearless Dribbler", "Tactical Controller"],
//   "evolutionRoadmap": [
//     { "day": "Day 1-10", "focus": "Reaction Speed", "drill": "High-intensity rondos..." },
//     { "day": "Day 11-20", "focus": "Lateral Agility", "drill": "Isometric hip stabilizers..." },
//     { "day": "Day 21-30", "focus": "The False-9 Pivot", "drill": "3-man bounce pass sequence..." }
//   ],
//   "scoutVerdict": "Cinematic summary...",
//   "weakFootDevelopment": 45,
//   "milestones": ["Milestone 1", "Milestone 2"],
//   "potentialCeiling": 94,
//   "discipline": 88,
//   "mentality": 92,
//   "clutchFactor": 85,
//   "badges": ["Ice Cold Finisher", "Tactical Monster", "Press Resistant"],
//   "heatmap": {
//     "dominantSide": "Left/Right/Central",
//     "attackingPreference": "Half spaces / touchline / central",
//     "zones": ["Zone 14", "Left Half-Space", "Right Wing"]
//   },
//   "predictedGrowth": 4
// }

// The tone must feel:
// - elite
// - cinematic
// - high-performance
// - academy-level
// - brutally honest but motivating
// `;

//       const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 fileData: {
//                   fileUri: uploadResult.uri || uploadResult.name,
//                   mimeType: file.mimetype
//                 }
//               },
//               {
//                 text: "Analyze this football player's performance according to the system instructions and return a JSON object."
//               }
//             ]
//           }
//         ],
//         config: {
//           systemInstruction: systemPrompt,
//           responseMimeType: "application/json"
//         }
//       });

//       console.log("Analysis complete. Cleaning up file...");

//       // Clean up from local
//       fs.unlink(file.path, (err) => {
//         if (err) console.error("Error removing local temp file:", err);
//       });
//       // Clean up from Gemini
//       try {
//         await ai.files.delete({ name: uploadResult.name });
//       } catch (err) {
//         console.error("Failed to delete from Gemini server", err);
//       }

//       res.json({ report: response.text });

//     } catch (error: any) {
//       console.error("Error analyzing video:", error);
//       res.status(500).json({ error: error.message || "An error occurred during analysis." });
//     }
//   });

//   // Vite middleware for development
//   if (process.env.NODE_ENV !== "production") {
//     const vite = await createViteServer({
//       server: { middlewareMode: true },
//       appType: "spa",
//     });
//     app.use(vite.middlewares);
//   } else {
//     const distPath = path.join(process.cwd(), 'dist');
//     app.use(express.static(distPath));
//     app.get('*', (req, res) => {
//       res.sendFile(path.join(distPath, 'index.html'));
//     });
//   }

//   app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

// startServer();

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

console.log("API KEY LOADED:", !!process.env.GEMINI_API_KEY);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // safer upload folder (NOT os.)tmpdir
  const upload = multer({
    dest: path.join(process.cwd(), "uploads"),
    limits: { fileSize: 25 * 1024 * 1024 } // 25MB safety
  });

  let ai: GoogleGenAI | null = null;

  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  app.use(express.json());

  // -------------------------------
  // 🔁 RETRY HELPERS
  // -------------------------------

  const sleep = (ms: number) =>
    new Promise((r) => setTimeout(r, ms));

  async function retry<T>(fn: () => Promise<T>, retries = 3) {
    let lastErr;
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        console.log(`Retry ${i + 1}/${retries} failed`);
        await sleep(1500 * (i + 1));
      }
    }
    throw lastErr;
  }

  // -------------------------------
  // API ROUTE
  // -------------------------------
  app.post("/api/analyze", upload.single("video"), async (req, res) => {
    let file = req.file;

    try {
      if (!file) {
        return res.status(400).json({ error: "No video file provided" });
      }

      if (!ai) {
        return res.status(500).json({ error: "Gemini AI not initialized" });
      }

      console.log("Uploading video:", file.path);

      // ✅ FIX 1: Retry upload (THIS fixes ECONNRESET)
      const uploadResult = await retry(() =>
        ai.files.upload({
          file: file.path,
          config: { mimeType: file.mimetype }
        })
      );

      console.log("Upload complete:", uploadResult.name);

      // wait for processing
      let uploadedFile = await ai.files.get({ name: uploadResult.name });

      while (uploadedFile.state === "PROCESSING") {
        console.log("Processing...");
        await sleep(3000);
        uploadedFile = await ai.files.get({ name: uploadResult.name });
      }

      if (uploadedFile.state === "FAILED") {
        throw new Error("Video processing failed in Gemini");
      }

//       const systemPrompt = `You are an elite world-class AI football performance analyst and tactical coach.
// Your job is to analyze football player videos with extreme depth, realism, and professional coaching intelligence.
// You do NOT give generic motivational advice.
// You analyze the player like a real elite academy scout from clubs like Real Madrid, Barcelona, Manchester City, Bayern Munich, or PSG.

// You must output valid JSON matching the following structure exactly (no markdown formatting outside the JSON, just pure JSON):
// {
//   "overallRating": 88,
//   "archetype": "The Deep-Lying Catalyst",
//   "position": "CF/F9",
//   "weakFoot": 4, 
//   "confidence": 90,
//   "aggression": 75,
//   "flair": 85,
//   "radar": {
//     "dribbling": 85,
//     "pace": 80,
//     "agility": 82,
//     "tacticalIQ": 92,
//     "passing": 88,
//     "finishing": 84,
//     "composure": 86,
//     "creativity": 90
//   },
//   "threatAnalysis": {
//     "dangerous": ["Strengths/weapons"],
//     "exploitable": ["Weaknesses/flaws"]
//   },
//   "comparison": {
//     "player": "Karim Benzema",
//     "reason": "Matches Benzema's drop-deep efficiency with De Jong's ability to drive through midfields.",
//     "similarity": 85
//   },
//   "footballDNA": ["Fearless Dribbler", "Tactical Controller"],
//   "evolutionRoadmap": [
//     { "day": "Day 1-10", "focus": "Reaction Speed", "drill": "High-intensity rondos..." },
//     { "day": "Day 11-20", "focus": "Lateral Agility", "drill": "Isometric hip stabilizers..." },
//     { "day": "Day 21-30", "focus": "The False-9 Pivot", "drill": "3-man bounce pass sequence..." }
//   ],
//   "scoutVerdict": "Cinematic summary...",
//   "weakFootDevelopment": 45,
//   "milestones": ["Milestone 1", "Milestone 2"],
//   "potentialCeiling": 94,
//   "discipline": 88,
//   "mentality": 92,
//   "clutchFactor": 85,
//   "badges": ["Ice Cold Finisher", "Tactical Monster", "Press Resistant"],
//   "heatmap": {
//     "dominantSide": "Left/Right/Central",
//     "attackingPreference": "Half spaces / touchline / central",
//     "zones": ["Zone 14", "Left Half-Space", "Right Wing"]
//   },
//   "predictedGrowth": 4
// }

// The tone must feel:
// - elite
// - cinematic
// - high-performance
// - academy-level
// - brutally honest but motivating
// `;


const systemPrompt = `You are a professional football technical scout and performance analyst (Hudl / Wyscout level).
Your job is to analyze football player videos and produce a structured, data-driven football modeling dossier.
Stop generating "cinematic fantasy language" and instead simulate real-world scouting methodology used by professional analysts.
Keep tone neutral, precise, technical, and strictly observational. No superhero language or hyped analogies.

You must output valid JSON matching the following structure exactly (no markdown formatting outside the JSON, just pure JSON).
If exact values cannot be computed from video, estimate conservatively and label as "observed tendency" via the numbers (0-100).

{
  "overallRating": 88,
  "roleProfile": "Inverted Winger",
  "position": "RW/LW",
  "tacticalFunction": {
    "pressing": "High-intensity trigger",
    "buildup": "Wide outlet, progressive carrier",
    "transition": "Direct threat in attacking transition"
  },
  "riskProfile": "Medium Tactical Risk",
  "radar": {
    "progressiveCarries": 85,
    "takeOnSuccess": 80,
    "finalThirdEntries": 82,
    "keyPassFreq": 92,
    "pressingSuccess": 88,
    "defensiveRecoveries": 84,
    "duelSuccess": 86,
    "retention": 90
  },
  "observations": [
    "Receives ball on half-turn under pressure in central zones",
    "Frequently attempts 1v1 isolation on right flank",
    "Requires improvement in defensive transition recognition",
    "Demonstrates elite spatial awareness in Phase 2 buildup",
    "Displays consistent ball retention under physical pressure"
  ],
  "tacticalFit": {
    "bestFormations": ["4-3-3", "3-2-4-1"],
    "bestRole": "Wide width holder with license to invert",
    "weakEnvironments": ["Low-block counter-attacking heavy systems"]
  },
  "developmentModel": {
    "skillGap": "Decision making in defensive transition",
    "priorityBlocks": [
      {
        "timeframe": "Short Term (1-3 months)",
        "focus": "Defensive positioning off-ball",
        "action": "Video analysis of pressing triggers"
      }
    ]
  },
  "comparison": {
    "player": "Bernardo Silva",
    "reason": "Matches Silva's retention rate and pressing intensity, though less prominent in central buildup.",
    "similarity": 85
  },
  "heatmap": {
    "dominantSide": "Right Flank",
    "attackingPreference": "Half-spaces / touchline",
    "zones": ["Zone 14", "Right Half-Space"]
  },
  "scoutVerdict": "A technically secure wide player with consistent value in possession phases, but requiring structural protection defensively."
}
`;

      // -------------------------------
      // 🔁 FIX 2: retry Gemini generation
      // -------------------------------
      const response = await retry(() =>
        ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  fileData: {
                    fileUri: uploadResult.uri || uploadResult.name,
                    mimeType: file.mimetype,
                  },
                },
                {
                  text:
                    "Analyze this football video and return ONLY JSON output.",
                },
              ],
            },
          ],
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
          },
        })
      );

      // cleanup local file
      fs.unlink(file.path, () => { });

      // cleanup gemini file
      try {
        await ai.files.delete({ name: uploadResult.name });
      } catch { }

      return res.json({ report: response.text });

    } catch (error: any) {
      console.error("ERROR:", error);

      if (file?.path) {
        fs.unlink(file.path, () => { });
      }

      return res.status(500).json({
        error: error.message || "Analysis failed"
      });
    }
  });

  // -------------------------------
  // VITE DEV SERVER
  // -------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
