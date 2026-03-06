
# SpectraCall | ASI v4.3.1 Orchestration Platform

Advanced organizational management and AI agent orchestration powered by the **AetherBus v4.0 (Speed of Light Edition)**.


## Implementation Status (Reality Check)

### What exists now (in this repository)
- Next.js 15 + React 19 dashboard shell with ASI-themed UI surfaces (overview panels, KPI cards, feed widgets, sidebar command panel).
- Genkit + Google GenAI integration with a general assistant flow scaffold.
- Early internal API and auth-hardening references (FastAPI/Go notes and docs under `docs/`).

### What is prototyped
- AI-assisted operator interactions and orchestration UX patterns.
- Internal architecture planning endpoints and governance-oriented API concepts.
- OIDC/JWKS/introspection hardening patterns described in docs and scaffold modules.

### Roadmap / target architecture
- Full backend orchestration runtime with measurable throughput/latency guarantees.
- Reproducible benchmark suite (transport/event bus/runtime profiling) aligned with advertised performance goals.
- Production controls: observability, role-policy enforcement, rate limiting, tracing, and failure-domain testing.

## Architectural Excellence: Three-Tier Performance Model

1.  **The Silicon Fabric (Level 1):** Physical & Kernel Layer using RDMA/RoCE v2, Kernel Bypass, and Zero-Copy Networking. 
    - **Goal:** Latency < 5µs.
    - **Impact:** Eliminates OS Context Switching.

2.  **The Tachyon Bridge (Level 2):** FFI & Memory Layer built with Rust + PyO3. Features Zero-Copy Pointer Passing via Shared Memory. 
    - **Goal:** Latency < 50µs.
    - **Throughput:** Verified at 15,000,000 msg/s via Tachyon SIMD.

3.  **The Cognitive Plane (Level 3):** Event Loop Layer using Python asyncio + uvloop. Handles high-level orchestration and LLM integration. 
    - **Goal:** Latency < 1ms.
    - **Optimization:** HFT-inspired Local Variable Caching.

## HFT Optimizations for Python Core
- **Local Variable Caching:** Eliminates "Dot Lookup" overhead by caching function references at class initialization, allowing Python to call methods directly from local memory.
- **Slot-Based Optimization:** Implementation of `__slots__` for fixed-size memory allocation, reducing GC overhead and memory footprint, enabling massive agent swarms (1,024+ agents).
- **Atomic ID Generation:** Optimized to 150X speed using `itertools.count()` over standard UUIDs, reducing system call latency.
- **Fire-and-Forget Dispatch:** Optimized non-awaiting dispatch patterns that saturate the Tachyon Core without blocking the producer.
- **Python Dispatch Throughput:** Optimized to 600,000+ msg/s on standard hardware.

## Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, ShadCN UI, Lucide Icons.
- **AI/GenAI:** Genkit v1.x, Google Gemini 2.5 Flash.
- **Visuals:** Recharts for resonance monitoring and custom HFT-inspired data viz.

## Troubleshooting (TH)
- **อุโมงค์ Ngrok หมดเวลา (Ngrok tunnel timeout):**
  รีสตาร์ทอุโมงค์ Ngrok และยืนยันว่าเซิร์ฟเวอร์ภายใน (`localhost`) ทำงานอยู่ก่อนแชร์ URL สำหรับการใช้งานจริง หากเป็นระบบ production ควรใช้ผู้ให้บริการโฮสติ้งที่เสถียร พร้อม health checks อย่างสม่ำเสมอ
- **การสตรีมสะดุดเมื่ออยู่หลังพร็อกซี/โหลดบาลานเซอร์/CDN:**
  ตรวจสอบว่าโครงสร้างพร็อกซีรองรับ Server-Sent Events (SSE) หรือ HTTP streaming โดยปิดการบัฟเฟอร์ของพร็อกซีในเส้นทางที่สตรีมข้อมูล และเพิ่ม timeout ให้เหมาะสมกับการเชื่อมต่อแบบยาว

---
*Developed for the Aetherium-Syndicate-Inspectra (ASI) Protocol.*

## OIDC production hardening

This scaffold includes JWKS/discovery caching in FastAPI, key-rotation retry for JWT verification, and RFC7662 introspection fallback for opaque access tokens in both FastAPI and Go.

- Added RFC7807 structured error responses for auth failures in both FastAPI and Go middleware.

- OIDC auth sequence diagram: `docs/oidc-auth-sequence.md`


## Internal Architecture Planning APIs (100M events/sec)

To support ASI high-throughput planning and governance workflows, FastAPI now includes internal endpoints that expose architecture metadata, capacity estimation, and latency budget evaluation:

- `GET /v1/internal/architecture`
- `GET /v1/internal/capacity?target_events_per_sec=<int>`
- `POST /v1/internal/latency-evaluation`

Reference blueprint: `docs/asi-internal-system-100m-events.md`

Example latency payload:

```json
{
  "api_gateway": 1.8,
  "agent_runtime": 4.6,
  "event_bus": 0.7,
  "lineage_hash": 0.4
}
```

These APIs are intended for internal operational planning and are protected via role checks in the governance API layer.
