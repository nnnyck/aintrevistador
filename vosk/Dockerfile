# Base oficial do Vosk com suporte a websocket
FROM alphacep/kaldi-en:latest

WORKDIR /opt

# Copia entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
