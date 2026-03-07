from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional

class BaseAgent(ABC):
    def __init__(self, name: str, role: str, config: Dict[str, Any]):
        self.name = name
        self.role = role
        self.config = config
        self.authority_scope = config.get("authority_scope", [])
        self.escalation_rules = config.get("escalation_rules", {})

    @abstractmethod
    async def process(self, task: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        pass

    def can_handle(self, action: str) -> bool:
        return action in self.authority_scope

    def get_escalation_target(self, trigger: str) -> Optional[str]:
        return self.escalation_rules.get(trigger)
