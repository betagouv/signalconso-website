export interface ApiException {
  error: any
  status: number
}

/**
 * Classe générique qui sert à créer des erreurs HTTP (ici 400 et 404)
 *
 * On précise que notre classe doit correspondre à l'interface `ApiException`
 *
 * Les mots clés `readonly` servent de raccourci pour `this.propriété = valeur`,
 * ils nous empêchent également de mofifier ces valeurs par la suite.
 *
 * Ici `this.error = error` et `this.status = status`
 */
class Exception implements ApiException {
  constructor(
    readonly error: any,
    readonly status: number,
  ) {}
}

/**
 * Création d'une 404
 */
export class NotFoundException extends Exception {
  /**
   * On appelle le `constructor` de la classe parente `Exception`
   */
  constructor(error: any) {
    super(error, 404)
  }
}

/**
 * Création d'une 400
 */
export class BadRequestException extends Exception {
  /**
   * On appelle le `constructor` de la classe parente `Exception`
   */
  constructor(error: any) {
    super(error, 400)
  }
}

export interface GeneralException {
  error: any
}

export class PageNotFoundException implements GeneralException {
  error: any
  constructor(readonly url: string) {
    this.error = `${url} not found`
  }
}
