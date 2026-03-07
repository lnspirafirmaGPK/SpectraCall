package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"spectracall/services/governance-plane/go-service/internal/auth"
	"spectracall/services/governance-plane/go-service/internal/handlers"
)

type stub struct{}
func writeJSON(w http.ResponseWriter, status int, v any) { w.Header().Set("Content-Type","application/json"); w.WriteHeader(status); _ = json.NewEncoder(w).Encode(v) }
func (s stub) ListAlerts(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"items":[]any{},"next_cursor":nil}) }
func (s stub) GetAlert(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"alert_id":chi.URLParam(r,"alert_id")}) }
func (s stub) UpdateAlert(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"alert_id":chi.URLParam(r,"alert_id")}) }
func (s stub) CreateAlertView(w http.ResponseWriter, r *http.Request){ writeJSON(w,201,map[string]any{"ok":true,"audit_id":"AUD-STUB"}) }
func (s stub) CreateFreezeAction(w http.ResponseWriter, r *http.Request){ writeJSON(w,201,map[string]any{"freeze_id":"FRZ-STUB"}) }
func (s stub) GetReplayByDecision(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"decision_id":chi.URLParam(r,"decision_id")}) }
func (s stub) GetTrace(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"trace_id":chi.URLParam(r,"trace_id")}) }
func (s stub) CreateReplayView(w http.ResponseWriter, r *http.Request){ writeJSON(w,201,map[string]any{"ok":true,"audit_id":"AUD-REPLAY-STUB"}) }
func (s stub) CreateTraceAnnotation(w http.ResponseWriter, r *http.Request){ writeJSON(w,201,map[string]any{"annotation_id":"ANN-STUB"}) }
func (s stub) ExportTrace(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"trace_id":chi.URLParam(r,"trace_id")}) }
func (s stub) CreateGemDraft(w http.ResponseWriter, r *http.Request){ writeJSON(w,201,map[string]any{"gem_draft_id":"GEMD-STUB"}) }
func (s stub) UpdateGemDraft(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"gem_draft_id":chi.URLParam(r,"gem_draft_id")}) }
func (s stub) SubmitGemDraft(w http.ResponseWriter, r *http.Request){ writeJSON(w,201,map[string]any{"gem_draft_id":chi.URLParam(r,"gem_draft_id")}) }
func (s stub) ListGemInbox(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"items":[]any{},"next_cursor":nil}) }
func (s stub) GetGem(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"gem_id":chi.URLParam(r,"gem_id")}) }
func (s stub) ListApprovals(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"items":[]any{},"next_cursor":nil}) }
func (s stub) GetApproval(w http.ResponseWriter, r *http.Request){ writeJSON(w,200,map[string]any{"approval_id":chi.URLParam(r,"approval_id")}) }
func (s stub) CreateApprovalDecision(w http.ResponseWriter, r *http.Request){ writeJSON(w,201,map[string]any{"approval_id":chi.URLParam(r,"approval_id")}) }
var _ handlers.AlertsHandler = stub{}
var _ handlers.FreezeHandler = stub{}
var _ handlers.ReplayHandler = stub{}
var _ handlers.GemsHandler = stub{}
var _ handlers.ApprovalsHandler = stub{}
func main(){ verifier, err := auth.NewVerifier(context.Background(), auth.LoadOIDCConfig()); if err != nil { log.Fatal(err) }; s:=stub{}; r:=chi.NewRouter(); r.Use(auth.AuthMiddleware(verifier)); r.Get("/healthz", func(w http.ResponseWriter, r *http.Request){writeJSON(w,200,map[string]bool{"ok":true})}); r.Group(func(rt chi.Router){ rt.Use(auth.RequireRoles("OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR")); rt.Get("/v1/alerts", s.ListAlerts); rt.Get("/v1/alerts/{alert_id}", s.GetAlert); rt.Post("/v1/alerts/{alert_id}/views", s.CreateAlertView)}); r.Group(func(rt chi.Router){ rt.Use(auth.RequireRoles("OPS_ADMIN","COMPLIANCE_APPROVER")); rt.Patch("/v1/alerts/{alert_id}", s.UpdateAlert)}); r.Group(func(rt chi.Router){ rt.Use(auth.RequireRoles("OPS_ADMIN")); rt.Post("/v1/freeze-actions", s.CreateFreezeAction); rt.Post("/v1/gems/drafts", s.CreateGemDraft); rt.Patch("/v1/gems/drafts/{gem_draft_id}", s.UpdateGemDraft); rt.Post("/v1/gems/drafts/{gem_draft_id}/submit", s.SubmitGemDraft)}); r.Group(func(rt chi.Router){ rt.Use(auth.RequireRoles("OPS_ADMIN","COMPLIANCE_APPROVER","AUDITOR")); rt.Get("/v1/replay/decisions/{decision_id}", s.GetReplayByDecision); rt.Get("/v1/replay/traces/{trace_id}", s.GetTrace); rt.Post("/v1/replay/views", s.CreateReplayView); rt.Get("/v1/replay/traces/{trace_id}/export", s.ExportTrace); rt.Get("/v1/gems/{gem_id}", s.GetGem); rt.Get("/v1/approvals", s.ListApprovals); rt.Get("/v1/approvals/{approval_id}", s.GetApproval)}); r.Group(func(rt chi.Router){ rt.Use(auth.RequireRoles("COMPLIANCE_APPROVER","AUDITOR")); rt.Post("/v1/replay/traces/{trace_id}/annotations", s.CreateTraceAnnotation); rt.Get("/v1/gems/inbox", s.ListGemInbox)}); r.Group(func(rt chi.Router){ rt.Use(auth.RequireRoles("COMPLIANCE_APPROVER")); rt.Post("/v1/approvals/{approval_id}/decisions", s.CreateApprovalDecision)}); log.Fatal(http.ListenAndServe(":8080",r)) }
