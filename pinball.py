from os import getenv
from dotenv import load_dotenv
import socketio
from datetime import datetime, timezone, timedelta
import jwt
from time import sleep


load_dotenv()
url = getenv("URL", default="wss://feira-de-jogos.dev.br")
socketio_path = getenv("SOCKETIO_PATH", default="/api/v2/machine")
namespace = getenv("NAMESPACE", default="/arcade")
secret_key = getenv("TOKEN_SECRET_KEY_ARCADE", default="")
id = getenv("ARCADE_ID", default="0")


sio = socketio.Client(logger=False, engineio_logger=True)


@sio.event(namespace="/arcade")
def connect():
    """
    Conexão ao servidor estabelecida
    """
    pass


@sio.event(namespace="/arcade")
def coinInsert(data):
    """
    Recebe a solicitação para inserção de moeda
    """
    try:
        arcade, coins, operation = data.values()
        arcade = str(arcade)
    except:
        return

    if arcade == id:
        for _ in range(coins):
            # Inserir moeda
            sleep(0.250)

            # Apertar Start
            sleep(0.250)

        messageType = "coinInserted"
        messageContent = {"arcade": arcade, "operation": operation}
        sio.emit(messageType, messageContent, namespace=namespace)


@sio.event
def disconnect():
    """
    Conexão ao servidor encerrada
    """
    pass


def main():
    """
    Função principal
    """
    message = {"machine": "arcade", "id": id}
    exp = datetime.now(timezone.utc) + timedelta(days=365)
    token = jwt.encode(message, secret_key, headers={"exp": exp.timestamp()})
    sio.connect(
        url,
        socketio_path=socketio_path,
        namespaces=namespace,
        auth={"token": token},
    )
    sio.wait()


if __name__ == "__main__":
    main()
