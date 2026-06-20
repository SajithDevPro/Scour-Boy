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

      const systemPrompt = `You are a professional football coach and player development expert.
Your job is to analyze football player videos and produce a structured, actionable progression report.
Users are not analysts. They are players seeking identity, truth, and improvement.
So the system must prioritize emotional clarity + actionable improvement over statistical depth.

Output MUST follow 3 layers: Identity, Reality, Growth.
No fantasy archetypes like "Ice Cold Killer". No cinematic storytelling. No over-complex stats.
Must feel like a professional coach + player development app.

You must output valid JSON matching the following structure exactly (no markdown formatting outside the JSON, just pure JSON).
If exact values cannot be computed from video, estimate conservatively.

{
  "overallRating": 78,
  "identity": {
    "archetype": "Progressive Playmaker",
    "role": "Central Midfielder",
    "summary": "A composed distributor who dictates the tempo and breaks lines with precision.",
    "comparisonPlayer": "Martin Ødegaard",
    "comparisonReason": "Shares the tendency to drop into half-spaces to orchestrate build-up play."
  },
  "reality": {
    "attributes": {
      "technical": 82,
      "tactical": 75,
      "physical": 68,
      "mental": 80,
      "creativity": 85,
      "defensive": 60,
      "attacking": 77,
      "consistency": 70
    },
    "strengths": [
      "Excellent vision and execution of line-breaking passes under pressure",
      "Consistent scanned awareness before receiving the ball"
    ],
    "weaknesses": [
      "Lacks physical presence in 50/50 ground duels",
      "Tendency to hold the ball too long when direct counter-attacking options are available"
    ],
    "tacticalIntelligence": "Understands spatial dynamics well, frequently finding pockets between midfield and defensive lines.",
    "decisionMaking": "Strong distribution choices under low pressure, but occasionally rushes final-third actions when closed down quickly."
  },
  "growth": {
    "priorities": [
      {
        "focus": "Physical Duel Retention",
        "drill": "Back-to-goal shielding drills with active resistance",
        "matchScenario": "Holding off trailing defenders when receiving progressive passes",
        "timeframe": "4-6 Weeks"
      }
    ],
    "nextLevelUnlock": "Mastering physical shielding and quicker ball circulation will elevate overall match control, advancing the player from a situational playmaker to a reliable central pivot."
  },
  "key_moments": [
    {
      "timestamp": "00:15",
      "problem": "Defender read your movement due to telegraphed pass",
      "solution": "Attack outside space first to shift defender weight",
      "training": "1v1 attacking transitions focusing on feints",
      "elite_reference": "watch how Bernardo Silva solves this by freezing the defender with a subtle pause"
    }
  ],
  "development_plan": [
    {
      "phase": "Month 1",
      "focus": "Decision making under pressure",
      "drills": ["Rondos", "Small-sided games with immediate numerical disadvantage"]
    }
  ],
  "coach_message": "Your dribbling score is solid, but your final decision after beating defenders needs work. Let's focus on unlocking your full potential.",
  "matchReplay": {
    "moments": [
      {
        "timestamp_start": "00:07",
        "timestamp_end": "00:10",
        "type": "decision",
        "situation": "1v1 attacking scenario",
        "user_action": "Inside cut attempted",
        "problem": "Defender predicted movement",
        "better_decision": "Exploit outside lane with acceleration",
        "elite_reference": "Bernardo Silva",
        "coaching_overlay": [
          "Scan before receiving",
          "Delay defender commitment",
          "Change rhythm before direction"
        ],
        "severity": 72
      }
    ]
  },
  "coach_memory_summary": {
    "player_progress_analysis": "You have shown a +6% improvement in your dribbling execution since last match, but decision-making has regressed slightly under pressure.",
    "repeating_mistakes": [
      "Attacking the inside channel when the outside is open"
    ],
    "improvement_areas": [
      "Dribbling success rate in final third"
    ],
    "next_priority_focus": "Decision making under pressure",
    "confidence_trend": "improving"
  },
  "academy_plan": {
    "weekly_focus": "Decision Making Under Pressure",
    "modules": [
      {
        "title": "Scanning Before Receiving",
        "type": "awareness",
        "duration": "10 min",
        "goal": "Improve first touch awareness",
        "drill": "Wall pass + shoulder scan every 2 seconds before reception",
        "game_application": "Improves midfield control under pressure and pre-plans next action",
        "difficulty": 3
      },
      {
        "title": "Half-Turn Reception",
        "type": "technical",
        "duration": "15 min",
        "goal": "Receive the ball ready to play forward",
        "drill": "Receive firm passes from a wall or partner on the back foot, open body to the field",
        "game_application": "Evade incoming pressure from behind and quickly transition to attack",
        "difficulty": 4
      }
    ],
    "match_transfer_tasks": [
      "Attempt 5 physical shoulder scans before every reception",
      "Avoid first-touch directional mistakes in central midfield"
    ],
    "progress_conditions": [
      "Complete 3 sessions before next match analysis",
      "Show 15% reduction in pressured turnovers"
    ]
  },
  "community_layer": {
    "global_rank": 1240,
    "tier": "Semi-Pro Contender",
    "improvement_rank": "Top 18% this week",
    "challenge_score": 82
  },
  "comparison_engine": {
    "matched_players": [
      {
        "name": "Alex R. (Semi-Pro)",
        "ovr": 81,
        "gap_analysis": {
          "strength_gap": ["Decision speed under pressure (+12% ahead)"],
          "advantage": ["Close ground control (+5% better)"]
        }
      }
    ]
  },
  "share_assets": {
    "highlight_card": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
    "mistake_clip": "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    "progress_badge": "https://images.unsplash.com/photo-1526232549926-21ceef1c7dd9?q=80&w=600&auto=format&fit=crop"
  }
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