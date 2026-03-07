from app.internal_system import evaluate_latency_budget, estimate_capacity


def test_estimate_capacity_scales_linearly():
    plan = estimate_capacity(50_000_000)
    assert plan["cluster_nodes"] >= 100
    assert plan["partitions"] >= 1000
    assert plan["event_brokers"] >= 50


def test_estimate_capacity_rejects_invalid_target():
    try:
        estimate_capacity(0)
        assert False, "expected ValueError"
    except ValueError:
        assert True


def test_evaluate_latency_budget_flags_failures():
    report = evaluate_latency_budget(
        {
            "api_gateway": 1.9,
            "agent_runtime": 5.2,
            "event_bus": 0.4,
            "lineage_hash": 0.5,
        }
    )
    assert report["overall_pass"] is False
    assert report["stages"]["agent_runtime"]["pass"] is False
    assert report["stages"]["api_gateway"]["pass"] is True
