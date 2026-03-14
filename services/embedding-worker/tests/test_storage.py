from __future__ import annotations

import json

from app.storage import FileArtifactStorage


def test_file_storage_does_not_collide_for_sanitized_job_ids(tmp_path) -> None:
    storage = FileArtifactStorage(str(tmp_path))

    first_job_id = 'a/b'
    second_job_id = 'ab'

    storage.save(first_job_id, {'job_id': first_job_id, 'v': 1})
    storage.save(second_job_id, {'job_id': second_job_id, 'v': 2})

    assert storage.get(first_job_id) == {'job_id': first_job_id, 'v': 1}
    assert storage.get(second_job_id) == {'job_id': second_job_id, 'v': 2}


def test_file_storage_reads_legacy_artifact_filename(tmp_path) -> None:
    storage = FileArtifactStorage(str(tmp_path))
    job_id = 'legacy/job'
    legacy_file = tmp_path / 'legacyjob.json'
    artifact = {'job_id': job_id, 'vector_count': 1}
    legacy_file.write_text(json.dumps(artifact), encoding='utf-8')

    assert storage.get(job_id) == artifact
