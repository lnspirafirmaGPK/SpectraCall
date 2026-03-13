from __future__ import annotations

import json
from pathlib import Path
from threading import Lock
from typing import Any


class ArtifactStorage:
    def save(self, job_id: str, data: dict[str, Any]) -> None:
        raise NotImplementedError

    def get(self, job_id: str) -> dict[str, Any] | None:
        raise NotImplementedError


class InMemoryArtifactStorage(ArtifactStorage):
    def __init__(self) -> None:
        self._items: dict[str, dict[str, Any]] = {}
        self._lock = Lock()

    def save(self, job_id: str, data: dict[str, Any]) -> None:
        with self._lock:
            self._items[job_id] = data

    def get(self, job_id: str) -> dict[str, Any] | None:
        with self._lock:
            return self._items.get(job_id)


class FileArtifactStorage(ArtifactStorage):
    def __init__(self, base_path: str) -> None:
        self.base = Path(base_path)
        self.base.mkdir(parents=True, exist_ok=True)

    def _file(self, job_id: str) -> Path:
        safe_job = ''.join(ch for ch in job_id if ch.isalnum() or ch in ('-', '_'))
        return self.base / f'{safe_job}.json'

    def save(self, job_id: str, data: dict[str, Any]) -> None:
        self._file(job_id).write_text(json.dumps(data, ensure_ascii=False), encoding='utf-8')

    def get(self, job_id: str) -> dict[str, Any] | None:
        file_path = self._file(job_id)
        if not file_path.exists():
            return None
        return json.loads(file_path.read_text(encoding='utf-8'))
