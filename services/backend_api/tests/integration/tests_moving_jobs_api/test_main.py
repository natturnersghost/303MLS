import pytest
from starlette.testclient import TestClient

from moving_jobs.main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_base_route(client):
    """
    GIVEN
    WHEN health check endpoint is called with GET method
    THEN response with status 200 and body OK is returned
    """
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}
