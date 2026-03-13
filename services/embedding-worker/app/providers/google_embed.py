from __future__ import annotations

import base64
import hashlib
from dataclasses import dataclass
from typing import Any

from app.config import Settings
from app.contracts import AudioInput, EmbedRequest, ImageInput, TextInput


@dataclass
class ProviderResult:
    vectors: list[list[float]]
    dimensions: int | None
    model: str
    warnings: list[str]


class GoogleEmbeddingProvider:
    def __init__(self, settings: Settings):
        self.settings = settings

    def _mock_embedding(self, seed: str, dim: int = 8) -> list[float]:
        digest = hashlib.sha256(seed.encode('utf-8')).digest()
        return [round((digest[i] / 255.0) * 2 - 1, 6) for i in range(dim)]

    def _to_google_content_parts(self, request: EmbedRequest) -> list[Any]:
        from google.genai import types

        parts: list[Any] = []
        for item in request.inputs:
            if isinstance(item, TextInput):
                parts.append(item.text)
            elif isinstance(item, ImageInput):
                parts.append(types.Part.from_bytes(data=base64.b64decode(item.bytes_base64), mime_type=item.mime_type))
            elif isinstance(item, AudioInput):
                parts.append(types.Part.from_bytes(data=base64.b64decode(item.bytes_base64), mime_type=item.mime_type))
        return parts

    def embed(self, request: EmbedRequest) -> ProviderResult:
        model = self.settings.gemini_embed_model
        if not self.settings.gemini_api_key:
            vectors = [self._mock_embedding(f'{request.job_id}:{idx}:{item.kind}') for idx, item in enumerate(request.inputs)]
            return ProviderResult(vectors=vectors, dimensions=len(vectors[0]) if vectors else None, model=f'{model}:mock', warnings=['Running in mock mode because GEMINI_API_KEY is not set'])

        from google import genai

        client = genai.Client(api_key=self.settings.gemini_api_key)
        parts = self._to_google_content_parts(request)
        result = client.models.embed_content(model=model, contents=parts)

        embeddings = getattr(result, 'embeddings', None) or []
        vectors: list[list[float]] = []
        for emb in embeddings:
            values = getattr(emb, 'values', None)
            if values:
                vectors.append(list(values))

        dimensions = len(vectors[0]) if vectors else None
        return ProviderResult(vectors=vectors, dimensions=dimensions, model=model, warnings=[])
