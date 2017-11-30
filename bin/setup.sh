SERVICE_DIR=/lib/systemd/system/
SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"

sudo cp $SCRIPT_PATH/raspi-temperature-server.service $SERVICE_DIR

sudo systemctl start raspi-temperature-server.service
sudo systemctl enable raspi-temperature-server.service

mkdir ~/bin
cp $SCRIPT_PATH/record-temp ~/bin
chmod +x ~/bin/record-temp

crontab -u pi $SCRIPT_PATH/crontab
