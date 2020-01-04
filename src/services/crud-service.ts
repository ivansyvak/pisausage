export abstract class CRUDService<T> {
  abstract async create(data: any): Promise<T>;
  abstract async read(id?: string): Promise<T[]>;
  abstract async update(id: string, data: T);
  abstract async delete(id: string);
}
