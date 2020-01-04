export abstract class CRUDService<T> {
  abstract async create(data: any): Promise<T>;
  abstract async read(id?: string): Promise<T[] | any>;
  abstract async update(id: string, data: T | any);
  abstract async delete(id: string, extraId?: string | number);
}
