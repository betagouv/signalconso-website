import {Fetch, Func, useFetcher, useMap, useSetState} from '..'
import {useState} from 'react'

type ReadAction<E> = (...args: any[]) => Promise<E>;
type CreateAction<E> = (...args: any[]) => Promise<E>;
type UpdateAction<E, PK extends keyof E> = (pk: E[PK], ...args: any[]) => Promise<E>
type DeleteAction<E, PK extends keyof E> = (pk: E[PK], ...args: any[]) => Promise<void>

interface CreateActionParams {
  preventInsert?: boolean,
  insertBefore?: boolean
}

export interface Create<E, F extends Func, ERR> {
  creating: boolean
  create: (conf?: CreateActionParams, ...args: Parameters<F>) => ReturnType<F>
  createError?: ERR
}

export interface Read<E, PK extends keyof E, F extends Func<Promise<any>>, ERR = any> {
  list?: E[]
  fetching: boolean
  fetch: Fetch<F>
  find: (pk: E[PK]) => E | undefined
  clearCache: () => void
  fetchError?: ERR
}

export interface Update<E, PK extends keyof E, F extends Func<Promise<any>>, ERR> {
  updating: (pk: E[PK]) => boolean
  update: F
  updateError: (pk: E[PK]) => ERR | undefined
}

export interface Delete<E, PK extends keyof E, F extends Func<Promise<any>>, ERR> {
  removing: (id: E[PK]) => boolean
  remove: F
  removeError: (pk: E[PK]) => ERR | undefined
}

export type CrudListR<E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any> = Read<E, PK, CRUD['r'], ERR>
export type CrudListCR<E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any> = Create<E, Exclude<CRUD['c'], undefined>, ERR> & Read<E, PK, CRUD['r'], ERR>
export type CrudListRU<E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any> = Read<E, PK, CRUD['r'], ERR> & Update<E, PK, Exclude<CRUD['u'], undefined>, ERR>
export type CrudListCRU<E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any> = Create<E, Exclude<CRUD['c'], undefined>, ERR> & Read<E, PK, CRUD['r'], ERR> & Update<E, PK, Exclude<CRUD['u'], undefined>, ERR>
export type CrudListRD<E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any> = Read<E, PK, CRUD['r'], ERR> & Delete<E, PK, Exclude<CRUD['d'], undefined>, ERR>
export type CrudListRUD<E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any> = Read<E, PK, CRUD['r'], ERR> & Update<E, PK, Exclude<CRUD['u'], undefined>, ERR> & Delete<E, PK, Exclude<CRUD['d'], undefined>, ERR>
export type CrudListCRD<E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any> = Create<E, Exclude<CRUD['c'], undefined>, ERR> & Read<E, PK, CRUD['r'], ERR> & Delete<E, PK, Exclude<CRUD['d'], undefined>, ERR>
export type CrudListCRUD<E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any> = Create<E, Exclude<CRUD['c'], undefined>, ERR> & Read<E, PK, CRUD['r'], ERR> & Delete<E, PK, Exclude<CRUD['d'], undefined>, ERR> & Update<E, PK, Exclude<CRUD['u'], undefined>, ERR>

export interface UseCrudList {
  <E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any>(pk: PK, _: {r: ReadAction<E[]>}): CrudListR<E, PK, CRUD, ERR>
  <E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any>(pk: PK, _: {r: ReadAction<E[]>, c: CreateAction<E>}): CrudListCR<E, PK, CRUD, ERR>
  <E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any>(pk: PK, _: {r: ReadAction<E[]>, u: UpdateAction<E, PK>}): CrudListRU<E, PK, CRUD, ERR>
  <E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any>(pk: PK, _: {c: CreateAction<E>, r: ReadAction<E[]>, u: UpdateAction<E, PK>}): CrudListCRU<E, PK, CRUD, ERR>
  <E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any>(pk: PK, _: {r: ReadAction<E[]>, d: DeleteAction<E, PK>}): CrudListRD<E, PK, CRUD, ERR>
  <E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any>(pk: PK, _: {r: ReadAction<E[]>, u: UpdateAction<E, PK>, d: DeleteAction<E, PK>}): CrudListRUD<E, PK, CRUD, ERR>
  <E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any>(pk: PK, _: {r: ReadAction<E[]>, c: CreateAction<E>, u: UpdateAction<E, PK>, d: DeleteAction<E, PK>}): CrudListCRUD<E, PK, CRUD, ERR>
  <E, PK extends keyof E, CRUD extends CrudParams<E, PK>, ERR = any>(pk: PK, _: {r: ReadAction<E[]>, c: CreateAction<E>, d: DeleteAction<E, PK>}): CrudListCRD<E, PK, CRUD, ERR>
}

interface CrudParams<E, PK extends keyof E> {
  c?: CreateAction<E>
  r: ReadAction<E[]>
  u?: UpdateAction<E, PK>
  d?: DeleteAction<E, PK>
}


interface UseCrudParams<E,
  PK extends keyof E,
  C extends CreateAction<E> | undefined,
  R extends ReadAction<E[]>,
  U extends UpdateAction<E, PK> | undefined,
  D extends DeleteAction<E, PK> | undefined
  > {
  c?: C,
  r: R,
  u?: U,
  d?: D,
}

export const useCrudList: UseCrudList = <E,
  PK extends keyof E,
  CRUD extends CrudParams<E, PK>,
  ERR = any>
(
  pk: keyof E,
  {c, r, u, d}: UseCrudParams<E, PK, CRUD['c'], CRUD['r'], CRUD['u'], CRUD['d']>
) => {
  const {entity: list, loading: fetching, fetch, setEntity: set, clearCache, error: fetchError} = useFetcher<ReadAction<E[]>>(r!)

  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<ERR | undefined>(undefined)

  const removingList = useSetState<E[PK]>()
  const removeListError = useMap<E[PK], ERR | undefined>()

  const updatingList = useSetState<E[PK]>()
  const updatingListError = useMap<E[PK], ERR | undefined>()

  const create = async ({preventInsert, insertBefore}: CreateActionParams = {}, ...args: any[]): Promise<E> => {
    try {
      setCreating(true)
      const entity = await c!(...args)
      if (!preventInsert) {
        set((prev: E[] | undefined) => {
          if (insertBefore) return [entity, ...(prev ?? [])]
          else return [...(prev ?? []), entity]
        })
      }
      setCreating(false)
      setCreateError(undefined)
      return entity
    } catch (e) {
      setCreateError(e)
      setCreating(false)
      throw e
    }
  }

  const remove = async (primaryKey: E[PK]) => {
    try {
      removingList.add(primaryKey)
      await d!(primaryKey)
      set(n => n!.filter(x => x[pk] !== primaryKey))
      removeListError.delete(primaryKey)
      removingList.delete(primaryKey)
    } catch (e) {
      removeListError.set(primaryKey, e)
      removingList.delete(primaryKey)
      throw e
    }
  }
  const update: UpdateAction<E, PK> = async (primaryKey, ...args: any[]) => {
    try {
      updatingList.add(primaryKey)
      const updatedEntity = await u!(primaryKey, ...args)
      set(n => n!.map(x => (x[pk] === primaryKey) ? {...x, ...updatedEntity} : x))
      updatingListError.set(primaryKey, undefined)
      return updatedEntity
    } catch (e) {
      updatingListError.set(primaryKey, e)
      throw e
    } finally {
      updatingList.delete(primaryKey)
    }
  }

  const find = (primaryKey: E[PK]): E | undefined => {
    if (list) {
      return list.find(t => t[pk] === primaryKey)
    }
  }

  const removing = (primaryKey: E[PK]): boolean => removingList.has(primaryKey)
  const updating = (primaryKey: E[PK]): boolean => updatingList.has(primaryKey)
  const removeError = (primaryKey: E[PK]): ERR | undefined => removeListError.get(primaryKey)
  const updateError = (primaryKey: E[PK]): ERR | undefined => updatingListError.get(primaryKey)

  return {
    list,
    fetching,
    fetch,
    fetchError,
    clearCache,
    find,
    ...(c && {
      createError,
      creating,
      create,
    }),
    ...(d && {
      removing,
      remove,
      removeError,
    }),
    ...(u && {
      updating,
      update,
      updateError,
    }),
  } as any
}
