#!/bin/bash
MY_DIR="$(cd "${0%/*}" 2>/dev/null; echo "$PWD")"
VAULT_PASSWORD_FILE=${MY_DIR}/.vault-pass.txt
PLAYBOOK=${MY_DIR}/playbook.yaml
INVENTORY=${MY_DIR}/inventory

ansible-playbook --vault-password-file ${VAULT_PASSWORD_FILE} \
  -i ${INVENTORY} ${PLAYBOOK} $*
