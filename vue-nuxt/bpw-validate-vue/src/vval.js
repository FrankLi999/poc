// a minimial single-layer implementation
// of virtual-validation patching,
// based on Vue's snabbdom clone

function isUndef (v) {
  return v === null || v === undefined
}

function isDef (v) {
  return v !== null && v !== undefined
}

function sameVval (oldVval, vval) {
  return vval.tag === oldVval.tag &&
         vval.key === oldVval.key
}

function createVm (vval, parentPath) {
  const Vm = vval.tag
  const path = vval.args.prop ? 
    parentPath ? parentPath + '.' + vval.args.prop : vval.args.prop : parentPath
  vval.args.path = path.replace('$v.', '')
  vval.vm = new Vm({data: vval.args})
}

function updateVval (vval) {
  const keys = Object.keys(vval.args)
  for (let i = 0; i < keys.length; i++) {
    keys.forEach(k => {
      vval.vm[k] = vval.args[k]
    })
  }
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}

function updateChildren (oldCh, newCh, parentPath) {
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVval = oldCh[0]
  let oldEndVval = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVval = newCh[0]
  let newEndVval = newCh[newEndIdx]
  let oldKeyToIdx, idxInOld, elmToMove

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVval)) {
      oldStartVval = oldCh[++oldStartIdx] // Vval has been moved left
    } else if (isUndef(oldEndVval)) {
      oldEndVval = oldCh[--oldEndIdx]
    } else if (sameVval(oldStartVval, newStartVval)) {
      patchVval(oldStartVval, newStartVval)
      oldStartVval = oldCh[++oldStartIdx]
      newStartVval = newCh[++newStartIdx]
    } else if (sameVval(oldEndVval, newEndVval)) {
      patchVval(oldEndVval, newEndVval)
      oldEndVval = oldCh[--oldEndIdx]
      newEndVval = newCh[--newEndIdx]
    } else if (sameVval(oldStartVval, newEndVval)) { // Vval moved right
      patchVval(oldStartVval, newEndVval)
      oldStartVval = oldCh[++oldStartIdx]
      newEndVval = newCh[--newEndIdx]
    } else if (sameVval(oldEndVval, newStartVval)) { // Vval moved left
      patchVval(oldEndVval, newStartVval)
      oldEndVval = oldCh[--oldEndIdx]
      newStartVval = newCh[++newStartIdx]
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      idxInOld = isDef(newStartVval.key) ? oldKeyToIdx[newStartVval.key] : null
      if (isUndef(idxInOld)) { // New element
        createVm(newStartVval, parentPath)
        newStartVval = newCh[++newStartIdx]
      } else {
        elmToMove = oldCh[idxInOld]
        if (sameVval(elmToMove, newStartVval)) {
          patchVval(elmToMove, newStartVval)
          oldCh[idxInOld] = undefined
          newStartVval = newCh[++newStartIdx]
        } else {
          // same key but different element. treat as new element
          createVm(newStartVval, parentPath)
          newStartVval = newCh[++newStartIdx]
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    addVvals(newCh, newStartIdx, newEndIdx, parentPath)
  } else if (newStartIdx > newEndIdx) {
    removeVvals(oldCh, oldStartIdx, oldEndIdx)
  }
}

function addVvals (vvals, startIdx, endIdx, parentPath) {
  for (; startIdx <= endIdx; ++startIdx) {
    createVm(vvals[startIdx], parentPath)
  }
}

function removeVvals (vvals, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vvals[startIdx]
    if (isDef(ch)) {
      ch.vm.$destroy()
      ch.vm = null
    }
  }
}

function patchVval (oldVval, vval) {
  if (oldVval === vval) {
    return
  }
  vval.vm = oldVval.vm
  updateVval(vval)
}

export function patchChildren (oldCh, ch, parentPath) {
  if (isDef(oldCh) && isDef(ch)) {
    if (oldCh !== ch) updateChildren(oldCh, ch, parentPath)
  } else if (isDef(ch)) {
    addVvals(ch, 0, ch.length - 1, parentPath)
  } else if (isDef(oldCh)) {
    removeVvals(oldCh, 0, oldCh.length - 1)
  }
}

export function h (tag, key, args) {
  return { tag, key, args }
}
