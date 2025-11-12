# Nome do serviço principal
SERVICE=piper

# 🔹 Sobe os containers
up:
	@echo "🚀 Subindo containers..."
	docker compose up -d

# 🔹 Para e remove os containers
down:
	@echo "🛑 Parando containers..."
	docker compose down

# 🔹 Reconstrói o container usando cache local (rápido)
build:
	@echo "🔧 Buildando $(SERVICE) com cache local..."
	docker compose build $(SERVICE)

# 🔹 Reconstrói o container sem cache (do zero)
rebuild:
	@echo "♻️ Buildando $(SERVICE) do zero, sem cache..."
	docker compose build --no-cache $(SERVICE)

# 🔹 Mostra logs em tempo real
logs:
	@echo "📜 Exibindo logs de $(SERVICE)..."
	docker compose logs -f $(SERVICE)

# 🔹 Abre um terminal dentro do container
bash:
	@echo "🐚 Acessando container $(SERVICE)..."
	docker compose exec $(SERVICE) bash

# 🔹 Reinicia o container (útil pra aplicar alterações no código)
restart:
	@echo "🔁 Reiniciando $(SERVICE)..."
	docker compose restart $(SERVICE)
