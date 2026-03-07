from __future__ import annotations

import math
from typing import Dict

TARGET_LATENCY_MS = {
    "api_gateway": 2.0,
    "agent_runtime": 5.0,
    "event_bus": 1.0,
    "lineage_hash": 0.5,
}

BASELINE_CAPACITY = {
    "target_events_per_sec": 100_000_000,
    "cluster_nodes": 200,
    "partitions": 2000,
    "event_brokers": 100,
    "cpu_cores": 20_000,
    "ram_tb": 200,
}


def estimate_capacity(target_events_per_sec: int) -> Dict[str, int]:
    """Linear baseline estimator for ASI architecture sizing."""
    if target_events_per_sec <= 0:
        raise ValueError("target_events_per_sec must be greater than 0")

    ratio = target_events_per_sec / BASELINE_CAPACITY["target_events_per_sec"]
    return {
        "target_events_per_sec": target_events_per_sec,
        "cluster_nodes": max(3, math.ceil(BASELINE_CAPACITY["cluster_nodes"] * ratio)),
        "partitions": max(12, math.ceil(BASELINE_CAPACITY["partitions"] * ratio)),
        "event_brokers": max(3, math.ceil(BASELINE_CAPACITY["event_brokers"] * ratio)),
        "cpu_cores": max(32, math.ceil(BASELINE_CAPACITY["cpu_cores"] * ratio)),
        "ram_tb": max(1, math.ceil(BASELINE_CAPACITY["ram_tb"] * ratio)),
    }


def evaluate_latency_budget(latency_ms: Dict[str, float]) -> Dict[str, object]:
    result: Dict[str, object] = {"overall_pass": True, "stages": {}}
    for stage, target in TARGET_LATENCY_MS.items():
        observed = float(latency_ms.get(stage, 0.0))
        passed = observed <= target
        if not passed:
            result["overall_pass"] = False
        result["stages"][stage] = {
            "observed_ms": observed,
            "target_ms": target,
            "pass": passed,
        }
    return result
