# Configuração do serviço

## Raspberry Pi

O acesso ao dispositivo em rede se dá por SSH com chave privada.

### Systemd

Para instalar o serviço via `systemd`:

```sh
# Baixar o código
cd ~
git clone https://github.com/Jumbem/pinball_circensis

# Instalar o ambiente virtual e dependências
cd ~/pinball_circensis
python3 -m venv venv
source ./venv/bin/activate
pip install --upgrade pip
pip install -r hardware/raspberry-pi/requirements.txt

# Instalar e ativar o serviço
cd /etc/systemd/system
sudo ln -s /home/pi/pinball_circensis/hardware/raspberry-pi/pinball.service
sudo systemctl daemon-reload
sudo systemctl enable pinball
sudo systemctl restart pinball

# Monitorar os logs do serviço
sudo journalctl -f -u pinball.service
```
