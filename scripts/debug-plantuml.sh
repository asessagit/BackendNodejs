#!/bin/bash
echo "Arquivo a ser processado: $1" # Imprime o nome do arquivo
echo "Conteúdo do diretório atual:" # Imprime o conteúdo do diretório atual
ls -la
echo "Executando PlantUML no Docker..." # Imprime a mensagem de execução
docker run --rm -v "$(pwd)":/workspace plantuml/plantuml ls -la /workspace # Executa o PlantUML
docker run --rm -v "$(pwd)":/workspace plantuml/plantuml cat /workspace/$1 # Executa o PlantUML  
docker run --rm -v "$(pwd)":/workspace plantuml/plantuml -tpng /workspace/$1 # Executa o PlantUML
