#!/bin/bash
set -e

MODEL_DIR="/opt/vosk-model-pt"

if [ ! -d "$MODEL_DIR" ]; then
  echo "🔄 Baixando modelo PT-BR (FalaBrasil)..."
  wget -qO /tmp/model.zip https://alphacephei.com/vosk/models/vosk-model-pt-fb-v0.1.1-20220516_2113.zip
  unzip -q /tmp/model.zip -d /opt/
  mv /opt/vosk-model-pt-fb-v0.1.1-20220516_2113 "$MODEL_DIR"
  rm /tmp/model.zip
fi

echo "✅ Modelo PT-BR pronto em: $MODEL_DIR"
echo "🚀 Iniciando servidor WebSocket na porta 2700..."
exec python3 /opt/vosk-server/websocket/asr_server.py $MODEL_DIR 2700 --allow-upsample
