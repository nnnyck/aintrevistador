FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
RUN pip install --no-cache-dir piper-tts[http]
# Baixa a voz em português‑Brasil
RUN python3 -m piper.download_voices pt_BR-faber-medium
EXPOSE 5000
CMD ["python3", "-m", "piper.http_server", "-m", "pt_BR-faber-medium"]

