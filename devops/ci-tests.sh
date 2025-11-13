set -e

python3 ./util/wait_for_db_ready.py localhost 5432 kersta kersta secret 15
export ALEMBIC_RUNNING_IN_CI=true
alembic upgrade head
pytest --cov=src --cov-append --cov-report= test/unit
pytest --cov=src --cov-append --cov-report= test/integration --cov-fail-under=80
coverage report -m