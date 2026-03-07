from agents.shared.base_agent import BaseAgent
class FinanceExpertAgent(BaseAgent):
    async def process(self, task, context=None):
        return {"agent": self.name, "status": "reviewed", "message": f"Expert reviewed: {task}"}
