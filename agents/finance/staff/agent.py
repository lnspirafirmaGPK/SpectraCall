from agents.shared.base_agent import BaseAgent
class FinanceStaffAgent(BaseAgent):
    async def process(self, task, context=None):
        return {"agent": self.name, "status": "processed", "message": f"Staff handled: {task}"}
