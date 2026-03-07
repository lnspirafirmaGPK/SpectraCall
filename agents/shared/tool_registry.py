from typing import Any, Dict, Callable, List, Optional
class ToolRegistry:
    def __init__(self):
        self._tools: Dict[str, Callable] = {}
    def register_tool(self, name: str, func: Callable):
        self._tools[name] = func
    def get_tool(self, name: str) -> Optional[Callable]:
        return self._tools.get(name)
    def list_tools(self) -> List[str]:
        return list(self._tools.keys())
registry = ToolRegistry()
