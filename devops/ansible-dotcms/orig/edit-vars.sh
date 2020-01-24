#!/bin/bash
MY_DIR="$(cd "${0%/*}" 2>/dev/null; echo "$PWD")"
VAULT_PASSWORD_FILE=${MY_DIR}/.vault-pass.txt

ansible-vault edit --vault-password-file ${VAULT_PASSWORD_FILE} \
  ${MY_DIR}/group_vars/all.yaml
