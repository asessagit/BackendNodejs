#!/bin/bash
docker run --rm -v "$(pwd)":/workspace plantuml/plantuml -tpng "$@" # Executa o PlantUML
