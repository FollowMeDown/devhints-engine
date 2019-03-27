#!/usr/bin/env bash
# Docker-compose entry file

# Install packages if necessary
if [ ! -d node_modules ]; then
  yarn
fi

# Ensure cache is cleared before running
if [ -d .cache ]; then
  rm -rf .cache/*
fi

# Start server
yarn develop --host ${HOST:-0.0.0.0} --port ${PORT:-19336}
