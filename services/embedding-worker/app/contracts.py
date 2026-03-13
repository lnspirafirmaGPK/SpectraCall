from __future__ import annotations

from typing import Annotated, Literal, Union

from pydantic import BaseModel, ConfigDict, Field, field_validator


class TextInput(BaseModel):
    kind: Literal['text']
    text: str = Field(min_length=1)


class ImageInput(BaseModel):
    kind: Literal['image']
    mime_type: str
    bytes_base64: str = Field(min_length=1)


class AudioInput(BaseModel):
    kind: Literal['audio']
    mime_type: str
    bytes_base64: str = Field(min_length=1)


EmbeddingInput = Annotated[Union[TextInput, ImageInput, AudioInput], Field(discriminator='kind')]


class EmbedRequest(BaseModel):
    model_config = ConfigDict(extra='forbid')

    job_id: str = Field(min_length=1)
    tenant_id: str = Field(min_length=1)
    traceparent: str = Field(min_length=1)
    tracestate: str | None = None
    policy_scope: str = Field(min_length=1)
    classification: str = Field(min_length=1)
    inputs: list[EmbeddingInput] = Field(min_length=1)

    @field_validator('traceparent')
    @classmethod
    def validate_traceparent(cls, value: str) -> str:
        parts = value.split('-')
        if len(parts) != 4:
            raise ValueError('traceparent must follow W3C traceparent format: version-traceid-spanid-flags')
        if any(not part for part in parts):
            raise ValueError('traceparent segments cannot be empty')
        return value


class EmbeddingMetadata(BaseModel):
    vector_count: int
    dimensions: int | None = None


class EmbedResponse(BaseModel):
    job_id: str
    model: str
    status: Literal['completed']
    artifacts: dict
    embeddings: EmbeddingMetadata
    vector_count: int
    dimensions: int | None
    payload_hash: str
    lineage_hash: str
    parent_hash: str | None = None
    traceparent: str
    policy_scope: str
    classification: str
    warnings: list[str] | None = None
