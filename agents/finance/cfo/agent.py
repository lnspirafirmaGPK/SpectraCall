from agents.shared.base_agent import BaseAgent
class FinanceCFOAgent(BaseAgent):
    async def process(self, task, context=None):
        return {"agent": self.name, "status": "authorized", "message": f"CFO authorized: {task}"}
