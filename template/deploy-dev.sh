#!/usr/bin/env bash

DEV=$(grep "REACT_APP_BUILD=dev" .env)
if [[ "$DEV" != "REACT_APP_BUILD=dev" ]]; then
    echo "$(tput setaf 1)Error .env file should be set to dev with the line: REACT_APP_BUILD=dev $(tput sgr 0)"
    exit 1
fi


echo "Building app..."
npm run build > /dev/null
if [[ $? -ne 0 ]]; then
    OUT=$?
    echo "$(tput setaf 1)Error \"npm run build\" command returned non-zero value ($OUT) $(tput sgr 0)"
    exit $?
fi


echo "Uploading files to $HOST"
scp -rq build/* "$HOST:$PATH"
if [[ $? -ne 0 ]]; then
    echo "$(tput setaf 1)Error \"scp\" command returned non-zero value ($?) $(tput sgr 0)"
    exit $?
fi
