from functools import lru_cache
from typing import Set

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    gemini_api_key: str | None = Field(default=None, alias='GEMINI_API_KEY')
    gemini_embed_model: str = Field(default='gemini-embedding-2-preview', alias='GEMINI_EMBED_MODEL')

    embedding_max_bytes: int = Field(default=5_000_000, alias='EMBEDDING_MAX_BYTES')
    embedding_allowed_image_mime: str = Field(default='image/png,image/jpeg', alias='EMBEDDING_ALLOWED_IMAGE_MIME')
    embedding_allowed_audio_mime: str = Field(default='audio/mpeg,audio/wav', alias='EMBEDDING_ALLOWED_AUDIO_MIME')

    embedding_artifact_dir: str | None = Field(default=None, alias='EMBEDDING_ARTIFACT_DIR')

    @property
    def allowed_image_mime(self) -> Set[str]:
        return {item.strip() for item in self.embedding_allowed_image_mime.split(',') if item.strip()}

    @property
    def allowed_audio_mime(self) -> Set[str]:
        return {item.strip() for item in self.embedding_allowed_audio_mime.split(',') if item.strip()}


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
