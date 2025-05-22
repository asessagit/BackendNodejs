#!/bin/bash
echo "Processando arquivo: $1" # Imprime o nome do arquivo
docker run --rm -i plantuml/plantuml -pipe > "${1%.*}.png" < "$1" # Executa o PlantUML
echo "Imagem gerada: ${1%.*}.png" # Imprime o nome da imagem gerada
