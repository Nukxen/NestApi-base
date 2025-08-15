export type SuccessInit<T> = {
  data?: T;
  message?: string;
  path?: string;
};
export class SuccessReturn<T = any> {
  readonly success = true;
  readonly data?: T;
  readonly message?: string;
  readonly timestamp: string;
  readonly path?: string;

  constructor(init?: SuccessInit<T>) {
    this.data = init?.data;
    this.message = init?.message;
    this.timestamp = new Date().toISOString();
    this.path = init?.path;
  }

  static Ok<T>(data?: T, message?: string) {
    return new SuccessReturn<T>({ data, message });
  }

  static Created<T>(data?: T, message = 'Criado com sucesso') {
    return new SuccessReturn<T>({ data, message });
  }

  static NoContent(message = 'Sem conteúdo') {
    // sem data; útil pra DELETE/204 que ainda quer envelope 200
    return new SuccessReturn({ message });
  }
}
