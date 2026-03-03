from fastapi import FastAPI

from app.core.errors import install_exception_handlers
from app.routers import alerts, approvals, freeze, gems, replay

app = FastAPI(title="Inspectra Governance API (Scaffold)", version="1.0.0")
install_exception_handlers(app)
app.include_router(alerts.router)
app.include_router(freeze.router)
app.include_router(replay.router)
app.include_router(gems.router)
app.include_router(approvals.router)

@app.get("/healthz")
def healthz():
    return {"ok": True}
