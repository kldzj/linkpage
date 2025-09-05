#/bin/sh

if [ ! -f config.json ]; then
  cp config.example.json config.json
fi
