package handlers

import "net/http"

type AlertsHandler interface { ListAlerts(http.ResponseWriter,*http.Request); GetAlert(http.ResponseWriter,*http.Request); UpdateAlert(http.ResponseWriter,*http.Request); CreateAlertView(http.ResponseWriter,*http.Request) }
type FreezeHandler interface { CreateFreezeAction(http.ResponseWriter,*http.Request) }
type ReplayHandler interface { GetReplayByDecision(http.ResponseWriter,*http.Request); GetTrace(http.ResponseWriter,*http.Request); CreateReplayView(http.ResponseWriter,*http.Request); CreateTraceAnnotation(http.ResponseWriter,*http.Request); ExportTrace(http.ResponseWriter,*http.Request) }
type GemsHandler interface { CreateGemDraft(http.ResponseWriter,*http.Request); UpdateGemDraft(http.ResponseWriter,*http.Request); SubmitGemDraft(http.ResponseWriter,*http.Request); ListGemInbox(http.ResponseWriter,*http.Request); GetGem(http.ResponseWriter,*http.Request) }
type ApprovalsHandler interface { ListApprovals(http.ResponseWriter,*http.Request); GetApproval(http.ResponseWriter,*http.Request); CreateApprovalDecision(http.ResponseWriter,*http.Request) }
