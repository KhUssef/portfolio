// The three domains the portfolio is organised around. The projects section filters by these.
export type Domain = "Agentic AI" | "Machine Learning" | "Backend";

export const domains: Domain[] = ["Agentic AI", "Machine Learning", "Backend"];

export type Project = {
  slug: string;
  name: string;
  domain: Domain;
  year: string;
  summary: string;
  highlights: string[];
  tags: string[];
  repo?: string;
  demo?: string;
  featured: boolean;
};

// Each entry renders the project cards. Add a project by adding an object here - never
// hardcode a project in a component.
export const projects: Project[] = [
  {
    slug: "insight-agent",
    name: "Insight Agent",
    domain: "Agentic AI",
    year: "2026",
    summary:
      "An agentic AI data analyst built on the Model Context Protocol: ask a question about a dataset in plain English and the agent plans, runs SQL, and draws charts in a tool-use loop until it can answer with evidence.",
    highlights: [
      "MCP end to end: a standalone MCP server exposes schema inspection, read-only SQL, and chart tools, and the agent host consumes them over the protocol - the same server plugs into Claude Desktop or Cursor.",
      "Plan-call-observe loop written from scratch with no agent framework, with a read-only SQL guard enforced by parsing rather than by trusting the model.",
      "Multi-format ingestion (CSV, Excel, TXT/TSV, JSON, Parquet) into DuckDB, with folder-bound chats so each conversation sees only its own tables.",
      "React web UI streams the run live over Server-Sent Events: execution trace per LLM round, live SQL, charts as they render, and per-run token and effort accounting.",
      "Rubric-based eval harness scores the agent on a fixed question set; 148 tests run without a network or API key, lint and type checks clean, CI on GitHub Actions.",
    ],
    tags: ["Python", "MCP", "DuckDB", "FastAPI", "SSE", "React", "DeepSeek", "pytest"],
    repo: "https://github.com/KhUssef/insight-agent",
    featured: true,
  },
  {
    slug: "quantumboard",
    name: "QuantumBoard",
    domain: "Agentic AI",
    year: "2025",
    summary:
      "A blackboard multi-agent system that turns a natural-language goal into a verified quantum circuit, debugging itself until the measured distribution matches the spec.",
    highlights: [
      "Blackboard architecture: agents never call each other, they read and write shared state while a controller decides who acts next.",
      "Self-verifying loop with statistical verification (total variation distance), a livelock guard, and run budgets.",
      "FastAPI and Server-Sent Events stream the blackboard live to a React frontend.",
      "Blackboard pattern implemented from scratch, with no LangChain or LangGraph. Optional execution on real IBM Quantum hardware.",
    ],
    tags: ["Python", "Multi-agent", "Qiskit", "FastAPI", "SSE", "React", "Pydantic"],
    repo: "https://github.com/KhUssef/quantumborad",
    featured: true,
  },
  {
    slug: "travel-planner",
    name: "Multi-Agent AI Travel Planner",
    domain: "Agentic AI",
    year: "2025",
    summary:
      "A multi-agent system that turns a casual travel request into a complete day-by-day itinerary, backed by semantic search over thousands of destinations and enriched with live hotel, flight, and weather data.",
    highlights: [
      "Five specialised agents orchestrated in n8n - request analysis, preference interview, retrieval, recommendation, and planning - each owning one step and handing off to the next.",
      "Offline knowledge pipeline: Wikivoyage scrape, LLM tagging with tourism categories, Qwen embeddings, and a FAISS vector index served through a FastAPI retrieval endpoint.",
      "Live data layer scrapes Booking.com hotels and attractions with Selenium and pulls flights (SerpAPI) and weather (Open-Meteo) at planning time.",
      "ACK-Poll pattern keeps the UI responsive during slow itinerary generation; Next.js frontend with NextAuth authentication and Prisma-backed chat sessions.",
    ],
    tags: ["n8n", "Python", "FastAPI", "RAG", "FAISS", "Selenium", "Next.js", "Prisma"],
    repo: "https://github.com/KhUssef/travel-planner",
    featured: true,
  },
  {
    slug: "deepfake-detection",
    name: "DeepFake Detection System",
    domain: "Machine Learning",
    year: "2025",
    summary:
      "An end-to-end video deepfake detection pipeline with a web app for upload, real-time inference, and interactive visualisation of frame-level confidence.",
    highlights: [
      "Uniform frame sampling with OpenCV, then face detection and spatial normalisation as preprocessing into a fine-tuned EfficientNet classifier.",
      "Confidence-weighted voting across per-frame predictions yields a robust video-level verdict, reducing false positives from isolated frame noise.",
      "Web application with a Python backend and a responsive frontend showing frame-level confidence scores and detection heatmaps.",
    ],
    tags: ["Python", "EfficientNet", "TensorFlow", "Keras", "OpenCV", "Flask"],
    repo: "https://github.com/KhUssef/deepfake-detection",
    featured: true,
  },
  {
    slug: "syncflow",
    name: "SyncFlow",
    domain: "Backend",
    year: "2025",
    summary:
      "A real-time collaboration platform with WebSocket rooms, operational conflict resolution, and a full CI/CD pipeline, served to parallel Next.js and Angular frontends.",
    highlights: [
      "Node.js backend with WebSocket rooms, operational conflict resolution, and a modular service architecture.",
      "MySQL schemas optimised with composite and covering indexes and systematic query profiling for low-latency reads under concurrent write load.",
      "GitHub Actions CI/CD: linting, unit testing, Docker image build, and environment-aware deployment with per-environment secrets.",
    ],
    tags: ["Node.js", "Next.js", "Angular", "MySQL", "WebSockets", "GitHub Actions", "Docker"],
    repo: "https://github.com/KhUssef/syncflow",
    featured: true,
  },
];
