from agents.shared.base_agent import BaseAgent
class LegalStaffAgent(BaseAgent):
    async def process(self, task, context=None):
        return {"agent": self.name, "status": "processed", "message": f"Legal Staff handled: {task}"}
